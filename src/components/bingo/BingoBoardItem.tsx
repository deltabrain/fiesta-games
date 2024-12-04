import { Loading } from '@/components/Loading';
import { useThemeColor } from '@/hooks/useThemeColor';
import { getField, getFieldActive, toggleActive } from '@/lib/db';
import { Corner } from '@/lib/types';
import { ThemedText } from '@/themed/ThemedText';
import { useEffect, useState } from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';

export type BingoBoardItemProps = PressableProps & {
	fieldNumber: number;
	bingoId: string;
	corner: Corner | null;
	reloadToggle: boolean;
};

export function BingoBoardItem({
	fieldNumber,
	bingoId,
	corner,
	reloadToggle,
	...rest
}: BingoBoardItemProps) {
	const [active, setActive] = useState<boolean>();
	const [value, setValue] = useState('');
	const [loading, setLoading] = useState(true);
	const primaryColor = useThemeColor('secondary_dark');
	const accentColor = useThemeColor('primary_dark');
	const neutralColor = useThemeColor('neutral');
	const textButtonColor = useThemeColor('text_button');
	var cornerStyle;

	useEffect(() => {
		setLoading(true);
		getField(bingoId, fieldNumber).then((data) => {
			setValue(data);
		});

		getFieldActive(bingoId, fieldNumber).then((data) => {
			setActive(data);
		});

		setLoading(false);
	}, [reloadToggle, bingoId, fieldNumber]);

	async function toggle() {
		if (loading) {
			return;
		}
		setActive(!active);

		await toggleActive(bingoId, fieldNumber);
	}

	switch (corner) {
		case null:
			cornerStyle = {};
			break;
		case Corner.TopLeft:
			cornerStyle = { borderTopLeftRadius: 8 };
			break;
		case Corner.TopRight:
			cornerStyle = { borderTopRightRadius: 8 };
			break;
		case Corner.BottomLeft:
			cornerStyle = { borderBottomLeftRadius: 8 };
			break;
		case Corner.BottomRight:
			cornerStyle = { borderBottomRightRadius: 8 };
			break;
	}

	return (
		<Pressable
			style={[
				{ borderColor: accentColor },
				styles.bingoItem,
				active
					? { backgroundColor: primaryColor }
					: { backgroundColor: neutralColor },
				cornerStyle,
			]}
			onPress={() => {
				toggle();
			}}
			{...rest}
		>
			{loading ? (
				<Loading />
			) : (
				<ThemedText style={[styles.bingoText, { color: textButtonColor }]}>
					{value}
				</ThemedText>
			)}
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
});
