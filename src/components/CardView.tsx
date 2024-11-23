import { Image } from 'react-native';
import { StyleSheet } from 'react-native';

// TODO?: preload images

const cardImages: Record<string, any> = {
	SpadesAce: require('@/src/assets/images/cards/SpadesAce.png'),
	HeartsAce: require('@/src/assets/images/cards/HeartsAce.png'),
	DiamondsAce: require('@/src/assets/images/cards/DiamondsAce.png'),
	ClubsAce: require('@/src/assets/images/cards/ClubsAce.png'),

	SpadesTwo: require('@/src/assets/images/cards/SpadesTwo.png'),
	HeartsTwo: require('@/src/assets/images/cards/HeartsTwo.png'),
	DiamondsTwo: require('@/src/assets/images/cards/DiamondsTwo.png'),
	ClubsTwo: require('@/src/assets/images/cards/ClubsTwo.png'),

	SpadesThree: require('@/src/assets/images/cards/SpadesThree.png'),
	HeartsThree: require('@/src/assets/images/cards/HeartsThree.png'),
	DiamondsThree: require('@/src/assets/images/cards/DiamondsThree.png'),
	ClubsThree: require('@/src/assets/images/cards/ClubsThree.png'),

	SpadesFour: require('@/src/assets/images/cards/SpadesFour.png'),
	HeartsFour: require('@/src/assets/images/cards/HeartsFour.png'),
	DiamondsFour: require('@/src/assets/images/cards/DiamondsFour.png'),
	ClubsFour: require('@/src/assets/images/cards/ClubsFour.png'),

	SpadesFive: require('@/src/assets/images/cards/SpadesFive.png'),
	HeartsFive: require('@/src/assets/images/cards/HeartsFive.png'),
	DiamondsFive: require('@/src/assets/images/cards/DiamondsFive.png'),
	ClubsFive: require('@/src/assets/images/cards/ClubsFive.png'),

	SpadesSix: require('@/src/assets/images/cards/SpadesSix.png'),
	HeartsSix: require('@/src/assets/images/cards/HeartsSix.png'),
	DiamondsSix: require('@/src/assets/images/cards/DiamondsSix.png'),
	ClubsSix: require('@/src/assets/images/cards/ClubsSix.png'),

	SpadesSeven: require('@/src/assets/images/cards/SpadesSeven.png'),
	HeartsSeven: require('@/src/assets/images/cards/HeartsSeven.png'),
	DiamondsSeven: require('@/src/assets/images/cards/DiamondsSeven.png'),
	ClubsSeven: require('@/src/assets/images/cards/ClubsSeven.png'),

	SpadesEight: require('@/src/assets/images/cards/SpadesEight.png'),
	HeartsEight: require('@/src/assets/images/cards/HeartsEight.png'),
	DiamondsEight: require('@/src/assets/images/cards/DiamondsEight.png'),
	ClubsEight: require('@/src/assets/images/cards/ClubsEight.png'),

	SpadesNine: require('@/src/assets/images/cards/SpadesNine.png'),
	HeartsNine: require('@/src/assets/images/cards/HeartsNine.png'),
	DiamondsNine: require('@/src/assets/images/cards/DiamondsNine.png'),
	ClubsNine: require('@/src/assets/images/cards/ClubsNine.png'),

	SpadesTen: require('@/src/assets/images/cards/SpadesTen.png'),
	HeartsTen: require('@/src/assets/images/cards/HeartsTen.png'),
	DiamondsTen: require('@/src/assets/images/cards/DiamondsTen.png'),
	ClubsTen: require('@/src/assets/images/cards/ClubsTen.png'),

	SpadesJack: require('@/src/assets/images/cards/SpadesJack.png'),
	HeartsJack: require('@/src/assets/images/cards/HeartsJack.png'),
	DiamondsJack: require('@/src/assets/images/cards/DiamondsJack.png'),
	ClubsJack: require('@/src/assets/images/cards/ClubsJack.png'),

	SpadesQueen: require('@/src/assets/images/cards/SpadesQueen.png'),
	HeartsQueen: require('@/src/assets/images/cards/HeartsQueen.png'),
	DiamondsQueen: require('@/src/assets/images/cards/DiamondsQueen.png'),
	ClubsQueen: require('@/src/assets/images/cards/ClubsQueen.png'),

	SpadesKing: require('@/src/assets/images/cards/SpadesKing.png'),
	HeartsKing: require('@/src/assets/images/cards/HeartsKing.png'),
	DiamondsKing: require('@/src/assets/images/cards/DiamondsKing.png'),
	ClubsKing: require('@/src/assets/images/cards/ClubsKing.png'),
};

export function CardView({
	card,
	small,
	visible = true,
	style,
}: {
	card: string;
	small?: boolean;
	visible?: boolean;
	style?: any;
}) {
	return (
		<Image
			source={cardImages[card]}
			style={[
				small ? { ...styles.small, ...style } : { ...styles.default, ...style },
				visible ? { opacity: 1 } : { opacity: 0 },
			]}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		width: 320,
		borderRadius: 16,
	},
	small: {
		width: 80,
		height: 112,
		borderRadius: 6,
		alignSelf: 'flex-start',
		flexDirection: 'column',
	},
});
