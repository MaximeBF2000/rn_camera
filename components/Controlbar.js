import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Colors } from 'react-native-paper'
import { Camera as ExpoCamera } from 'expo-camera'
import { createAssetAsync } from 'expo-media-library'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator'
import { rgba } from 'polished'
import { useSelector } from 'react-redux'
import { getCamera } from '../redux/root.selectors'
import { alerting } from '../utils/alerting.util'
import { constants } from '../utils/constants'

const saveAsset = asset => {
	createAssetAsync(asset.uri)
	// const actions = [{ rotate: 180 }, { flip: FlipType.Vertical }]
	// const savingOptions = { compress: 1, format: SaveFormat.PNG }
	// manipulateAsync(photo.uri, actions, savingOptions).then(treatedPhoto =>
	// 	createAssetAsync(treatedPhoto.uri)
	// )
}

export function Controlbar() {
	const camera = useSelector(getCamera())
	const [isRecording, setIsRecording] = useState(false)

	const takePicture = async () => {
		alerting(
			err =>
				`An error occured while saving your photo | Error: ${JSON.stringify(err)}`,
			async () => {
				await camera.takePictureAsync({
					quality: 0.5,
					skipProcessing: true,
					onPictureSaved: saveAsset,
				})
			}
		)
	}

	const record = async () => {
		if (isRecording) {
			alerting(
				err =>
					`An error occured while trying to record | Error: ${JSON.stringify(err)}`,
				async () => await camera.stopRecording()
			)
		} else {
			alerting(
				err => `An error occured : ${JSON.stringify(err)}`,
				async () => {
					const video = await camera.recordAsync({
						quality: ExpoCamera.Constants.VideoQuality['1080p'],
					})
					saveAsset(video)
				}
			)
		}
		setIsRecording(prevState => !prevState)
	}

	return (
		<View style={styles.container}>
			<IconButton
				icon="camera"
				style={styles.iconButton}
				color={Colors.white}
				size={35}
				onPress={takePicture}
			/>
			<IconButton
				icon={isRecording ? 'stop' : 'play'}
				style={styles.iconButton}
				color={isRecording ? Colors.red800 : Colors.white}
				size={40}
				onPress={record}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		marginBottom: 40,
		borderRadius: 50,
		backgroundColor: rgba(constants.colors.darkgrey, 0.5),
	},
	iconButton: {},
})
