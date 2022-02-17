import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Camera } from './components/Camera'
import { MediaGallery } from './components/MediaGallery'
import { screenDimensions } from './utils/dimensions.utils'
import { Stack } from './components/StackNavigator'
import { ShowMedia } from './components/ShowMedia'
import { Provider } from './components/Provider'
import { Controlbar } from './components/Controlbar'
import { MicroActions } from './components/MicroActions'

export default function App() {
	return (
		<Provider>
			<Stack.Screen
				name="Main"
				children={({ navigation }) => (
					<View style={styles.container}>
						<ScrollView
							horizontal
							snapToInterval={screenDimensions.width}
							showsHorizontalScrollIndicator={false}
							decelerationRate="fast"
						>
							<Camera>
								<Controlbar />
								<MicroActions />
							</Camera>
							<MediaGallery navigation={navigation} />
						</ScrollView>
						<StatusBar style="auto" />
					</View>
				)}
			/>
			<Stack.Screen name="ShowMedia" component={ShowMedia} />
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
