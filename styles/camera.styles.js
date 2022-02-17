import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		backgroundColor: 'red',
	},
})

export default styles
