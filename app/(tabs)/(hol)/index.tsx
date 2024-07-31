import { CardView } from '@/components/Card';
import { ThemedView } from '@/components/ThemedView';
import { Button, StyleSheet } from 'react-native';

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
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
}

export default function HigherOrLower() {
	shuffleDeck(currentDeck);
	console.log(currentDeck[0]);
	return (
		<ThemedView style={styles.default}>
			<Button title="Higher" onPress={() => console.log('Higher')} />
			<Button title="Lower" onPress={() => console.log('Lower')} />
			<CardView card={currentDeck[0].suit + currentDeck[0].rank} />
			<Button title="Shuffle" onPress={() => shuffleDeck(currentDeck)} />
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
