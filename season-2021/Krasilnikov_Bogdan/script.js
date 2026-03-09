var GAME = {
    width: 1200,
    height: 800,
    fps: 1000 / 60,
    canvasContext: null,
    background: new Image(),
    number: 1,
    level: 1,
    ulta: 1,
    water: 20,
    over: false,
}

var ULTA = {
    location: [],
    x: 0,
    y: 0,
    size: 100,
    found: false,
    background: new Image()
}

var OVER = {
    background: new Image(),
}

var CELL = {
    size: 100,
    number: (GAME.width/100) * (GAME.height/100),
}

var PORTAL = {
    size: 100,
    background: new Image(),
    x: (GAME.width - CELL.size),
    y: (GAME.height - CELL.size),
}

var PLAYER = {
    x: 0,
    y: 0,
    size: 100,
    color: "green",
    background: new Image(),
    state: "img/cactus.png",   
}

var BLOCK = {
    size: 100,
    x: 200,
    y: 200,
    background: new Image(),
    number: GAME.level * 3,
    location: []
}

var SURPRIZE = {
    size: 100,
    x: 200,
    y: 200,
    background: new Image(),
}

var WATER = {
    size: 100,
    x: 0,
    y: 0,
    background: new Image(),
    location: [],
    found: false,
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min)) + min); //Максимум не включается, минимум включается
}

function init() {
    GAME.background.src = "img/bg.png";
    PLAYER.background.src = PLAYER.state;
    BLOCK.background.src = "img/block.png";
    PORTAL.background.src = "img/portal.png"; 
    ULTA.background.src = "img/sun.png";
    SURPRIZE.background.src = "img/surprize.png";
    OVER.background.src = "img/gameover.png";
    WATER.background.src = "img/water.png";

    var canvas = document.getElementById("canvas");
    _initCanvas(canvas);
    _initEventsListeners(canvas);
    _initBlocksLocation();

    GAME.background.onload = function() {
        setInterval(play, GAME.fps); 
    }    
}

function _initBlocksLocation() {
    BLOCK.location = [];
    let k = 0;
    while (k < BLOCK.number) {
        let n = getRandomInt(2, CELL.number - 1);;
        if ((!BLOCK.location.includes(n)) && (n != 83) && (n != 2)) {
            BLOCK.location.push(n);
            k++;
        }
    }
}

function initUltaLocation() {
    let x = getRandomInt(5, 93);
    ULTA.location = [];
    ULTA.location.push(x);
}

function initWaterLocation() {
    let x = getRandomInt(5, 93);
    WATER.location = [];
    if (x != ULTA.location[0]) {
        WATER.location.push(x);
    }
}


function newLewel() {
    PLAYER.x = 0;
    PLAYER.y = 0;
    GAME.level += 1;
    ULTA.location = [];
    WATER.location = [];
    if (GAME.level % 3 == 0) {
        ULTA.found = false;
        initUltaLocation();
    }
    if (GAME.level % 2 == 0) {
        WATER.found = false;
        initWaterLocation();
    }
    BLOCK.number = GAME.level * 3;
    if (BLOCK.number > 30) {
        BLOCK.number = 30;
    }
    _initBlocksLocation();
    GAME.water += 15;
    play();
}

function _initCanvas(canvas) {
    canvas.width = GAME.width;
    canvas.height = GAME.height + 100;
    GAME.canvasContext = canvas.getContext("2d");
}

function play() {
    draw();
    _levelUp();
    _ultaUp();
    _waterUp();
}

function initBlocks(x) {  
    BLOCK.x = ((x * 100) % GAME.width) - 100;
    if ((x * 100) % GAME.width == 0) {
        BLOCK.x = GAME.width - 100;
    } 
    BLOCK.y = (Math.floor((x-1) * 100 / GAME.width)) * 100; 
}

function draw() {
    GAME.canvasContext.clearRect(0, 0, GAME.width, GAME.height + 100);
    GAME.canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height);  //Рисуем фон

    GAME.canvasContext.drawImage(PORTAL.background, PORTAL.x, PORTAL.y, PORTAL.size, PORTAL.size);  //рисуем портал

    PLAYER.background.src = PLAYER.state;
    GAME.canvasContext.drawImage(PLAYER.background, PLAYER.x, PLAYER.y, PLAYER.size, PLAYER.size); //рисуем персонажа

    if ((!ULTA.found) && (GAME.level % 3 == 0)) {
        initBlocks(ULTA.location[0]);
        ULTA.x = BLOCK.x;
        ULTA.y = BLOCK.y;
        GAME.canvasContext.drawImage(ULTA.background, ULTA.x, ULTA.y, ULTA.size, ULTA.size); //рисуем ульту
    }
    
    if ((!WATER.found) && (GAME.level % 2 == 0)) {
        initBlocks(WATER.location[0]);
        WATER.x = BLOCK.x;
        WATER.y = BLOCK.y;
        GAME.canvasContext.drawImage(WATER.background, WATER.x, WATER.y); //рисуем воду
    }
      
    for (let i = 0; i < BLOCK.number; i++) {
        initBlocks(BLOCK.location[i]);
        if (((BLOCK.location[i] == ULTA.location[0]) || (BLOCK.location[i] == WATER.location[0])) && ((GAME.level % 3 == 0) || (GAME.level % 2 == 0))) {
            GAME.canvasContext.drawImage(SURPRIZE.background, BLOCK.x, BLOCK.y, BLOCK.size, BLOCK.size);
        } else {
            GAME.canvasContext.drawImage(BLOCK.background, BLOCK.x, BLOCK.y, BLOCK.size, BLOCK.size);// рисуем блок
        }  
    }

    GAME.canvasContext.font = '40px Verdana';
    GAME.canvasContext.fillStyle = 'black';
    GAME.canvasContext.fillText('Level: ' + GAME.level, 0, GAME.height + 50);
    GAME.canvasContext.fillText('Sun: ' + GAME.ulta, 300, GAME.height + 50);
    GAME.canvasContext.fillText('Water: ' + GAME.water, 600, GAME.height + 50);

    if (GAME.over) {
        GAME.canvasContext.font = '70px Verdana';
        GAME.canvasContext.drawImage(OVER.background, 150, 100);
        GAME.canvasContext.fillText('Your level: ' + GAME.level, 370, 380);
        GAME.canvasContext.font = '40px Verdana';
        GAME.canvasContext.fillText('Good luck next time!', 370, 630);
    }
}

 function _levelUp() {
     if (BLOCK.number > 30) {
         BLOCK.number = 30;
     }
     if (_portalReached()) {
         newLewel();
     }
 }
 
 function _ultaUp() {
     if ((PLAYER.x == ULTA.x) && (PLAYER.y == ULTA.y)) {
         if (!ULTA.found) {
             GAME.ulta += 3;
             ULTA.found = true;
         }
     }
 }

 function  _waterUp() {
    if ((PLAYER.x == WATER.x) && (PLAYER.y == WATER.y)) {
        if (!WATER.found) {
            GAME.water += 10;
            WATER.found = true;
        }
    }
}

function _onDocumentKeyDown(event) {
    if (GAME.water != 0) {
        if (event.key == "ArrowUp") {
            if ((PLAYER.y > 0) && (!_isBlockOnTop())) {
                PLAYER.y -= CELL.size;
                PLAYER.state = "img/cactus.png";
                GAME.water -= 1;
            }
        } else if (event.key == "ArrowDown") {
            if ((PLAYER.y < GAME.height - CELL.size) && (!_isBlockOnDown())) {
                PLAYER.y += CELL.size;
                PLAYER.state = "img/cactus.png";
                GAME.water -= 1;
            }    
        } else if (event.key == "ArrowRight") {
            if ((PLAYER.x < GAME.width - CELL.size) && (!_isBlockOnRight())) {
                PLAYER.x += CELL.size;
                PLAYER.state = "img/cactus.png";
                GAME.water -= 1;
            }    
        } else if (event.key == "ArrowLeft") {
            if ((PLAYER.x > 0) && (!_isBlockOnLeft())) {
                PLAYER.x -= CELL.size;
                PLAYER.state = "img/cactus.png";
                GAME.water -= 1;
            }
        }  
    } else {
        GAME.over = true;
    }
    if ((GAME.water <= 15) && (GAME.water > 5)) {
        PLAYER.state = "img/sad1.png";
    } else if (GAME.water <= 5) {
        PLAYER.state = "img/sad2.png"
    }
    if ((event.keyCode == 32) && (GAME.ulta != 0)) {
        if ((GAME.water <= 15) && (GAME.water > 5)) {
            PLAYER.state = "img/ulta1.png";
        } else if (GAME.water <= 5) {
            PLAYER.state = "img/ulta2.png";
        } else {
            PLAYER.state = "img/ulta.png";
        }
        GAME.ulta--;
        _ulta();
    }
}

function _onDocumentKeyUp(event) {
    if (event.keyCode == 32) {
        if ((GAME.water <= 15) && (GAME.water > 5)) {
            PLAYER.state = "img/sad1.png";
        } else if (GAME.water <= 5) {
            PLAYER.state = "img/sad2.png";
        } else {
            PLAYER.state = "img/cactus.png";
        }
    }
}

function _initEventsListeners(canvas) {
    document.addEventListener("keydown", _onDocumentKeyDown);
    document.addEventListener("keyup", _onDocumentKeyUp);
}

function _portalReached() {
    return (PLAYER.x == PORTAL.x) && (PLAYER.y == PORTAL.y);
}

function _isBlockOnRight() {
    let x = ((PLAYER.y/100) * (GAME.width/100) + 1) + (PLAYER.x/100);
    return (BLOCK.location.includes(x+1));
}

function _isBlockOnLeft() {
    let x = ((PLAYER.y/100) * (GAME.width/100) + 1) + (PLAYER.x/100);
    return (BLOCK.location.includes(x-1));
}

function _isBlockOnTop() {
    let x = ((PLAYER.y/100) * (GAME.width/100) + 1) + (PLAYER.x/100);
    return (BLOCK.location.includes(x-(GAME.width/100)));
}

function _isBlockOnDown() {
    let x = ((PLAYER.y/100) * (GAME.width/100) + 1) + (PLAYER.x/100);
    
    return (BLOCK.location.includes(x+(GAME.width/100)));
}

function _ulta() {
    let x = ((PLAYER.y/100) * (GAME.width/100) + 1) + (PLAYER.x/100);
    let index = BLOCK.location.indexOf(x+1);
    if ((index != -1) && (x%12 != 0)) {
        BLOCK.location.splice(index, 1);
    }
    index = BLOCK.location.indexOf(x-1);
    if ((index != -1) && (x%12 != 1)) {
        BLOCK.location.splice(index, 1);
    }
    index = BLOCK.location.indexOf(x-12);
    if (index != -1) {
        BLOCK.location.splice(index, 1);
    }
    index = BLOCK.location.indexOf(x+12);
    if (index != -1) {
        BLOCK.location.splice(index, 1);
    }
}