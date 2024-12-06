import { Loading } from '@components/Loading';
import { BingoEditorItem } from '@components/bingo/BingoEditorItem';
import { useThemeColor } from '@hooks/useThemeColor';
import {
	deleteBoard,
	getBingoTitle,
	getFields,
	setBingoTitle,
	setFields,
} from '@lib/db';
import { IconButton } from '@themed/IconButton';
import { ThemedView } from '@themed/ThemedView';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';

export default function Editor() {
	const { id } = useLocalSearchParams();

	const [loading, setLoading] = useState(true);
	const [title, setTitle] = useState('');
	const [initialFields, setInitialFields] = useState<string[]>();
	const [fieldArray, setFieldArray] = useState<string[]>();

	const bgColor = useThemeColor('background');
	const placeholderTextColor = useThemeColor('placeholderText');
	const textColor = useThemeColor('text');
	const warnColor = useThemeColor('warning');
	const navigation = useNavigation();

	useEffect(() => {
		navigation.addListener('blur', () => {
			if (fieldArray != undefined) {
				setFields(id.toString(), fieldArray);
			}
			if (title != '') {
				setBingoTitle(id.toString(), title);
			}
		});
	}, [navigation, fieldArray, title]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getFields(id.toString()).then((data) => {
				setInitialFields(data);
				setFieldArray(data);
			});

			getBingoTitle(id.toString()).then((data) => {
				setTitle(data);
			});

			setLoading(false);
		});
		return unsubscribe;
	}, [navigation]);

	function changeField(index: number, val: string) {
		if (fieldArray != undefined) {
			var arr = fieldArray;
			arr[index] = val;
			setFieldArray(arr);
		}
	}

	return (
		<ThemedView style={[styles.default, { backgroundColor: bgColor }]}>
			<ThemedView style={styles.topBar}>
				<IconButton
					icon='arrow-back'
					onPress={() => {
						router.back();
					}}
				/>
				<TextInput
					spellCheck={false}
					autoCorrect={false}
					placeholder='No title'
					placeholderTextColor={placeholderTextColor}
					value={title}
					onChangeText={(newText) => {
						setTitle(newText);
					}}
					style={[styles.title, { color: textColor }]}
				/>
				<IconButton
					style={{ backgroundColor: warnColor }}
					icon='trash-outline'
					onPress={() => {
						deleteBoard(id.toString());
						router.back();
					}}
				/>
			</ThemedView>
			{loading ? (
				<Loading />
			) : (
				<ThemedView style={styles.bingoContainer}>
					<FlatList
						contentContainerStyle={{ alignItems: 'center' }}
						showsVerticalScrollIndicator={false}
						style={styles.list}
						data={initialFields}
						renderItem={({ item, index }) => (
							<BingoEditorItem
								initialValue={item}
								fieldNumber={index}
								updateValue={changeField}
							/>
						)}
					/>
				</ThemedView>
			)}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		height: '100%',
		width: '100%',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	topBar: {
		flexDirection: 'row',
		width: '80%',
		marginTop: '10%',
		marginBottom: '2%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	list: {
		width: '100%',
	},
	title: {
		textAlign: 'left',
		fontSize: 20,
		fontWeight: 'bold',
	},
	bingoContainer: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
});
