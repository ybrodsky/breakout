class Ball {
	constructor(x, y, radius, vector, fill = '#ffffff') {
  	this.x = x;
    this.y = y;
    this.radius = radius;
    this.fill = fill;
    this.vector = vector;
  }

  move() {
  	this.x = this.x + this.vector.x;
  	this.y = this.y + this.vector.y;

  	this.updateBallPosition();
  }

  reverseX() {
  	this.vector.x = this.vector.x * (-1 + Math.floor(Math.random() * 0.1) + 0.25);
  }

  reverseY() {
  	this.vector.y = this.vector.y * (-1 + Math.floor(Math.random() * 0.1) + 0.25);
  }

  updateBallPosition() {
  	let text = document.getElementById('ballPosition');
  	if(!text) return false;

  	text.innerText = `X: ${this.x} - Y: ${this.y}`;
  }
}