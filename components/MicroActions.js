import React, { useState } from 'react'
import { rgba } from 'polished'
import { StyleSheet, View } from 'react-native'
import { IconButton, Colors } from 'react-native-paper'
import { constants } from '../utils/constants'

export function MicroActions() {
	const [mute, setMute] = useState(false)
	const [flashOn, setFlashOn] = useState(false)

	return (
		<View style={styles.container}>
			<IconButton
				icon={mute ? 'microphone-off' : 'microphone'}
				style={styles.iconButton}
				color={Colors.white}
				size={20}
				onPress={() => setMute(ps => !ps)}
			/>
			<IconButton
				icon={flashOn ? 'flash' : 'flash-off'}
				style={styles.iconButton}
				color={Colors.white}
				size={20}
				onPress={() => setFlashOn(ps => !ps)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 40,
		right: 10,
		paddingVertical: 5,
		backgroundColor: rgba(constants.colors.darkgrey, 0.5),
		borderRadius: 50,
		// backgroundColor: 'red',
	},
	iconButton: {},
})
