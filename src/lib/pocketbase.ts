import Pocketbase, { AsyncAuthStore } from 'pocketbase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EventSource from 'react-native-sse'
;(global as any).EventSource = EventSource

const store = new AsyncAuthStore({
	save: async (serialized) => AsyncStorage.setItem('pb_auth', serialized),
	initial: AsyncStorage.getItem('pb_auth'),
	clear: async () => AsyncStorage.removeItem('pb_auth'),
})

const pocketbaseUrl = process.env.EXPO_PUBLIC_POCKETBASE_URL

export const pb = new Pocketbase(pocketbaseUrl, store)
