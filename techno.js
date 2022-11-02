// Sketch linked to techno.html

const density = "       .:-i|=+%O#@";
const color = "magenta";
const font = "Play";
const genre = "TECHNO";
const kaomoji = "  ✩°｡‘(* · * )⸝";
let music;
let video;
let asciiDiv;

function preload() {
  music = loadSound("./assets/immersione.mp3");
}

function setup() {
  createCanvas(windowWidth, 150);

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
  background("black");
  fill(color);
  textAlign(CENTER);
  textFont(font);
  textSize(windowWidth * 0.07);
  text(genre + kaomoji, width / 2, height / 2);

  textSize(windowWidth * 0.02);
  textAlign(LEFT);
  let rooms = "To select the room, press the ←↕→ keys";
  text(rooms, 10, height - 20);

  textAlign(RIGHT);
  let rooms2 = "To return to the hall, press ENTER";
  text(rooms2, width - 10, height - 20);

  /* FFT.analyze() returns an array of amplitude values (between 0 and 255) across the frequency spectrum.
  Length is equal to FFT bins. The array indices correspond to frequencies, from the lowest to the highest that humans can hear. 
  Each value represents amplitude at that slice of the frequency spectrum*/
  let spectrum = fft.analyze();
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    /* map() re-maps a number from one range to another. 
    For example, in the first line "i" is converted from a value in the range of 0 to spectrum.lenght into a value that ranges from the left edge of the canvas (0) to the right edge (width) */
    let x = map(i, 0, spectrum.length, 0, width); // distribute the rectangles along the width of the canvas
    let h = -height + map(spectrum[i], 0, 255, height, 0); // the height range of the rectangles is that of the canvas
    rect(x, height, width / spectrum.length, h);
  }

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
