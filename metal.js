// Sketch linked to metal.html

const density = "█▓▒░:.        ";
const color = "yellow";
const font = "Akronim";
const genre = "METAL";
const kaomoji = "  凸( •̀_•́ )凸";
let music;
let fft;
let video;
let asciiDiv;

function preload() {
  music = loadSound("./assets/dark-matter.mp3");
}

function setup() {
  createCanvas(windowWidth, 120);

  music.play(); // starts playing
  music.loop(); // play again when done

  // FFT (Fast Fourier Transform) is an analysis algorithm that isolates individual audio frequencies within a waveform
  fft = new p5.FFT();
  music.amp(0.2); //set the output volume of the filter

  video = createCapture(VIDEO);
  video.size(windowWidth / 15, windowHeight / 15);
  video.hide();
  asciiDiv = createDiv();
}

function draw() {
  // use background() within draw() to clear the display window at the beginning of each frame
  background("black");

  textAlign(CENTER);
  fill(color);
  textFont(font);
  textSize(windowWidth * 0.06);
  text(genre + kaomoji, width / 2, height / 2);

  textSize(windowWidth * 0.025);
  textAlign(LEFT);
  let rooms = "To select the room, press the ←↕→ keys";
  text(rooms, 10, height - 15);

  textAlign(RIGHT);
  let rooms2 = "To return to the hall, press ENTER";
  text(rooms2, width - 10, height - 15);

  // FFT.waveform() returns an array of amplitude values (between -1.0 and +1.0) that represent a snapshot of amplitude readings in a single buffer; it can be used to draw the waveform of a sound
  let waveform = fft.waveform();
  push();
  noFill();
  // beginShape() and endShape() functions allow creating more complex forms. beginShape() begins recording vertices for a shape and endShape() stops recording
  beginShape();
  stroke(color);
  strokeWeight(3);
  for (let i = 0; i < waveform.length; i++) {
    /* map() re-maps a number from one range to another. 
    For example, in the first line "i" is converted from a value in the range of 0 to waveform.lenght into a value that ranges from the left edge of the window (0) to the right edge (width) */
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height + 20);
    // the position of the joint vertices depends on the audio frequencies
    vertex(x, y);
  }
  endShape();
  pop();

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

  if (keyCode === ENTER) {
    window.open("http://127.0.0.1:5500/index.html", "_self");
  }
}
