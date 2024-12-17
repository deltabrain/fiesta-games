import { useThemeColor } from '@hooks/useThemeColor';
import { Profile } from '@types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from './Avatar';

export function FriendListItem(profile: Profile) {
	const textColor = useThemeColor('text_button');
	const bgColor = useThemeColor('secondary_dark');
	const borderColor = useThemeColor('secondary');

	return (
		<TouchableOpacity
			style={[
				styles.row,
				{
					backgroundColor: bgColor,
					borderColor: borderColor,
					shadowColor: bgColor,
					elevation: 10,
				},
			]}
			activeOpacity={0.8}
		>
			<Avatar imageSrc={profile.avatar_url} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	row: {
		borderStyle: 'solid',
		borderWidth: 2,
		height: 100,
		width: '90%',
		borderRadius: 10,
		marginVertical: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		fontSize: 18,
		textAlign: 'left',
		textAlignVertical: 'center',
		flexWrap: 'wrap',
		paddingLeft: '5%',
	},
	button: {
		height: 48,
		width: 48,
		fontSize: 18,
		marginRight: '5%',
	},
});
