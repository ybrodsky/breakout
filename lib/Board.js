class Board {
	constructor(ctx, width, height) {
  	this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.balls = [];
    this.player = new Player(150, 350);

    this.lastFrame = performance.now();
    setInterval(() => this.update(), 16.66);

    //this.update = this.update.bind(this);
    this.detectBoundaryCollision = this.detectBoundaryCollision.bind(this);
  }

  addBall() {
    this.balls.push(new Ball(50, 75, 8, new Vector(0.98, 0.6666)));
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.rect(this.player.x, this.player.y, 80, 15);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.stroke();

  	this.balls = this.balls.map(ball => {
      ball.move();

    	this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = 'white';
      this.ctx.fill();
      this.ctx.stroke();

      return ball;
    }).map(this.detectBoundaryCollision);
  }

  detectBoundaryCollision(ball) {
    if(ball.x + ball.radius >= this.width || ball.x - ball.radius <= 0) {
      ball.reverseX();
    }

    if(ball.y + ball.radius >= this.height || ball.y - ball.radius <= 0) {
      ball.reverseY();
    }

    return ball;
  }
}