import { ButtonIcon } from '@components/ButtonIcon'
import { useThemeColor } from '@hooks/useThemeColor'
import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'

export type IconButtonProps = TouchableOpacityProps & {
	icon: ComponentProps<typeof Ionicons>['name']
	style?: any
	type?: 'default' | 'round'
}

export function IconButton({ icon, style, type = 'default', ...rest }: IconButtonProps) {
	const primaryColor = useThemeColor('secondary')
	const accentColor = useThemeColor('secondary_light')
	const textColor = useThemeColor('text_button')

	var usedStyle = type === 'round' ? styles.round : styles.default

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			style={[
				usedStyle,
				{
					backgroundColor: primaryColor,
					borderColor: accentColor,
					shadowColor: accentColor,
				},
				style,
			]}
			{...rest}
		>
			<ButtonIcon color={textColor} style={type === 'round' ? styles.roundIcon : {}} name={icon} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	default: {
		borderWidth: 2,
		borderRadius: 8,
		borderStyle: 'solid',
		padding: 0,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	round: {
		width: 64,
		height: 64,
		borderWidth: 2,
		borderRadius: 32,
		borderStyle: 'solid',
		padding: 0,
		justifyContent: 'center',
		textAlign: 'center',
		textAlignVertical: 'center',
		elevation: 10,
	},
	roundIcon: {
		borderWidth: 0,
	},
})
