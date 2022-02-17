import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { createStackNavigator } from '@react-navigation/stack'

// export const Stack = createSharedElementStackNavigator()
export const Stack = createStackNavigator()

export function StackNavigatorProvider({ children }) {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				{children}
			</Stack.Navigator>
		</NavigationContainer>
	)
}
