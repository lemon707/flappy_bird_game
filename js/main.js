var flappyBird = require('./flappy_bird');
var app = new flappyBird.FlappyBird();;
var playBtn = document.getElementsByClassName('startGame')[0];
var restartBtn = document.getElementsByClassName('restartGame')[0];
var numCounter = document.getElementsByClassName('counter')[0];
var counter = 3;
var countDown = function() {
    counter -= 1;
    numCounter.innerHTML = counter;
};
//start new game
playBtn.addEventListener('click', function() {
    this.style.display = "none";
    numCounter.style.display = "block";
    setInterval(function(){
        countDown();
        if(counter === 0) {
            numCounter.innerHTML = "START!"
            setTimeout(function(){
                numCounter.style.display = "none";
                app.run();
            },1000)
        }
    },1000);
});

//pause game on pressing space
//give option to reset game or restart
document.onkeypress = function(e){
    if(e.keyCode === 0 || e.keyCode === 32) {
        console.log('pause game indefinitely');
        e.preventDefault();
        // setTimeout(function(){app.run()}, 10000);
    }
}

//restart game
restartBtn.addEventListener('click', function() {
    this.stype.display = 'none';
    numCounter.style.display = 'block';
    // countDown();
    // setTimeout(function(){app.run()}, 5000);
})