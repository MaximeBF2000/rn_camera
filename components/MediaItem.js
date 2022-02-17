import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getCamera } from './../redux/root.selectors'

export function MediaItem({ id, uri, style, navigation }) {
	if (!uri) return null

	const camera = useSelector(getCamera())

	const showMedia = async () => {
		await camera.pausePreview()
		navigation.navigate('ShowMedia', { id, uri })
	}

	return (
		<TouchableOpacity onPress={showMedia}>
			<Image style={[styles.media, style]} source={{ uri }} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	media: {
		width: 100,
		height: 200,
		marginBottom: 8,
		backgroundColor: 'lightgrey',
		borderRadius: 8,
	},
})
