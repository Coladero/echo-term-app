import { supabase } from './client';
import { v4 as uuidv4 } from 'uuid';

export async function uploadAudioFile(file: File, userId: string, uniqueId?: string) {
  if (!file || !userId) throw new Error('Missing file or userId.');

  const fileExt = file.name.split('.').pop()?.toLowerCase();
  const allowedExts = ['mp3', 'wav', 'm4a', 'ogg', 'webm'];
  if (!fileExt || !allowedExts.includes(fileExt)) {
    throw new Error('Unsupported file type.');
  }

  const fileName = `${uniqueId ?? uuidv4()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('notes-audio')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  const { data: publicData } = supabase.storage
    .from('notes-audio')
    .getPublicUrl(filePath);

  if (!publicData?.publicUrl) {
    throw new Error('Failed to get public URL.');
  }

  return publicData.publicUrl;
}
