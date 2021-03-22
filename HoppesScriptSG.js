var direction;
var score;
var bestScore;
var snakeArray;
var gamePlay;
var appleX;
var appleY;

function setup() {
    noLoop();
    gamePlay = false;
    createCanvas(400,400);
    frameRate(5);
    score = 0;
    bestScore = loadbestScore();

    snakeArray = [];
    makeSnakePiece(60,200);
    makeSnakePiece(40,200);
    makeSnakePiece(20,200);

    appleX = 200;
    appleY = 200;

    direction = "right";

    textSize(18);
}

function draw() {
    background(255);
    displayScore();    
}

function loadBestScore() {
    var bestScore = getItem('bestScore');
    if(bestScore) {
        return bestScore;
    }
    return 0;
}

function displayScore() {
    line(0, 38, width, 38);
    line(0, 0, 0, 480);
    line(0, 480, 400, 480);
    line(400, 0, 400, 480);
    line(400, 0, 0, 0);
    fill(0, 102, 153);
    textAlign(left);
    text('Score', 30, 27);
    text(score, 100, 27);
    text('Best Score', 230, 27);
    text(bestScore, 340, 27);
}

function newGame() {
    setup();
    draw();
}