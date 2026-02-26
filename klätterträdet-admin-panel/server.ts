import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database('admin.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    email TEXT,
    book_title TEXT,
    status TEXT DEFAULT 'Mottagen',
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name TEXT,
    email TEXT,
    service_type TEXT,
    booking_date TEXT,
    booking_time TEXT,
    status TEXT DEFAULT 'Väntar',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS visitors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT UNIQUE,
    uniques INTEGER,
    page_views INTEGER
  );
`);

// Seed initial data
const orderCount = db.prepare('SELECT COUNT(*) as count FROM orders').get() as { count: number };
if (orderCount.count === 0) {
  // Orders
  const insertOrder = db.prepare('INSERT INTO orders (customer_name, email, book_title, status, address) VALUES (?, ?, ?, ?, ?)');
  insertOrder.run('Anna Andersson', 'anna@example.com', 'Klätterträdet - En resa', 'Skickad', 'Storgatan 1, Stockholm');
  insertOrder.run('Erik Nilsson', 'erik@example.com', 'Klätterträdet - En resa', 'Behandlas', 'Lillvägen 5, Göteborg');
  insertOrder.run('Karin Larsson', 'karin@example.com', 'Klätterträdet - En resa', 'Mottagen', 'Skogsvägen 12, Malmö');

  // Bookings
  const insertBooking = db.prepare('INSERT INTO bookings (client_name, email, service_type, booking_date, booking_time, status) VALUES (?, ?, ?, ?, ?, ?)');
  insertBooking.run('Maria Berg', 'maria@example.com', 'Terapi', '2026-03-01', '10:00', 'Bekräftad');
  insertBooking.run('Johan Lind', 'johan@example.com', 'Utbildning', '2026-03-05', '14:00', 'Väntar');
  insertBooking.run('Sofia Ek', 'sofia@example.com', 'Terapi', '2026-03-10', '09:00', 'Bekräftad');

  // Messages
  const insertMessage = db.prepare('INSERT INTO messages (sender_name, email, subject, message) VALUES (?, ?, ?, ?)');
  insertMessage.run('Sara Holm', 'sara@example.com', 'Utbildningsfråga', 'Hej! Jag är intresserad av er utbildning i traumamedvetenhet.');
  insertMessage.run('Peter Sjöberg', 'peter@example.com', 'Bokbeställning', 'Kan jag köpa boken som e-bok?');

  // Visitors (last 30 days)
  const insertVisitor = db.prepare('INSERT INTO visitors (date, uniques, page_views) VALUES (?, ?, ?)');
  for (let i = 30; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    insertVisitor.run(dateStr, Math.floor(Math.random() * 50) + 20, Math.floor(Math.random() * 150) + 50);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Simple Auth Middleware (Mock)
  const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // In a real app, check session/token
    next();
  };

  // API Routes
  app.get('/api/stats', authMiddleware, (req, res) => {
    const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get() as { count: number };
    const totalBookings = db.prepare('SELECT COUNT(*) as count FROM bookings').get() as { count: number };
    const totalMessages = db.prepare('SELECT COUNT(*) as count FROM messages WHERE is_read = 0').get() as { count: number };
    
    const today = new Date().toISOString().split('T')[0];
    const todayStats = db.prepare('SELECT * FROM visitors WHERE date = ?').get(today) as any;
    
    const last7Days = db.prepare('SELECT * FROM visitors ORDER BY date DESC LIMIT 7').all();
    const last30Days = db.prepare('SELECT * FROM visitors ORDER BY date DESC LIMIT 30').all();

    res.json({
      summary: {
        orders: totalOrders.count,
        bookings: totalBookings.count,
        unreadMessages: totalMessages.count,
        todayUniques: todayStats?.uniques || 0,
        todayViews: todayStats?.page_views || 0
      },
      chartData: last7Days.reverse()
    });
  });

  app.get('/api/orders', authMiddleware, (req, res) => {
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    res.json(orders);
  });

  app.patch('/api/orders/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
    res.json({ success: true });
  });

  app.get('/api/bookings', authMiddleware, (req, res) => {
    const { search, status } = req.query;
    let query = 'SELECT * FROM bookings WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (client_name LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY booking_date ASC, booking_time ASC';
    const bookings = db.prepare(query).all(...params);
    res.json(bookings);
  });

  app.get('/api/messages', authMiddleware, (req, res) => {
    const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
    res.json(messages);
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
