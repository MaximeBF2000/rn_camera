import { rootActions } from './root.actionTypes'

export const rootReducer = (state = {}, action = {}) => {
	const { type, ...payload } = action

	switch (type) {
		case rootActions.SET_CAMERA:
			return { ...state, camera: payload.camera }
		default:
			return state
	}

	return state
}
