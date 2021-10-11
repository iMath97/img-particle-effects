import Particle from "./Particle.js";

const button = document.querySelector(".js-button");

window.onload = () => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1080;
  canvas.height = 1350;

  const myImage = new Image();
  myImage.src = 'iron-man.jpg';
  // convert img to base64
  toDataURL(myImage.src, (dataUrl) => {
    myImage.src = dataUrl;
  });

  // draw the image
  myImage.onload = () => {
    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let particles = [];
    let numberOfParticles = 25000;

    let mappedImage = [];
    for (let y = 0; y < canvas.height; y++) {
      let row = [];
      for (let x = 0; x < canvas.width; x++) {
        const red = pixels.data[y * 4 * pixels.width + x * 4];
        const green = pixels.data[y * 4 * pixels.width + (x * 4 + 1)];
        const blue = pixels.data[y * 4 * pixels.width + (x * 4 + 2)];
        const brightness = calculateRelativeBrightness(red, green, blue);
        const cell = {
          cellBrightness: brightness,
          color: `rgb(${red}, ${green}, ${blue})`,
        };
        row.push(cell);
      }
      mappedImage.push(row);
    }
    console.log(mappedImage);

    function calculateRelativeBrightness(red, green, blue) {
      return Math.sqrt(
        (red * red) * 0.299 + 
        (green * green) * 0.587 + 
        (blue * blue) * 0.114
      ) / 100;
    }

    button.addEventListener("click", () => {
      const toFadeOut = document.querySelectorAll('.js-fadeout');
      
      toFadeOut.forEach((element) => {
        element.classList.add('faded');
      });

      setTimeout(() => {
        document.querySelector(".popup").remove();
      }, 1000);

      init();
      animate();
    });

    // init particles
    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(mappedImage));
      }
    };

    // animate
    function animate() {
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.2;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        ctx.globalAlpha = particles[i].speed * 0.4;
        particles[i].draw(ctx);
      }

      requestAnimationFrame(animate);
    };
  };
};

//* Helper functions

// convert an img to base64 url
function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    img.src = src;
  }
}
