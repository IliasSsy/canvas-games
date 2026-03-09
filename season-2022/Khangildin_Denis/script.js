var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");

var iswon = false;
var islost = false;
var GAME = {
    width: 1000,
    height: 1000,
    color1: "#cfcfcf",
    color2: "#3f3f3f",
    colorPlayer: "#df3f3f",
    colorPlayerShadow: "#aa3030",
    colorPlayerShadow2: "#774444",
}

canvas.height = GAME.height;
canvas.width = GAME.width;

function renderBackground() {
    canvasContext.fillStyle = GAME.color1;
    canvasContext.fillRect(0, 0, GAME.height, GAME.width);

    canvasContext.fillStyle = "#e3e357";
    canvasContext.fillRect(870, 0, 150, 200);
}


var line = []
function tiles() {

    for (var i = 0; i < 50; i += 1) {
        line[i] = []
        for (var j = 0; j < 50; j += 1) {
            line[i][j] = Math.random();
            line[i][j] = (((line[i][j] * 100) - ((line[i][j] * 100) % 1)) / 100) ** 3
            line[i][j] = (((line[i][j] * 100) - ((line[i][j] * 100) % 1)) / 100)
            if (((i >= 0) && (i <= 8) && (j >= 40) && (j <= 50)) || ((i >= 42) && (i <= 50) && (j >= 0) && (j <= 10))) {
                line[i][j] = 1;
            }

        }
    }
}

function renderTiles() {
    for (var i = 0; i < 50; i += 1) {
        for (var j = 0; j < 50; j += 1) {
            if (line[i][j] > 0.001) {
            }
            else {
                canvasContext.fillStyle = GAME.color2;
                canvasContext.fillRect(i * 20, j * 20, GAME.height / 50, GAME.width / 50);
            }
        }
    }

}

var PLAYER = {
    height: 10,
    width: 10,
    x: 100,
    y: 900,
    prevx: 100,
    prevy: 900,
    prevx2: 100,
    prev2: 900,
}

function renderPlayer() {
    canvasContext.fillStyle = GAME.colorPlayerShadow2;
    canvasContext.fillRect(PLAYER.prevx2, PLAYER.prevy2, PLAYER.height, PLAYER.width);
    canvasContext.fillStyle = GAME.colorPlayerShadow;
    canvasContext.fillRect(PLAYER.prevx, PLAYER.prevy, PLAYER.height, PLAYER.width);
    canvasContext.fillStyle = GAME.colorPlayer;
    canvasContext.fillRect(PLAYER.x, PLAYER.y, PLAYER.height, PLAYER.width);
}

var tics = 0;
var rememberedTic = -10;
function updatePlayer() {
    tics += 1;
    if (tics % 5 === 0) {
        PLAYER.prevy2 = PLAYER.prevy;
        PLAYER.prevy = PLAYER.y;
        PLAYER.y += 0.3;
    }
    if (PLAYER.x < 0) {
        PLAYER.x = 0;
    }
    if (PLAYER.x + PLAYER.width >= GAME.width) {
        PLAYER.x = GAME.width - PLAYER.width;
    }
    if (PLAYER.y < 0) {
        PLAYER.y = 0;
    }
    if (PLAYER.y + PLAYER.height >= GAME.height) {
        PLAYER.y = GAME.height - PLAYER.height;
    }

    PLAYER.prevx2 = PLAYER.prevx;
    PLAYER.prevx = PLAYER.x;

}

function PressedButtons(event) {
    if (event.key == "d" || event.key == "в") { // smol)
        PLAYER.prevx2 = PLAYER.prevx;
        PLAYER.prevx = PLAYER.x;
        PLAYER.x += 3;
    }
    if (event.key == "a" || event.key == "ф") {
        PLAYER.prevx2 = PLAYER.prevx;
        PLAYER.prevx = PLAYER.x;
        PLAYER.x -= 3;
    }
    if (event.key == "w" || event.key == "ц") {
        PLAYER.prevy2 = PLAYER.prevy;
        PLAYER.prevy = PLAYER.y;
        PLAYER.y -= 3;
    }
    if (event.key == "s" || event.key == "ы") {
        PLAYER.prevy2 = PLAYER.prevy;
        PLAYER.prevy = PLAYER.y;
        PLAYER.y += 3;
    }
    if (event.key == "D" || event.key == "В") { // biggy
        PLAYER.prevx2 = PLAYER.prevx;
        PLAYER.prevx = PLAYER.x;
        PLAYER.x += 6;
    }
    if (event.key == "A" || event.key == "Ф") {
        PLAYER.prevx2 = PLAYER.prevx;
        PLAYER.prevx = PLAYER.x;
        PLAYER.x -= 6;
    }
    if (event.key == "W" || event.key == "Ц") {
        PLAYER.prevy2 = PLAYER.prevy;
        PLAYER.prevy = PLAYER.y;
        PLAYER.y -= 6;
    }
    if (event.key == "S" || event.key == "Ы") {
        PLAYER.prevy2 = PLAYER.prevy;
        PLAYER.prevy = PLAYER.y;
        PLAYER.y += 6;
    }
}

function checkWin() {
    if (PLAYER.x >= 870 && PLAYER.y <= 200) {
        iswon = true;
    }
}
function checkLose() {
    for (var i = 0; i < 50; i += 1) {
        for (var j = 0; j < 50; j += 1) {
            if (line[i][j] <= 0.001) {
                if ((PLAYER.x + PLAYER.width >= i * 20 && PLAYER.x <= i * 20 + GAME.width / 50) && (PLAYER.y + PLAYER.height >= j * 20 && PLAYER.y <= j * 20 + GAME.height / 50)){
                    islost = true;
                }
            }
        }
    }
}

tiles();

function mainGame() {
    if (iswon === true) {
        canvasContext.fillStyle = "#e3e357";
        canvasContext.fillRect(0, 0, GAME.height, GAME.width);
        canvasContext.fillStyle = "black"; 
        canvasContext.font = "100px Arial"
        canvasContext.fillText('you won', 300, 500)
    }
    else if (islost === true) {
        canvasContext.fillStyle = GAME.colorPlayerShadow;
        canvasContext.fillRect(0, 0, GAME.height, GAME.width);
        canvasContext.fillStyle = "black"; 
        canvasContext.font = "100px Arial"
        canvasContext.fillText('you died', 300, 500)
        
    }
    else {
        
        checkWin();
        renderBackground();
        renderTiles();
        updatePlayer();
        renderPlayer();
        checkLose();
    }

}

function play() {
    mainGame();
    requestAnimationFrame(play);
}

alert('movement: WASD')
alert('fast movement: WASD + SHIFT')
window.addEventListener("keydown", PressedButtons);
play();

