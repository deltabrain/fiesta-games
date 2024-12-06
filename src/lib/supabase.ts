import type { Database } from '@lib/supabase.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// TODO: obfuscate these values
const supabaseUrl = 'https://qfpdgpcfbwaflfvzdtgz.supabase.co';
const supbaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmcGRncGNmYndhZmxmdnpkdGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNjQ1MDgsImV4cCI6MjA0Nzg0MDUwOH0.inma8XP7zmNbqaZkc8jNT1x-ssUxTWDuvIh1cfJzpUg';

export const supabase = createClient<Database>(supabaseUrl, supbaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
