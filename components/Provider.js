import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore } from '../redux/configureStore'
import initialRootState from '../redux/initialRootState'
import { StackNavigatorProvider } from './StackNavigator'

const store = configureStore(initialRootState)

export const Provider = ({ children }) => {
	return (
		<ReduxProvider store={store}>
			<StackNavigatorProvider>{children}</StackNavigatorProvider>
		</ReduxProvider>
	)
}
