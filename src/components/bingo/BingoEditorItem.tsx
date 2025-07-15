import { useThemeColor } from '@hooks/useThemeColor'
import { ThemedView, ThemedViewProps } from '@themed/ThemedView'
import { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

export type BingoEditorItemProps = ThemedViewProps & {
	initialValue: string
	updateValue: Function
	fieldNumber: number
}

export function BingoEditorItem({ initialValue, updateValue, fieldNumber, ...rest }: BingoEditorItemProps) {
	const [value, setValue] = useState(initialValue)
	const backgroundColor = useThemeColor('background_dark')
	const placeholderTextColor = useThemeColor('text_placeholder')
	const accentColor = useThemeColor('primary_dark')
	const textColor = useThemeColor('text')

	return (
		<ThemedView style={[{ backgroundColor: backgroundColor, borderColor: accentColor }, styles.row]} {...rest}>
			<TextInput
				multiline={true}
				spellCheck={false}
				autoCorrect={false}
				placeholder='Enter...'
				placeholderTextColor={placeholderTextColor}
				value={value}
				onChangeText={(newText) => {
					setValue(newText)
					updateValue(fieldNumber, newText)
				}}
				style={[styles.bingoInput, { color: textColor }]}
			/>
		</ThemedView>
	)
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
	bingoInput: {
		width: '100%',
		height: '100%',
		fontSize: 18,
		textAlign: 'center',
		textAlignVertical: 'center',
		flexWrap: 'wrap',
		paddingHorizontal: '5%',
	},
})
