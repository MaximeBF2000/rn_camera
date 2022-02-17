import React, { useState, useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { now } from './../utils/date.utils'

export function DoubleTouch({ children, onDoublePress, delay = 200, ...props }) {
	const [last, setLast] = useState(0)

	const handlePress = useCallback(
		(...args) => {
			const delta = now() - last

			if (delta < delay) {
				onDoublePress(...args)
			}

			setLast(now())
		},
		[last]
	)

	return (
		<TouchableOpacity onPress={handlePress} {...props}>
			{children}
		</TouchableOpacity>
	)
}
