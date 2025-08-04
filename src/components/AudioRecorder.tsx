'use client';

import { useEffect, useRef, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';

const AudioRecorder = () => {
  const supabase = createClientComponentClient();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setAudioChunks([]);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks((prev) => [...prev, e.data]);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const filename = `audio-${uuidv4()}.webm`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('audio')
          .upload(filename, audioBlob);

        if (uploadError) {
          setStatus('Upload failed');
          console.error(uploadError);
          return;
        }

        const { data: urlData } = supabase.storage
          .from('audio')
          .getPublicUrl(filename);

        setAudioUrl(urlData?.publicUrl || null);

        // Obtener sesión
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          setStatus('You must be logged in.');
          return;
        }

        // Guardar metadata
        const { error: insertError } = await supabase.from('notes').insert({
          title: 'New audio note',
          audio_url: urlData?.publicUrl,
          user_id: session.user.id,
        });

        if (insertError) {
          setStatus('Error saving note metadata');
          console.error(insertError);
          return;
        }

        setStatus('Recording saved successfully!');
      };

      mediaRecorder.start();
      setIsRecording(true);
      setStatus('Recording...');
    } catch (err) {
      console.error(err);
      setStatus('Microphone access denied or error.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setStatus('Processing...');
  };

  return (
    <div className="bg-terminal text-green-400 p-4 rounded-2xl border border-green-500 shadow-lg space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">🎤 Audio Recorder</h2>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded-xl font-mono transition ${
          isRecording ? 'bg-red-500' : 'bg-green-600'
        } text-white`}
      >
        {isRecording ? 'Stop' : 'Start Recording'}
      </button>

      {status && <p className="text-sm text-green-300">{status}</p>}

      {audioUrl && (
        <audio controls src={audioUrl} className="w-full mt-2" />
      )}
    </div>
  );
};

export default AudioRecorder;
