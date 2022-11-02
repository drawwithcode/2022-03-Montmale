// Sketch linked to reggae.html

const density = "Ñ@#W$9876543210?!abc;:+=-,._                    ";
const color = "red";
const font = "Poor Story";
const genre = "REGGAE";
const kaomoji = "  ♡〜٩( ˃▿˂ )۶〜♡";
let music, amplitude;
let video;
let asciiDiv;

function preload() {
  music = loadSound("./assets/reggae.mp3");
}

function setup() {
  createCanvas(windowWidth, 150);

  music.play(); // starts playing
  music.loop(); // play again when done
  music.setVolume(0.5); // turn down the volume of the sound file

  amplitude = new p5.Amplitude();

  video = createCapture(VIDEO);
  video.size(windowWidth / 15, windowHeight / 15);
  video.hide();
  asciiDiv = createDiv();
}

function draw() {
  background("black");
  // Get the average (root mean square) amplitude
  let level = amplitude.getLevel();
  // the level is converted from a value in the range of 0 to 1 into a value that ranges from 0 to 255 (red amount)
  let red = map(level, 0, 1, 0, 255);
  // only the red changes according to the amplitude
  fill(red * 4, 0, 0);

  textAlign(CENTER);
  textFont(font);
  textSize(windowWidth * 0.07);
  text(genre + kaomoji, width / 2, height / 2);

  textSize(windowWidth * 0.025);
  textAlign(LEFT);
  let rooms = "To select the room, press the ←↕→ keys";
  text(rooms, 10, height - 20);

  textAlign(RIGHT);
  let rooms2 = "To return to the hall, press ENTER";
  text(rooms2, width - 10, height - 20);

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
    window.open("./techno.html", "_self");
  }

  if (keyCode === RIGHT_ARROW) {
    window.open("./jazz.html", "_self");
  }

  if (keyCode === UP_ARROW) {
    window.open("./reggae.html", "_self");
  }

  if (keyCode === DOWN_ARROW) {
    window.open("./metal.html", "_self");
  }

  if (keyCode === ENTER) {
    window.open("./index.html", "_self");
  }
}
