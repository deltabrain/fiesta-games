/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
	// TODO: change light Colors to actually support light mode
	light: {
		text: '#11181c',
		background: '#ffffff',
		tint: tintColorLight,
		icon: '#687076',
		tabIconDefault: '#687076',
		tabIconSelected: tintColorLight,
		buttonBackground: '#0a7ea4',
		buttonActiveBackground: '#0a7ea4',
		buttonBorder: '#0b9eb4',
		buttonText: '#dfdfdf',
		barBackground: '#efefef',
	},
	dark: {
		text: '#ecedee',
		background: '#151718',
		tint: tintColorDark,
		icon: '#9ba1a6',
		tabIconDefault: '#9ba1a6',
		tabIconSelected: tintColorDark,
		buttonBackground: '#0a7ea4',
		buttonActiveBackground: '#00e080',
		buttonBorder: '#0b9eb4',
		buttonText: '#dfdfdf',
		barBackground: '#1c1f21',
	},
};
