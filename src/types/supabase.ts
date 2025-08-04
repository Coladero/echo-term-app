export type Note = {
  id: string
  user_id: string
  title: string
  audio_url: string
  created_at: string
}
// src/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          id: string;
          title: string;
          content: string;
          created_at: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          created_at?: string;
          user_id: string;
        };
        Update: {
          title?: string;
          content?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'notes_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
