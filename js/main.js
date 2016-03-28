var flappyBird = require('./flappy_bird');

var app = new flappyBird.FlappyBird();

var playBtn = document.getElementsByClassName('start-game')[0],
    playSound = new Audio('./sound/start-music.mp3'),
    soundMuteIcon = document.getElementsByClassName('fa-ban')[0],
    instructionText = document.getElementsByClassName('instruction'),
    soundControl = document.getElementsByClassName('sound-control')[0],
    pauseText = document.getElementsByClassName('pause-text')[0],
    restartBtn = document.getElementsByClassName('restart-game')[0],
    coinImg = document.getElementsByClassName('img_coin_start_image')[0],
    birdImg = document.getElementsByClassName('img_start_image_bird')[0],
    gameTitle = document.getElementsByClassName('game-title')[0],
    numCounter = document.getElementsByClassName('counter')[0],
    highestScore = document.getElementsByClassName('highest-score')[0],
    counter = 2,
    mute = false,
    paused = false,
    countDown = countDown,
    toggleGameState = toggleGameState,
    toggleSound = toggleSound,
    endGame = endGame,
    startNewGame = startNewGame;

    function countDown() {
        counter -= 1;
        numCounter.innerHTML = counter;
    }

    function toggleGameState() {
        paused = !paused;
        if(paused === false) {
            pauseText.style.display = 'none';
            app.run();
        } else {
            pauseText.style.display = 'block';
            app.pause();
        }
    }

    function toggleSound() {
        mute = !mute;
        if(mute === true) {
            soundMuteIcon.style.display = 'block';
            playSound.volume = 0;
        } else {
            soundMuteIcon.style.display = 'none';
            playSound.volume = 0.5;
        }
    }

    function endGame() {
        //TODO:
        //show current score from localstorage
        //pause and
        //show start new game
        // app.pause();
    }

    function startNewGame(e) {
        e.preventDefault();
        playSound.pause();
        playSound.currentTime = 0;
        this.style.display = 'none';
        birdImg.style.display = 'none';
        coinImg.style.display = 'none';
        gameTitle.style.display = 'none';
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
    }

soundControl.addEventListener('click', function(e) {
    e.preventDefault();
    toggleSound();
});

playSound.volume = 0.5;
playSound.play();

//start new game or reset to a new game
playBtn.addEventListener('click', startNewGame);

// TODO:
// restartBtn.addEventListener('click', startNewGame);

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