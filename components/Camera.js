import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Camera as ExpoCamera } from 'expo-camera'
import { useDispatch } from 'react-redux'
import { handleDoublePressWithState } from './../utils/doublePress.util'
import { rootActions } from '../redux/root.actionTypes'
import { constants } from '../utils/constants'

const { width: screenWidth } = Dimensions.get('window')

export function Camera({ children }) {
	const dispatch = useDispatch()
	const [hasCameraPermissions, setHasCameraPermissions] = useState(false)
	const [lastPress, setLastPress] = useState(0)
	const [type, setType] = useState(ExpoCamera.Constants.Type.front)

	useEffect(() => {
		const getPermissions = async () => {
			const videoPermission = await ExpoCamera.requestCameraPermissionsAsync()
			const audioPermission = await ExpoCamera.requestMicrophonePermissionsAsync()

			setHasCameraPermissions(
				videoPermission.status === 'granted' && audioPermission.status === 'granted'
			)
		}

		getPermissions()
	}, [])

	const reverseCamera = () => {
		handleDoublePressWithState(() => {
			setType(prevType =>
				prevType === ExpoCamera.Constants.Type.back
					? ExpoCamera.Constants.Type.front
					: ExpoCamera.Constants.Type.back
			)
		})(lastPress, setLastPress)
	}

	const setGlobalCamera = ref =>
		dispatch({ type: rootActions.SET_CAMERA, camera: ref })

	if (hasCameraPermissions) {
		return (
			<ExpoCamera
				style={styles.camera}
				type={type}
				ratio="16:9"
				ref={setGlobalCamera}
			>
				<TouchableOpacity style={styles.container} onPress={reverseCamera}>
					<View style={{ width: 0, height: 0 }} />
					{children}
				</TouchableOpacity>
			</ExpoCamera>
		)
	}

	return <View style={styles.noCam} />
}

const styles = StyleSheet.create({
	camera: {
		width: screenWidth,
		height: '100%',
		zIndex: -1,
	},
	container: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
		position: 'relative',
	},
	noCam: {
		width: screenWidth,
		flex: 1,
		backgroundColor: constants.colors.darkgrey,
	},
})
