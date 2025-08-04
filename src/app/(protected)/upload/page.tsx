'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { uploadAudioFile } from '@/lib/supabase/uploadAudio';
import { v4 as uuidv4 } from 'uuid';
import Recorder from '@/components/Recorder';
import { useSession } from '@supabase/auth-helpers-react';

export default function UploadNotePage() {
  const session = useSession();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  // Recibe audio grabado desde Recorder y lo guarda en file para enviar
  const handleSave = (audioBlob: Blob) => {
    const audioFile = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
    setFile(audioFile);
    setStatus('Audio recorded and ready to upload.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');

    if (!file || !title) {
      setStatus('Please provide a title and select or record an audio file.');
      return;
    }

    if (!session?.user?.id) {
      setStatus('You must be logged in.');
      return;
    }

    try {
      const uniqueId = uuidv4();
      const audioUrl = await uploadAudioFile(file, session.user.id, uniqueId);

      if (!audioUrl) {
        setStatus('Failed to upload audio.');
        return;
      }

      const { error } = await supabase.from('notes').insert({
        id: uniqueId,
        title,
        audio_url: audioUrl,
        user_id: session.user.id,
      });

      if (error) {
        console.error(error);
        setStatus('Error saving note.');
        return;
      }

      setStatus('Note uploaded successfully!');
      setTitle('');
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus('Unexpected error occurred.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-zinc-900 text-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Upload New Audio Note</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
        />

        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setStatus('Audio file selected and ready to upload.');
          }}
          className="w-full text-white"
        />

        <Recorder onSave={handleSave} />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
        >
          Upload
        </button>

        <p className="text-sm text-zinc-400">{status}</p>
      </form>
    </div>
  );
}
