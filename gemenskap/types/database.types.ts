export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string | null
                    full_name: string | null
                    role: string | null
                    membership_level: number | null
                    membership_active: boolean | null
                    phone: string | null
                    application_reason: string | null
                    timezone: string | null
                    last_localization: string | null
                    created_at: string
                    updated_at: string | null
                }
                Insert: {
                    id: string
                    email?: string | null
                    full_name?: string | null
                    role?: string | null
                    membership_level?: number | null
                    membership_active?: boolean | null
                    phone?: string | null
                    application_reason?: string | null
                    timezone?: string | null
                    last_localization?: string | null
                    created_at?: string
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    email?: string | null
                    full_name?: string | null
                    role?: string | null
                    membership_level?: number | null
                    membership_active?: boolean | null
                    phone?: string | null
                    application_reason?: string | null
                    timezone?: string | null
                    last_localization?: string | null
                    created_at?: string
                    updated_at?: string | null
                }
            }
            bookings: {
                Row: {
                    id: string
                    client_name: string
                    email: string
                    service_type: string
                    booking_date: string
                    booking_time: string
                    status: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    client_name: string
                    email: string
                    service_type: string
                    booking_date: string
                    booking_time: string
                    status?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    client_name?: string
                    email?: string
                    service_type?: string
                    booking_date?: string
                    booking_time?: string
                    status?: string | null
                    created_at?: string
                }
            }
            contact_messages: {
                Row: {
                    id: string
                    sender_name: string
                    email: string
                    subject: string | null
                    message: string
                    is_read: boolean | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    sender_name: string
                    email: string
                    subject?: string | null
                    message: string
                    is_read?: boolean | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    sender_name?: string
                    email?: string
                    subject?: string | null
                    message?: string
                    is_read?: boolean | null
                    created_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    customer_name: string
                    email: string
                    book_title: string
                    status: string | null
                    address: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    customer_name: string
                    email: string
                    book_title: string
                    status?: string | null
                    address?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    customer_name?: string
                    email?: string
                    book_title?: string
                    status?: string | null
                    address?: string | null
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
