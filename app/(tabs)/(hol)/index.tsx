import { CardView } from '@/components/CardView';
import { ThemedPressable } from '@/components/themed/ThemedPressable';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import * as hol from './higherOrLower';

hol.initDeck();

export default function HigherOrLower() {
	// this rerenders the view if necessary
	function updateCards() {
		setCurrentCardName(hol.getCurrentCardName());
		setLastCardName(hol.getLastCardName());
		setScore(hol.getScore());
		setRemainingCards(hol.getRemainingCards());
	}

	function wrongGuess() {
		setLeftButtonText(hol.SuitGuess.Red);
		setRightButtonText(hol.SuitGuess.Black);
		setFirstRound(true);
	}

	function correctGuess() {
		setLeftButtonText(hol.RankGuess.Higher);
		setRightButtonText(hol.RankGuess.Lower);
		setFirstRound(false);
	}

	const [firstRound, setFirstRound] = useState(true);
	const [currentCardName, setCurrentCardName] = useState(hol.getCurrentCardName());
	const [lastCardName, setLastCardName] = useState(hol.getLastCardName());
	const [score, setScore] = useState(hol.getScore());
	const [remainingCards, setRemainingCards] = useState(hol.getRemainingCards());
	const [showScorePopup, setShowScorePopup] = useState(false);
	const [leftButtonText, setLeftButtonText]: [hol.RankGuess | hol.SuitGuess, any] = useState(hol.SuitGuess.Red);
	const [rightButtonText, setRightButtonText]: [hol.RankGuess | hol.SuitGuess, any] = useState(hol.SuitGuess.Black);

	return (
		<ThemedView style={styles.default}>
			<ThemedView style={styles.topContainer}>
				<CardView small card={lastCardName} />
				<ThemedView style={styles.textContainer}>
					<ThemedText style={styles.text}>Streak: {score}</ThemedText>
					{/* this is for debugging purposes only */}
					<ThemedText style={styles.text}>Remaining Cards: {remainingCards}</ThemedText>
				</ThemedView>
			</ThemedView>
			<CardView style={styles.card} card={currentCardName} />
			<ThemedView style={styles.buttonContainer}>
				<Modal visible={setTimeout(() => setShowScorePopup(false), 0) && showScorePopup}>
					<ThemedText style={styles.text}>Score: {score}</ThemedText>
				</Modal>
				<ThemedPressable
					contentType='text'
					content={leftButtonText}
					style={styles.button}
					onPress={async () => {
						var action = firstRound ? hol.SuitGuess.Red : hol.RankGuess.Higher;
						if (!(await hol.checkWin(action))) {
							wrongGuess();
						} else {
							correctGuess();
						}
						updateCards();
					}}
				/>
				<ThemedPressable
					contentType='text'
					content={rightButtonText}
					style={styles.button}
					onPress={async () => {
						var action = firstRound ? hol.SuitGuess.Black : hol.RankGuess.Lower;
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
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		display: 'flex',
		flex: 3,
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
});
