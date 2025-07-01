import Pocketbase from 'pocketbase'

const pocketbaseUrl = process.env.EXPO_PUBLIC_POCKETBASE_URL

export const pb = new Pocketbase(pocketbaseUrl)
