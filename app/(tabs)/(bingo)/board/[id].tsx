import { Loading } from '@components/Loading'
import { BingoBoardItem } from '@components/bingo/BingoBoardItem'
import { getBoard, shuffleBoard } from '@lib/db'
import { pb } from '@lib/pocketbase'
import { Board, Corner } from '@lib/types'
import { IconButton } from '@themed/IconButton'
import { ThemedView } from '@themed/ThemedView'
import { pbStringToArray } from '@util/util'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

export default function BoardView() {
	const { id } = useLocalSearchParams()
	const [loading, setLoading] = useState(true)
	const [reloadToggle, setReloadToggle] = useState(false)
	const [items, setItems] = useState<React.JSX.Element[]>()

	// Subscribe to changes in bingo table for shuffling
	pb.collection<Board>('boards').subscribe(`${id}`, () => {
		setReloadToggle(!reloadToggle)
	})

	useEffect(() => {
		var nextCorner: Corner = Corner.TopLeft
		var row: React.JSX.Element[] = []
		var rowNumber: number = 0
		const itemArray: React.JSX.Element[] = []

		getBoard(id.toString()).then((data) => {
			rowNumber = 0
			for (var i = 0; i < data.size ** 2; i++) {
				var corner: Corner | null = null
				if (i === 0) {
					corner = nextCorner++
				}
				if (i === data.size - 1) {
					corner = nextCorner++
				}
				if (i === data.size * (data.size - 1)) {
					corner = nextCorner++
				}
				if (i === data.size ** 2 - 1) {
					corner = nextCorner++
				}

				row.push(
					<BingoBoardItem
						key={i}
						field={i}
						id={data.id}
						text={pbStringToArray(data.fields)[i]}
						initActive={pbStringToArray(data.fieldsActive)[i] === '0' ? false : true}
						corner={corner}
					/>
				)
				if (i % data.size === data.size - 1) {
					itemArray.push(
						<ThemedView key={rowNumber} style={styles.row}>
							{row}
						</ThemedView>
					)
					rowNumber++
					row = []
				}
			}

			setItems(itemArray)
			setLoading(false)
			setReloadToggle(false)
		})
	}, [id, reloadToggle])

	return loading ? (
		<Loading />
	) : (
		<ThemedView style={styles.default}>
			<ThemedView style={styles.topBar}>
				<IconButton
					icon='arrow-back-outline'
					onPress={() => {
						router.back()
					}}
				/>
				<IconButton
					icon='reload-outline'
					onPress={() => {
						shuffleBoard(id.toString())
					}}
				/>
			</ThemedView>
			<ThemedView style={styles.bingoContainer}>{items}</ThemedView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	default: {
		height: '100%',
		width: '100%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	topBar: {
		flex: 1,
		height: '10%',
		marginTop: '5%',
		flexDirection: 'row',
		width: '90%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	bingoContainer: {
		flex: 6,
		height: '100%',
		width: '95%',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		textAlignVertical: 'center',
		marginBottom: '5%',
	},
	row: {
		flexDirection: 'row',
		height: '15%',
	},
})
