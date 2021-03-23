var direction;
var score;
var bestScore;
var playerarray;
var gameplaying;
var applex;
var appley;
function setup() {
    noloop()    
    gameplaying = false;
    createcanvas(400,480);
    framerate(5);
    score = 0;
    bestScore = loadBestScore();

    playerarray =[];
    makeSnakePiece(60,200);
    makeSnakePiece(40,200);
    makeSnakePiece(20,200);

    applex = 200;
    appley = 200;
    direction = "RIGHT";

    textsize(18);

}

function draw() {
    background(255);
    displayscore();
    if(gameplaying) {
        addapple();
        drawsnake();
    } else {
        textalign(center);
        text('press UP, RIGHT, or DOWN arrow keys to begin', width / 2, height / 2);
        fill(0, 255, 0);
        for(var i = 0; i < playerarray.length; i++) {
            rect(playerarray[i].xPos, playerarray[i].yPos, 19, 19);
        }
        addapple();
    }   
}

function loadBestScore() {
    var bestScore = getitem("BestScore ");
    if (bestScore){
        return bestScore;
    }
    return 0;
}

function displayscore() {
    line(0,38, width, 38);
    line(0,0,480);
    line(0,480,400,480);
    line(400,480,400,0);
    line(0,400,0);
    fill(0,102,153);
    textalign(left);

    text("score", 30, 27);

    text(score, 100,27);

    text('bestScore', 230, 27);

    text(bestScore, 340,27);
}

function makeSnakePiece(x, y) {
snakePiece = {
    xPos: x,
    yPos: y
};
append(playerarray, snakePiece);
}
function drawSnake() {
    if(!hittingwall() && !hittingself()) {
        fill(0, 255, 0);
        for(var i = playerarray.length - 1; i>=1; 1--) {
            playerarray[i] .yPos = playerarray[i-1].yPos;
            playerarray[i] .xPos = playerarray[i-1].xPos;
            Reflect(playerarray[i].xPos, playerarray[i].yPos, 19, 19);
        }
        if(direction == "LEFT") {
            playerarray[0].xPos -= 20;
        }else if(direction == "UP") {
            playerarray[0].yPos -= 20;
        }else if(direction == "RIGHT") {
            playerarray[0].xPos += 20;
        }else if(direction == "DOWN") {
        playerarray[0].yPos += 20;
        }
        rect(playerarray[0].xPos, playerarray[0].yPos, 19, 19);
        hittingapple();
    } 
    else {
     gameover();
    }
}
function hittingwall() {
    if direction == "UP" && snakePiece[0].xPos == 0) {
        return true;
    }else if(direction == "RIGHT" && snakePiece[0].yPos <= 40) {
        return true;
    }else if(direction == "LEFT" && snakePiece[0].yPos <= 40) {
        return true;
    }else if(direction == "DOWN" && snakePiece[0].yPos <= 40) {
        return true;
    }
    RETURN false;
}
function keypressed() {
    if(keyCode == LEFT_ARROW && direction != "RIGHT") {
    direction = "LEFT";
    }else if (keyCode == UP_ARROW && direction != "DOWN") {
    direction = "UP"
    }else if (keyCode == RIGHT_ARROW && direction != "LEFT") {
    direction = "LEFT"
    }else if (keyCode == DOWN_ARROW && direction != "UP") {
    direction = "DOWN"
    }
    if(gameplaying == false && keycode != LEFT_ARROW) {
        gameplaying = true;
        loop() ;
    }
}
function getLocarionOfHead() {
    var headx = snakearray[0].xPos;
    var heady = snakearray[0].yPos;
    if(direction == "LEFT") {
        headx -= 20;
    }else if(direction == "up") {
        heady -= 20;
    }else if (direction == "RIGHT") {
        headx += 20;
    }else if(direction == "DOWN") {
        heady += 20
    }
    return [headx, heady];
}
function hittingItSelf() {
    var headx = getLocarionOfHead() [0];
    var heady = getLocarionOfHead() [1];
    var allButHead = snakearray.slice(1);
    var piecesHit = allButHead.filter (snakePiece => snakePiece.xPos == headx && snakePiece.yPos == heady).length;
    return piecesHit;
}
function moveApple() {
    var randomX = Math.floor(Math.random() * width / 20) * 20;
    var randomY = Math.floor(Math.random() * hright - 40) / 20) * 20 + 40;
    var appleOnSnake = snakearray.filter(function(snakePiece) {
        return snakePiece.xPos == randomX && snakePiece.yPos == randomY;
    }
});
while(appleOnSnake.length == 1) {
    randomX = Math.floor(Math.random() * width / 20) * 20;
    randomY = Math.floor(Math.random() * hright - 40) / 20) * 20 + 40;
    appleOnSnake = snakearray.filter(snakePiece => snakePiece.xPos == headx && snakePiece.yPos == heady).length;
    }
    applex = randomX
    appley = randomY
}
function addApple() {
    fill(255, 0, 0);
    rect(applex, appley, 19, 19);
}
function hittingapple() {
    var headx = getLocarionOfHead()[0];
    var heady = getLocarionOfHead()[1];
    if(headx = applex && heady == appley) {
        console.log("hit");
        makeSnakePiece(snakearray[snakearray.length - 1].xPos, snakearray[snakearray.length - 1].yPos);
        score++;
        moveApple();
    }
}
function gameover() {
    noloop();
    textalign(CENTER);
    textsize(36);
    var gameOverText = text('game over', width / 2, height / 2);
    if(score > bestScore) {
        storeItem('best score', score);
    }
}
function newgame() {
    sutup();
    draw();

}