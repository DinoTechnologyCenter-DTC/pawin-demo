import { supabase } from './supabase';

export const logEvent = async (email: string, action: string, status: 'success' | 'failure' | 'info' = 'success') => {
  try {
    const { error } = await supabase.from('audit_logs').insert([
      { 
        user_email: email, 
        action: action, 
        status: status 
      }
    ]);
    if (error) console.error("Audit log failed:", error);
  } catch (err) {
    console.error("Audit error:", err);
  }
};
