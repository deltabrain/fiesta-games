import { Pressable, PressableProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState } from 'react';

export type BingoItemProps = PressableProps & {
	editMode: boolean;
};

export function BingoItem({ editMode, ...rest }: BingoItemProps) {
	const [active, setActive] = useState(false);
	return (
		<Pressable
			disabled={editMode}
			style={[styles.bingoItem, active ? styles.active : {}]}
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
		borderColor: '#0a7ea4',
		minHeight: '14%',
		justifyContent: 'center',
	},
	active: {
		backgroundColor: '#0a7ea4',
	},
});
