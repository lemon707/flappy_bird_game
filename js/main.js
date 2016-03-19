var flappyBird = require('./flappy_bird');

var app = new flappyBird.FlappyBird();

var playBtn = document.getElementsByClassName('startGame')[0],
    restartBtn = document.getElementsByClassName('restartGame')[0],
    numCounter = document.getElementsByClassName('counter')[0],
    // saveScore = document.getElementsByClassName('saveScore')[0],
    counter = 2,
    paused = false,
    countDown = function() {
        counter -= 1;
        numCounter.innerHTML = counter;
    },
    toggleGameState = function() {
        paused = !paused;
        if(paused === false) {
            app.run();
        } else {
            app.pause();
        }
    };

//start new game or reset to a new game
playBtn.addEventListener('click', function(e) {
    e.preventDefault();
    this.style.display = 'none';
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

//access localStorage to save score
// saveScore.addEventListener('click', function(e) {
//     e.preventDefault();
//     this.style.display = 'block';
// });