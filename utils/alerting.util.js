export const alerting = async (errorMessage, callback) => {
	try {
		await callback()
	} catch (err) {
		alert(typeof errorMessage === 'function' ? errorMessage(err) : errorMessage)
	}
}
