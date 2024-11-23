import { Pressable, PressableProps, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { act, useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import { supabase } from '../lib/supabase';
import { getUserId } from '../lib/auth';
import { ThemedText } from './themed/ThemedText';
import { getFields } from '../lib/db.old';
import { getField } from '../lib/db';

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

	var res: string;
	getField(fieldNumber).then((data) => {
		res = data;
		setValue(res);
	});

	async function toggleActive() {
		console.log('function called');
		setActive(!active);
		const id = await getUserId();
		const { data, error } = await supabase
			.from('boards')
			.select('fields_active')
			.eq('user_id', id);
		if (error) throw error;
		const fieldsActive = data[0].fields_active;
		console.log('fieldsActive before: ', fieldsActive);
		fieldsActive[fieldNumber] = active;
		console.log('fieldsActive after: ', fieldsActive);
		await supabase.from('boards').update({ fields_active: fieldsActive });
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
				toggleActive();
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
				defaultValue={value}
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
