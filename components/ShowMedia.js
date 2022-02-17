import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getCamera } from '../redux/root.selectors'
import { screenDimensions } from '../utils/dimensions.utils'

export function ShowMedia({ navigation, route }) {
	const camera = useSelector(getCamera())

	const handlePress = async () => {
		await camera.resumePreview()
		navigation.goBack()
	}

	return (
		<TouchableOpacity style={styles.container} onPress={handlePress}>
			<Image style={styles.image} source={{ uri: route.params.uri }} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 100,
		backgroundColor: 'black',
		flex: 1,
	},
	image: {
		width: screenDimensions.width,
		height: '100%',
	},
})
