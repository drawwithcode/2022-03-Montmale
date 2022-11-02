// Sketch linked to index.html

/* CONVERTING WEBCAM INPUT TO ASCII ART
(images created using the ASCII text characters)

Each pixel of the image is associated with three values r, g, b which determine its color. 
The average of these values could indicate the brightness of that pixel, from 0 to 255.
We assign a character to this numeric value of brightness in order to generate
the contrast between the characters and therefore the contrast of the image.

For example, we use the following array of density: "Ñ@#W$9876543210?!abc;:+=-,._"
If the average brightness value is 0, we would use the Ñ.
If the average brightness value is 255, we would use white space.
Any value between 0 and 255 would use a value between the two of them. */

const density = "Ñ@#W$9876543210?!abc;:+=-,._                    ";
const color = "green";
const font = "Righteous";
let video;
let asciiDiv;

function preload() {
  music = loadSound("./assets/meditation.mp3");
}

function setup() {
  music.play();
  music.setVolume(0.5);

  createCanvas(windowWidth, 100);
  background("black");
  fill(color);
  textAlign(CENTER);
  textFont(font);
  // the size of the text is relative to the width of the window to make the text responsive
  textSize(windowWidth * 0.05);
  let title = "Welcome to the disco!";
  text(title, width / 2, height / 2);

  textSize(windowWidth * 0.02);
  let rooms = "To select the room, press the ←↕→ keys";
  text(rooms, width / 2, height / 1.3);

  video = createCapture(VIDEO);
  video.size(windowWidth / 16, windowHeight / 16);
  video.hide();
  asciiDiv = createDiv();
}

function draw() {
  asciiDiv.style("color", color);

  video.loadPixels();

  // Display everything as a single content
  let asciiImage = "";

  // Analyze each column
  for (let j = 0; j < video.height; j++) {
    // Analyze each row of that column
    for (let i = 0; i < video.width; i++) {
      // video.pixels will return an array containing the values for all the pixels in the display window
      const pixelIndex = (i + j * video.width) * 4; // (row + column * video.width) * 4 ---> we have to multiply *4 because of the R, G, B, A values for each pixel
      const r = video.pixels[pixelIndex + 0]; // RGB values ​​will be returned (at position 0, 1 and 2)
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3; // average of the R, G, B values

      const len = density.length;
      // floor() returns an integer (rounded down number)
      // map () takes the brightness value ("avg") between 0 and 255 and maps it to a value between 0 and density.lenght
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);

      // no breaking space (empty space) to make it a perfect square
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }

    // add a line break after each line
    asciiImage += "<br/>";
  }

  asciiDiv.html(asciiImage);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    // Open in the same window the following url:
    window.open("http://127.0.0.1:5500/techno.html", "_self");
  }
  if (keyCode === RIGHT_ARROW) {
    window.open("http://127.0.0.1:5500/jazz.html", "_self");
  }
  if (keyCode === UP_ARROW) {
    window.open("http://127.0.0.1:5500/reggae.html", "_self");
  }

  if (keyCode === DOWN_ARROW) {
    window.open("http://127.0.0.1:5500/metal.html", "_self");
  }
}
