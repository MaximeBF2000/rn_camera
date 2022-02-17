import { now } from './date.utils'

export const handleDoublePressWithState =
	(callback, delay = 300) =>
	(last, setLast) => {
		const delta = now() - last

		if (delta < delay) {
			callback()
		}

		setLast(now())
	}
