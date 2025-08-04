// components/Recorder.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function Recorder({
  onSave,
}: {
  onSave: (audioBlob: Blob) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!recording) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    timerRef.current = interval;

    return () => clearInterval(interval);
  }, [recording]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    setRecordedChunks([]);

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setRecordedChunks((prev) => [...prev, e.data]);
      }
    };

    recorder.start();
    setRecording(true);
    setTimer(0);
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const saveRecording = () => {
    const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
    onSave(audioBlob);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 border-2 border-green-400 rounded-xl text-green-300">
      <div className="text-sm">Recording time: {formatTime(timer)}</div>

      {!recording ? (
        <button
          onClick={startRecording}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
        >
          🎤 Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          ⏹️ Stop Recording
        </button>
      )}

      {!recording && recordedChunks.length > 0 && (
        <button
          onClick={saveRecording}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          💾 Save Note
        </button>
      )}
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}
