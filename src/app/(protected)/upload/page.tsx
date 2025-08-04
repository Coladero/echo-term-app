'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { uploadAudioFile } from '@/lib/supabase/uploadAudio';

export default function UploadNotePage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');

    if (!file || !title) {
      setStatus('Please provide a title and select an audio file.');
      return;
    }

    // Create a Supabase client instance
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setStatus('You must be logged in.');
      return;
    }

    try {
        // Upload the audio file to Supabase storage and get the public URL
      const audioUrl = await uploadAudioFile(file, session.user.id);

      if (!audioUrl) {
        setStatus('Failed to upload audio.');
        return;
      }
        // Insert the note into the database
      const { error } = await supabase.from('notes').insert({
        title,
        audio_url: audioUrl,
        user_id: session.user.id,
      });

      if (error) {
        console.error(error);
        setStatus('Error saving note.');
        return;
      }
        // Successfully uploaded and saved the note
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
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full text-white"
        />
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
