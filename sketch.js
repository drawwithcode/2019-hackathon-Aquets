var tgSound; //contains the song
var tgLogo; //contains the logo image
var fft; //contain the fft object
var waveArray = []; //contain all the WAVE object
var textOpacity = 0; //cont the opacity of the text

function preload(){
  //load the files
  tgSound = loadSound('assets/TG1_new.mp3');
  tgLogo = loadImage('assets/TG1_logo.png')
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  //create the fft object
  fft = new p5.FFT();
}

function draw() {
  clear();
  background("rgb(0,44,104)"); //background of the same color of the logo

  //store sound datas
  var analyzer = fft.analyze()
  var high = fft.getEnergy("highMid"); //HIGH frequency
  var treble = fft.getEnergy("treble"); //really HIGH frequency

  drawWorld(width/2, height/2, high*4); //draw the circle made of lines

  //create the WAVES when the osund is high
  if (treble >= 20 && time <= millis()) {
    var tempWave = new Wave(frameCount) //wave object
    waveArray.push(tempWave); //store in the array
    time = millis() + 50
  }

  for (var i = 0; i < waveArray.length; i++) {
    waveArray[i].display();
  }

  imageMode(CENTER)
  image(tgLogo,width/2, height/2, tgLogo.width/4, tgLogo.height/4)

  if (tgSound.isPlaying() == false) {
    if (textOpacity < 255) {
      textOpacity = textOpacity + 5;
    }
  }else {
    if (textOpacity > 0) {
      textOpacity = textOpacity - 50;
    }
  }

  textAlign(CENTER)
  textSize(32)
  noStroke();
  fill(255,255,255,textOpacity)
  text("PLAY",width/2,height/2)



}

function mouseClicked() {
  if (tgSound.isPlaying() == true) {
    tgSound.stop();
  }else{
    tgSound.play();
    tgSound.setVolume(0.3);
  }

  //clean the array form the previw WAVES
  var nWave = waveArray.length;
  for (var i = 0; i < nWave; i++) {
    waveArray = shorten(waveArray)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawWorld(_x,_y,_nLines) {
  for (var i = 0; i < _nLines; i++) {
    // find a random point on a circle
    let angle1 = random(0, 2 * PI);
    let xpos1 = _x + 200 * cos(angle1);
    let ypos1 = _y + 200 * sin(angle1);

    // find another random point on the circle
    let angle2 = random(0, 2 * PI);
    let xpos2 = _x + 200 * cos(angle2);
    let ypos2 = _y + 200 * sin(angle2);

    // draw a line between them
    strokeWeight(1)
    stroke("white")
    line(xpos1, ypos1, xpos2, ypos2);
  }
}

function Wave(_startFrame) {
  this.radius = _startFrame

  this.display = function() {
    strokeWeight(1)
    noFill();
    stroke("white")
    this.radius =400 + sq(frameCount-_startFrame);
    ellipse(width/2,height/2,this.radius)
  }
}
