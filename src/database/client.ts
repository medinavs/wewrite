import { createClient } from "@supabase/supabase-js";

export const client = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
  {
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);
