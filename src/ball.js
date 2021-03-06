export default class Ball {
  constructor(game) {
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;
    this.game = game;

    this.image = document.getElementById("img_ball");
    this.speed = { x: 2, y: 5 };
    this.position = { x: 10, y: 10 };
    this.size = 20;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // wall left or right
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0)
      this.speed.x = -this.speed.x;
    // wall top or bottom
    if (this.position.y + this.size > this.gameHeight || this.position.y < 0)
      this.speed.y = -this.speed.y;

    // check collision with paddle
    let bottomOfBall = this.position.y + this.size;
    let topOfPaddle = this.game.paddle.position.y;
    let leftSideOfPaddle = this.game.paddle.position.x;
    let rightSideOfPaddle =
      this.game.paddle.position.x + this.game.paddle.width;

    if (
      bottomOfBall >= topOfPaddle &&
      this.position.x > leftSideOfPaddle &&
      this.position.x + this.size < rightSideOfPaddle
    ) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
