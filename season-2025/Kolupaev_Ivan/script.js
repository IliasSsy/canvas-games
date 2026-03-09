var BALL = {
    color: "Coral",
    x: 300,
    y: 365,
    radius: 17,
    xspeed: 6,
    yspeed: 9,
    speedMultiplier: 1.0
}
var GAME = {
    width: 600,
    height: 730,
    background: "Linen",
    gameOver: false,
    winner: null,
    wallTimer: 0,
    wallsActive: false
}
var PLAYER1 = {
    color: "MidnightBlue",
    x: 265,
    y: 650,
    width: 70,
    height: 20,
    xspeed: 14,
    score: 0,
    name: "ИГРОК 1"
}
var PLAYER2 = {
    color: "Crimson",
    x: 265,
    y: 60,
    width: 70,
    height: 20,
    xspeed: 14,
    score: 0,
    name: "ИГРОК 2"
}
var GOAL1 = {
    color: "yellow",
    x: 150,
    y: 700,
    width: 300,
    height: 30,
}
var GOAL2 = {
    color: "orange",
    x: 150,
    y: 0,
    width: 300,
    height: 30,
}
var CENTER_LINE = {
    color: "gray",
    x: 0,
    y: 365,
    width: 600,
    height: 2,
}
var CENTER_CIRCLE = {
    color: "gray",
    x: 300,
    y: 365,
    radius: 70,
    lineWidth: 2
}
var WALL1 = {
    color: "blue",
    x: -300,
    y: 365,
    width: 300,
    height: 10,
    xspeed: 3,
    direction: 1
}
var WALL2 = {
    color: "red",
    x: 600,
    y: 365,
    width: 300,
    height: 10,
    xspeed: 3,
    direction: -1
}


var mainContainer = document.createElement("div")
document.body.appendChild(mainContainer)
mainContainer.style.display = "flex"
mainContainer.style.justifyContent = "center"
mainContainer.style.alignItems = "center"
mainContainer.style.minHeight = "100vh"
mainContainer.style.backgroundColor = "#f0f0f0"
mainContainer.style.padding = "20px"


var gameContainer = document.createElement("div")
mainContainer.appendChild(gameContainer)
gameContainer.style.display = "flex"
gameContainer.style.alignItems = "flex-start"
gameContainer.style.gap = "30px"


var scoreContainer = document.createElement("div")
gameContainer.appendChild(scoreContainer)
scoreContainer.style.display = "flex"
scoreContainer.style.flexDirection = "column"
scoreContainer.style.gap = "20px"
scoreContainer.style.minWidth = "250px"


var scoreDisplay = document.createElement("div")
scoreContainer.appendChild(scoreDisplay)
scoreDisplay.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
scoreDisplay.style.borderRadius = "15px"
scoreDisplay.style.padding = "25px"
scoreDisplay.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)"
scoreDisplay.style.color = "white"
scoreDisplay.style.fontFamily = "Arial, sans-serif"
scoreDisplay.style.textAlign = "center"

var gameTitle = document.createElement("h2")
gameTitle.textContent = "CRAZY HOCKEY"
gameTitle.style.margin = "0 0 20px 0"
gameTitle.style.fontSize = "24px"
gameTitle.style.fontWeight = "bold"
gameTitle.style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)"
scoreDisplay.appendChild(gameTitle)

var scoreBoard = document.createElement("div")
scoreBoard.style.display = "flex"
scoreBoard.style.justifyContent = "space-between"
scoreBoard.style.alignItems = "center"
scoreBoard.style.marginBottom = "15px"
scoreDisplay.appendChild(scoreBoard)

var player1ScoreDisplay = document.createElement("div")
player1ScoreDisplay.style.textAlign = "center"
scoreBoard.appendChild(player1ScoreDisplay)

var player1Name = document.createElement("div")
player1Name.textContent = PLAYER1.name
player1Name.style.fontSize = "14px"
player1Name.style.marginBottom = "5px"
player1Name.style.color = "#e0e0e0"
player1ScoreDisplay.appendChild(player1Name)

var player1ScoreValue = document.createElement("div")
player1ScoreValue.textContent = "0"
player1ScoreValue.style.fontSize = "36px"
player1ScoreValue.style.fontWeight = "bold"
player1ScoreValue.style.color = PLAYER1.color
player1ScoreValue.style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)"
player1ScoreDisplay.appendChild(player1ScoreValue)

var vsText = document.createElement("div")
vsText.textContent = "VS"
vsText.style.fontSize = "16px"
vsText.style.fontWeight = "bold"
vsText.style.color = "#ffeb3b"
vsText.style.margin = "0 15px"
scoreBoard.appendChild(vsText)

var player2ScoreDisplay = document.createElement("div")
player2ScoreDisplay.style.textAlign = "center"
scoreBoard.appendChild(player2ScoreDisplay)

var player2Name = document.createElement("div")
player2Name.textContent = PLAYER2.name
player2Name.style.fontSize = "14px"
player2Name.style.marginBottom = "5px"
player2Name.style.color = "#e0e0e0"
player2ScoreDisplay.appendChild(player2Name)

var player2ScoreValue = document.createElement("div")
player2ScoreValue.textContent = "0"
player2ScoreValue.style.fontSize = "36px"
player2ScoreValue.style.fontWeight = "bold"
player2ScoreValue.style.color = PLAYER2.color
player2ScoreValue.style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)"
player2ScoreDisplay.appendChild(player2ScoreValue)

var timerDisplay = document.createElement("div")
timerDisplay.textContent = "Стены: 10 сек"
timerDisplay.style.fontSize = "14px"
timerDisplay.style.color = "#ff9800"
timerDisplay.style.marginTop = "10px"
timerDisplay.style.fontWeight = "bold"
scoreDisplay.appendChild(timerDisplay)


var gameInnerContainer = document.createElement("div")
gameContainer.appendChild(gameInnerContainer)
gameInnerContainer.style.display = "flex"
gameInnerContainer.style.flexDirection = "column"
gameInnerContainer.style.alignItems = "center"

var canvas = document.createElement("canvas")
gameInnerContainer.appendChild(canvas)
canvas.width = GAME.width
canvas.height = GAME.height
canvas.style.borderRadius = "10px"
canvas.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)"
var canvasContext = canvas.getContext("2d")


var instructionsContainer = document.createElement("div")
gameInnerContainer.appendChild(instructionsContainer)
instructionsContainer.style.marginTop = "20px"
instructionsContainer.style.textAlign = "center"
instructionsContainer.style.fontFamily = "Arial, sans-serif"
instructionsContainer.style.background = "white"
instructionsContainer.style.padding = "20px"
instructionsContainer.style.borderRadius = "10px"
instructionsContainer.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)"
instructionsContainer.style.maxWidth = "600px"

var instructions = document.createElement("div")
instructions.innerHTML = "<h3 style='color: #333; margin-bottom: 15px;'> Управление:</h3><p style='margin: 8px 0; color: #555;'><b>Игрок 1 (синий):</b> мышь или стрелки ← →</p><p style='margin: 8px 0; color: #555;'><b>Игрок 2 (красный):</b> клавиши A и D</p><p style='margin: 8px 0; color: #555;'> Гол засчитывается, когда мяч касается ворот противника</p><p style='margin: 8px 0; color: #555;'>Через 10 секунд без гола появляются стены!</p><p style='margin: 8px 0; color: #e91e63;'><b>Побеждает тот, кто первым наберет 10 очков!</b></p>"
instructionsContainer.appendChild(instructions)

function updateScoreDisplay() {
    player1ScoreValue.textContent = PLAYER1.score
    player2ScoreValue.textContent = PLAYER2.score
    
   
    if (PLAYER1.score > parseInt(player1ScoreValue.textContent)) {
        player1ScoreValue.style.transform = "scale(1.2)"
        setTimeout(() => { player1ScoreValue.style.transform = "scale(1)" }, 200)
    }
    if (PLAYER2.score > parseInt(player2ScoreValue.textContent)) {
        player2ScoreValue.style.transform = "scale(1.2)"
        setTimeout(() => { player2ScoreValue.style.transform = "scale(1)" }, 200)
    }
    if (!GAME.wallsActive && GAME.wallTimer > 0) {
        var timeLeft = 10 - Math.floor(GAME.wallTimer/60)
        timerDisplay.textContent = "Стены через: " + timeLeft + " сек"
        timerDisplay.style.color = timeLeft <= 3 ? "#ff4444" : "#ff9800"
    } else if (GAME.wallsActive) {
        timerDisplay.textContent = "СТЕНЫ АКТИВНЫ!"
        timerDisplay.style.color = "#ff4444"
    } else {
        timerDisplay.textContent = "Стены: 10 сек"
        timerDisplay.style.color = "#ff9800"
    }
    if (PLAYER1.score > PLAYER2.score) {
        player1ScoreValue.style.textShadow = "0 0 10px " + PLAYER1.color
        player2ScoreValue.style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)"
    } else if (PLAYER2.score > PLAYER1.score) {
        player2ScoreValue.style.textShadow = "0 0 10px " + PLAYER2.color
        player1ScoreValue.style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)"
    } else {
        player1ScoreValue.style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)"
        player2ScoreValue.style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)"
    }
}
function drawBall() {
    canvasContext.fillStyle = BALL.color
    canvasContext.beginPath()
    canvasContext.arc(BALL.x, BALL.y, BALL.radius, 0, 2 * Math.PI)
    canvasContext.closePath()
    canvasContext.fill()
}
function drawPlayer1() {
    canvasContext.fillStyle = PLAYER1.color
    canvasContext.beginPath()
    canvasContext.fillRect(PLAYER1.x, PLAYER1.y, PLAYER1.width, PLAYER1.height)
    canvasContext.closePath()
    canvasContext.fill()
}
function drawPlayer2() {
    canvasContext.fillStyle = PLAYER2.color
    canvasContext.beginPath()
    canvasContext.fillRect(PLAYER2.x, PLAYER2.y, PLAYER2.width, PLAYER2.height)
    canvasContext.closePath()
    canvasContext.fill()
}
function drawGoal1() {
    canvasContext.fillStyle = GOAL1.color
    canvasContext.beginPath()
    canvasContext.fillRect(GOAL1.x, GOAL1.y, GOAL1.width, GOAL1.height)
    canvasContext.closePath()
    canvasContext.fill()
}
function drawGoal2() {
    canvasContext.fillStyle = GOAL2.color
    canvasContext.beginPath()
    canvasContext.fillRect(GOAL2.x, GOAL2.y, GOAL2.width, GOAL2.height)
    canvasContext.closePath()
    canvasContext.fill()
}
function drawCenterLine() {
    canvasContext.fillStyle = CENTER_LINE.color
    canvasContext.beginPath()
    canvasContext.fillRect(CENTER_LINE.x, CENTER_LINE.y, CENTER_LINE.width, CENTER_LINE.height)
    canvasContext.closePath()
    canvasContext.fill()
}
function drawCenterCircle() {
    canvasContext.strokeStyle = CENTER_CIRCLE.color
    canvasContext.lineWidth = CENTER_CIRCLE.lineWidth
    canvasContext.beginPath()
    canvasContext.arc(CENTER_CIRCLE.x, CENTER_CIRCLE.y, CENTER_CIRCLE.radius, 0, 2 * Math.PI)
    canvasContext.closePath()
    canvasContext.stroke()
}
function drawWall1() {
    canvasContext.fillStyle = WALL1.color
    canvasContext.beginPath()
    canvasContext.fillRect(WALL1.x, WALL1.y, WALL1.width, WALL1.height)
    canvasContext.closePath()
    canvasContext.fill()
}
function drawWall2() {
    canvasContext.fillStyle = WALL2.color
    canvasContext.beginPath()
    canvasContext.fillRect(WALL2.x, WALL2.y, WALL2.width, WALL2.height)
    canvasContext.closePath()
    canvasContext.fill()
}
function drawScores() {
}
function drawGameOver() {
    canvasContext.fillStyle = "rgba(0, 0, 0, 0.7)"
    canvasContext.fillRect(0, 0, GAME.width, GAME.height)
    canvasContext.fillStyle = "white"
    canvasContext.font = "40px Arial"
    canvasContext.textAlign = "center"
    canvasContext.fillText("CRAZY HOCKEY", GAME.width/2, 200)
    canvasContext.font = "30px Arial"
    var winnerText = GAME.winner === 1 ? "ИГРОК 1 ПОБЕДИЛ!" : "ИГРОК 2 ПОБЕДИЛ!"
    canvasContext.fillText(winnerText, GAME.width/2, 280)
    canvasContext.font = "25px Arial"
    canvasContext.fillText("Счет: " + PLAYER1.score + " - " + PLAYER2.score, GAME.width/2, 330)
    canvasContext.fillStyle = "#4CAF50"
    canvasContext.fillRect(GAME.width/2 - 100, 380, 200, 50)
    canvasContext.fillStyle = "white"
    canvasContext.font = "20px Arial"
    canvasContext.fillText("ИГРАТЬ СНОВА", GAME.width/2, 412)
}

function updateBall() {
    if (GAME.gameOver) return;
    
    BALL.x += BALL.xspeed * BALL.speedMultiplier
    BALL.y += BALL.yspeed * BALL.speedMultiplier
    
    if ((BALL.x + BALL.radius > GAME.width) || (BALL.x - BALL.radius < 0)) {
        BALL.xspeed = -BALL.xspeed
    }
    
    if (BALL.y - BALL.radius < 0) {
        if (BALL.x > GOAL2.x && BALL.x < GOAL2.x + GOAL2.width) {
            PLAYER1.score++
            updateScoreDisplay()
            resetBall()
            resetWalls()
        } else {
            BALL.yspeed = -BALL.yspeed
        }
    }

    if (BALL.y + BALL.radius > GAME.height) {
        if (BALL.x > GOAL1.x && BALL.x < GOAL1.x + GOAL1.width) {
            PLAYER2.score++
            updateScoreDisplay()
            resetBall()
            resetWalls()
        } else {
            BALL.yspeed = -BALL.yspeed
        }
    }
    if (PLAYER1.score >= 10 || PLAYER2.score >= 10) {
        GAME.gameOver = true
        GAME.winner = PLAYER1.score >= 10 ? 1 : 2
        return
    }
    var player1Collision = checkPlayerCollision(PLAYER1, BALL);
    if (player1Collision.collided) {
        handlePlayerCollision(player1Collision.side);
    }
    var player2Collision = checkPlayerCollision(PLAYER2, BALL);
    if (player2Collision.collided) {
        handlePlayerCollision(player2Collision.side);
    }
    
    if (GAME.wallsActive) {
        
        var wall1TopCollision = BALL.y + BALL.radius > WALL1.y
        var wall1LeftCollision = BALL.x + BALL.radius > WALL1.x
        var wall1RightCollision = BALL.x - BALL.radius < WALL1.x + WALL1.width
        var wall1BottomCollision = BALL.y - BALL.radius < WALL1.y + WALL1.height
        
        if (wall1TopCollision && wall1LeftCollision && wall1RightCollision && wall1BottomCollision) {
            BALL.yspeed = -BALL.yspeed
        }
        
        var wall2TopCollision = BALL.y + BALL.radius > WALL2.y
        var wall2LeftCollision = BALL.x + BALL.radius > WALL2.x
        var wall2RightCollision = BALL.x - BALL.radius < WALL2.x + WALL2.width
        var wall2BottomCollision = BALL.y - BALL.radius < WALL2.y + WALL2.height
        
        if (wall2TopCollision && wall2LeftCollision && wall2RightCollision && wall2BottomCollision) {
            BALL.yspeed = -BALL.yspeed
        }
    }
}

function checkPlayerCollision(player, ball) {
    var ballLeft = ball.x - ball.radius;
    var ballRight = ball.x + ball.radius;
    var ballTop = ball.y - ball.radius;
    var ballBottom = ball.y + ball.radius;
    
    var playerLeft = player.x;
    var playerRight = player.x + player.width;
    var playerTop = player.y;
    var playerBottom = player.y + player.height;
    
    
    if (ballRight > playerLeft && ballLeft < playerRight && ballBottom > playerTop && ballTop < playerBottom) {
        
        var overlapLeft = ballRight - playerLeft;
        var overlapRight = playerRight - ballLeft;
        var overlapTop = ballBottom - playerTop;
        var overlapBottom = playerBottom - ballTop;
        
        var minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
        
        if (minOverlap === overlapTop) return { collided: true, side: "top" };
        if (minOverlap === overlapBottom) return { collided: true, side: "bottom" };
        if (minOverlap === overlapLeft) return { collided: true, side: "left" };
        if (minOverlap === overlapRight) return { collided: true, side: "right" };
    }
    
    return { collided: false, side: "" };
}

function handlePlayerCollision(side) {
    BALL.speedMultiplier += 0.05;
    
    if (side === "top" || side === "bottom") {
       
        BALL.yspeed = -BALL.yspeed;
        
        BALL.xspeed += (Math.random() - 0.5) * 2;
    } else if (side === "left" || side === "right") {
      
        BALL.xspeed = -BALL.xspeed;
       
        BALL.yspeed += (Math.random() - 0.5) * 2;
    }
    
   
    if (BALL.speedMultiplier > 2.0) {
        BALL.speedMultiplier = 2.0;
    }
}

function updateWalls() {
    if (GAME.gameOver) return;
    
    if (!GAME.wallsActive) {
        GAME.wallTimer++
        if (GAME.wallTimer >= 600) { 
            GAME.wallsActive = true
            GAME.wallTimer = 0
            updateScoreDisplay()
        }
    }
    
    if (GAME.wallsActive) {
        WALL1.x += WALL1.xspeed * WALL1.direction
        WALL2.x += WALL2.xspeed * WALL2.direction
        
        if (WALL1.x + WALL1.width >= WALL2.x) {
            WALL1.direction = -1
            WALL2.direction = 1
        }
        
        if (WALL1.x <= -WALL1.width) {
            WALL1.direction = 1
        }
        if (WALL2.x >= GAME.width) {
            WALL2.direction = -1
        }
    }
}

function resetBall() {
    BALL.x = GAME.width / 2
    BALL.y = GAME.height / 2
    BALL.xspeed = (Math.random() > 0.5 ? 1 : -1) * 6
    BALL.yspeed = (Math.random() > 0.5 ? 1 : -1) * 9
    BALL.speedMultiplier = 1.0
}

function resetWalls() {
    WALL1.x = -300
    WALL2.x = 600
    WALL1.direction = 1
    WALL2.direction = -1
    GAME.wallsActive = false
    GAME.wallTimer = 0
    updateScoreDisplay()
}

function resetGame() {
    PLAYER1.score = 0
    PLAYER2.score = 0
    GAME.gameOver = false
    GAME.winner = null
    resetBall()
    resetWalls()
    updateScoreDisplay()
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height)
    drawBackground()
    drawCenterLine()
    drawCenterCircle()
    drawGoal1()
    drawGoal2()
    
    if (GAME.wallsActive) {
        drawWall1()
        drawWall2()
    }
    
    drawBall()
    drawPlayer1()
    drawPlayer2()
    
    if (GAME.gameOver) {
        drawGameOver()
    }
}

function drawBackground() {
    canvasContext.fillStyle = GAME.background
    canvasContext.fillRect(0, 0, GAME.width, GAME.height)
}

function play() {
    drawFrame()
    updateBall()
    updateWalls()
    requestAnimationFrame(play)
}

function initEventsListeners() {
    window.addEventListener("keydown", function (event) {
        if (GAME.gameOver) return;
        
        if (event.key === "ArrowLeft") {
            PLAYER1.x -= PLAYER1.xspeed
        }
        if (event.key === "ArrowRight") {
            PLAYER1.x += PLAYER1.xspeed
        }

        if (event.key === "a" || event.key === "A" || event.key === "ф" || event.key === "Ф") {
            PLAYER2.x -= PLAYER2.xspeed
        }
        if (event.key === "d" || event.key === "D" || event.key === "в" || event.key === "В") {
            PLAYER2.x += PLAYER2.xspeed
        }
        clampPlayerPositions()
    })

    canvas.addEventListener("mousemove", function (event) {
        if (GAME.gameOver) return;
        
        var rect = canvas.getBoundingClientRect()
        var mouseX = event.clientX - rect.left
        PLAYER1.x = mouseX - PLAYER1.width / 2
        clampPlayerPositions()
    })

    canvas.addEventListener("click", function (event) {
        if (GAME.gameOver) {
            var rect = canvas.getBoundingClientRect()
            var mouseX = event.clientX - rect.left
            var mouseY = event.clientY - rect.top
            
            if (mouseX >= GAME.width/2 - 100 && mouseX <= GAME.width/2 + 100 &&
                mouseY >= 380 && mouseY <= 430) {
                resetGame()
            }
        }
    })
}

function clampPlayerPositions() {
    if (PLAYER1.x < 0) {
        PLAYER1.x = 0
    }
    if (PLAYER1.x + PLAYER1.width > GAME.width) {
        PLAYER1.x = GAME.width - PLAYER1.width
    }

    if (PLAYER2.x < 0) {
        PLAYER2.x = 0
    }
    if (PLAYER2.x + PLAYER2.width > GAME.width) {
        PLAYER2.x = GAME.width - PLAYER2.width
    }
}

initEventsListeners()
resetBall()
updateScoreDisplay()
play()