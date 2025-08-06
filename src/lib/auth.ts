// src/lib/auth.ts

'use server';

import { supabase } from './supabase/client';
import { createClient } from './supabase/server';

// Signup
export async function signUpWithEmail(email: string, password: string) {
  const supabase = createClient();

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError || !authData.user) {
    return { user: null, error: signUpError };
  }

  // Check if user email is defined
  if (!authData.user.email) {
    return { user: null, error: new Error('User email is undefined') };
  }

  // Insert user into 'users' table
  const { data: userInsert, error: insertError } = await supabase
    .from('users')
    .insert([
      {
        id: authData.user.id,
        email: authData.user.email,
      },
    ]);

  if (insertError) {
    return { user: null, error: insertError };
  }

  return { user: authData.user, error: null };
}

// Signin
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// OAuth login (Google, GitHub, etc.)
export async function signInWithOAuth(provider: 'google' | 'github') {
  const { error } = await supabase.auth.signInWithOAuth({ provider });
  if (error) throw error;
}

// Signout
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get session
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

// Get user profile
export async function getUserProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw userError || new Error('User not found');

  const { data, error: profileError } = await supabase
    .from('users')
    .select('email, created_at')
    .eq('id', user.id)
    .single();

  if (profileError) throw profileError;
  return data;
}

// Update email
export async function updateUserEmail(newEmail: string) {
  const { data, error } = await supabase.auth.updateUser({ email: newEmail });
  if (error) throw error;
  return data;
}

// Update password
export async function updateUserPassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
  return data;
}
// Get user metadata
export async function getUserMetadata() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    return { user: null, error };
  }
  return { user, error: null };
}