// variables corresponding to html elements
const start = document.querySelector('#start');
const timer = document.querySelector('.timer')
const welcome = document.querySelector('#welcome');
const question1 = document.querySelector('#question1');
const question2 = document.querySelector('#question2');
const question3 = document.querySelector('#question3');
const question4 = document.querySelector('#question4');
const question5 = document.querySelector('#question5');
const conclusion = document.querySelector('#conclusion');
const viewHighScore = document.querySelector('#high-score');
const footer = document.querySelector('.right-wrong');
const congrats = document.querySelector('#congrats');
const enterScore = document.querySelector('#enterScore');

// function for switching from initial display to first question and starting timer
function displayQuestion() {
    setTimer();
    welcome.setAttribute('style', 'display: none;')
    question1.setAttribute('style', 'display: flex; flex-direction: column;')
}
start.addEventListener('click', displayQuestion);

// timer finction and stop timer for GAME OVER or end of game
let secondsLeft = 30;
timer.setAttribute('style', 'font-size: 3rem;')
function setTimer() {
    let interval = setInterval(() => {
        secondsLeft--;
        timer.textContent = `Time Left: ${secondsLeft}`;
        if (secondsLeft <= 0) {
            clearInterval(interval);
            timer.textContent = 'GAME OVER';
            modal2.style.display = 'block';
            overScore.textContent = `Score: ${points} / 5`;
        }else if (conclusion.style.display == 'flex') {
            clearInterval(interval);
        }else {
            return;
        }
    },1000)
}

let highScore = 0;
highScore = localStorage.getItem('high-score');

// function for switching to the next question, and completing the quiz
function nextQuestion() {
    if (question1.style.display === 'flex') {
        question1.setAttribute('style', 'display: none;');
        question2.setAttribute('style', 'display: flex; flex-direction: column;');
    }else if (question2.style.display === 'flex') {
        question2.setAttribute('style', 'display: none;');
        question3.setAttribute('style', 'display: flex; flex-direction: column;');
    }else if (question3.style.display === 'flex') {
        question3.setAttribute('style', 'display: none;');
        question4.setAttribute('style', 'display: flex; flex-direction: column;');
    }else if (question4.style.display === 'flex') {
        question4.setAttribute('style', 'display: none;');
        question5.setAttribute('style', 'display: flex; flex-direction: column;');
    } else if (question5.style.display === 'flex') {
        question5.setAttribute('style', 'display: none;');
        conclusion.setAttribute('style', 'display: flex; flex-direction: column;');
        conclusion.textContent = `Congratulations, your score was ${points} / 5 !`
        if (points >= highScore) {
            secondsLeft = secondsLeft;
            highScore = points;
            localStorage.setItem('high-score', highScore);
            congrats.textContent = "That's a new high score!";
            let name = prompt('High Score! Enter your initials:');
            localStorage.setItem('high-initials', name);
        }
    }
}

// functions for getting an answer correct or wrong
let points = 0;
function correctAnswer() {
    footer.textContent = 'Correct!';
    points++;
    nextQuestion();
}

function wrongAnswer() {
    footer.textContent = 'Wrong!';
    secondsLeft -= 10;
    nextQuestion();
}

// high score modal + game over modal
var modal = document.getElementById("modal");
var span = document.getElementsByClassName("close")[0];
var close2 = document.getElementsByClassName("close2")[0];
var modal2 = document.getElementById('game-over');
var overScore = document.getElementById('over-score');


viewHighScore.onclick = function() {
    modal.style.display = "block";
    enterScore.textContent = 'High Score:   ' + localStorage.getItem('high-score') + ' / 5   '+ localStorage.getItem('high-initials');
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

close2.onclick = () => {
    modal2.style.display = 'none';
    location.reload();
}



