import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native'
import { MediaItem } from './MediaItem'
import { screenDimensions } from '../utils/dimensions.utils'
import { getMedias } from '../utils/getMedias.utils'
import { constants } from '../utils/constants'

const TEST_URI =
	'https://media-exp1.licdn.com/dms/image/C4D03AQFdxf_AubBuDg/profile-displayphoto-shrink_400_400/0/1636388077171?e=1647475200&v=beta&t=gCrI2RNLUT9n9rzDQz_H-FMbGmytkVsD1XLbMcg6IzE'

export function MediaGallery({ navigation }) {
	const [medias, setMedias] = useState([])

	useEffect(() => {
		const getPhotos = async () => {
			const photos = await getMedias()
			setMedias(photos.assets)
		}
		getPhotos()
	}, [])

	return (
		<View style={styles.gallery}>
			<StatusBar barStyle="light-content" backgroundColor="#181818" />
			<Text style={styles.title}>Media gallery</Text>
			<FlatList
				contentContainerStyle={styles.mediaContainer}
				numColumns={3}
				data={medias}
				key="mediasContainer_"
				keyExtractor={item => `mediasContainer_${item.id}`}
				renderItem={({ item, index }) => (
					<MediaItem
						id={item.id}
						uri={item.uri}
						navigation={navigation}
						style={{
							marginRight: (index + 1) % 3 === 0 ? 0 : 8,
						}}
					/>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	gallery: {
		width: screenDimensions.width,
		flex: 1,
		// backgroundColor: constants.colors.darkgrey,
		backgroundColor: '#fafafa',
	},
	title: {
		// color: 'white',
		color: 'black',
		fontWeight: 'bold',
		fontSize: 28,
		marginTop: 50,
		marginBottom: 30,
		marginLeft: 20,
	},
	mediaContainer: {
		paddingHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
})
