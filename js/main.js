var flappyBird = require('./flappy_bird');

var app = new flappyBird.FlappyBird();

var playBtn = document.getElementsByClassName('startGame')[0],
    pauseText = document.getElementsByClassName('pauseText')[0],
    restartBtn = document.getElementsByClassName('restartGame')[0],
    coinImg = document.getElementsByClassName('img_coin_start_image')[0],
    birdImg = document.getElementsByClassName('img_start_image_bird')[0],
    gameTitle = document.getElementsByClassName('game-title')[0],
    numCounter = document.getElementsByClassName('counter')[0],
    highestScore = document.getElementsByClassName('highestScore')[0],
    counter = 2,
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
    endGame = function() {
    //TODO:
    //ui - "Game Over"
    //show current score from localstorage
    //pause and
    //show start new game
    };

//start new game or reset to a new game
playBtn.addEventListener('click', function(e) {
    e.preventDefault();
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
});

//pause game on pressing space
//give option to reset game or restart
document.onkeypress = function(e){
    e.preventDefault();
    if(e.keyCode === 0 || e.keyCode === 32) {
        console.log('pause game indefinitely');
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