import { StyleSheet, TextInput } from 'react-native';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedPressable } from '@/components/themed/ThemedPressable';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { BingoItem } from '@/components/BingoItem';

export default function Bingo() {
	const [editMode, setEditMode] = useState(false);

	const [field0, setField0] = useState('');
	const [field1, setField1] = useState('');
	const [field2, setField2] = useState('');
	const [field3, setField3] = useState('');
	const [field4, setField4] = useState('');
	const [field5, setField5] = useState('');
	const [field6, setField6] = useState('');
	const [field7, setField7] = useState('');
	const [field8, setField8] = useState('');

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
			<ThemedView style={styles.bingoContainer}>
				<ThemedView style={styles.row}>
					<BingoItem editMode={editMode}>
						<ThemedText style={[styles.bingoText, editMode ? styles.hidden : {}]}>{field0}</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={'#bbbbbb'}
							defaultValue={field0}
							onChangeText={(newText) => setField0(newText)}
							style={[styles.bingoInput, editMode ? {} : styles.hidden]}
						/>
					</BingoItem>
					<BingoItem editMode={editMode}>
						<ThemedText style={[styles.bingoText, editMode ? styles.hidden : {}]}>{field1}</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={'#bbbbbb'}
							value={field1}
							onChangeText={(newText) => setField1(newText)}
							style={[styles.bingoInput, editMode ? {} : styles.hidden]}
						/>
					</BingoItem>
					<BingoItem editMode={editMode}>
						<ThemedText style={[styles.bingoText, editMode ? styles.hidden : {}]}>{field2}</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={'#bbbbbb'}
							defaultValue={field2}
							onChangeText={(newText) => setField2(newText)}
							style={[styles.bingoInput, editMode ? {} : styles.hidden]}
						/>
					</BingoItem>
				</ThemedView>
				<ThemedView style={styles.row}>
					<BingoItem editMode={editMode}>
						<ThemedText style={[styles.bingoText, editMode ? styles.hidden : {}]}>{field3}</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={'#bbbbbb'}
							defaultValue={field3}
							onChangeText={(newText) => setField3(newText)}
							style={[styles.bingoInput, editMode ? {} : styles.hidden]}
						/>
					</BingoItem>
					<BingoItem editMode={editMode}>
						<ThemedText style={[styles.bingoText, editMode ? styles.hidden : {}]}>{field4}</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={'#bbbbbb'}
							defaultValue={field4}
							onChangeText={(newText) => setField4(newText)}
							style={[styles.bingoInput, editMode ? {} : styles.hidden]}
						/>
					</BingoItem>
					<BingoItem editMode={editMode}>
						<ThemedText style={[styles.bingoText, editMode ? styles.hidden : {}]}>{field5}</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={'#bbbbbb'}
							defaultValue={field5}
							onChangeText={(newText) => setField5(newText)}
							style={[styles.bingoInput, editMode ? {} : styles.hidden]}
						/>
					</BingoItem>
				</ThemedView>
				<ThemedView style={styles.row}>
					<BingoItem editMode={editMode}>
						<ThemedText style={[styles.bingoText, editMode ? styles.hidden : {}]}>{field6}</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={'#bbbbbb'}
							defaultValue={field6}
							onChangeText={(newText) => setField6(newText)}
							style={[styles.bingoInput, editMode ? {} : styles.hidden]}
						/>
					</BingoItem>
					<BingoItem editMode={editMode}>
						<ThemedText style={[styles.bingoText, editMode ? styles.hidden : {}]}>{field7}</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={'#bbbbbb'}
							defaultValue={field7}
							onChangeText={(newText) => setField7(newText)}
							style={[styles.bingoInput, editMode ? {} : styles.hidden]}
						/>
					</BingoItem>
					<BingoItem editMode={editMode}>
						<ThemedText style={[styles.bingoText, editMode ? styles.hidden : {}]}>{field8}</ThemedText>
						<TextInput
							placeholder='Enter...'
							placeholderTextColor={'#bbbbbb'}
							defaultValue={field8}
							onChangeText={(newText) => setField8(newText)}
							style={[styles.bingoInput, editMode ? {} : styles.hidden]}
						/>
					</BingoItem>
				</ThemedView>
			</ThemedView>
			<ThemedView style={styles.bottomBar}>
				<ThemedPressable
					disabled={!editMode}
					contentType='icon'
					content='trash-sharp'
					onPress={() => resetFields()}
					style={editMode ? { backgroundColor: '#dd5000' } : { backgroundColor: '#505050' }}
				/>
				<ThemedPressable
					contentType='icon'
					content='options-sharp'
					onPress={() => setEditMode(!editMode)}
					style={editMode ? { backgroundColor: Colors.dark.buttonActiveBackground } : {}}
				/>
			</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
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
		maxWidth: '80%',
		width: '80%',
		alignSelf: 'center',
		color: '#ffffff',
	},
	bottomBar: {
		width: '100%',
		marginBottom: '5%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	hidden: {
		display: 'none',
	},
});
