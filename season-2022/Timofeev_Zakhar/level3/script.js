var GAME = {
    width: 500,
    height: 500,
    background: "#FFDAB9",
    score: 0,
}

var PLAYER = {
    x: 240,
    y: 240,
}

var radius = 200
var delta = 1

var COIN1 = {
    x: 250,
    y: 50,
    test: 0,
    number: 1,
}

var COIN2 = {
    x: 250,
    y: 450,
    test: 0,
}

var COIN3 = {
    x: 50,
    y: 250,
    test: 0,
}

var COIN4 = {
    x: 450,
    y: 250,
    test: 0,
}

var COIN5 = {
    x: 108,
    y: 108,
    test: 0,
}

var COIN6 = {
    x: 392,
    y: 108,
    test: 0,
}

var COIN7 = {
    x: 108,
    y: 392,
    test: 0,
}

var COIN8 = {
    x: 392,
    y: 392,
    test: 0,
}

var bulletWidth = 10;
var bulletHeight = 10;

const bullets = [];
var goalxspeed = ((PLAYER.x + 10 + vx - 250) / 90)
var goalyspeed = (PLAYER.y + 10 + vy - 250) / 90

var vx = 1
var vy = 1
var r = 0
var loosecheck = 0
var wincheck = 0

var canvas = document.getElementById("canvas")
var canvasContext = canvas.getContext("2d")
var currentAngle = 0


canvas.width = GAME.width
canvas.height = GAME.height

class Bullet {
    constructor() {
        if ((PLAYER.y + vy + 10 < 250) && (PLAYER.x + vx + 10 > 250)) {
            goalxspeed = ((PLAYER.x + 10 + vx + 50 * (delta) - 250) / 90)
            goalyspeed = ((PLAYER.y + 10 + vy + 50 * (delta) - 250) / 90)
        }
        if ((PLAYER.y + vy + 10 >= 250) && (PLAYER.x + vx + 10 > 250)) {
            goalxspeed = ((PLAYER.x + 10 + vx - 50 * (delta) - 250) / 90)
            goalyspeed = ((PLAYER.y + 10 + vy - 50 * (delta) - 250) / 90)
        }
        if ((PLAYER.y + vy + 10 < 250) && (PLAYER.x + vx + 10 <= 250)) {
            goalxspeed = ((PLAYER.x + 10 + vx + 50 * (delta) - 250) / 90)
            goalyspeed = ((PLAYER.y + 10 + vy + 50 * (-delta) - 250) / 90)
        }
        if ((PLAYER.y + vy + 10 >= 250) && (PLAYER.x + vx + 10 <= 250)) {
            goalxspeed = ((PLAYER.x + 10 + vx + 50 * (-delta) - 250) / 90)
            goalyspeed = ((PLAYER.y + 10 + vy + 50 * (-delta) - 250) / 90)
        }


        this.x = 250
        this.y = 250
        bullets.push(this)
    }
    draw() {
        this.y = this.y + goalyspeed
        this.x = this.x + goalxspeed

        if ((this.x < 0) || (this.x > 500) || (this.y < 0) || (this.y > 500)) {
            bullets.splice(bullets.indexOf(this))
        }
        if ((PLAYER.x + vx + 12 > this.x) && (this.x > PLAYER.x + vx - 12) && (PLAYER.y + vy + 12 > this.y) && (this.y > PLAYER.y + vy - 12)) {
            loosecheck = 1
        }

        canvasContext.fillStyle = "white"
        canvasContext.fillRect(this.x, this.y, bulletWidth, bulletHeight)
    }

}




function astr(COINx, COINy) {
    if (((PLAYER.x + vx + 12 > COINx) && (COINx > PLAYER.x + vx - 12) && (PLAYER.y + vy + 12 > COINy) && (COINy > PLAYER.y + vy - 12))) {
        return 1;
    }
}

function check() {
    if (astr(COIN1.x, COIN1.y) === 1) {
        COIN1.test = 1
    }
    if (astr(COIN2.x, COIN2.y) === 1) {
        COIN2.test = 1
    }
    if (astr(COIN3.x, COIN3.y) === 1) {
        COIN3.test = 1
    }
    if (astr(COIN4.x, COIN4.y) === 1) {
        COIN4.test = 1
    }
    if (astr(COIN5.x, COIN5.y) === 1) {
        COIN5.test = 1
    }
    if (astr(COIN6.x, COIN6.y) === 1) {
        COIN6.test = 1
    }
    if (astr(COIN7.x, COIN7.y) === 1) {
        COIN7.test = 1
    }
    if (astr(COIN8.x, COIN8.y) === 1) {
        COIN8.test = 1
    }
}

function drawCoins() {
    if (COIN1.test === 0) {
        drawCoin(COIN1.x, COIN1.y)
    }
    if (COIN2.test === 0) {
        drawCoin(COIN2.x, COIN2.y)
    }
    if (COIN3.test === 0) {
        drawCoin(COIN3.x, COIN3.y)
    }
    if (COIN4.test === 0) {
        drawCoin(COIN4.x, COIN4.y)
    }
    if (COIN5.test === 0) {
        drawCoin(COIN5.x, COIN5.y)
    }
    if (COIN6.test === 0) {
        drawCoin(COIN6.x, COIN6.y)
    }
    if (COIN7.test === 0) {
        drawCoin(COIN7.x, COIN7.y)
    }
    if (COIN8.test === 0) {
        drawCoin(COIN8.x, COIN8.y)
    }
}

var d = 0

function win() {
    if (COIN1.test + COIN2.test + COIN3.test + COIN4.test + COIN5.test + COIN6.test + COIN7.test + COIN8.test == 8) {
        canvasContext.clearRect(0, 0, GAME.width, GAME.height)
        canvasContext.fillStyle = 'yellow'
        canvasContext.font = "70px Arial"
        canvasContext.textAlign = "center"
        canvasContext.fillText("Победа!", GAME.width / 2, GAME.height / 2 + 20)
        canvasContext.drawImage(Win, 0, 30)
        wincheck = 1
    }
}

function loose() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height)
    canvasContext.drawImage(Defeat, 30, 60, 420, 420)
}


function drawBackground() {
    canvasContext.strokeStyle = "grey"
    canvasContext.lineWidth = 3
    canvasContext.beginPath()
    canvasContext.arc(250, 250, radius, 0, 2 * Math.PI)
    canvasContext.stroke()
    canvasContext.drawImage(level3, 100, 100, 407, 430)
}

function initEventListeners() {
    window.addEventListener("keydown", onCanvasKeyDown)
}

function onCanvasKeyDown(event) {
    if (event.key === "Spacebar " || event.key === ' ') {
        delta = delta * (-1)
    }
    if (loosecheck === 1 && (event.key === "Spacebar " || event.key === ' ')) {
        window.location.href = '../level1/Submarine.html';
    }
    if (wincheck === 1 && (event.key === "Spacebar " || event.key === ' ')) {
        window.location.href = '../level1/Submarine.html';
    }
}

var Submarine = new Image()
Submarine.src = '../files/prop.png'

var Win = new Image()
Win.src = '../files/win.png'

var Defeat = new Image()
Defeat.src = '../files/defeat.png'

var Bubble = new Image()
Bubble.src = '../files/bubble.png'

var level3 = new Image()
level3.src = 'level3.png'

function drawCoin(COINx, COINy) {
    canvasContext.drawImage(Bubble, COINx - 10, COINy - 10)
}


function drawPlayer() {
    vx = Math.cos(currentAngle) * radius
    vy = Math.sin(currentAngle) * radius
    currentAngle += 0.003 * delta
    canvasContext.drawImage(Submarine, PLAYER.x + vx - 20, PLAYER.y + vy - 20)
}

function draw() {
    if (r == 400) {
        bullets.forEach(bullet => bullet.draw());
        new Bullet()
        r = 0
    }
    if (r != 400) {
        r += 1
        bullets.forEach(bullet => bullet.draw());
    }
    if (r == 200) {
        bullets.forEach(bullet => bullet.draw());
        new Bullet()
    }
}


function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height)
    drawBackground()
    initEventListeners()
    check()
    drawCoins()
    drawPlayer()
    draw()

}

setInterval(function play() {
    drawFrame()
    win()
    if (loosecheck === 1) {
        loose()
    }
}, 1)











































