export function checkDeath(object, canvas) {
	if (
		object.x < 0 ||
		object.x > canvas.width ||
		object.y < 0 ||
		object.y > canvas.height ||
		object?.opacity <= 0 ||
		object?.size <= 0.8
	) {
		return true;
	}
	return false;
}

// function to generate random number inclusive of min and max
export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// function to generate random number inclusive of min and max for decimal numbers
export function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
}
