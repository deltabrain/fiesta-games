import { ThemedView } from '@/components/ThemedView';
import { Button, StyleSheet } from 'react-native';
import { CardView } from '@/components/Card';

enum Suit {
	Spades = 'spades',
	Hearts = 'hearts',
	Diamonds = 'diamonds',
	Clubs = 'clubs',
}

enum Value {
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
	value: Value;
}

const newDeck: Card[] = [
	{ suit: Suit.Spades, value: Value.Ace },
	{ suit: Suit.Spades, value: Value.Two },
	{ suit: Suit.Spades, value: Value.Three },
	{ suit: Suit.Spades, value: Value.Four },
	{ suit: Suit.Spades, value: Value.Five },
	{ suit: Suit.Spades, value: Value.Six },
	{ suit: Suit.Spades, value: Value.Seven },
	{ suit: Suit.Spades, value: Value.Eight },
	{ suit: Suit.Spades, value: Value.Nine },
	{ suit: Suit.Spades, value: Value.Ten },
	{ suit: Suit.Spades, value: Value.Jack },
	{ suit: Suit.Spades, value: Value.Queen },
	{ suit: Suit.Spades, value: Value.King },

	{ suit: Suit.Hearts, value: Value.Ace },
	{ suit: Suit.Hearts, value: Value.Two },
	{ suit: Suit.Hearts, value: Value.Three },
	{ suit: Suit.Hearts, value: Value.Four },
	{ suit: Suit.Hearts, value: Value.Five },
	{ suit: Suit.Hearts, value: Value.Six },
	{ suit: Suit.Hearts, value: Value.Seven },
	{ suit: Suit.Hearts, value: Value.Eight },
	{ suit: Suit.Hearts, value: Value.Nine },
	{ suit: Suit.Hearts, value: Value.Ten },
	{ suit: Suit.Hearts, value: Value.Jack },
	{ suit: Suit.Hearts, value: Value.Queen },
	{ suit: Suit.Hearts, value: Value.King },

	{ suit: Suit.Diamonds, value: Value.Ace },
	{ suit: Suit.Diamonds, value: Value.Two },
	{ suit: Suit.Diamonds, value: Value.Three },
	{ suit: Suit.Diamonds, value: Value.Four },
	{ suit: Suit.Diamonds, value: Value.Five },
	{ suit: Suit.Diamonds, value: Value.Six },
	{ suit: Suit.Diamonds, value: Value.Seven },
	{ suit: Suit.Diamonds, value: Value.Eight },
	{ suit: Suit.Diamonds, value: Value.Nine },
	{ suit: Suit.Diamonds, value: Value.Ten },
	{ suit: Suit.Diamonds, value: Value.Jack },
	{ suit: Suit.Diamonds, value: Value.Queen },
	{ suit: Suit.Diamonds, value: Value.King },

	{ suit: Suit.Clubs, value: Value.Ace },
	{ suit: Suit.Clubs, value: Value.Two },
	{ suit: Suit.Clubs, value: Value.Three },
	{ suit: Suit.Clubs, value: Value.Four },
	{ suit: Suit.Clubs, value: Value.Five },
	{ suit: Suit.Clubs, value: Value.Six },
	{ suit: Suit.Clubs, value: Value.Seven },
	{ suit: Suit.Clubs, value: Value.Eight },
	{ suit: Suit.Clubs, value: Value.Nine },
	{ suit: Suit.Clubs, value: Value.Ten },
	{ suit: Suit.Clubs, value: Value.Jack },
	{ suit: Suit.Clubs, value: Value.Queen },
	{ suit: Suit.Clubs, value: Value.King },
];

var currentDeck: Card[] = newDeck;

function shuffleDeck(deck: Card[]) {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
}

export default function Teufeln() {
	shuffleDeck(currentDeck);
	return (
		<ThemedView style={styles.default}>
			<Button title="Higher" onPress={() => console.log('Higher')} />
			<Button title="Lower" onPress={() => console.log('Lower')} />
			<CardView card={currentDeck[0].value + currentDeck[0].suit} />
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
