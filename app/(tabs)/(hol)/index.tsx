import { CardView } from '@/components/Card';
import { ThemedView } from '@/components/ThemedView';
import { Button, StyleSheet } from 'react-native';

// TODO: rename card files to the pattern '[Suit][Rank].png' and uncomment the new enums and delete the old ones

/* enum Suit {
	Spades,
	Hearts,
	Diamonds,
	Clubs,
} */

/* enum Rank {
	Two,
	Three,
	Four,
	Five,
	Six,
	Seven,
	Eight,
	Nine,
	Ten,
	Jack,
	Queen,
	King,
	Ace,
} */

enum Suit {
	Spades = 'spades',
	Hearts = 'hearts',
	Diamonds = 'diamonds',
	Clubs = 'clubs',
}

enum Rank {
	Two = 'two_of_',
	Three = 'three_of_',
	Four = 'four_of_',
	Five = 'five_of_',
	Six = 'six_of_',
	Seven = 'seven_of_',
	Eight = 'eight_of_',
	Nine = 'nine_of_',
	Ten = 'ten_of_',
	Jack = 'jack_of_',
	Queen = 'queen_of_',
	King = 'king_of_',
	Ace = 'ace_of_',
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

export default function Teufeln() {
	shuffleDeck(currentDeck);
	console.log(currentDeck[0]);
	return (
		<ThemedView style={styles.default}>
			<Button title="Higher" onPress={() => console.log('Higher')} />
			<Button title="Lower" onPress={() => console.log('Lower')} />
			<CardView card={currentDeck[0].rank + currentDeck[0].suit} />
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
