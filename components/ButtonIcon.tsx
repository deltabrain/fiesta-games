import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export type ButtonIconProps = {
	style?: any;
	//TODO: use IconProps maybe for better typing
	name: any;
};

export function ButtonIcon({ style, name, ...rest }: ButtonIconProps) {
	return <Ionicons style={styles.default} name={name} size={24} color='red' {...rest} />;
}

const styles = StyleSheet.create({
	default: {
		borderRadius: 8,
		borderWidth: 1,
		borderStyle: 'solid',
		padding: 10,
	},
});
