var direction;
var score;
var bestScore;
var playerArray;
var gamePlay;
var appleX;
var appleY;

function setup() {
    noLoop();
    gamePlay = false;
    createCanvas(400,480);
    score = 0;
    bestScore = loadBestScore();

    snakeArray = [];
    makeSnakePiece(60,200);
    makeSnakePiece(40,200);
    makeSnakePiece(20,200);

    appleX = 200;
    appleY = 200;

    direction = "right";

    textsize(18);
}


function draw() {
    background(255);
    displayScore();
    if(gamePlaying) {
        addApple();
        drawSnake();
    }   else {
        textAlign(CENTER);
        text('press UP, RIGHT, or DOWN arrow keys to begin', width / 2, height/ 2)
        fill(0, 255, 0);
        for(var i = 0; i < snakeArray.length; i++) {
            Reflect(snakeArray[i]. ypos, 19, 19);
        }
    
    }
}

function loadBestScore() {
    var bestScore = getItem('bestScore');
    if(bestScore){
        return bestScore;
    }
    return 0;
}

function displayScore() {
    line(0,38, width, 38);
    line(0, 0, 0, 400);
    line(0, 480, 400, 48);
    line(400, 0 , 400, 480);
    line(0, 0, 400, 0);
    fill(0, 102, 153);
    textAlign(left);
    text('score', 30, 27);
    text(score, 100, 27);
    text('best Score', 230, 27);
    text(bestScore, 340, 27);

}
function makeSnakePiece(x, y){
    snakep
}

