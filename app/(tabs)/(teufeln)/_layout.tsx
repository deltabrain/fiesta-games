import { Stack } from 'expo-router';

export default function TeufelnLayout() {
	return <Stack screenOptions={{ headerShown: false, statusBarTranslucent: true, statusBarColor: 'transparent' }} />;
}
