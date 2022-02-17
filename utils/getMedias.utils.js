import {
	requestPermissionsAsync,
	getPermissionsAsync,
	getAlbumAsync,
	getAssetsAsync,
	getAlbumsAsync,
} from 'expo-media-library'

const displayAllAlbums = async () => {
	// It seems that the album for all elements is named '0'
	const albums = await getAlbumsAsync()
	console.log({ albums: albums.map(e => e.title) })
}

export const getMedias = async () => {
	const permission = await requestPermissionsAsync()
	const cameraAlbum = await getAlbumAsync('0')

	await displayAllAlbums()

	const assets = await getAssetsAsync({
		first: 100,
		album: cameraAlbum,
		sortBy: ['creationTime'],
		mediaType: ['photo', 'video'],
	})

	return assets
}
