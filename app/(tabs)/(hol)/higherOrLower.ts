export enum RankGuess {
	Higher = 'Higher',
	Lower = 'Lower',
}

export enum SuitGuess {
	Red = 'Red',
	Black = 'Black',
}

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
var isFirstDeck: boolean = true;
var deck: Card[];
var lastCard: Card;
var currentCard: Card;
var nextCard: Card;
var score: number = 1;
var remainingCards: number = 0;

function rankToValue(rank: Rank): number {
	return {
		Two: 0,
		Three: 1,
		Four: 2,
		Five: 3,
		Six: 4,
		Seven: 5,
		Eight: 6,
		Nine: 7,
		Ten: 8,
		Jack: 9,
		Queen: 10,
		King: 11,
		Ace: 12,
	}[rank];
}

function updateDeck(slice: boolean): void {
	if (deck.length <= 2) {
		initDeck();
		return;
	}

	if (slice) {
		lastCard = deck[0];
		deck = deck.slice(1);
	}

	currentCard = deck[0];
	nextCard = deck[1];
	remainingCards = deck.length - 1;
}

export async function checkWin(guess: RankGuess | SuitGuess): Promise<boolean> {
	var win = false;

	// evaluate win in rank rounds
	if (guess === 'Higher' || guess === 'Lower') {
		win =
			guess === RankGuess.Higher
				? rankToValue(nextCard.rank) >= rankToValue(currentCard.rank)
				: rankToValue(nextCard.rank) <= rankToValue(currentCard.rank);
	}

	// evaluate win in suit rounds (first round)
	if (guess === 'Red' || guess === 'Black') {
		win =
			guess === SuitGuess.Red
				? nextCard.suit === 'Hearts' || nextCard.suit === 'Diamonds'
				: nextCard.suit === 'Spades' || nextCard.suit === 'Clubs';
	}

	if (!win) {
		score = 1;
	} else {
		score++;
	}

	updateDeck(true);
	return win;
}

export function shuffleDeck(first: boolean): void {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	if (first) {
		lastCard = deck[0];
		isFirstDeck = false;
	}
}

export function initDeck(): void {
	if (!isFirstDeck) {
		lastCard = deck[0];
	}
	deck = fullDeck;
	if (isFirstDeck) {
		lastCard = deck[0];
	}
	shuffleDeck(isFirstDeck);
	updateDeck(false);
	remainingCards = deck.length - 1;
}

export function getCurrentCardName(): string {
	return currentCard.suit + currentCard.rank;
}

export function getLastCardName(): string {
	return lastCard.suit + lastCard.rank;
}

export function getScore(): number {
	return score;
}

export function getRemainingCards(): number {
	return remainingCards;
}
