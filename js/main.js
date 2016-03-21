var flappyBird = require('./flappy_bird');

var app = new flappyBird.FlappyBird();

var playBtn = document.getElementsByClassName('startGame')[0],
    playSound = new Audio('./sound/start-music.mp3'),
    soundMuteIcon = document.getElementsByClassName('fa-ban')[0],
    instructionText = document.getElementsByClassName('instruction'),
    soundControl = document.getElementsByClassName('soundControl')[0],
    pauseText = document.getElementsByClassName('pauseText')[0],
    restartBtn = document.getElementsByClassName('restartGame')[0],
    coinImg = document.getElementsByClassName('img_coin_start_image')[0],
    birdImg = document.getElementsByClassName('img_start_image_bird')[0],
    gameTitle = document.getElementsByClassName('game-title')[0],
    numCounter = document.getElementsByClassName('counter')[0],
    highestScore = document.getElementsByClassName('highestScore')[0],
    counter = 2,
    mute = false,
    paused = false,
    countDown = function() {
        counter -= 1;
        numCounter.innerHTML = counter;
    },
    toggleGameState = function() {
        paused = !paused;
        if(paused === false) {
            pauseText.style.display = 'none';
            app.run();
        } else {
            pauseText.style.display = 'block';
            app.pause();
        }
    },
    toggleSound = function() {
        mute = !mute;
        if(mute === true) {
            soundMuteIcon.style.display = 'block';
            playSound.volume = 0;
        } else {
            soundMuteIcon.style.display = 'none';
            playSound.volume = 0.5;
        }
    },
    endGame = function() {
    //TODO:
    //show current score from localstorage
    //pause and
    //show start new game
    };

soundControl.addEventListener('click', function(e) {
    e.preventDefault();
    mute = true;
    toggleSound();
});

playSound.volume = 0.5;
playSound.play();
//start new game or reset to a new game
playBtn.addEventListener('click', function(e) {
    e.preventDefault();
    playSound.pause();
    playSound.currentTime = 0;
    this.style.display = 'none';
    birdImg.style.display = 'none';
    coinImg.style.display = 'none';
    gameTitle.style.display = 'none';
    instructionText[0].style.display = 'none';
    instructionText[1].style.display = 'none';
    numCounter.style.display = 'block';
    window.setInterval(function(){
        countDown();
        if(counter === 0) {
            numCounter.innerHTML = 'START!';
            window.setTimeout(function(){
                numCounter.style.display = 'none';
                app.run();
            },1000);
        }
    },1000);
});

//pause game on pressing space
//give option to reset game or restart
document.onkeypress = function(e){
    e.preventDefault();
    if(e.keyCode === 0 || e.keyCode === 32) {
        e.preventDefault();
        toggleGameState();
    }
};

//restart game after pause
restartBtn.addEventListener('click', function(e) {
    e.preventDefault();
    this.style.display = 'none';
    numCounter.style.display = 'block';
    countDown();
    app.run();
});

//show highest score by accessing localstorage and taking Math.max of array
// highestScore = 