import { supabase } from './supabase/client'
import { Note } from '../types/supabase'

export async function getUserNotes(): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Note[]
}

export async function addNote(title: string, audioUrl: string) {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase.from('notes').insert([
    {
      user_id: user.id,
      title,
      audio_url: audioUrl,
    },
  ])

  if (error) throw error
  return data
}
