class Player {
	constructor(x, y, width) {
		this.x = x;
		this.y = y;

		this.worldWidth = width;

		this.step = 5;

		this.movePlayer = this.movePlayer.bind(this);
		window.addEventListener('keydown', this.movePlayer, true);
	}

	movePlayer(e) {
		if(e.keyCode == 37 && this.x >= 10) {
			this.x -= this.step;
		} else if(e.keyCode == 39 && this.x <= this.worldWidth - 90) {
			this.x += this.step;
		}
	}
}