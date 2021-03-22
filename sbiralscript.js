var direction;
var score;
var bestScore;
var playerarray;
var gameplay;
var applex;
var appley;
function setup() {
    noloop()    
    gameplay = false;
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
            Reflect(playerarray[i].xPos, playerarray[i].yPos, 19, 19);
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
    }   else if(direction == "UP") {
            playerarray[0].yPos -= 20;
    }   else if(direction == "RIGHT") {
            playerarray[0].xPos += 20;
    }   else if(direction == "DOWN") {
        playerarray[0].yPos += 20;
        }
        rect(playerarray[0].xPos, playerarray[0].yPos, 19, 19);
        hittingapple();
} else {
    gameover();
}

function newgame() {
    sutup();
    draw();

}