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
  	this.vector.x = this.vector.x * -1;
  }

  reverseY() {
  	this.vector.y = this.vector.y * -1;
  }

  updateBallPosition() {
  	let text = document.getElementById('ballPosition');
  	text.innerText = `X: ${this.x} - Y: ${this.y}`;

    text = document.getElementById('ballSpeed');
    text.innerText = `X: ${this.vector.x} - Y: ${this.vector.y}`;
  }
}