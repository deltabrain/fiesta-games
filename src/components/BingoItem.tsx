import { Pressable, PressableProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

export type BingoItemProps = PressableProps & {
	editMode: boolean;
	corner?: 'TopLeft' | 'TopRight' | 'BottomLeft' | 'BottomRight';
};

export function BingoItem({ editMode, corner, ...rest }: BingoItemProps) {
	const [active, setActive] = useState(false);
	const primaryColor = useThemeColor('secondary_dark');
	const accentColor = useThemeColor('primary_dark');
	const neutralColor = useThemeColor('neutral');

	var cornerStyle;

	switch (corner) {
		case 'TopLeft':
			cornerStyle = { borderTopLeftRadius: 8 };
			break;
		case 'TopRight':
			cornerStyle = { borderTopRightRadius: 8 };
			break;
		case 'BottomLeft':
			cornerStyle = { borderBottomLeftRadius: 8 };
			break;
		case 'BottomRight':
			cornerStyle = { borderBottomRightRadius: 8 };
			break;
	}

	return (
		<Pressable
			disabled={editMode}
			style={[
				{ borderColor: accentColor },
				styles.bingoItem,
				active
					? { backgroundColor: primaryColor }
					: { backgroundColor: neutralColor },
				corner ? cornerStyle : {},
			]}
			onPress={() => setActive(!active)}
			{...rest}
		></Pressable>
	);
}

const styles = StyleSheet.create({
	bingoItem: {
		flex: 1,
		flexDirection: 'column',
		borderWidth: 1,
		minHeight: '14%',
		justifyContent: 'center',
	},
	active: {
		backgroundColor: '#0a7ea4',
	},
});
