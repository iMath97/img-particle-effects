export default class Particle {
    constructor(mappedImage) {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.speed = 0;
      this.velocity = Math.random() * 2.5;
      this.size = Math.random() * 1.5 + 0.5; // 1.5 + 1
      this.position1 = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
      this.mappedImage = mappedImage;
    }

    update() {
      this.position1 = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
      this.speed = this.mappedImage[this.position1][this.position2].cellBrightness;

      let movement = 2.5 - this.speed + this.velocity;

      this.y += movement;

      if (this.y >= canvas.height) {
        this.y = 0;
        this.x = Math.random() * canvas.width;
      }
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
}