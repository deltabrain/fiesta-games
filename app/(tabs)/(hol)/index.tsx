import { CardView } from '@/components/CardView';
import { ThemedPressable } from '@/components/ThemedPressable';
import { ThemedView } from '@/components/ThemedView';
import { Modal, StyleSheet } from 'react-native';
import { useState } from 'react';
import * as hol from './higherOrLower';
import { ThemedText } from '@/components/ThemedText';

hol.initDeck();

export default function HigherOrLower() {
	function updateCards() {
		console.log('updating cards');
		setCurrentCardName(hol.getCurrentCardName());
		setLastCardName(hol.getLastCardName());
		setScore(hol.getScore());
		setRemainingCards(hol.getRemainingCards());
	}
	const [currentCardName, setCurrentCardName] = useState(hol.getCurrentCardName());
	const [lastCardName, setLastCardName] = useState(hol.getLastCardName());
	const [score, setScore] = useState(hol.getScore());
	const [remainingCards, setRemainingCards] = useState(hol.getRemainingCards());
	const [showScorePopup, setShowScorePopup] = useState(false);
	return (
		<ThemedView style={styles.default}>
			<ThemedView style={styles.topContainer}>
				<CardView visible={true} small card={lastCardName} />
				<ThemedView style={styles.textContainer}>
					<ThemedText style={styles.text}>Streak: {score}</ThemedText>
					<ThemedText style={styles.text}>Remaining Cards: {remainingCards}</ThemedText>
				</ThemedView>
			</ThemedView>
			<CardView card={currentCardName} />
			<ThemedView style={styles.buttonContainer}>
				<Modal visible={setTimeout(() => setShowScorePopup(false), 1000) && showScorePopup} />
				<ThemedPressable
					contentType="text"
					content="Higher"
					style={styles.button}
					onPress={async () => {
						if (!(await hol.checkWin(hol.Action.Higher))) {
							setShowScorePopup(true);
						}
						updateCards();
					}}
				/>
				<ThemedPressable
					contentType="text"
					content="Lower"
					style={styles.button}
					onPress={async () => {
						await hol.checkWin(hol.Action.Lower);
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
