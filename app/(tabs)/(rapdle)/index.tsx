import { TextButton } from '@components/themed/TextButton'
import { ThemedDiv } from '@components/themed/ThemedDiv'
import { ThemedText } from '@components/themed/ThemedText'
import { useThemeColor } from '@hooks/useThemeColor'
import { getRandomSong, getUserElo } from '@lib/db'
import { Song } from '@lib/types'
import { ThemedView } from '@themed/ThemedView'
import { calcDifficulty } from '@util/util'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

const difficulties = ['Sehr Einfach', 'Einfach', 'Mittel', 'Schwierig', 'Sehr Schwierig']

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
	const [elo, setElo] = useState(0)

	const [lyricsExcerpt, setLyricsExerpt] = useState<string[]>([])
	const [guessError, setGuessError] = useState(false)

	const guessLinesAmount = 6

	useEffect(() => {
		getRandomSong()
			.then((res) => {
				if (res !== undefined) {
					setSongToGuess(res)
					// WARN: Bad code ahead, this calculates the difficulty of given song
					// and uses it to index the array and then set the corresponding string
					// to the state variable
					setSongDifficulty(difficulties[calcDifficulty(res.views)])
					if (typeof res.lyrics == 'string') {
						const lyrics = res.lyrics.split('>')
						const tempLyrics = []
						let randomLineNumber = Math.floor(Math.random() * (lyrics.length - guessLinesAmount))
						if (randomLineNumber !== 1) {
							randomLineNumber = randomLineNumber - (randomLineNumber % 4)
						}
						const endLine = randomLineNumber + guessLinesAmount
						for (randomLineNumber; randomLineNumber < endLine; randomLineNumber++) {
							tempLyrics.push(lyrics[randomLineNumber]!)
						}
						setLyricsExerpt(tempLyrics)
					}
				}
			})
			.catch((error) => console.error(error))

		getUserElo().then((res) => {
			setElo(res)
		})

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
						text={elo.toString()}
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
