class Brick {
	constructor(x, y, hp) {
		this.x = x;
		this.y = y;
		this.hp = hp;

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
}