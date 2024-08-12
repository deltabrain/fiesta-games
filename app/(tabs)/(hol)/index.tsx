import { CardView } from '@/components/CardView';
import { ThemedPressable } from '@/components/ThemedPressable';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import * as hol from './higherOrLower';

hol.initDeck();

//TODO: preload images

export default function HigherOrLower() {
	// this rerenders the view if necessary
	function updateCards() {
		setCurrentCardName(hol.getCurrentCardName());
		setLastCardName(hol.getLastCardName());
		setScore(hol.getScore());
		setRemainingCards(hol.getRemainingCards());
	}

	function wrongGuess() {
		console.log('wrongGuess');
		setLeftButtonText(hol.SuitAction.Red);
		setRightButtonText(hol.SuitAction.Black);
		setFirstRound(true);
	}

	function correctGuess() {
		console.log('correctGuess');
		setLeftButtonText(hol.RankAction.Higher);
		setRightButtonText(hol.RankAction.Lower);
		setFirstRound(false);
	}

	const [firstRound, setFirstRound] = useState(true);
	const [currentCardName, setCurrentCardName] = useState(hol.getCurrentCardName());
	const [lastCardName, setLastCardName] = useState(hol.getLastCardName());
	const [score, setScore] = useState(hol.getScore());
	const [remainingCards, setRemainingCards] = useState(hol.getRemainingCards());
	const [showScorePopup, setShowScorePopup] = useState(false);
	const [leftButtonText, setLeftButtonText]: [hol.RankAction | hol.SuitAction, any] = useState(hol.SuitAction.Red);
	const [rightButtonText, setRightButtonText]: [hol.RankAction | hol.SuitAction, any] = useState(
		hol.SuitAction.Black,
	);

	return (
		<ThemedView style={styles.default}>
			<ThemedView style={styles.topContainer}>
				<CardView small card={lastCardName} />
				<ThemedView style={styles.textContainer}>
					<ThemedText style={styles.text}>Streak: {score}</ThemedText>
					<ThemedText style={styles.text}>Remaining Cards: {remainingCards}</ThemedText>
				</ThemedView>
			</ThemedView>
			<CardView card={currentCardName} />
			<ThemedView style={styles.buttonContainer}>
				<Modal visible={setTimeout(() => setShowScorePopup(false), 0) && showScorePopup}>
					<ThemedText style={styles.text}>Score: {score}</ThemedText>
				</Modal>
				<ThemedPressable
					contentType="text"
					content={leftButtonText}
					style={styles.button}
					onPress={async () => {
						var action = firstRound ? hol.SuitAction.Red : hol.RankAction.Higher;
						if (!(await hol.checkWin(action))) {
							wrongGuess();
						} else {
							correctGuess();
						}
						updateCards();
					}}
				/>
				<ThemedPressable
					contentType="text"
					content={rightButtonText}
					style={styles.button}
					onPress={async () => {
						var action = firstRound ? hol.SuitAction.Black : hol.RankAction.Lower;
						if (!(await hol.checkWin(action))) {
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
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
	},
	buttonContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
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
		marginTop: 10,
		marginBottom: 30,
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
});
