class Vector2D {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	copy() {
		return new Vector2D(this.x, this.y);
	}

	inverse() {
		return this.multiply(-1);
	}

	modulus() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	setMag(mag: number) {
		return new Vector2D(this.x * (mag / this.modulus()), this.y * (mag / this.modulus()));
	}

	angleWith(otherVector: Vector2D) {
		return Math.acos(this.dotProduct(otherVector) / (this.modulus() + otherVector.modulus()));
	}

	add(vector: Vector2D) {
		return new Vector2D(this.x + vector.x, this.y + vector.y);
	}

	subtract(vector: Vector2D) {
		return new Vector2D(this.x - vector.x, this.y - vector.y);
	}

	divide(n: number) {
		return new Vector2D(this.x / n, this.y / n);
	}

	multiply(n: number) {
		return new Vector2D(this.x * n, this.y * n);
	}

	dotProduct(vector: Vector2D) {
		return this.x * vector.y + this.y * vector.x;
	}

	toUnitary() {
		return this.divide(this.modulus());
	}
}

export default Vector2D;
