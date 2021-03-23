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
    createCanvas(400, 480);
    frameRate(20);
    score = 0;
    bestScore = loadBestScore();

    snakeArray = [];
    makeSnakePiece(60, 200);
    makeSnakePiece(40, 200);
    makeSnakePiece(20, 200);

    appleX = 200;
    appleY = 200;

    direction = "RIGHT";

    textSize(18);
}

function draw() {
    background(255);
    displayScore();
    if(gamePlay) {
        addApple();
        drawSnake();
    }   else {
        textAlign(CENTER);
        text('Press UP, RIGHT, or DOWN arrow keys to begin', width / 2, height/ 2);
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
    line(400, 0, 400, 480);
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
        }   else if(direction == "UP") {
            snakeArray[0].yPos -= 20;
        }   else if(direction == "RIGHT") {
            snakeArray[0].xPos += 20;
        }   else if(direction == "DOWN") {
            snakeArray[0].yPos += 20;
        }
        rect(snakeArray[0].xPos, snakeArray[0].yPos, 19, 19);
        hittingApple();
    }   else {
        gameOver();
    }
}

function hittingWall() {
    if(direction == "LEFT" && snakeArray[0].xPos == 0) {
        return true;
    }   else if(direction == "UP" && snakeArray[0].yPos <= 40) {
        return true;
    }   else if(direction == "RIGHT" && snakeArray[0].xPos + 20 == width) {
        return true;
    }   else if(direction == "DOWN" && snakeArray[0].yPos + 20 == height) {
        return true;
    }
    return false;
}

function keyPressed() {
    if (keyCode == LEFT_ARROW && direction != "RIGHT") {
        direction = "LEFT";
    }   else if (keyCode == UP_ARROW && direction != "DOWN") {
        direction = "UP";
    }   else if (keyCode == RIGHT_ARROW && direction != "LEFT") {
        direction = "RIGHT";
    }   else if (keyCode == DOWN_ARROW && direction != "UP") {
        direction = "DOWN";
    }
    if(gamePlay == false && keyCode != LEFT_ARROW) {
        gamePlay = true;
        loop();
    }
}

function getLocationOfHead() {
    var headX = snakeArray[0].xPos;
    var headY = snakeArray[0].yPos;
    if(direction == "LEFT") {
        headX -= 20;
    }   else if(direction == "UP") {
        headY -= 20;
    }   else if(direction == "RIGHT") {
        headX += 20;
    }   else if(direction == "DOWN") {
        headY += 20;
    }
    return [headX, headY];
}

function hittingItself() {
    var headX = getLocationOfHead()[0];
    var headY = getLocationOfHead()[1];
    var allButHead = snakeArray.slice(1);
    var piecesHit = allButHead.filter(snakePiece => snakePiece.xPos == headX && snakePiece.yPos == headY).length;
    return piecesHit;
}

function moveApple() {
    // var randomX = Math.floor(Math.random() * width / 20) * 20;
    // var randomY = Math.floor(Math.random() * (height - 40) / 20) * 20 + 40;
    var randomX = Math.floor(Math.random() * width / 20) * 20;
    var randomY = Math.floor(Math.random() * (height - 40) / 20) * 20 + 40;
    var appleOnSnake = snakeArray.filter(function(snakePiece) {
        //console.log(snakePiece.xPos + " " + snakePiece.yPos);
        return snakePiece.xPos == randomX && snakePiece.yPos == randomY;
    });
    // console.log(appleOnSnake);
    while(appleOnSnake.length == 1) {
        // console.log('hi');
        randomX = Math.floor(Math.random() * width / 20) * 20;
        randomY = Math.floor(Math.random() * (height - 40) / 20) * 20 + 40;
        appleOnSnake = snakeArray.filter(snakePiece => snakePiece.xPos == randomX && snakePiece.xPos == randomY).length;
    }
    appleX = randomX;
    appleY = randomY;
}

function addApple() {
    fill(255, 0, 0);
    rect(appleX, appleY, 19, 19);
}

function hittingApple() {
    var headX = getLocationOfHead()[0];
    var headY = getLocationOfHead()[1];
    if(headX == appleX && headY == appleY) {
        console.log('hit');
        makeSnakePiece(snakeArray[snakeArray.length - 1].xPos, snakeArray[snakeArray.length - 1].yPos);
        score++;
        moveApple();
    }
}

function gameOver() {
    noLoop();
    textAlign(CENTER);
    textSize(36);
    var gameOverText = text('Game Over', width / 2, height / 2);

    if(score > bestScore) {
        storeItem('bestScore', score);
    }
}

function newGame() {
    setup();
    draw();
}