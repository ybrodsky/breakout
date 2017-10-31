class Board {

	constructor(ctx, options = {}) {
    this.ctx = ctx;

    this.config = {
      width: 400,
      height: 400,
      player: {
        x: 150,
        y: 350,
        color: '#ffffff'
      },
      updateInterval: 16.66,
      ball: {
        radius: 8,
        color: '#ffffff',
        spawn: {
          x: 120,
          y: 170
        },
        speed: {
          x: 1.6,
          y: 2.5
        }
      },
      brick: {
        width: 70,
        height: 20
      },
      debug: {
        ballPosition: true,
        playerPosition: true
      }
    }

    for(let key in options) {
      this.config[key] = options[key];
    }

    this.balls = [];
    this.bricks = [new Brick(50, 50, 3)];
    this.player = new Player(this.config.player.x, this.config.player.y, this.config.width);

    this.lastFrame = performance.now();
    setInterval(() => this.update(), this.config.updateInterval);
  }

  addBall() {
    let ball = new Ball(
      this.config.ball.spawn.x,
      this.config.ball.spawn.y,
      this.config.ball.radius,
      new Vector(this.config.ball.speed.x, this.config.ball.speed.y)
    );

    this.balls.push(ball);
  }

  update() {
    this.clearCanvas();
    this.drawPlayer();
    this.drawBricks();

    this.balls.forEach((ball) => {
      ball.move();
      this.detectBoundaryCollision(ball);
      this.detectPlayerCollision(ball);
      this.detectBrickCollision(ball);

      this.drawBall(ball);
    });
  }

  drawBricks() {
    this.ctx.beginPath();
    this.bricks.forEach((brick) => {
      this.ctx.rect(brick.x, brick.y, this.config.brick.width, this.config.brick.height);
      this.ctx.fillStyle = brick.color[brick.hp];
      this.ctx.fill();
      this.ctx.stroke();
    });
    this.ctx.closePath();
  }

  drawBall(ball) {
    this.ctx.beginPath();
    this.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.config.ball.color;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawPlayer() {
    this.ctx.rect(this.player.x, this.player.y, 80, 16);
    this.ctx.fillStyle = this.config.player.color;
    this.ctx.fill();
    this.ctx.stroke();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.config.width, this.config.height);
  }

  detectBrickCollision(ball) {
    this.bricks.forEach((brick) => {
      let leftX = ball.x + ball.radius >= brick.x;
      let rightX = ball.x - ball.radius <= brick.x + this.config.brick.width;

      if(leftX && rightX) {
        if(ball.y - ball.radius > brick.y) {
          if(ball.y - ball.radius <= brick.y + (this.config.brick.height)) {
            brick.takeDamage();
            ball.reverseY();
            ball.reverseX();
          }
        } else if(ball.y + ball.radius < brick.y + this.config.brick.height) {
          if(ball.y - ball.radius >= brick.y - (this.config.brick.height - 5)) {
            brick.takeDamage();
            ball.reverseY();
            ball.reverseX();
          }
        }
      }

    });

    this.bricks = this.bricks.filter(brick => brick.hp > 0);
  }

  detectPlayerCollision(ball) {
    if(ball.y + ball.radius >= this.player.y && ball.x >= this.player.x && ball.x <= this.player.x + 80) {
      ball.reverseY();
    }
  }

  detectBoundaryCollision(ball) {
    if(ball.x + ball.radius >= this.config.width || ball.x - ball.radius <= 0) {
      ball.reverseX();
    }

    if(ball.y + ball.radius >= this.config.height || ball.y - ball.radius <= 0) {
      ball.reverseY();
    }
  }
}