
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var imgGhost = new Image();
imgGhost.src = 'ghost_red.jpg';



var GAME = {
    width: 480,
    height: 480,
    background: 'pink',
}

canvas.width = GAME.width; //+400;
canvas.height = GAME.height;


ctx.fillStyle = GAME.background;
ctx.fillRect(0, 0, GAME.width , GAME.height);


var cellSize = 30; // размер клетки
var rows = 16; // количество рядов
var cols = 16; // количество столбцов 


var field = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1], // 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 2, 0, 1], //, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1], //, 0, 1, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 2, 1, 1, 0, 1, 0, 1], //, 1, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1], //, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1], //, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 2, 0, 0, 1, 0, 0, 0, 0, 1], //, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 2, 1, 0, 0, 0, 0, 1, 1, 0, 1, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]
var PACMAN = {
    x: 4,
    y: 2,
    score: 0, // количество съеденных монеток
    dx: 1,
    dy: 0,
    isOpen: true, //проверка открыт ли рот у пакмена
    interv: 0,
    isDied: false,

}
var PACMAN1 = {
    x: 11,
    y: 14,
    score: 0, // количество съеденных монеток
    dx: 1,
    dy: 0,
    isOpen: true, //проверка открыт ли рот у пакмена
    interv: 0,

}
var MONSTER = {
    x: 1,
    y: 14,
    dx: 0,
    dy: 0,
    count: 0,  // номер хода
    interv: 0,
    //speed: 1 / 20, //относительное смещение монстра за один повторение анимации
}

var monsterPath = [  //смещения монстра 
    [1, 0],
    [0, -1], [0, -1],
    [1, 0],
    [0, -1], [0, -1],
    [-1, 0],
    [0, -1], [0, -1], [0, -1],
    [1, 0], [1, 0],
    [0, -1],
    [1, 0],
    [0, -1],
    [1, 0],
    [0, -1], [0, -1],
    [0, 1], [0, 1],
    [1, 0],
    [0, 1],
    [1, 0],
    [0, 1],
    [1, 0],
    [0, 1],
    [1, 0], [1, 0],
    [0, -1],
    [1, 0], [1, 0],
    [0, -1], [0, -1],
    [-1, 0],
    [0, -1], [0, -1],
    [-1, 0], [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0], [1, 0],
    [0, 1], [0, 1],
    [1, 0], [1, 0],
    [0, -1], [0, -1], [0, -1],
    [0, 1], [0, 1], [0, 1],
    [-1, 0],
    [0, 1], [0, 1],
    [1, 0],
    [0, 1], [0, 1],
    [-1, 0],
    [0, 1],
    [-1, 0],
    [0, 1], [0, 1],
    [-1, 0],
    [0, 1],
    [-1, 0], [-1, 0], [-1, 0], [-1, 0],
    [0, 1],
    [-1, 0], [-1, 0],
    [0, -1],
    [-1, 0],
    [0, -1],
    [-1, 0], [-1, 0],
    [0, 1], [0, 1],
    [-1, 0],
]

function drawField() {
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            switch (field[row][col]) {
                case 0:
                    ctx.fillStyle = 'white';
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                    break;
                case 1: // Стена
                    ctx.fillStyle = 'black';
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                    break;
                case 2: // Монетка
                    ctx.fillStyle = 'white';
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

                    ctx.fillStyle = 'yellow';
                    ctx.strokeStyle = 'orange';
                    ctx.lineWidth = 3; // толщина линии для обводки монет
                    ctx.beginPath();
                    ctx.arc(col * cellSize + cellSize / 2, row * cellSize + cellSize / 2, cellSize / 4, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    break;
            }        }
    }
}


function drawPacman() {

    if (PACMAN.dx == 0 && PACMAN.dy == 1) {
        ctx.fillStyle = '#5D76CB';
        ctx.beginPath();
        PACMAN.interv += 1;
        if (PACMAN.interv == 10) {  // анимация пакмена
            if (PACMAN.isOpen) {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            } else {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0.7 * Math.PI, 2.3 * Math.PI);
            }
            PACMAN.interv = 0;
            PACMAN.isOpen = !PACMAN.isOpen;
        } else {
            if (PACMAN.isOpen) {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0.7 * Math.PI, 2.3 * Math.PI);
            } else {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            }

        }
        ctx.lineTo(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2);
        ctx.fill();
    }
    if (PACMAN.dx == 0 && PACMAN.dy == -1) {
        ctx.fillStyle = '#5D76CB';
        ctx.beginPath();
        PACMAN.interv += 1;
        if (PACMAN.interv == 10) {
            if (PACMAN.isOpen) {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            } else {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, -0.3 * Math.PI, 1.3 * Math.PI);
            }
            PACMAN.interv = 0;
            PACMAN.isOpen = !PACMAN.isOpen;
        } else {
            if (PACMAN.isOpen) {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, -0.3 * Math.PI, 1.3 * Math.PI);
            } else {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            }

        }
        ctx.lineTo(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2);
        ctx.fill();
    }
    if (PACMAN.dx == 1 && PACMAN.dy == 0) {
        ctx.fillStyle = '#5D76CB';
        ctx.beginPath();
        PACMAN.interv += 1;
        if (PACMAN.interv == 10) {
            if (PACMAN.isOpen) {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            } else {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0.2 * Math.PI, 1.8 * Math.PI);
            }
            PACMAN.interv = 0;
            PACMAN.isOpen = !PACMAN.isOpen;
        } else {
            if (PACMAN.isOpen) {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0.2 * Math.PI, 1.8 * Math.PI);
            } else {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            }

        }
        ctx.lineTo(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2);
        ctx.fill();
    }
    if (PACMAN.dx == -1 && PACMAN.dy == 0) {
        ctx.fillStyle = '#5D76CB';
        ctx.beginPath();
        PACMAN.interv += 1;
        if (PACMAN.interv == 10) {
            if (PACMAN.isOpen) {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            } else {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, -0.8 * Math.PI, 0.8 * Math.PI);
            }
            PACMAN.interv = 0;
            PACMAN.isOpen = !PACMAN.isOpen;
        } else {
            if (PACMAN.isOpen) {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, -0.8 * Math.PI, 0.8 * Math.PI);
            } else {
                ctx.arc(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            }

        }
        ctx.lineTo(PACMAN.x * cellSize + cellSize / 2, PACMAN.y * cellSize + cellSize / 2);
        ctx.fill();
    }
}

function drawPacman1() {

    if (PACMAN1.dx == 0 && PACMAN1.dy == 1) {
        ctx.fillStyle = '#009B77';
        ctx.beginPath();
        PACMAN1.interv += 1;
        if (PACMAN1.interv == 10) {  // анимация пакмена
            if (PACMAN1.isOpen) {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            } else {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0.7 * Math.PI, 2.3 * Math.PI);
            }
            PACMAN1.interv = 0;
            PACMAN1.isOpen = !PACMAN1.isOpen;
        } else {
            if (PACMAN1.isOpen) {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0.7 * Math.PI, 2.3 * Math.PI);
            } else {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            }

        }
        ctx.lineTo(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2);
        ctx.fill();
    }
    if (PACMAN1.dx == 0 && PACMAN1.dy == -1) {
        ctx.fillStyle = '#009B77';
        ctx.beginPath();
        PACMAN1.interv += 1;
        if (PACMAN1.interv == 10) {
            if (PACMAN1.isOpen) {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            } else {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, -0.3 * Math.PI, 1.3 * Math.PI);
            }
            PACMAN1.interv = 0;
            PACMAN1.isOpen = !PACMAN1.isOpen;
        } else {
            if (PACMAN1.isOpen) {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, -0.3 * Math.PI, 1.3 * Math.PI);
            } else {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            }

        }
        ctx.lineTo(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2);
        ctx.fill();
    }
    if (PACMAN1.dx == 1 && PACMAN1.dy == 0) {
        ctx.fillStyle = '#009B77';
        ctx.beginPath();
        PACMAN1.interv += 1;
        if (PACMAN1.interv == 10) {
            if (PACMAN1.isOpen) {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            } else {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0.2 * Math.PI, 1.8 * Math.PI);
            }
            PACMAN1.interv = 0;
            PACMAN1.isOpen = !PACMAN1.isOpen;
        } else {
            if (PACMAN1.isOpen) {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0.2 * Math.PI, 1.8 * Math.PI);
            } else {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            }

        }
        ctx.lineTo(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2);
        ctx.fill();
    }


    if (PACMAN1.dx == -1 && PACMAN1.dy == 0) {
        ctx.fillStyle = '#009B77';
        ctx.beginPath();
        PACMAN1.interv += 1;
        if (PACMAN1.interv == 10) {
            if (PACMAN1.isOpen) {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            } else {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, -0.8 * Math.PI, 0.8 * Math.PI);
            }
            PACMAN1.interv = 0;
            PACMAN1.isOpen = !PACMAN1.isOpen;
        } else {
            if (PACMAN1.isOpen) {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, -0.8 * Math.PI, 0.8 * Math.PI);
            } else {
                ctx.arc(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
            }

        }
        ctx.lineTo(PACMAN1.x * cellSize + cellSize / 2, PACMAN1.y * cellSize + cellSize / 2);
        ctx.fill();
    }
}

function drawMonster() {
    ctx.drawImage(imgGhost, MONSTER.x * cellSize, MONSTER.y * cellSize, cellSize, cellSize);
    /*ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(MONSTER.x * cellSize + cellSize / 2, MONSTER.y * cellSize + cellSize / 2, cellSize / 2 - 2, 2 * Math.PI, 0);
    ctx.lineTo(MONSTER.x * cellSize + cellSize / 2, MONSTER.y * cellSize + cellSize / 2);
    ctx.fill();*/
}


function moveMonster() {
    if (MONSTER.count < monsterPath.length && MONSTER.interv == 20) {
        MONSTER.dx = monsterPath[MONSTER.count][0];
        MONSTER.dy = monsterPath[MONSTER.count][1];
        MONSTER.count += 1;
        MONSTER.interv = 0;
        MONSTER.x += (MONSTER.dx);
        MONSTER.y += (MONSTER.dy)
    }
    if (MONSTER.x == 1 && MONSTER.y == 14) {
        MONSTER.count = 0;
    }
    MONSTER.interv += 1;

}




function movePacman(dx, dy) {
    PACMAN.dx = dx;
    PACMAN.dy = dy;
    if (field[PACMAN.y + dy][PACMAN.x + dx] !== 1) {
        PACMAN.x += dx;
        PACMAN.y += dy;

        if (field[PACMAN.y][PACMAN.x] == 2) {
            field[PACMAN.y][PACMAN.x] = 0;
            PACMAN.score += 1;
        }
    }
}
function movePacman1(dx, dy) {
    PACMAN1.dx = dx;
    PACMAN1.dy = dy;
    if (field[PACMAN1.y + dy][PACMAN1.x + dx] !== 1) {
        PACMAN1.x += dx;
        PACMAN1.y += dy;

        if (field[PACMAN1.y][PACMAN1.x] == 2) {
            field[PACMAN1.y][PACMAN1.x] = 0;
            PACMAN1.score += 1;
        }
    }
}

function initEventsListeners() {
    window.addEventListener('keydown', onCanvasKeyDown);
}
function initEventsListeners1() {
    window.addEventListener('keydown', onCanvasKeyDown1);
}

function onCanvasKeyDown1(event) {
    if (event.key === 'ArrowLeft') {
        movePacman1(-1, 0);

    }
    if (event.key === 'ArrowRight') {
        movePacman1(1, 0);
    }
    if (event.key === 'ArrowUp') {
        movePacman1(0, -1);

    }
    if (event.key === 'ArrowDown') {
        movePacman1(0, 1);

    }
}
function onCanvasKeyDown(event) {
    if (event.key === 'a') {
        movePacman(-1, 0);

    }
    if (event.key === 'd') {
        movePacman(1, 0);
    }
    if (event.key === 'w') {
        movePacman(0, -1);

    }
    if (event.key === 's') {
        movePacman(0, 1);

    }
}


function winPacman() {
    ctx.fillStyle = '#5D76CB';
    ctx.fillRect((GAME.width - 400) / 2, (GAME.height - 150) / 2, 400, 150);
    ctx.font = "40px times new roman";
    ctx.lineWidth = 1.5;
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("ПОБЕДА СИНЕГО", GAME.width / 2, GAME.height / 2 + 15);
}
function winPacman1() {
    ctx.fillStyle = '#009B77';
    ctx.fillRect((GAME.width - 400) / 2, (GAME.height - 150) / 2, 400, 150);
    ctx.font = "40px times new roman";
    ctx.lineWidth = 1.5;
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("ПОБЕДА ЗЕЛЕНОГО", GAME.width / 2, GAME.height / 2 + 15);
}

function play() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    ctx.fillStyle = GAME.background;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
    drawField();
    moveMonster();
    drawMonster();

    if (PACMAN.score + PACMAN1.score < 6) {
        if (!(PACMAN.x == MONSTER.x && PACMAN.y == MONSTER.y) && !PACMAN.isDied) {
            initEventsListeners();
            drawPacman();
        }
        else {
            PACMAN.isDied = true;
            winPacman1();

        }
        if (!(PACMAN1.x == MONSTER.x && PACMAN1.y == MONSTER.y) && !PACMAN1.isDied) {
            initEventsListeners1();
            drawPacman1();
        } else {
            PACMAN1.isDied = true;
            winPacman();
        }
        requestAnimationFrame(play);
    }
    else {
        if (PACMAN.score > PACMAN1.score) {
            winPacman();
        } else if (PACMAN1.score > PACMAN.score) {
            winPacman1();
        } else {
            ctx.fillStyle = "#009B77";
            ctx.fillRect((GAME.width - 400) / 2, (GAME.height - 150) / 2, 400/2, 150);
            ctx.fillStyle = "#5D76CB";
            ctx.fillRect((GAME.width - 400) / 2 + 400/2, (GAME.height - 150) / 2, 400/2, 150);
            ctx.font = "60px times new roman";
            ctx.lineWidth = 1.5;
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("НИЧЬЯ", GAME.width / 2, GAME.height / 2 + 15);
        }
    }
}

//initEventsListeners();
//initEventsListeners1();
play();
