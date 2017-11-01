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
          x: 10,
          y: 50
        },
        speed: {
          x: 1,
          y: 0
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
    this.bricks = [new Brick(50, 50, 3, this.config.brick)];
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

      let withinXBoundary = ball.right() >= brick.left() && ball.left() <= brick.right();

      if(withinXBoundary) {
        let bottomHit = ball.top() <= brick.bottom() && ball.top() >= brick.top();
        let topHit = ball.bottom() <= brick.top() && ball.bottom() >= brick.top();

        if(bottomHit || topHit) {
          brick.takeDamage();
          ball.reverseY();
          ball.reverseX();
        }
      }

      let withinYBoundary = ball.bottom() >= brick.top() && ball.top() <= brick.bottom();

      if(withinYBoundary) {
        let leftHit = ball.right() >= brick.left() && ball.right() <= brick.right();
        let rightHit = ball.left() <= brick.right() && ball.left() >= brick.left();

        if(leftHit || rightHit) {
          brick.takeDamage();
          ball.reverseY();
          ball.reverseX();
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