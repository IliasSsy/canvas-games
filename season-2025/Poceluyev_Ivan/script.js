
var scoreEngineOne = 0;
var scoreEngineTwo = 0;
var scoreEngineThree = 0;

var scoreEngine = 0;
var health = 1;

cellY = [];
cellX = [];

var scoreItemY = 30;
var scoreItemX = 30;

var HISTORY = {
    width: 900,
    height: 900,
    background: '#F5F0E1',
    textColor: 'black',
} 

var VICTORY = {
    width: 1800,
    height: 900,
    background: '#F5F0E1',
    textColor: 'black',
}

var GAME = {
    width: 1800,
    height: 900,
    background: 'black',
}

var PLAYER = {
    x: 37,
    y: 840,
    width: 3,
    height: 3,
    xDirection: 10,
    yDirection: 5,
    color: '#f5f12c',
    colorStroke: 'bleak',
}

var CELL = {
    width: 30,
    height: 30,
    color: '#052b0f',
}

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

//var  randXEnemy = getRandomInt(50, 850);
//var  randYEnemy = getRandomInt(50, 850);

// var ENEMYS = []
// for (let i = 0; i < 4; i++) {
//     ENEMYS.push({
//         x: 45,
//         y: 135,
//         radius: 8,
//         color: 'red',
//         xDirection: 8,
//         yDirection: 5,
//     })
// }
// ENEMYS[0].x = 5;

var ENGINE = {
    x: 35,
    y: 35,
    width: 50,
    height: 50,
}

var ENGINE1 = {
    x: 725,
    y: 425,
    width: 50,
    height: 50,
}

var ENGINE2 = {
    x: 485,
    y: 815,
    width: 50,
    height: 50,
}

var ENEMY = {
    x: 45,
    y: 135,
    radius: 8,
    color: 'red',
    xDirection: 6,
    yDirection: 5,
}

var ENEMY1 = {
    x: 675,
    y: 45,
    radius: 8,
    color: 'red',
    xDirection: 8,
    yDirection: 7,
}

var ENEMY2 = {
    x: 435,
    y: 45,
    radius: 8,
    color: 'red',
    xDirection: 10,
    yDirection: 9,
}

var canvas = document.getElementById('canvas'); // Получаем объект холста
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext('2d'); // Получаем инструмент для рисования

function drawBackGround() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

var field = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1], // 10
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1], // 20
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

let wallimg = new Image();
wallimg.src = './img/wall.png';
function drawWall(i, j) {
    canvasContext.drawImage(wallimg, j * CELL.width, i * CELL.height, CELL.width, CELL.height);
    //canvasContext.fillStyle = CELL.color;
    //canvasContext.fillRect(j * CELL.width, i * CELL.height, CELL.width, CELL.height);
}

function drawCell(cell, i, j) {
    if ((cell === 1)){
        drawWall(i, j);
    }
}

function drawCells() {
    field.forEach((row, i) => { 
        if (scoreItemY > 0) {
            cellY.push(i)
            scoreItemY -= 1;
        }
        row.forEach((cell, j) => {
            drawCell(cell, i, j)
            if (scoreItemX > 0) {
                cellX.push(j)
                scoreItemX -= 1;
            }

        })
    })
}

function wallCollision() {
    field.forEach((row, i) => { 
        let isCollizion = false;
        row.forEach((cell, j) => {
            if (cell === 1) {
                
                let wall = {x: j * CELL.width, y:i * CELL.height, width:CELL.width, height:CELL.height}
                var TopLineCollision = PLAYER.y + PLAYER.height > wall.y - 1;
                var LeftLineCollision = PLAYER.x + PLAYER.width > wall.x - 1;
                var RightLineCollision = PLAYER.x - 1 < wall.x + wall.width;
                var BottomLineCollision = PLAYER.y - 1 < wall.y + wall.height;
                if ((TopLineCollision && LeftLineCollision && RightLineCollision && BottomLineCollision)) {
                    isCollizion = true;
                    health -= 1;
                }
            }

        })
    })
} 
function drawExit() {
    canvasContext.strokeStyle = 'white';
    canvasContext.lineWidth = 2;
    canvasContext.beginPath();
    canvasContext.moveTo(840, 120);
    canvasContext.lineTo(880, 120);
    canvasContext.lineTo(880, 110);
    canvasContext.lineTo(900, 125);
    canvasContext.lineTo(880, 140);
    canvasContext.lineTo(880, 130);
    canvasContext.lineTo(840, 130);
    canvasContext.closePath();
    canvasContext.stroke();

}

function drawScore() {
    canvasContext.font = "48px morana";
    if (scoreEngine === 0) {
        canvasContext.fillStyle = 'white'
    }
    if (scoreEngine === 1) {
        canvasContext.fillStyle = 'red'
    }
    if (scoreEngine === 2) {
        canvasContext.fillStyle = 'yellow'
    }
    if (scoreEngine === 3) {
        canvasContext.fillStyle = 'green'
    }
    canvasContext.fillText("Запущенные аппараты: " + scoreEngine, 1000, 50);
}

function drawHistory() {
    canvasContext.fillStyle = VICTORY.background;
    canvasContext.fillRect(0, 0, VICTORY.width, VICTORY.height);
    canvasContext.fillStyle = VICTORY.textColor;
    
    canvasContext.font = "18px morana";
    canvasContext.fillText('В далёком будущем все люди вынуждены спуститься в бункера, находящиеся глубоко под землёй.', 40, 330);
    canvasContext.fillText('Озоновый слой невероятно истощился и уже не может полноценно сдерживать опасные ултрафиолетовые лучи.', 15, 430);
    canvasContext.fillText('Ваша задача добраться и запустить три аппарата для восстановления озонового слоя...', 50, 530);
}

function drawVictory() {
    canvasContext.fillStyle = VICTORY.background;
    canvasContext.fillRect(0, 0, VICTORY.width, VICTORY.height);
    canvasContext.fillStyle = VICTORY.textColor;

    canvasContext.font = "50px morana";
    canvasContext.fillText('Здесь должен быть переход на следующий уровень', 100, 200  );
}

let loseimg = new Image();
loseimg.src = './img/lose.jpg';
function drawLose() {
    canvasContext.drawImage(loseimg, 0, 0, HISTORY.width, HISTORY.height)

    canvasContext.fillStyle = 'black'
    canvasContext.font = "100px morana";
    canvasContext.fillText('Робот сломан!', 100 , 800);
}

// let fallImg = new Image();
// fallImg.src = './img/fall.jpg';
// function drawFall() {
//     canvasContext.drawImage(fallImg, 0, 0, VICTORY.width, VICTORY.height)
// }


function drawFrame() {
    drawBackGround();
    drawExit();
    //drawFall();
    drawPlayer();
    wallCollision();
    drawCells();

    drawEngine();
    applyEngine();
    drawEngine1();
    applyEngine1();
    drawEngine2();
    applyEngine2();

    drawEnemy();
    updateEnemy();
    drawEnemy1();
    updateEnemy1();
    drawEnemy2();
    updateEnemy2();

    drawScore();
}

var engineImg = new Image();
engineImg.src = './img/engine.png';
function drawEngine() {
    canvasContext.drawImage(engineImg, ENGINE.x, ENGINE.y, ENGINE.width, ENGINE.height);
}

function applyEngine() {
    if ((PLAYER.y + PLAYER.height > ENGINE.y) && (PLAYER.y - PLAYER.height < ENGINE.y + ENGINE.height) && (PLAYER.x + PLAYER.width > ENGINE.x) && (PLAYER.x < ENGINE.x + ENGINE.width) && (scoreEngineOne < 1)) {
        scoreEngine += 1;
        console.log(scoreEngine)
        scoreEngineOne += 1;

    }
}

function drawEngine1() {
    canvasContext.drawImage(engineImg, ENGINE1.x, ENGINE1.y, ENGINE1.width, ENGINE1.height);
}

function applyEngine1() {
    if ((PLAYER.y + PLAYER.height > ENGINE1.y && PLAYER.y - PLAYER.height < ENGINE1.y + ENGINE1.height) && (PLAYER.x + PLAYER.width > ENGINE1.x && PLAYER.width < ENGINE1.x + ENGINE1.width) && scoreEngineTwo < 1) {
        scoreEngine += 1;
        console.log(scoreEngine)
        scoreEngineTwo += 1;
    }
}

function drawEngine2() {
    canvasContext.drawImage(engineImg, ENGINE2.x, ENGINE2.y, ENGINE2.width, ENGINE2.height);
}

function applyEngine2() {
    if ((PLAYER.y + PLAYER.height > ENGINE2.y && PLAYER.y - PLAYER.height < ENGINE2.y + ENGINE2.height) && (PLAYER.x + PLAYER.width > ENGINE2.x && PLAYER.width < ENGINE2.x + ENGINE2.width) && scoreEngineThree < 1) {
        scoreEngine += 1;
        console.log(scoreEngine)
        scoreEngineThree += 1;
    }
}

function drawEnemy() {
    canvasContext.fillStyle = ENEMY.color;
    canvasContext.beginPath();
    canvasContext.arc(ENEMY.x, ENEMY.y, ENEMY.radius, 0, 2 * Math.PI);
    canvasContext.closePath();
    canvasContext.fill();
}

function updateEnemy() {
    ENEMY.x += ENEMY.xDirection;
    ENEMY.y += ENEMY.yDirection;

    let isCollizion = false;
    field.forEach((row, i) => { 
        row.forEach((cell, j) => {
            if (cell === 1) {
                
                let wall = {x: j * CELL.width, y:i * CELL.height, width:CELL.width, height:CELL.height}
                let TopLineCollision  = ENEMY.y + ENEMY.radius > wall.y;
                let LeftLineCollision = ENEMY.x + ENEMY.radius > wall.x;
                let RightLineCollision = ENEMY.x - ENEMY.radius < wall.x + wall.width;
                let BottomLineCollision = ENEMY.y - ENEMY.radius < wall.y + wall.height;
                if ((TopLineCollision && LeftLineCollision) && (RightLineCollision && BottomLineCollision)) {
                    isCollizion = true;
                }

                if ((ENEMY.y + ENEMY.radius > PLAYER.y) && (ENEMY.x + ENEMY.radius > PLAYER.x) && (ENEMY.x - ENEMY.radius < PLAYER.x + PLAYER.width) && (ENEMY.y - ENEMY.radius < PLAYER.y + PLAYER.height)) {
                    isCollizion = true;
                    health -= 1;
                }
            }

        })
    })
if (isCollizion) {
    
    ENEMY.xDirection = -ENEMY.xDirection;

}

if (ENEMY.y + ENEMY.radius > GAME.height - 30) {
    ENEMY.yDirection = -ENEMY.yDirection;
}

if (ENEMY.y - ENEMY.radius < 30) {
    ENEMY.yDirection = -ENEMY.yDirection;
}
}

function drawEnemy1() {
    canvasContext.fillStyle = ENEMY1.color;
    canvasContext.beginPath();
    canvasContext.arc(ENEMY1.x, ENEMY1.y, ENEMY1.radius, 0, 2 * Math.PI);
    canvasContext.closePath();
    canvasContext.fill();
}

function updateEnemy1() {
    ENEMY1.x += ENEMY1.xDirection;
    ENEMY1.y += ENEMY1.yDirection;

    let isCollizion = false;
    field.forEach((row, i) => { 
        row.forEach((cell, j) => {
            if (cell === 1) {
                
                let wall = {x: j * CELL.width, y:i * CELL.height, width:CELL.width, height:CELL.height}
                if ((ENEMY1.y + ENEMY1.radius > wall.y && ENEMY1.x + ENEMY1.radius > wall.x) && (ENEMY1.x - ENEMY1.radius < wall.x + wall.width && ENEMY1.y - ENEMY1.radius < wall.y + wall.height)) {
                    isCollizion = true;
                }

                if ((ENEMY1.y + ENEMY1.radius > PLAYER.y) && (ENEMY1.x + ENEMY1.radius > PLAYER.x) && (ENEMY1.x - ENEMY1.radius < PLAYER.x + PLAYER.width) && (ENEMY1.y - ENEMY1.radius < PLAYER.y + PLAYER.height)) {
                    isCollizion = true;
                    health -= 1;
                }
            }

        })
    })
if (isCollizion) {
    
    ENEMY1.xDirection = -ENEMY1.xDirection;

}

if (ENEMY1.y + ENEMY1.radius > GAME.height - 30) {
    ENEMY1.yDirection = -ENEMY1.yDirection;
}

if (ENEMY1.y - ENEMY1.radius < 30) {
    ENEMY1.yDirection = -ENEMY1.yDirection;
}
}

function drawEnemy2() {
    canvasContext.fillStyle = ENEMY1.color;
    canvasContext.beginPath();
    canvasContext.arc(ENEMY2.x, ENEMY2.y, ENEMY2.radius, 0, 2 * Math.PI);
    canvasContext.closePath();
    canvasContext.fill();
}

function updateEnemy2() {
    ENEMY2.x += ENEMY2.xDirection;
    ENEMY2.y += ENEMY2.yDirection;

    let isCollizion = false;
    field.forEach((row, i) => { 
        row.forEach((cell, j) => {
            if (cell === 1) {
                
                let wall = {x: j * CELL.width, y:i * CELL.height, width:CELL.width, height:CELL.height}
                if ((ENEMY2.y + ENEMY2.radius > wall.y && ENEMY2.x + ENEMY2.radius > wall.x) && (ENEMY2.x - ENEMY2.radius < wall.x + wall.width && ENEMY2.y - ENEMY2.radius < wall.y + wall.height)) {
                    isCollizion = true;
                }

                if ((ENEMY2.y + ENEMY2.radius > PLAYER.y) && (ENEMY2.x + ENEMY2.radius > PLAYER.x) && (ENEMY2.x - ENEMY2.radius < PLAYER.x + PLAYER.width) && (ENEMY2.y - ENEMY2.radius < PLAYER.y + PLAYER.height)) {
                    isCollizion = true;
                    health -= 1;
                }
            }

        })
    })
if (isCollizion) {
    
    ENEMY2.xDirection = -ENEMY2.xDirection;

}

if (ENEMY2.y + ENEMY2.radius > GAME.height - 30) {
    ENEMY2.yDirection = -ENEMY2.yDirection;
}

if (ENEMY2.y - ENEMY2.radius < 30) {
    ENEMY2.yDirection = -ENEMY2.yDirection;
}
}



function drawPlayer() {
    canvasContext.strokeStyle = PLAYER.colorStroke;
    canvasContext.lineWidth = 4;
    canvasContext.beginPath();
    canvasContext.moveTo(PLAYER.x, PLAYER.y);
    canvasContext.lineTo(PLAYER.x + PLAYER.width, PLAYER.y);
    canvasContext.lineTo(PLAYER.x + PLAYER.width, PLAYER.y + PLAYER.height);
    canvasContext.lineTo(PLAYER.x, PLAYER.y + PLAYER.height);
    canvasContext.closePath();
    canvasContext.stroke();
    canvasContext.fillStyle = PLAYER.color;
    canvasContext.fillRect(PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height)

}

function initEventsListeners() {
    window.addEventListener('mousedown', onCanvasMouseDown);
    window.addEventListener('mouseup', onCanvasMouseUp);
    window.addEventListener('mousemove', onCanvasMouseMove) 
}   

var mousedown = false;

function onCanvasMouseDown(event) {
        mousedown = true;
        console.log(mousedown);
}

function onCanvasMouseUp(event) {
        mousedown = false;
        console.log(mousedown);
}
function onCanvasMouseMove(event) {

    if (mousedown) {
        PLAYER.xDirection = event.clientX - PLAYER.x;
        PLAYER.yDirection = -(PLAYER.y - event.clientY);

        PLAYER.x += Math.round((PLAYER.xDirection - PLAYER.width) / 5);
        PLAYER.y += Math.round((PLAYER.yDirection - PLAYER.height) / 5);
    }
}

var historyScore = 1;

function play() {
    drawFrame();
    drawPlayer();

    if (historyScore > 0) {
        //drawHistory();
    }

    if (health > 0){
        requestAnimationFrame(play);     
    } 

    if ((PLAYER.x > GAME.width ) && (PLAYER.y + PLAYER.height / 2 > 90) && (PLAYER.y + PLAYER.height / 2 < 150) && (scoreEngine === 3)) {
        drawVictory();  
    } 

    if (health <= 0) {
        drawLose();
    }
}
initEventsListeners();
play();