import { useState, useEffect, FormEvent } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  LogOut, 
  Users, 
  TrendingUp,
  Search,
  User,
  Mail,
  Clock,
  AlertCircle
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Order, Booking, Message, Stats } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const StatCard = ({ title, value, icon: Icon, trend }: { title: string, value: string | number, icon: any, trend?: string }) => (
  <div className="bg-glass-100 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-white/5 rounded-xl">
        <Icon className="w-6 h-6 text-orange-500" />
      </div>
      {trend && (
        <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-white/60 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-display font-bold text-white">{value}</p>
  </div>
);

// --- Main App ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'bookings' | 'messages'>('dashboard');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetchStats();
      fetchOrders();
      fetchBookings();
      fetchMessages();
    }
  }, [isLoggedIn]);

  const fetchStats = async () => {
    const res = await fetch('/api/stats');
    const data = await res.json();
    setStats(data);
  };

  const fetchOrders = async () => {
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data);
  };

  const fetchBookings = async () => {
    const params = new URLSearchParams();
    if (bookingSearch) params.append('search', bookingSearch);
    if (bookingStatus) params.append('status', bookingStatus);
    const res = await fetch(`/api/bookings?${params.toString()}`);
    const data = await res.json();
    setBookings(data);
  };

  const fetchMessages = async () => {
    const res = await fetch('/api/messages');
    const data = await res.json();
    setMessages(data);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError(data.message);
    }
  };

  const updateOrderStatus = async (id: number, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchOrders();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-glossy-gradient flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-glass-100 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Klätterträdet Admin</h1>
            <p className="text-white/60">Logga in för att hantera din verksamhet</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Användarnamn</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Lösenord</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                placeholder="••••••••"
              />
            </div>
            
            {loginError && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {loginError}
              </div>
            )}
            
            <button 
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-orange-600/20"
            >
              Logga in
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-glossy-gradient-dark flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col">
        <div className="p-8">
          <h2 className="text-xl font-display font-bold tracking-tight">Klätterträdet</h2>
          <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1 font-semibold">Admin Panel</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
              activeTab === 'dashboard' ? "bg-orange-600/20 text-orange-500 border border-orange-500/20" : "text-white/60 hover:bg-white/5"
            )}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Översikt</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
              activeTab === 'orders' ? "bg-orange-600/20 text-orange-500 border border-orange-500/20" : "text-white/60 hover:bg-white/5"
            )}
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Beställningar</span>
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
              activeTab === 'bookings' ? "bg-orange-600/20 text-orange-500 border border-orange-500/20" : "text-white/60 hover:bg-white/5"
            )}
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Bokningar</span>
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
              activeTab === 'messages' ? "bg-orange-600/20 text-orange-500 border border-orange-500/20" : "text-white/60 hover:bg-white/5"
            )}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Meddelanden</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logga ut</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">
              {activeTab === 'dashboard' && 'Välkommen tillbaka'}
              {activeTab === 'orders' && 'Bokbeställningar'}
              {activeTab === 'bookings' && 'Terapibokningar'}
              {activeTab === 'messages' && 'Meddelanden'}
            </h1>
            <p className="text-white/40">
              {new Date().toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-glass-100 border border-white/10 rounded-full px-4 py-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center font-bold">A</div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Unika Besökare (Idag)" value={stats?.summary.todayUniques || 0} icon={Users} trend="+12%" />
                <StatCard title="Sidvisningar (Idag)" value={stats?.summary.todayViews || 0} icon={TrendingUp} trend="+8%" />
                <StatCard title="Nya Beställningar" value={stats?.summary.orders || 0} icon={BookOpen} />
                <StatCard title="Nya Bokningar" value={stats?.summary.bookings || 0} icon={Calendar} />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-glass-100 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                  <h3 className="text-lg font-display font-bold mb-6">Besöksstatistik (Senaste 7 dagarna)</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats?.chartData || []}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          stroke="rgba(255,255,255,0.3)" 
                          fontSize={12} 
                          tickFormatter={(val) => val.split('-').slice(1).join('/')}
                        />
                        <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="page_views" name="Sidvisningar" stroke="#ea580c" fillOpacity={1} fill="url(#colorViews)" />
                        <Area type="monotone" dataKey="uniques" name="Unika" stroke="#f97316" fillOpacity={0} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-glass-100 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                  <h3 className="text-lg font-display font-bold mb-6">Senaste Meddelanden</h3>
                  <div className="space-y-4">
                    {messages.slice(0, 3).map((msg) => (
                      <div key={msg.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-sm">{msg.sender_name}</h4>
                          <span className="text-[10px] text-white/40">{new Date(msg.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-white/60 line-clamp-2">{msg.message}</p>
                      </div>
                    ))}
                    <button 
                      onClick={() => setActiveTab('messages')}
                      className="w-full py-3 text-sm text-orange-500 font-medium hover:bg-orange-500/5 rounded-xl transition-all"
                    >
                      Visa alla meddelanden
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div 
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-glass-100 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">Kund</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">Bok</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">Datum</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">Status</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40 text-right">Åtgärd</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold">{order.customer_name}</span>
                            <span className="text-xs text-white/40">{order.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{order.book_title}</td>
                        <td className="px-6 py-4 text-sm text-white/60">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            order.status === 'Skickad' ? "bg-emerald-500/20 text-emerald-400" :
                            order.status === 'Behandlas' ? "bg-blue-500/20 text-blue-400" :
                            "bg-orange-500/20 text-orange-400"
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <select 
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                          >
                            <option value="Mottagen">Mottagen</option>
                            <option value="Behandlas">Behandlas</option>
                            <option value="Skickad">Skickad</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div 
              key="bookings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input 
                    type="text" 
                    placeholder="Sök på namn eller e-post..."
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && fetchBookings()}
                    className="w-full bg-glass-100 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                </div>
                <div className="flex gap-4">
                  <select 
                    value={bookingStatus}
                    onChange={(e) => setBookingStatus(e.target.value)}
                    className="bg-glass-100 border border-white/10 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  >
                    <option value="">Alla statusar</option>
                    <option value="Bekräftad">Bekräftad</option>
                    <option value="Väntar">Väntar</option>
                    <option value="Avbokad">Avbokad</option>
                  </select>
                  <button 
                    onClick={fetchBookings}
                    className="bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-2xl font-bold text-sm transition-all"
                  >
                    Filtrera
                  </button>
                </div>
              </div>

              {/* Bookings List */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-glass-100 border border-white/10 rounded-3xl p-6 backdrop-blur-md hover:border-white/20 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-orange-600/10 transition-all">
                        <User className="w-6 h-6 text-orange-500" />
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        booking.status === 'Bekräftad' ? "bg-emerald-500/20 text-emerald-400" :
                        booking.status === 'Väntar' ? "bg-orange-500/20 text-orange-400" :
                        "bg-red-500/20 text-red-400"
                      )}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-display font-bold mb-1">{booking.client_name}</h3>
                    <p className="text-sm text-white/40 mb-6 flex items-center gap-2">
                      <Mail className="w-3 h-3" /> {booking.email}
                    </p>
                    
                    <div className="space-y-3 pt-6 border-t border-white/5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/40">Tjänst</span>
                        <span className="font-medium">{booking.service_type}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/40">Datum</span>
                        <span className="font-medium">{booking.booking_date}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/40">Tid</span>
                        <span className="font-medium">{booking.booking_time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div 
              key="messages"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-glass-100 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col md:flex-row gap-6">
                    <div className="md:w-64 shrink-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-orange-500">
                          {msg.sender_name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{msg.sender_name}</h4>
                          <p className="text-[10px] text-white/40">{msg.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-white/40 mt-4">
                        <Clock className="w-3 h-3" />
                        {new Date(msg.created_at).toLocaleString('sv-SE')}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-display font-bold mb-2">{msg.subject}</h3>
                      <p className="text-sm text-white/70 leading-relaxed">{msg.message}</p>
                    </div>
                    
                    <div className="md:w-32 shrink-0 flex md:flex-col justify-end gap-2">
                      <button className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 py-2 rounded-xl text-xs font-bold transition-all">Svara</button>
                      <button className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 py-2 rounded-xl text-xs font-bold transition-all">Arkivera</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
