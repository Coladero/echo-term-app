'use client';

import { useEffect, useState } from 'react';
import {
  getSession,
  getUserProfile,
  updateUserEmail,
  updateUserPassword,
} from '@/lib/auth';

export default function ProfilePage() {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    created_at: string;
  } | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const session = await getSession();
        if (!session?.user?.id) {
          throw new Error('No session found');
        }

        const profile = await getUserProfile(session.user.id);
        setUser(session.user.id ? { ...profile, id: session.user.id } : null);
      } catch (err: any) {
        console.error('Error fetching user profile:', err.message);
        setMessage('❌ Error fetching user profile');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  async function handleEmailUpdate() {
    try {
      if (!newEmail) return setMessage('❌ Please enter a new email');
      setMessage('');
      await updateUserEmail(newEmail);
      setMessage('✅ Email updated successfully');
      setNewEmail('');
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  }

  async function handlePasswordUpdate() {
    try {
      if (!newPassword || newPassword.length < 6) {
        return setMessage('❌ Password must be at least 6 characters');
      }

      setMessage('');
      await updateUserPassword(newPassword);
      setMessage('✅ Password updated successfully');
      setNewPassword('');
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  }

  if (loading) return <p className="text-green-500 p-4">Loading...</p>;
  if (!user) return <p className="text-red-500 p-4">No user logged in.</p>;

  return (
    <div className="max-w-xl mx-auto p-4 text-green-500 font-mono">
      <h1 className="text-xl mb-4">👤 User Profile</h1>

      <div className="mb-4">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Created at:</strong> {new Date(user.created_at).toLocaleString()}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg mb-2">✉️ Update Email</h2>
        <input
          type="email"
          placeholder="New email"
          className="w-full p-2 bg-black border border-green-500 mb-2"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button
          onClick={handleEmailUpdate}
          className="bg-green-700 hover:bg-green-600 text-white px-4 py-2"
        >
          Update Email
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg mb-2">🔒 Update Password</h2>
        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 bg-black border border-green-500 mb-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={handlePasswordUpdate}
          className="bg-green-700 hover:bg-green-600 text-white px-4 py-2"
        >
          Update Password
        </button>
      </div>

      {message && (
        <div className="mt-4 text-sm text-yellow-300">
          {message}
        </div>
      )}
    </div>
  );
}
