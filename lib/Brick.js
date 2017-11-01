export default class Brick {
	constructor(x, y, hp, dimensions) {
		this.x = x;
		this.y = y;
		this.hp = hp;

		this.width = dimensions.width;
		this.height = dimensions.height;

		this.color = {
			1: 'white',
			2: 'lightblue',
			3: 'red',
			4: 'gray',
			5: 'purple'
		}
	}

	takeDamage() {
		this.hp -= 1;
	}

	left() {
		return this.x;
	}

	right() {
		return this.x + this.width;
	}

	top() {
		return this.y;
	}

	bottom() {
		return this.y + this.height;
	}
}