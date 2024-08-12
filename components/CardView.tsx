import { Image } from 'react-native';
import { StyleSheet } from 'react-native';

// TODO?: preload images

const cardImages: Record<string, any> = {
	SpadesAce: require('@/assets/images/cards/SpadesAce.png'),
	HeartsAce: require('@/assets/images/cards/HeartsAce.png'),
	DiamondsAce: require('@/assets/images/cards/DiamondsAce.png'),
	ClubsAce: require('@/assets/images/cards/ClubsAce.png'),

	SpadesTwo: require('@/assets/images/cards/SpadesTwo.png'),
	HeartsTwo: require('@/assets/images/cards/HeartsTwo.png'),
	DiamondsTwo: require('@/assets/images/cards/DiamondsTwo.png'),
	ClubsTwo: require('@/assets/images/cards/ClubsTwo.png'),

	SpadesThree: require('@/assets/images/cards/SpadesThree.png'),
	HeartsThree: require('@/assets/images/cards/HeartsThree.png'),
	DiamondsThree: require('@/assets/images/cards/DiamondsThree.png'),
	ClubsThree: require('@/assets/images/cards/ClubsThree.png'),

	SpadesFour: require('@/assets/images/cards/SpadesFour.png'),
	HeartsFour: require('@/assets/images/cards/HeartsFour.png'),
	DiamondsFour: require('@/assets/images/cards/DiamondsFour.png'),
	ClubsFour: require('@/assets/images/cards/ClubsFour.png'),

	SpadesFive: require('@/assets/images/cards/SpadesFive.png'),
	HeartsFive: require('@/assets/images/cards/HeartsFive.png'),
	DiamondsFive: require('@/assets/images/cards/DiamondsFive.png'),
	ClubsFive: require('@/assets/images/cards/ClubsFive.png'),

	SpadesSix: require('@/assets/images/cards/SpadesSix.png'),
	HeartsSix: require('@/assets/images/cards/HeartsSix.png'),
	DiamondsSix: require('@/assets/images/cards/DiamondsSix.png'),
	ClubsSix: require('@/assets/images/cards/ClubsSix.png'),

	SpadesSeven: require('@/assets/images/cards/SpadesSeven.png'),
	HeartsSeven: require('@/assets/images/cards/HeartsSeven.png'),
	DiamondsSeven: require('@/assets/images/cards/DiamondsSeven.png'),
	ClubsSeven: require('@/assets/images/cards/ClubsSeven.png'),

	SpadesEight: require('@/assets/images/cards/SpadesEight.png'),
	HeartsEight: require('@/assets/images/cards/HeartsEight.png'),
	DiamondsEight: require('@/assets/images/cards/DiamondsEight.png'),
	ClubsEight: require('@/assets/images/cards/ClubsEight.png'),

	SpadesNine: require('@/assets/images/cards/SpadesNine.png'),
	HeartsNine: require('@/assets/images/cards/HeartsNine.png'),
	DiamondsNine: require('@/assets/images/cards/DiamondsNine.png'),
	ClubsNine: require('@/assets/images/cards/ClubsNine.png'),

	SpadesTen: require('@/assets/images/cards/SpadesTen.png'),
	HeartsTen: require('@/assets/images/cards/HeartsTen.png'),
	DiamondsTen: require('@/assets/images/cards/DiamondsTen.png'),
	ClubsTen: require('@/assets/images/cards/ClubsTen.png'),

	SpadesJack: require('@/assets/images/cards/SpadesJack.png'),
	HeartsJack: require('@/assets/images/cards/HeartsJack.png'),
	DiamondsJack: require('@/assets/images/cards/DiamondsJack.png'),
	ClubsJack: require('@/assets/images/cards/ClubsJack.png'),

	SpadesQueen: require('@/assets/images/cards/SpadesQueen.png'),
	HeartsQueen: require('@/assets/images/cards/HeartsQueen.png'),
	DiamondsQueen: require('@/assets/images/cards/DiamondsQueen.png'),
	ClubsQueen: require('@/assets/images/cards/ClubsQueen.png'),

	SpadesKing: require('@/assets/images/cards/SpadesKing.png'),
	HeartsKing: require('@/assets/images/cards/HeartsKing.png'),
	DiamondsKing: require('@/assets/images/cards/DiamondsKing.png'),
	ClubsKing: require('@/assets/images/cards/ClubsKing.png'),
};

export function CardView({ card, small, visible = true }: { card: string; small?: boolean; visible?: boolean }) {
	return (
		<Image
			source={cardImages[card]}
			style={[small ? { ...styles.small } : { ...styles.default }, visible ? { opacity: 1 } : { opacity: 0 }]}
		/>
	);
}

// TODO: make the dimensions dynamic to preserve aspect ratio
const styles = StyleSheet.create({
	default: {
		width: 320,
		height: '60%',
		borderRadius: 16,
	},
	small: {
		width: 80,
		height: 116,
		borderRadius: 6,
		alignSelf: 'flex-start',
		flexDirection: 'column',
	},
});
