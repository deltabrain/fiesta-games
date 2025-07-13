import { TextButton } from '@components/themed/TextButton'
import { ThemedDiv } from '@components/themed/ThemedDiv'
import { ThemedText } from '@components/themed/ThemedText'
import { useThemeColor } from '@hooks/useThemeColor'
import { getRandomSong } from '@lib/db'
import { Song } from '@lib/types'
import { ThemedView } from '@themed/ThemedView'
import { calcDifficulty } from '@util/util'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

// TODO: Replace webView with native implementation of rapdle
export default function Rapdle() {
	const successColor = useThemeColor('primary')
	const warnColor = useThemeColor('warning')

	const [loading, setLoading] = useState(true)
	const [songToGuess, setSongToGuess] = useState<Song>()
	const [songDifficulty, setSongDifficulty] = useState<string>('')
	const [selectedSong, setSelectedSong] = useState<Song>()
	const [guesses, setGuesses] = useState<Song[]>([])

	const [selectedSongChanged, setSelectedSongChanged] = useState(false)
	const [gameActive, setGameActive] = useState(true)
	const [gameWin, setGameWin] = useState(false)
	const [newGame, setNewGame] = useState(false)

	const [lyricsExcerpt, setLyricsExerpt] = useState<string[]>([])
	const [guessError, setGuessError] = useState(false)

	const guessLinesAmount = 6

	useEffect(() => {
		getRandomSong()
			.then((res) => {
				if (res != undefined) {
					setSongToGuess(res)
					setSongDifficulty(calcDifficulty(res.views))
					if (typeof res.lyrics == 'string') {
						const lyrics = res.lyrics.split('>')
						const tempLyrics = []
						let randomLineNumber = Math.floor(
							Math.random() * (lyrics.length - guessLinesAmount)
						)
						if (randomLineNumber != 0) {
							randomLineNumber = randomLineNumber - (randomLineNumber % 4)
						}
						const endLine = randomLineNumber + guessLinesAmount
						for (
							randomLineNumber;
							randomLineNumber < endLine;
							randomLineNumber++
						) {
							tempLyrics.push(lyrics[randomLineNumber]!)
						}
						setLyricsExerpt(tempLyrics)
					}
				}
			})
			.catch((error) => console.error(error))

		setLoading(false)
	}, [newGame])

	return (
		<ThemedView style={styles.default}>
			<ThemedView style={styles.webView}>
				<ThemedView style={styles.smallContainer}>
					<TextButton
						style={[styles.topButton, { backgroundColor: warnColor }]}
						textStyle={{ color: '#252525' }}
						text='Aufgeben'
					/>
					<TextButton
						style={[styles.topButton, { backgroundColor: successColor }]}
						textStyle={{ color: '#252525' }}
						text='1515'
					/>
				</ThemedView>
				<ThemedView style={styles.container}>
					<ThemedDiv style={styles.lyricsContainer}>
						{lyricsExcerpt.map((line, index) => (
							<ThemedText style={styles.lyricsLine} key={index}>
								{line}
							</ThemedText>
						))}
						<ThemedText style={{ textAlign: 'center', marginTop: '2%' }}>
							Schwierigkeitsgrad: {songDifficulty}
						</ThemedText>
					</ThemedDiv>
				</ThemedView>
				<ThemedView style={styles.buttonContainer}>
					<TextButton style={styles.button} text='soos' />
					<TextButton style={styles.button} text='soos' />
				</ThemedView>
				<ThemedView style={styles.smallContainer}>
					<TextButton style={styles.button} text='soos' />
				</ThemedView>
			</ThemedView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	default: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	webView: {
		flex: 1,
		flexDirection: 'column',
		marginTop: '10%',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		width: '100%',
		height: '95%',
	},
	container: {
		flex: 1,
		width: '100%',
		marginVertical: '1%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		flex: 0,
		flexDirection: 'row',
		width: '100%',
		minHeight: 'auto',
		marginVertical: '1%',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	smallContainer: {
		flex: 0,
		flexDirection: 'row',
		width: '100%',
		height: '5%',
		marginVertical: '2%',
		paddingHorizontal: '5%',
		alignItems: 'center',
		justifyContent: 'space-between',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	lyricsContainer: {
		flex: 1,
		width: '90%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	lyricsLine: {
		marginVertical: 2,
		textAlign: 'left',
	},
	button: {
		width: '25%',
		height: '25%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	topButton: {
		borderRadius: 4,
		borderColor: '#252525',
		width: '30%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
})
