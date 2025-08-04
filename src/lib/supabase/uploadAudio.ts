// src/lib/supabase/uploadAudio.ts

import { supabase } from './client';

export async function uploadAudioFile(file: File, userId: string) {
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('notes-audio')
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicUrl } = supabase.storage
    .from('notes-audio')
    .getPublicUrl(filePath);

  return publicUrl?.publicUrl ?? null;
}
