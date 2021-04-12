export default function(value) {
	const expression = /\b(https?):\/?\/[\-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_|]/
	const regexp = new RegExp(expression)
	return regexp.test(value)
}