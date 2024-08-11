export enum RankAction {
	Higher = 'Higher',
	Lower = 'Lower',
}

export enum SuitAction {
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
var currentDeck: Card[];
var lastCard: Card;
var currentCard: Card;
var nextCard: Card;

var score: number = 0;
var remainingCards: number = 0;

function rankToValue(rank: Rank) {
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

//TODO: rewrite this function
function updateDeck(slice: boolean): void {
	if (!slice) {
		lastCard = currentDeck[0];
		currentCard = currentDeck[0];
		nextCard = currentDeck[1];
		return;
	}
	if (currentDeck.length <= 2) {
		initDeck();
		return;
	}

	lastCard = currentDeck[0];
	currentDeck = currentDeck.slice(1);
	currentCard = currentDeck[0];
	nextCard = currentDeck[1];
	remainingCards = currentDeck.length - 1;
}
export async function checkWin(action: RankAction | SuitAction): Promise<boolean> {
	var win = false;

	// evaluate win in rank rounds
	if (action === 'Higher' || action === 'Lower') {
		win =
			action === RankAction.Higher
				? rankToValue(nextCard.rank) >= rankToValue(currentCard.rank)
				: rankToValue(nextCard.rank) <= rankToValue(currentCard.rank);
	}

	// evaluate win in suit rounds (first round)
	if (action === 'Red' || action === 'Black') {
		win =
			action === SuitAction.Red
				? nextCard.suit === 'Hearts' || nextCard.suit === 'Diamonds'
				: nextCard.suit === 'Spades' || nextCard.suit === 'Clubs';
	}

	if (!win) {
		score = 0;
	} else {
		score++;
	}

	updateDeck(true);
	return win;
}

export function shuffleDeck(deck: Card[]): void {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
}

export function initDeck(): void {
	currentDeck = fullDeck;
	shuffleDeck(currentDeck);
	updateDeck(false);
	remainingCards = currentDeck.length - 1;
}

export function getCurrentCard(): Card {
	return currentCard;
}

export function getLastCard(): Card {
	return lastCard;
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
