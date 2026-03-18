import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from './supabase.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3001;

  app.use(express.json());

  // Simple Auth Middleware (Mock)
  const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // In a real app, check session/token
    next();
  };

  // API Routes
  app.get('/api/stats', authMiddleware, async (req, res) => {
    try {
      const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
      const { count: bookingsCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true });
      const { count: unreadMessagesCount } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false);
      
      // Mocking visitor stats for now as they aren't in Supabase schema yet
      const today = new Date().toISOString().split('T')[0];
      
      // Generating some realistic looking dummy chart data for the last 7 days
      const chartData = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        chartData.push({
          date: d.toISOString().split('T')[0],
          uniques: Math.floor(Math.random() * 50) + 20,
          page_views: Math.floor(Math.random() * 150) + 50
        });
      }

      res.json({
        summary: {
          orders: ordersCount || 0,
          bookings: bookingsCount || 0,
          unreadMessages: unreadMessagesCount || 0,
          todayUniques: chartData[6].uniques,
          todayViews: chartData[6].page_views
        },
        chartData: chartData
      });
    } catch (error) {
      console.error('Stats error:', error);
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

  app.get('/api/orders', authMiddleware, async (req, res) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) return res.status(500).json(error);
    res.json(data);
  });

  app.patch('/api/orders/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
    
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  });

  app.get('/api/bookings', authMiddleware, async (req, res) => {
    const { search, status } = req.query;
    let query = supabase.from('bookings').select('*');

    if (search) {
      query = query.or(`client_name.ilike.%${search}%,email.ilike.%${search}%`);
    }
    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query.order('booking_date', { ascending: true });
    
    if (error) return res.status(500).json(error);
    res.json(data);
  });

  app.get('/api/messages', authMiddleware, async (req, res) => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) return res.status(500).json(error);
    res.json(data);
  });

  app.get('/api/blogs', authMiddleware, async (req, res) => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) return res.status(500).json(error);
    res.json(data);
  });

  app.post('/api/blogs', authMiddleware, async (req, res) => {
    const { title, description, content, image_url, author_name } = req.body;
    const { data, error } = await supabase
      .from('blogs')
      .insert({
        title,
        description,
        content,
        image_url,
        author_name,
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) return res.status(500).json(error);
    res.json(data);
  });

  app.delete('/api/blogs/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  });

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Hardcoded for demo
    if (username === 'admin' && password === 'admin123') {
      res.json({ success: true, user: { name: 'Admin', role: 'admin' } });
    } else {
      res.status(401).json({ success: false, message: 'Fel användarnamn eller lösenord' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
