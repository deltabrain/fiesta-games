import { CardView } from '@/components/CardView';
import { TopBar } from '@/components/layout/TopBar';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextPressable } from '@/components/themed/ThemedTextPressable';
import { ThemedView } from '@/components/themed/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import * as hol from './higherOrLower';

hol.initDeck();

var scoreBuf = 1;

export default function HigherOrLower() {
	const backgroundColor = useThemeColor('background');

	// this rerenders the view if necessary
	function updateCards() {
		setCurrentCardName(hol.getCurrentCardName());
		// setLastCardName(hol.getLastCardName());
	}

	function wrongGuess() {
		setTimeout(() => {
			setShowScorePopup(true);
		}, 500);
		setLeftButtonText(hol.SuitGuess.Red);
		setRightButtonText(hol.SuitGuess.Black);
		setFirstRound(true);
	}

	function correctGuess() {
		setLeftButtonText(hol.RankGuess.Higher);
		setRightButtonText(hol.RankGuess.Lower);
		setFirstRound(false);
		scoreBuf = hol.getScore();
	}

	const [firstRound, setFirstRound] = useState(true);
	const [currentCardName, setCurrentCardName] = useState(
		hol.getCurrentCardName(),
	);
	// const [lastCardName, setLastCardName] = useState(hol.getLastCardName());
	const [showScorePopup, setShowScorePopup] = useState(false);
	const [leftButtonText, setLeftButtonText]: [
		hol.RankGuess | hol.SuitGuess,
		any,
	] = useState(hol.SuitGuess.Red);
	const [rightButtonText, setRightButtonText]: [
		hol.RankGuess | hol.SuitGuess,
		any,
	] = useState(hol.SuitGuess.Black);

	return (
		<ThemedView style={[styles.default, { backgroundColor: backgroundColor }]}>
			<TopBar />
			<Modal
				visible={showScorePopup}
				transparent={true}
				animationType='fade'
				statusBarTranslucent={true}
			>
				<ThemedView
					style={[styles.modal, { backgroundColor: backgroundColor }]}
				>
					<ThemedText style={styles.text}>
						You have to take {scoreBuf} sip(s).
					</ThemedText>
					<ThemedTextPressable
						text='Close'
						style={styles.button}
						onPress={() => {
							setShowScorePopup(false);
							scoreBuf = 1;
						}}
					/>
				</ThemedView>
			</Modal>
			{/* <ThemedView style={styles.topContainer}> */}
			{/* 	<CardView small card={lastCardName} /> */}
			{/* </ThemedView> */}
			<CardView style={styles.card} card={currentCardName} />
			<ThemedView
				style={[styles.buttonContainer, { backgroundColor: backgroundColor }]}
			>
				<ThemedTextPressable
					text={leftButtonText}
					style={styles.button}
					onPress={async () => {
						var action = firstRound ? hol.SuitGuess.Red : hol.RankGuess.Higher;
						if (!hol.checkWin(action)) {
							wrongGuess();
						} else {
							correctGuess();
						}
						updateCards();
					}}
				/>
				<ThemedTextPressable
					text={rightButtonText}
					style={styles.button}
					onPress={async () => {
						var action = firstRound ? hol.SuitGuess.Black : hol.RankGuess.Lower;
						if (!hol.checkWin(action)) {
							wrongGuess();
						} else {
							correctGuess();
						}
						updateCards();
					}}
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
	card: {
		display: 'flex',
		flex: 3,
		marginTop: 15,
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttonContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
	},
	button: {
		padding: 10,
		margin: 10,
		marginTop: 20,
		height: 50,
		width: '45%',
	},
	topContainer: {
		marginTop: '10%',
		marginBottom: '10%',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	textContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 0.9,
	},
});
