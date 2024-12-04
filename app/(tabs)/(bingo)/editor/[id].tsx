import { Loading } from '@/components/Loading';
import { BingoEditorItem } from '@/components/bingo/BingoEditorItem';
import { useThemeColor } from '@/hooks/useThemeColor';
import { getBingoTitle, getFields, setFields } from '@/lib/db';
import { ThemedIconPressable } from '@/themed/ThemedIconPressable';
import { ThemedView } from '@/themed/ThemedView';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';

export default function Editor() {
	const { id } = useLocalSearchParams();

	const [loading, setLoading] = useState(true);
	const [title, setTitle] = useState('');
	const [initialFields, setInitialFields] = useState<string[]>();

	const bgColor = useThemeColor('background');
	const placeholderTextColor = useThemeColor('placeholderText');
	const textColor = useThemeColor('text');

	const [fieldArray, setFieldArray] = useState<string[]>([]);

	useEffect(() => {
		getFields(id.toString()).then((data) => {
			setInitialFields(data);
			setFieldArray(data);
		});

		getBingoTitle(id.toString()).then((data) => {
			setTitle(data);
		});

		setLoading(false);
	}, [id]);

	function changeField(index: number, val: string) {
		var arr = fieldArray;
		arr[index] = val;

		setFieldArray(arr);
	}

	return (
		<ThemedView style={[styles.default, { backgroundColor: bgColor }]}>
			<ThemedView style={styles.topBar}>
				<ThemedIconPressable
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
					onChangeText={(newText) => setTitle(newText)}
					style={[styles.title, { color: textColor }]}
				/>
				<ThemedIconPressable
					icon='save-outline'
					onPress={() => {
						setFields(id.toString(), fieldArray);
					}}
				/>
			</ThemedView>
			{loading ? (
				<Loading />
			) : (
				<ThemedView style={styles.bingoContainer}>
					<FlatList
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
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		textAlignVertical: 'center',
		flexWrap: 'wrap',
		paddingHorizontal: '10%',
	},
	topBar: {
		flexDirection: 'row',
		width: '90%',
		height: '15%',
		paddingTop: '10%',
		marginBottom: '2%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	list: {
		width: '100%',
		height: '100%',
	},
	bingoContainer: {
		flex: 0,
		width: '90%',
		maxWidth: '90%',
		height: '85%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
});
