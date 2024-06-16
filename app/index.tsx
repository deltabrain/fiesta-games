import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Ionicons name="heart" size={24} color="black" />
		</View>
	);
}
