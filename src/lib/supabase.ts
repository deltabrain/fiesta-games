import type { Database } from '@lib/supabase.types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

// TODO: add pb credentials to eas env
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supbaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl!, supbaseAnonKey!, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})
