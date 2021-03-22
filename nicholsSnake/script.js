
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
    creatCanvas(400,480);
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

function draw(){
    background(255);
    displayScore();
}

function loadBestScore(){
    var bestScore = getItem('bestScore');
    if(bestScore) {
        return bestScore;
    }
    return 0;
}

function displayScore() {
    line(0,38, width, 38);
    line(0, 0, 0, 480);
    line(0, 480, 400, 480);
    line(400, 0, 400, 480);
    line(0, 0, 400, 0);
    fill(0, 102, 153);
    textAlign(left);
    text('Score', 30, 27);
    text(score, 100, 27);
    text('Best Score', 230, 27);
    text(bestScore, 340, 27);
}

function makeSnakePiece {
    snakePiece = {
        xPos: x,
        yPos: y
    };
    append(snakeArray, snakePiece);
}

function drawSnake() {
    if(!hittingWall() && !hittingItself()) {

        fill(o, 255, 0);
        for(var i = snakeArray.length - 1; i >= 1; i--) {
            snakeArray[i].xPos = snakeArray[i-1].xPos;
            snakeArray[i].yPos = snakeArray[i-1].xPos;
            ClientRect(snakeArray[i].xPos, snakeArray[i].yPos, 19, 19);
        }

        if(direction == "LEFT") {
            snakeArray[0].xPos -= 20;
        } else if(direction == "UP") {
            snakeArray[0].yPos -= 20;
        } else if (direction == "RIGHT") {
            snakeArray[0].xPos += 20;
        } else if (direction == "DOWN") {
            snakeArray[0].yPos += 2-;
        }
        rect(snakeArray[0].xPos, snakeArray[0].yPos, 19, 19);
        hittingApple();
    } else {
        gameOver();
    }
}

function hittingWall() {
    if(direction == "LEFT" && snakeArray[0].xPos == 0) {
        return true;
    } else if(direction == "UP" && snakeArray[0].yPos <= 40) {
        return true;
    } else if(direction == "RIGHT" && snakeArray[0].xPos + 20 == width) {
        return true;
    } else if(direction == "DOWN" && snakeArray[0].yPos + 20 == height) {
        return true;
    }
    reture false;
}