const refreshBtn = document.querySelector(".refreshbtn");
const refreshButton = document.querySelector(".refresh-button");
const restartBtn = document.querySelector(".restartbtn");
const restartButton = document.querySelector(".restart");

let boxes = document.querySelector(".boxes");
const level = document.querySelector("h1")
const scoreDisplay = document.querySelector('.score');
const body = document.querySelector('body');
let gameActive = true;

const correctAudio = new Audio('correct.mp3');
const wrongAudio = new Audio('wrong.mp3');
const winnerAudio = new Audio('winner.mp3');

level.textContent = "Let's Start the Game.";

if (scoreDisplay) scoreDisplay.classList.add('hidden');

refreshBtn.addEventListener("click", function() {
    boxes.classList.add("visible");
    refreshBtn.classList.add("inv");
    refreshButton.classList.add("inv");
    restartBtn.classList.add("visible");
    restartButton.classList.add("visible");
    level.textContent = "Level 1";
    if (scoreDisplay) scoreDisplay.classList.remove('hidden');
    setTimeout(() => {
        startGame();
    }, 2000);
});

restartButton.addEventListener("click", ()=>{
    score = 0;
    currentLevel = 1;
    currentRound = 0;
    gameActive = true;
    restartBtn.classList.add("inv");
    restartButton.classList.add("inv");

    boxes.classList.add("visible");
    updateScore();
    level.textContent = `Level ${currentLevel}`;
    setTimeout(() => {
        startGame();
    }, 1000);
})

let score=0;
let currentLevel = 1;
let currentRound = 0;
let maxRounds = 5;
let timeoutId;
const list = ["g", "r", "b", "y"];
let randomItem = null;

function getTimeOutLevel(level){
    switch(level){
        case 1: return 2000;
        case 2: return 1500;
        case 3: return 1000;
        default: return 2000;
    }
}

function updateScore() {
    if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${score}`;
        scoreDisplay.style.position = 'absolute';
        scoreDisplay.style.top = '90%';
        scoreDisplay.style.left = '50%';
        scoreDisplay.style.transform = 'translate(-50%)';
        scoreDisplay.style.fontWeight = 'bold';
        scoreDisplay.style.fontSize = '1.5em';
        scoreDisplay.style.backgroundColor = 'white';
        scoreDisplay.style.color = 'black'; 
        scoreDisplay.style.padding = '10px 20px';
        scoreDisplay.style.borderRadius = '5px';
        scoreDisplay.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

    }
}

function endGame(message){
    gameActive = false;
    
    if (currentLevel > 3) {
        level.textContent = "You have won!";
        if (scoreDisplay) scoreDisplay.textContent = `Final Score: ${score}`;
        console.log("🎉 " + message);
    } else {
        level.textContent = message + ` Game over. Final score: ${score}`;
        if (scoreDisplay) scoreDisplay.textContent = `Final Score: ${score}`;
        console.log(message + " Game over. Final score:", score);
    }
}

function startGame(){
    if (!gameActive) return;
    clearTimeout(timeoutId);

    const newBoxes = boxes.cloneNode(true);
    boxes.parentNode.replaceChild(newBoxes, boxes);
    boxes = newBoxes;

    level.textContent = `Level ${currentLevel}`;
    updateScore();

    randomItem = list[Math.floor(Math.random() * list.length)];
    const selectedBox = document.querySelector("." + randomItem);

    selectedBox.classList.add('blink-once');
    selectedBox.addEventListener('animationend', () => {
        selectedBox.classList.remove('blink-once');
      }, {once: true});

    const maxTime = getTimeOutLevel(currentLevel);
    let timedOut = false;
    timeoutId = setTimeout(() => {
        timedOut = true;
        body.style.transition = 'background-color 0.3s';
        body.style.backgroundColor = 'red';
        wrongAudio.play();
        endGame("Time's up!");
        setTimeout(() => {
            body.style.transition = 'background-color 0.3s';
            body.style.backgroundColor = '';
        }, 1500);
    }, maxTime);

    boxes.addEventListener('click', function handleClick(event){
        if (!gameActive) return;
        if (event.target.matches('.boxes div')) {
            if (timedOut) return;
            clearTimeout(timeoutId);

            if(event.target.classList.contains(randomItem)){
                correctAudio.play();
                score++;
                currentRound++;
                updateScore();

                if(currentRound >= maxRounds ){
                    currentLevel++;
                    currentRound = 0;
                    
                    if(currentLevel > 3){
                        winnerAudio.play();
                        endGame("You have won!");
                        return;
                    }
                    level.textContent = `Level ${currentLevel}`;
                }
                setTimeout(startGame, 2000);
            } else{
                body.style.transition = 'background-color 0.3s';
                body.style.backgroundColor = 'red';
                wrongAudio.play();
                endGame("Wrong Click!")
                setTimeout(() => {
                    body.style.transition = 'background-color 0.3s';
                    body.style.backgroundColor = '';
                }, 1500);
            }
        }
    }, {once: true});
}

updateScore();






