var direction;
var score;
var bestScore;
var snakeArray;
var gamePlaying;
var appleX;
var appleY;

function setup() {
    noLoop();
    gamePlaying = false;
    createCanvas(400,480);
    frameRate(5);
    score = 0;
    bestScore = loadBestScore();

    snakeArray = [];
    makeSnakePiece(60,200);
    makeSnakePiece(40,200);
    makeSnakePiece(20,200);

    appleX = 200;
    appleY = 200;

    direction = "RIGHT";

    textSize(18);
}

function draw() {
    background(255);
    displayScore(); 
    if(gamePlaying) {
        addApple();
        drawSnake();
    }   else {
        textAlign(CENTER);
        text('Press UP, RIGHT, or DOWN arrow keys to begin', width / 2, height / 2)
        fill(0, 255, 0);
        for(var i = 0; i < snakeArray.length; i++) {
            rect(snakeArray[i].xPos, snakeArray[i].yPos, 19, 19);
        }
        addApple();
    }
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
    line(400, 480, 400, 0);
    line(0, 0, 400, 0);
    fill(0, 102, 153);
    textAlign(LEFT);
    text('Score', 30, 27);
    text(score, 100, 27);
    text('Best Score', 230, 27);
    text(bestScore, 340, 27);
}

function makeSnakePiece(x, y) {
    snakePiece = {
        xPos: x,
        yPos: y
    };
    append(snakeArray, snakePiece);
}


function addApple() {
    fill(255, 0, 0);
    rect(appleX, appleY, 19, 19);
}

function newGame() {
    setup();
    draw();
}