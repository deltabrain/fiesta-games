import { useThemeColor } from '@hooks/useThemeColor'
import { Corner } from '@types'
import { ThemedText } from '@themed/ThemedText'
import { useEffect, useState } from 'react'
import { Pressable, PressableProps, StyleSheet } from 'react-native'
import { setFieldActive } from '@lib/db'

export type BingoBoardItemProps = PressableProps & {
	text: string
	initActive: boolean
	corner: Corner | null
	id: string
	field: number
}

export function BingoBoardItem({ text, initActive, corner, id, field, ...rest }: BingoBoardItemProps) {
	const [active, setActive] = useState(initActive)
	const primaryColor = useThemeColor('secondary_dark')
	const accentColor = useThemeColor('primary_dark')
	const neutralColor = useThemeColor('neutral')
	const textButtonColor = useThemeColor('text_button')
	var cornerStyle

	useEffect(() => {
		setActive(initActive)
	}, [initActive])

	function toggle() {
		setActive(!active)
		setFieldActive(id, field, active)
	}

	switch (corner) {
		case null:
			cornerStyle = {}
			break
		case Corner.TopLeft:
			cornerStyle = { borderTopLeftRadius: 8 }
			break
		case Corner.TopRight:
			cornerStyle = { borderTopRightRadius: 8 }
			break
		case Corner.BottomLeft:
			cornerStyle = { borderBottomLeftRadius: 8 }
			break
		case Corner.BottomRight:
			cornerStyle = { borderBottomRightRadius: 8 }
			break
	}

	return (
		<Pressable
			style={[
				{ borderColor: accentColor },
				styles.bingoItem,
				active ? { backgroundColor: primaryColor } : { backgroundColor: neutralColor },
				cornerStyle,
			]}
			onPress={() => toggle()}
			{...rest}
		>
			<ThemedText style={[styles.bingoText, { color: textButtonColor }]}>{text}</ThemedText>
		</Pressable>
	)
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
})
