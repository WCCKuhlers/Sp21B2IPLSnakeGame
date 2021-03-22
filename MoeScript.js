var direction;
var score;
var bestScore;
var playerArray;
var gamePlay;
var applex;
var appleY;

function setup() {
    noLoop();
    gamePlay = false;
    createcanvas(400,480);
    framerate(5);
    score = 0;
    bestScore = loadBestScore();

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
    if(gamePlaying) {
        addApple();
        drawSnake();
    
     } else {
        textAlign(CENTER);
        text('Press UP, RIGHT, or DOWN arrow keys to begin', width / 2, height / 2);
        fill(0, 255, 0);
        for(var i = 0; i < snakeArray.length; i++) {
            rect(snakeArray[i].xPos, snakeArray[i].yPos, 19,19);
        }
        addApple();
       }
 }

function loadBestScore(){
    var bestScore = getitem('bestScore');
    if(bestScore) {
        return bestScore;
    }
    return 0;
}

function displayScore(){
    line(0, 38, width, 38);
    line(0, 0, 0, height);
    line(0, height, width, height);
    line(width, height, width, 38);
    line(0, 0, width, 0);
    Fill(0,102,153);
    textAlign(left);
    text('Score', 30, 27);
    text(score, 100, 27);
    text('Best Score', 230, 27);
    text(bestScore, 340, 27);

}

function newGame(){
    setup();
    draw();
}

function makeSnakePiece(x, y) {
    snakePiece = {
        xPos: x,
        yPos: y
    };
    append(snakeArray, snakePiece);
}

function drawSnake() {
    if(!hittingWall() && !hittingItself()) {

        fill(0, 255, 0);
        for(var i = snakeArray.length - 1; i >= 1; i--) {
            snakeArray[i].xPos = snakeArray[i-1].xPos;
            snakeArray[i].yPos = snakeArray[i-1].yPos;
            rect(snakeArray[i].xPos, snakeArray[i].yPos, 19, 19);
        }

        if(direction == "LEFT") {
            snakeArray[0].xPos -= 20;
        }   else if(direction == "UP"){
            snakeArray[0].yPos -= 20;
        }   else if(direction == "RIGHT"){
            snakeArray[0].xPos += 20;
        }   else if(direction == "DOWN"){
            snakeArray[0].yPos += 20;
        }
        rect(snakeArray[0].xPos, snakeArray[0].yPos, 19, 19);
        hittingapple();
    }   else {
        gameOver();
    }  
}

function hittingwall() {
    if(direction == "LEFT" && snakeArray[0].xPos ==0) {
        return true;
    }   else if(direction == "UP" && snakeArray[0].yPos <=40) {
        return true;
    }   else if(direction == "RIGHT" && snakeArray[0].xPos +20 == width) {
        return true;
    }   else if(direction == "DOWN" && snakeArray[0].yPos +20 == height) {
        return true;
    }   
    return false
}   

function keypressed() {
    if(keyCode == LEFT_ARROW && direction != "RIGHT") {
        direction = "LEFT";
    }   else if(keyCode == UP_ARROW && direction != "DOWN") {
        direction = "UP";
    }   else if(keyCode == RIGHT_ARROW && direction != "LEFT") {
        direction = "RIGHT";
    }   else if(keyCode == DOWN_ARROW && direction != "UP") {
        direction = "DOWN";
    }
    if(gamePlay == false && keyCode != LEFT_ARROW) {
        gamePlay = true;
        loop();
    }
}

function getLocationOfHead() {
    var headX = 
}