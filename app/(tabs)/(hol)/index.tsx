import { CardView } from '@/components/Card';
import { ThemedView } from '@/components/ThemedView';
import { ThemedPressable } from '@/components/ThemedPressable';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

enum Suit {
	Spades = 'Spades',
	Hearts = 'Hearts',
	Diamonds = 'Diamonds',
	Clubs = 'Clubs',
}

enum Rank {
	Two = 'Two',
	Three = 'Three',
	Four = 'Four',
	Five = 'Five',
	Six = 'Six',
	Seven = 'Seven',
	Eight = 'Eight',
	Nine = 'Nine',
	Ten = 'Ten',
	Jack = 'Jack',
	Queen = 'Queen',
	King = 'King',
	Ace = 'Ace',
}

interface Card {
	suit: Suit;
	rank: Rank;
}

const fullDeck: Card[] = Object.values(Suit).flatMap((suit) => Object.values(Rank).map((rank) => ({ suit, rank })));

var currentDeck: Card[] = fullDeck;

function shuffleDeck(deck: Card[]) {
	lastCard = deck[0];
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
}

shuffleDeck(currentDeck);
var lastCard: Card = currentDeck[0];

export default function HigherOrLower() {
	const [seed, setSeed] = useState(1);
	const reset = () => {
		setSeed(Math.random());
	};
	console.log(currentDeck[0]);
	// TODO: render the firstCardView only if deck.length < 52
	// later: maybe use multiple return statements to render multiple views, idk if that's possible and/or good practice
	return (
		<ThemedView style={styles.default}>
			<CardView key={seed + 1} card={lastCard.suit + lastCard.rank} small />
			<CardView key={seed} card={currentDeck[0].suit + currentDeck[0].rank} />
			<ThemedView style={styles.buttonContainer}>
				<ThemedPressable style={styles.button} onPress={() => reset()}>
					<Text style={styles.text}>Higher</Text>
				</ThemedPressable>
				<Pressable style={styles.button} onPress={() => console.log('Lower')}>
					<Text style={styles.text}>Lower</Text>
				</Pressable>
			</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		flex: 1,
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
	buttonContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		padding: 10,
		margin: 10,
		height: 50,
		width: 150,
	},
});
