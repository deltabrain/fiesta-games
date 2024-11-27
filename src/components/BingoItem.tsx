import { Pressable, PressableProps, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/themed/ThemedText';
import { getField, getFieldActive, toggleActive } from '@/lib/db';

export type BingoItemProps = PressableProps & {
	fieldNumber: number;
	editMode: boolean;
	corner?: 'TopLeft' | 'TopRight' | 'BottomLeft' | 'BottomRight';
};

export function BingoItem({
	fieldNumber,
	editMode,
	corner,
	...rest
}: BingoItemProps) {
	const [active, setActive] = useState(false);
	const [value, setValue] = useState('');
	const primaryColor = useThemeColor('secondary_dark');
	const accentColor = useThemeColor('primary_dark');
	const neutralColor = useThemeColor('neutral');
	const textButtonColor = useThemeColor('text_button');
	const fadedTextColor = useThemeColor('text_faded');
	var cornerStyle;

	getField(fieldNumber).then((data) => {
		setValue(data);
	});

	getFieldActive(fieldNumber).then((data) => {
		setActive(data);
	});

	async function toggle() {
		setActive(!active);
		console.log(active);

		await toggleActive(fieldNumber, active);
	}

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

	// TODO: split editMode and bingoMode into two seperate components
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
			onPress={() => {
				toggle();
			}}
			{...rest}
		>
			<ThemedText
				style={[
					styles.bingoText,
					{ color: textButtonColor },
					editMode ? styles.hidden : {},
				]}
			>
				{value}
			</ThemedText>
			<TextInput
				placeholder='Enter...'
				placeholderTextColor={useThemeColor('placeholderText')}
				value={value}
				onChangeText={(newText) => setValue(newText)}
				style={[
					styles.bingoInput,
					editMode ? {} : styles.hidden,
					{ color: fadedTextColor },
				]}
			/>
		</Pressable>
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
	bingoText: {
		textAlign: 'center',
		textAlignVertical: 'center',
		flexWrap: 'wrap',
	},
	bingoInput: {
		textAlignVertical: 'center',
		textAlign: 'center',
		flexWrap: 'wrap',
		alignSelf: 'center',
	},
	active: {
		backgroundColor: '#0a7ea4',
	},
	hidden: {
		display: 'none',
	},
});
