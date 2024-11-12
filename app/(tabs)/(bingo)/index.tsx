import { BingoItem } from '@/components/BingoItem';
import { TopBar } from '@/components/layout/TopBar';
import { ThemedIconPressable } from '@/components/themed/ThemedIconPressable';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextPressable } from '@/components/themed/ThemedTextPressable';
import { ThemedView } from '@/components/themed/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';

export default function Bingo() {
	const buttonActiveColor = useThemeColor('primary_dark');
	const textColor = useThemeColor('text');
	const textButtonColor = useThemeColor('text_button');
	const fadedTextColor = useThemeColor('text_faded');
	const warningColor = useThemeColor('warning');
	const neutralColor = useThemeColor('neutral');

	const [editMode, setEditMode] = useState(false);
	const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

	// TODO: use firestore for this, in the meantime
	// useState() for expo to work, for production builds useMMKVString()
	const [field0, setField0] = useMMKVString('field0');
	const [field1, setField1] = useMMKVString('field1');
	const [field2, setField2] = useMMKVString('field2');
	const [field3, setField3] = useMMKVString('field3');
	const [field4, setField4] = useMMKVString('field4');
	const [field5, setField5] = useMMKVString('field5');
	const [field6, setField6] = useMMKVString('field6');
	const [field7, setField7] = useMMKVString('field7');
	const [field8, setField8] = useMMKVString('field8');

	function resetFields(): void {
		setField0('');
		setField1('');
		setField2('');
		setField3('');
		setField4('');
		setField5('');
		setField6('');
		setField7('');
		setField8('');
	}

	return (
		<ThemedView style={styles.default}>
			<TopBar />
			<Modal
				visible={showConfirmationPopup}
				transparent={true}
				animationType='fade'
				statusBarTranslucent={true}
			>
				<ThemedView style={styles.modal}>
					<ThemedView style={styles.textContainer}>
						<ThemedText style={[styles.text, { color: textColor }]}>
							Are you sure you want to delete all entries?
						</ThemedText>
					</ThemedView>
					<ThemedView style={styles.buttonContainer}>
						<ThemedTextPressable
							text='No'
							style={styles.button}
							onPress={() => {
								setShowConfirmationPopup(false);
							}}
						/>
						<ThemedTextPressable
							text='Yes'
							style={styles.button}
							onPress={() => {
								setShowConfirmationPopup(false);
								resetFields();
							}}
						/>
					</ThemedView>
				</ThemedView>
			</Modal>
			<ThemedView style={styles.bingoContainer}>
				<ThemedView style={styles.row}>
					<BingoItem editMode={editMode} corner='TopLeft'>
						<ThemedText
							style={[
								styles.bingoText,
								{ color: textButtonColor },
								editMode ? styles.hidden : {},
							]}
						>
							{field0}
						</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={useThemeColor('placeholderText')}
							defaultValue={field0}
							onChangeText={(newText) => setField0(newText)}
							style={[
								styles.bingoInput,
								editMode ? {} : styles.hidden,
								{ color: fadedTextColor },
							]}
						/>
					</BingoItem>
					<BingoItem editMode={editMode}>
						<ThemedText
							style={[
								styles.bingoText,
								{ color: textButtonColor },
								editMode ? styles.hidden : {},
							]}
						>
							{field1}
						</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={useThemeColor('placeholderText')}
							value={field1}
							onChangeText={(newText) => setField1(newText)}
							style={[
								styles.bingoInput,
								editMode ? {} : styles.hidden,
								{ color: fadedTextColor },
							]}
						/>
					</BingoItem>
					<BingoItem editMode={editMode} corner='TopRight'>
						<ThemedText
							style={[
								styles.bingoText,
								{ color: textButtonColor },
								editMode ? styles.hidden : {},
							]}
						>
							{field2}
						</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={useThemeColor('placeholderText')}
							defaultValue={field2}
							onChangeText={(newText) => setField2(newText)}
							style={[
								styles.bingoInput,
								editMode ? {} : styles.hidden,
								{ color: fadedTextColor },
							]}
						/>
					</BingoItem>
				</ThemedView>
				<ThemedView style={styles.row}>
					<BingoItem editMode={editMode}>
						<ThemedText
							style={[
								styles.bingoText,
								{ color: textButtonColor },
								editMode ? styles.hidden : {},
							]}
						>
							{field3}
						</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={useThemeColor('placeholderText')}
							defaultValue={field3}
							onChangeText={(newText) => setField3(newText)}
							style={[
								styles.bingoInput,
								editMode ? {} : styles.hidden,
								{ color: fadedTextColor },
							]}
						/>
					</BingoItem>
					<BingoItem editMode={editMode}>
						<ThemedText
							style={[
								styles.bingoText,
								{ color: textButtonColor },
								editMode ? styles.hidden : {},
							]}
						>
							{field4}
						</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={useThemeColor('placeholderText')}
							defaultValue={field4}
							onChangeText={(newText) => setField4(newText)}
							style={[
								styles.bingoInput,
								editMode ? {} : styles.hidden,
								{ color: fadedTextColor },
							]}
						/>
					</BingoItem>
					<BingoItem editMode={editMode}>
						<ThemedText
							style={[
								styles.bingoText,
								{ color: textButtonColor },
								editMode ? styles.hidden : {},
							]}
						>
							{field5}
						</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={useThemeColor('placeholderText')}
							defaultValue={field5}
							onChangeText={(newText) => setField5(newText)}
							style={[
								styles.bingoInput,
								editMode ? {} : styles.hidden,
								{ color: fadedTextColor },
							]}
						/>
					</BingoItem>
				</ThemedView>
				<ThemedView style={styles.row}>
					<BingoItem editMode={editMode} corner='BottomLeft'>
						<ThemedText
							style={[
								styles.bingoText,
								{ color: textButtonColor },
								editMode ? styles.hidden : {},
							]}
						>
							{field6}
						</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={useThemeColor('placeholderText')}
							defaultValue={field6}
							onChangeText={(newText) => setField6(newText)}
							style={[
								styles.bingoInput,
								editMode ? {} : styles.hidden,
								{ color: fadedTextColor },
							]}
						/>
					</BingoItem>
					<BingoItem editMode={editMode}>
						<ThemedText
							style={[
								styles.bingoText,
								{ color: textButtonColor },
								editMode ? styles.hidden : {},
							]}
						>
							{field7}
						</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={useThemeColor('placeholderText')}
							defaultValue={field7}
							onChangeText={(newText) => setField7(newText)}
							style={[
								styles.bingoInput,
								editMode ? {} : styles.hidden,
								{ color: fadedTextColor },
							]}
						/>
					</BingoItem>
					<BingoItem editMode={editMode} corner='BottomRight'>
						<ThemedText
							style={[
								styles.bingoText,
								{ color: textButtonColor },
								editMode ? styles.hidden : {},
							]}
						>
							{field8}
						</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={useThemeColor('placeholderText')}
							defaultValue={field8}
							onChangeText={(newText) => setField8(newText)}
							style={[
								styles.bingoInput,
								editMode ? {} : styles.hidden,
								{ color: fadedTextColor },
							]}
						/>
					</BingoItem>
				</ThemedView>
			</ThemedView>
			<ThemedView style={styles.bottomBar}>
				<ThemedIconPressable
					disabled={!editMode}
					icon='trash-sharp'
					onPress={() => setShowConfirmationPopup(true)}
					style={
						editMode
							? { backgroundColor: warningColor }
							: { backgroundColor: neutralColor }
					}
				/>
				<Text
					style={[
						styles.editModeText,
						{ color: fadedTextColor },
						editMode ? {} : { color: 'transparent' },
					]}
				>
					Edit Mode
				</Text>
				<ThemedIconPressable
					icon={editMode ? 'checkmark-done' : 'options-sharp'}
					onPress={() => {
						setEditMode(!editMode);
						// TODO: submit data to firestore
					}}
					style={editMode ? { backgroundColor: buttonActiveColor } : {}}
				/>
			</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	bingoContainer: {
		flex: 3,
		width: '80%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	row: {
		flexDirection: 'row',
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
	bottomBar: {
		width: '100%',
		marginBottom: '5%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	editModeText: {
		textAlign: 'center',
		textAlignVertical: 'center',
		color: '#afafaf',
	},
	modal: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 0.9,
	},
	buttonContainer: {
		backgroundColor: 'transparent',
		display: 'flex',
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	textContainer: {
		backgroundColor: 'transparent',
		display: 'flex',
		flex: 0,
		justifyContent: 'center',
		textAlignVertical: 'center',
		width: '60%',
	},
	button: {
		padding: 10,
		margin: 10,
		marginTop: 20,
		height: 50,
		width: '45%',
	},
	text: {
		display: 'flex',
		flex: 0,
		flexWrap: 'wrap',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	hidden: {
		display: 'none',
	},
});
