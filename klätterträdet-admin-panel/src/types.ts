export interface Order {
  id: string;
  customer_name: string;
  email: string;
  book_title: string;
  status: string;
  address: string;
  created_at: string;
}

export interface Booking {
  id: string;
  client_name: string;
  email: string;
  service_type: string;
  booking_date: string;
  booking_time: string;
  status: string;
  created_at: string;
}

export interface Message {
  id: string;
  sender_name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Stats {
  summary: {
    orders: number;
    bookings: number;
    unreadMessages: number;
    todayUniques: number;
    todayViews: number;
  };
  chartData: {
    date: string;
    uniques: number;
    page_views: number;
  }[];
}
