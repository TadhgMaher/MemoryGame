const button = document.querySelector('.start-button');
const light = document.querySelector('.light');
const circleContainer = document.querySelector('.circle-container');
const circles = document.querySelectorAll('.red, .green, .yellow, .blue');

let flashCount = 0;
let nextCircleIndex = 0;
let score = 0;
var highScore = 0;

let sequence = [];

function init() {
  sequence = [];
  flashCount = 0;
  nextCircleIndex = 0;
  score = 0;
  light.style.backgroundColor = 'green'; //Resets game state
}

function addToSequence() {
  const randomOne = Math.floor(Math.random() * circles.length);
  sequence.push(randomOne); // Generation of a random number from 0 and 4 and then adds it to the end of array
}

function flashCircle(index) {
  const circle = circles[sequence[index]];
  circle.style.opacity = 0.6; //for the flashing effect youre using opacity could change
  setTimeout(() => {
    circle.style.opacity = 1;
    if (index < sequence.length - 1) { //flashes circle at right time in sequence then uses recursion
      setTimeout(() => {
        flashCircle(index + 1); //adding 1
      }, 500);
    } else {
      nextCircleIndex = 0;
      circleContainer.classList.remove('inactive');
    }
  }, 500);
}

function startRound() {
  addToSequence();
  flashCircle(0); //just a simple start round function by adding 1 to sequence of circles
}

button.addEventListener('click', () => {
  init();
  startRound(); // The easy click start to begin do not change this again 
});

circles.forEach(circle => {
  circle.addEventListener('click', () => { //clicking affect needs to use glow and be with all circles
    const expectedIndex = sequence[nextCircleIndex];
    if (circle === circles[expectedIndex]) {
      circle.classList.add('glow');
      setTimeout(() => {
        circle.classList.remove('glow'); //you need this to remove the glow instead of it constantly remaining green
      }, 500);
      nextCircleIndex++;
      if (nextCircleIndex >= sequence.length) {
        circleContainer.classList.add('inactive');
        light.style.backgroundColor = 'green';
        CountingScore();
        setTimeout(() => {
          startRound();
        }, 1000);
      }
    } else {
      light.style.backgroundColor = 'red';
      circleContainer.classList.add('inactive'); //the little light turning red

      if(score > highScore) {
        highScore = score;
      }
      document.getElementById("currentScore").innerHTML = "00";
      document.getElementById("highScore").innerHTML = highScore;
      score = 0;
      for(let i = 0; i < 5; i++) { //Loops 5 flashes
        setTimeout(() => { //Makes sure they dont all just flash at once
          circles.forEach(circle => {
            circle.classList.add('failure');
            setTimeout(() => {
              circle.classList.remove('failure');
            }, 250); //Makes it quick flashes
          });
        }, i * 500);
      }
    }
  });
});

function CountingScore() {
  score++; //just goes up by 1 every time of reset
  document.getElementById("currentScore").innerHTML = score; // counts score
}
