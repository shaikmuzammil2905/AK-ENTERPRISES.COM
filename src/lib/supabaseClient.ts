import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rvjvavoigkusxtcnqaml.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2anZhdm9pZ2t1c3h0Y25xYW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxMTU2MTAsImV4cCI6MjEwNDY5MTYxMH0.jDGacGkGeJ0vBs7OX1_4mXASQCQu9fGl7dVOVc84Kw8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
