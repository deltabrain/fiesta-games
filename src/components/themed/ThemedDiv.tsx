import { View, type ViewProps } from 'react-native'

import { useThemeColor } from '@hooks/useThemeColor'

export type ThemedDivProps = ViewProps & {}

export function ThemedDiv({ style, ...rest }: ThemedDivProps) {
	const backgroundColor = useThemeColor('accent_dark')
	const borderColor = useThemeColor('primary_dark')

	return (
		<View
			style={[
				{
					backgroundColor,
					borderColor,
					borderRadius: '4%',
					borderWidth: 2,
					borderStyle: 'solid',
				},
				style,
			]}
			{...rest}
		/>
	)
}
