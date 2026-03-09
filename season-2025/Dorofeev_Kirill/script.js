const canvas = document.getElementById('canvas');
const canvas1 = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const ctx1 = canvas1.getContext('2d');

const COLS = 20;
const ROWS = 20;
const CELL = canvas.width / COLS;

let isPlaying = false
let startTime;
let currentTime = 0
let timelast = 20

const playerImg = new Image();
playerImg.src = "./player.png"

const finishImg = new Image();
finishImg.src = './finish1.svg'
const finishImgReady = new Image();
finishImgReady.src = './finish.svg'

const moneyImg = new Image()
moneyImg.src = './money.png'

let maze_best_result = localStorage.getItem('maze_best_result')
if (!maze_best_result) {
    localStorage.setItem('maze_best_result', Math.pow(10, 6))
    maze_best_result = Math.pow(10, 6)
}
let stars = []
let currentStars = 0
let claimedStars = 0

function drawTimer(color) {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx1.fillStyle = color
    ctx1.font = "32px Arial";
    ctx1.textAlign = "center";

    const text = currentTime.toFixed(2);
    ctx1.fillText(text, canvas1.width / 2, canvas1.height / 2 + 10);

    ctx1.fillStyle = 'white'
    ctx1.font = "24px Arial";
    const text1 = timelast;
    ctx1.fillText(text1, canvas1.width / 2, canvas1.height / 2 + 40);
}

function spawnRandomStar() {
    while (true) {
        const x = Math.floor(Math.random() * COLS);
        const y = Math.floor(Math.random() * ROWS);

        const cell = grid[index(x, y)];

        if (!cell) continue;

        if (player.gridX === x && player.gridY === y) continue;

        if (finish.x === x && finish.y === y) continue;

        if (stars.some(s => s.x === x && s.y === y)) continue;

        stars.push({ x, y, rotation: 0 });
        currentStars = stars.length;
        break;
    }
}

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.walls = [true, true, true, true];
        this.visited = false;
    }

    draw() {
        const x = this.x * CELL;
        const y = this.y * CELL;

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;

        if (this.walls[0]) drawLine(x, y, x + CELL, y);
        if (this.walls[1]) drawLine(x + CELL, y, x + CELL, y + CELL);
        if (this.walls[2]) drawLine(x + CELL, y + CELL, x, y + CELL);
        if (this.walls[3]) drawLine(x, y + CELL, x, y);
    }
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

let grid = [];
for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
        grid.push(new Cell(x, y));
    }
}

function index(x, y) {
    if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return -1;
    return x + y * COLS;
}

function getRandomNeighbor(cell) {
    const neighbors = [];
    const {x, y} = cell;

    const top = grid[index(x, y - 1)];
    const right = grid[index(x + 1, y)];
    const bottom = grid[index(x, y + 1)];
    const left = grid[index(x - 1, y)];

    if (top && !top.visited) neighbors.push(top);
    if (right && !right.visited) neighbors.push(right);
    if (bottom && !bottom.visited) neighbors.push(bottom);
    if (left && !left.visited) neighbors.push(left);

    if (neighbors.length > 0) {
        return neighbors[Math.floor(Math.random() * neighbors.length)];
    }
    return undefined;
}

function removeWalls(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    if (dx === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (dx === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    if (dy === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (dy === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

let stack = [];
let current = grid[0];

function generateMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Загрузка уровня...', canvas.width/2 - 120, canvas.height/2);

    current.visited = true;

    let next = getRandomNeighbor(current);
    if (next) {
        next.visited = true;
        stack.push(current);
        removeWalls(current, next);
        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }

    if (stack.length > 0) {
        requestAnimationFrame(generateMaze);
    } else {
        startTime = Date.now()
        isPlaying = true
        startTime = Date.now();
        lastTimer = setInterval(() => {
            timelast -= 1
        }, 1000)
        generateNewTimer = setInterval(() => {
            timelast = 20
            stars = []
            currentStars = 0
            while (stars.length < 5 - claimedStars) {
                spawnRandomStar();
            }
        }, 20000)
        timerInterval = setInterval(() => {
            currentTime = (Date.now() - startTime) / 1000;
            drawTimer(isPlaying ? (currentTime < maze_best_result ? 'white' : 'red') : (currentTime < maze_best_result ? 'lime' : 'red'));
        }, 10);
        finalizeMaze();
    }
}

let player = {
    angle: 0,
    gridX: 0,
    gridY: 0,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isMoving: false,
    speed: 6
};

let finish = { x: COLS - 1, y: ROWS - 1 };

function findSpawn() {
    return grid.find(c => !c.walls[0] || !c.walls[1] || !c.walls[2] || !c.walls[3]);
}

function drawPlayer() {
    const size = CELL * 0.8;

    const centerX = player.x + CELL / 2;
    const centerY = player.y + CELL / 2;

    ctx.save();

    ctx.translate(centerX, centerY);

    ctx.rotate(player.angle || 0);

    ctx.drawImage(
        playerImg,
        -size / 2,
        -size / 2,
        size,
        size
    );
    ctx.restore();
}


function drawFinish() {
    const size = CELL * 0.8;
    const offset = (CELL - size) / 2;
    const dx = finish.x * CELL + offset;
    const dy = finish.y * CELL + offset;
    if (claimedStars === 5) ctx.drawImage(finishImgReady, dx, dy, size, size);
    else ctx.drawImage(finishImg, dx, dy, size, size);
}

function drawStars() {
    for (let s of stars) {

        const cx = s.x * CELL + CELL / 2;
        const cy = s.y * CELL + CELL / 2;

        const size = CELL * 0.6;
        const squash = Math.abs(Math.cos(s.rotation));

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(squash, 1);

        ctx.drawImage(
            moneyImg,
            -size / 2,
            -size / 2,
            size,
            size
        );

        ctx.restore();
    }
}


function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let cell of grid) cell.draw();
    drawFinish();
    drawPlayer();
    drawStars()
}

function canMove(from, to, dir) {
    const cell = grid[index(from.gridX, from.gridY)];
    if (!cell) return false;

    if (to.x < 0 || to.y < 0 || to.x >= COLS || to.y >= ROWS) return false;

    if (dir === 'up' && cell.walls[0]) return false;
    if (dir === 'right' && cell.walls[1]) return false;
    if (dir === 'down' && cell.walls[2]) return false;
    if (dir === 'left' && cell.walls[3]) return false;

    return true;
}

function movePlayer(dir) {
    if (player.isMoving) return;

    let nx = player.gridX;
    let ny = player.gridY;

    if (dir === 'up') {
        player.angle = -Math.PI / 2
        ny--
    }
    if (dir === 'down') {
        ny++
        player.angle = Math.PI / 2;
    }
    if (dir === 'left') {
        nx--
        player.angle = Math.PI;
    }
    if (dir === 'right') {
        nx++;
        player.angle = 0;
    }
    if (!canMove(player, {x: nx, y: ny}, dir)) return;

    player.gridX = nx;
    player.gridY = ny;

    player.targetX = nx * CELL;
    player.targetY = ny * CELL;

    player.isMoving = true;

    if (nx === finish.x && ny === finish.y && claimedStars === 5) {
        setTimeout(() => {
            isPlaying = false
            winTime = (Date.now() - startTime) / 1000
        }, 200)
    }
}

function updatePlayer() {
    if (!player.isMoving) return;
    for (let i = stars.length - 1; i >= 0; i--) {
        if (player.gridX === stars[i].x && player.gridY === stars[i].y) {
            stars.splice(i, 1);
            currentStars = stars.length;
            claimedStars += 1
        }
    }
    if (player.x < player.targetX) {
        player.x += player.speed;
        if (player.x > player.targetX) player.x = player.targetX;
    } else if (player.x > player.targetX) {
        player.x -= player.speed;
        if (player.x < player.targetX) player.x = player.targetX;
    }

    if (player.y < player.targetY) {
        player.y += player.speed;
        if (player.y > player.targetY) player.y = player.targetY;
    } else if (player.y > player.targetY) {
        player.y -= player.speed;
        if (player.y < player.targetY) player.y = player.targetY;
    }
    
    if (player.x === player.targetX && player.y === player.targetY) {
        player.isMoving = false;
    }
}

function drawEndMenu(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'
    ctx.font = '36px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Игра завершена!', canvas.width/2, canvas.height/2 - 40)
    ctx.font = '24px Arial'
    ctx.fillText('Время прохождения: ' + winTime.toFixed(2) + 'сек.', canvas.width/2, canvas.height/2 + 10)
    ctx.font = '24px Arial'
    ctx.fillText('Собрано звёзд: ' + claimedStars + '/5', canvas.width/2, canvas.height/2 + 60)
    ctx.fillText('Нажмите [R], чтоюы начать заново', canvas.width/2, canvas.height/2 + 110)
    
    if (localStorage.getItem('maze_best_result') && localStorage.getItem('maze_best_result') > currentTime){
        localStorage.setItem('maze_best_result', currentTime)
    }
    drawTimer(currentTime < maze_best_result ? 'lime' : 'red')
}

function gameLoop() {
    if (isPlaying) {
        updatePlayer();
        for (let s of stars) {
            s.rotation += 0.05
        }
        drawMaze();
        requestAnimationFrame(gameLoop);
    } else {
        clearInterval(timerInterval)
        clearInterval(generateNewTimer)
        drawEndMenu()
    }
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' || e.key === 'w') movePlayer('up');
    if (e.key === 'ArrowDown' || e.key === 's') movePlayer('down');
    if (e.key === 'ArrowLeft' || e.key === 'a') movePlayer('left');
    if (e.key === 'ArrowRight' || e.key === 'd') movePlayer('right');
});

function finalizeMaze() {
    const spawn = findSpawn();

    player.gridX = spawn.x;
    player.gridY = spawn.y;

    player.x = spawn.x * CELL;
    player.y = spawn.y * CELL;

    finish.x = COLS - 1;
    finish.y = ROWS - 1;
    
    if (!isPlaying) {
        player.targetX = player.x;
        player.targetY = player.y;
    }
    while (currentStars < 5){
        spawnRandomStar()
    }
    gameLoop();
}

generateMaze();

document.addEventListener('keydown', e => {
    if (!isPlaying && e.key.toLowerCase() === 'r'){
        document.location.pathname='/'
    }
})