// Sketch linked to jazz.html

const density = "        .:░▒▓█";
const color = "blue";
const font = "Shalimar";
const genre = "JAZZ";
const kaomoji = "  ( ˘͈ ᵕ ˘͈♡)";

let music;
let analyser;
let video;
let asciiDiv;

function preload() {
  music = loadSound("./assets/the-ghost-of-shepard's-pie.mp3");
}

function setup() {
  createCanvas(windowWidth, 150);

  music.play(); // starts playing
  music.loop(); // play again when done
  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  analyzer.setInput(music);

  video = createCapture(VIDEO);
  video.size(windowWidth / 15, windowHeight / 15);
  video.hide();
  asciiDiv = createDiv();
}

function draw() {
  background("black");

  // Get the average (root mean square) amplitude
  let volume = analyzer.getLevel();
  // the size and distance of the hearts changes according to the size of the window
  const s = windowWidth * 0.09;
  for (x = 0; x < width; x += s) {
    for (y = 0; y < height / 2; y += s) {
      // the amount of red increases as x increases
      fill((310 * x) / width, 127, 255);
      // the size of the hearts also varies according to the volume of the audio
      heart(x + s / 2, y + s / 2, s * volume * 3);
    }
  }

  fill(color);
  textAlign(CENTER);
  textFont(font);
  textSize(windowWidth * 0.07);
  text(genre + kaomoji, width / 2, height / 2);

  textSize(windowWidth * 0.03);
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

// Create the shape of the heart using the bezier curves
function heart(x, y, size) {
  beginShape(); // begins recording vertices for a shape
  vertex(x, y);
  /* bezierVertex() specifies vertex coordinates for Bezier curves. 
  Each call to bezierVertex() defines the position of two control points and one anchor point of a Bezier curve
  bezierVertex(x2, y2, x3, y3, x4, y4) */
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  stroke(color);
  strokeWeight(1);
  endShape(); // stops recording
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
