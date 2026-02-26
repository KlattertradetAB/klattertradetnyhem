export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[]

export type Database = {
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
                    avatar_url: string | null
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
                    avatar_url?: string | null
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
                    avatar_url?: string | null
                    timezone?: string | null
                    last_localization?: string | null
                    created_at?: string
                    updated_at?: string | null
                }
                Relationships: []
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
                Relationships: []
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
                Relationships: []
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
                Relationships: []
            }
            blogs: {
                Row: {
                    id: string
                    title: string
                    description: string
                    content: string
                    image_url: string | null
                    created_at: string
                    user_id: string
                    author_name: string | null
                    views: number | null
                }
                Insert: {
                    id?: string
                    title: string
                    description: string
                    content: string
                    image_url?: string | null
                    created_at?: string
                    user_id: string
                    author_name?: string | null
                    views?: number | null
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string
                    content?: string
                    image_url?: string | null
                    created_at?: string
                    user_id?: string
                    author_name?: string | null
                    views?: number | null
                }
                Relationships: []
            }
            chat_messages: {
                Row: {
                    id: string
                    user_id: string
                    thread_id: string | null
                    content: string
                    is_ai: boolean | null
                    persona_id: string | null
                    edit_count: number | null
                    is_edited: boolean | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    thread_id?: string | null
                    content: string
                    is_ai?: boolean | null
                    persona_id?: string | null
                    edit_count?: number | null
                    is_edited?: boolean | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    thread_id?: string | null
                    content?: string
                    is_ai?: boolean | null
                    persona_id?: string | null
                    edit_count?: number | null
                    is_edited?: boolean | null
                    created_at?: string
                }
                Relationships: []
            }
            course_applications: {
                Row: {
                    id: string
                    course_type: string
                    applicant_name: string
                    email: string
                    phone: string | null
                    workplace: string | null
                    invoice_address: string | null
                    message: string | null
                    status: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    course_type: string
                    applicant_name: string
                    email: string
                    phone?: string | null
                    workplace?: string | null
                    invoice_address?: string | null
                    message?: string | null
                    status?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    course_type?: string
                    applicant_name?: string
                    email?: string
                    phone?: string | null
                    workplace?: string | null
                    invoice_address?: string | null
                    message?: string | null
                    status?: string | null
                    created_at?: string
                }
                Relationships: []
            }
            login_events: {
                Row: {
                    id: string
                    user_id: string
                    logged_in_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    logged_in_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    logged_in_at?: string
                }
                Relationships: []
            }
            notifications: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    message: string
                    is_read: boolean | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    message: string
                    is_read?: boolean | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    message?: string
                    is_read?: boolean | null
                    created_at?: string
                }
                Relationships: []
            }
            survey_responses: {
                Row: {
                    id: string
                    created_at: string
                    email: string | null
                    answers: Json
                    scores: Json | null
                    metadata: Json | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    email?: string | null
                    answers: Json
                    scores?: Json | null
                    metadata?: Json | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    email?: string | null
                    answers?: Json
                    scores?: Json | null
                    metadata?: Json | null
                }
                Relationships: []
            }
            therapy_matchmaking: {
                Row: {
                    id: string
                    applicant_name: string
                    email: string
                    phone: string | null
                    challenges: string[] | null
                    meeting_form: string | null
                    status: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    applicant_name: string
                    email: string
                    phone?: string | null
                    challenges?: string[] | null
                    meeting_form?: string | null
                    status?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    applicant_name?: string
                    email?: string
                    phone?: string | null
                    challenges?: string[] | null
                    meeting_form?: string | null
                    status?: string | null
                    created_at?: string
                }
                Relationships: []
            }
            threads: {
                Row: {
                    id: string
                    title: string
                    description: string
                    category: string | null
                    created_at: string
                    user_id: string
                    author_name: string | null
                    views: number | null
                    replies_count: number | null
                }
                Insert: {
                    id?: string
                    title: string
                    description: string
                    category?: string | null
                    created_at?: string
                    user_id: string
                    author_name?: string | null
                    views?: number | null
                    replies_count?: number | null
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string
                    category?: string | null
                    created_at?: string
                    user_id?: string
                    author_name?: string | null
                    views?: number | null
                    replies_count?: number | null
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
    }
}
