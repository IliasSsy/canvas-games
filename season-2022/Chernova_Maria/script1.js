var GAME = {
    width: 500,
    height: 500,
    color: "PaleGreen"
}
var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");
canvasContext.fillStyle = GAME.color
canvasContext.fillRect(0, 0, GAME.width, GAME.height);

var image = new Image();
image.src = './maan.png';

var MAN = {
    man: image,
    x: 203,
    y: 203,
    width: 47,
    height: 47,
    xDirection: 50,
    yDirection: 50
}

var POLE = {
    interval: 50,
    x: 0,
    y: 0,
}

var BLOCK1 = {
    height:5,
    width: 50,
    color: "Gold"
}
var BLOCK2 = {
    height:50,
    width: 5,
    color: "Gold"
}
var a = 1;
var i = 0;
var xC = 0;
var yC = 0;
var blocks1 = [];
var blocks2 = [];
var needUpdate = false;
var aVse = false;
function drawVert(i1) {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(POLE.x + POLE.interval * i1, POLE.y, 7, GAME.height);
}
function drawGoriz(i1) {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(POLE.x, POLE.y + POLE.interval * i1, GAME.width, 7);
}
function drawPole() {for (let i = 1; i < 10; i++) {
    drawVert(i);
    drawGoriz(i);
    }
}
function drawMan() {
    //window.addEventListener('load', function() {
    canvasContext.drawImage(image, MAN.x, MAN.y, MAN.width, MAN.height);
    //});
}
function drawBackground() {
    canvasContext.fillStyle = GAME.color;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawPole();
    drawMan();
    drawBlock();
    //добавить функцию, которая будет отрисовывать все блоки из массива
}
function drawText() {
    canvasContext.font = "50px Arial";
    canvasContext.fillStyle = "OrangeRed";
    canvasContext.fillText("Game over", 150, 100);
}
function oneBlock(i, a) {
    if ((MAN.y + MAN.height === blocks1[i].y)
    ||(MAN.y + MAN.height + 50 === blocks1[i].y)
    ||(MAN.y + MAN.height + 100 === blocks1[i].y)) {
        MAN.x += MAN.xDirection;
        aVse = true;
    }
    if ((MAN.y === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 50 === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 100 === blocks1[i].y + BLOCK1.height)) {
         MAN.x -= MAN.xDirection;
         aVse = true;
    }
    if ((MAN.x + MAN.width === blocks2[a].x)
    ||(MAN.x + MAN.width + 50 === blocks2[a].x)
    ||(MAN.x + MAN.width + 100 === blocks2[a].x)) {
        MAN.y += MAN.yDirection;
        aVse = true;
    }
    if ((MAN.x === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 50 === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 100 === blocks2[a].x + BLOCK2.width)) {
        MAN.y -= MAN.yDirection;
        aVse = true;
    }
}
function twoBlocks(i, a) {
    if (((MAN.y + MAN.height === blocks1[i].y)
    ||(MAN.y + MAN.height + 50 === blocks1[i].y)
    ||(MAN.y + MAN.height + 100 === blocks1[i].y)) && ((MAN.x + MAN.width === blocks2[a].x)
    ||(MAN.x + MAN.width + 50 === blocks2[a].x)
    ||(MAN.x + MAN.width + 100 === blocks2[a].x))) {
        MAN.x -= MAN.xDirection;
        aVse = true;
    }
    if (((MAN.y === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 50 === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 100 === blocks1[i].y + BLOCK1.height))&&((MAN.x + MAN.width === blocks2[a].x)
    ||(MAN.x + MAN.width + 50 === blocks2[a].x)
    ||(MAN.x + MAN.width + 100 === blocks2[a].x))) {
        MAN.x += MAN.xDirection;
        aVse = true;
    }
    if (((MAN.x === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 50 === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 100 === blocks2[a].x + BLOCK2.width)) && ((MAN.y + MAN.height === blocks1[i].y)
    ||(MAN.y + MAN.height + 50 === blocks1[i].y)
    ||(MAN.y + MAN.height + 100 === blocks1[i].y))) {
        MAN.y += MAN.yDirection;
        aVse = true;
    }
    if (((MAN.x === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 50 === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 100 === blocks2[a].x + BLOCK2.width)) && ((MAN.y === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 50 === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 100 === blocks1[i].y + BLOCK1.height))) {
        MAN.y -= MAN.yDirection;
        aVse = true;
    }
    if (((MAN.x === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 50 === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 100 === blocks2[a].x + BLOCK2.width))&&((MAN.x + MAN.width === blocks2[a].x)
    ||(MAN.x + MAN.width + 50 === blocks2[a].x)
    ||(MAN.x + MAN.width + 100 === blocks2[a].x))) {
        MAN.y += MAN.yDirection;
        aVse = true;
    }
    if (((MAN.y + MAN.height === blocks1[i].y)
    ||(MAN.y + MAN.height + 50 === blocks1[i].y)
    ||(MAN.y + MAN.height + 100 === blocks1[i].y))  && ((MAN.y === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 50 === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 100 === blocks1[i].y + BLOCK1.height))) {
        MAN.x -= MAN.xDirection;
        aVse = true;
    }
}
function threeBlocks(i, a){
    if (((MAN.y + MAN.height === blocks1[i].y)
    ||(MAN.y + MAN.height + 50 === blocks1[i].y)
    ||(MAN.y + MAN.height + 100 === blocks1[i].y)) && ((MAN.y === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 50 === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 100 === blocks1[i].y + BLOCK1.height)) && ((MAN.x + MAN.width === blocks2[a].x)
    ||(MAN.x + MAN.width + 50 === blocks2[a].x)
    ||(MAN.x + MAN.width + 100 === blocks2[a].x))) {
        MAN.x -= MAN.xDirection;
        aVse = true;
    }
    if (((MAN.y + MAN.height === blocks1[i].y)
    ||(MAN.y + MAN.height + 50 === blocks1[i].y)
    ||(MAN.y + MAN.height + 100 === blocks1[i].y))  && ((MAN.y === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 50 === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 100 === blocks1[i].y + BLOCK1.height)) && ((MAN.x === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 50 === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 100 === blocks2[a].x + BLOCK2.width))) {
        MAN.x += MAN.xDirection;
        aVse = true;
    }
    if (((MAN.x === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 50 === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 100 === blocks2[a].x + BLOCK2.width)) && ((MAN.x + MAN.width === blocks2[a].x)
    ||(MAN.x + MAN.width + 50 === blocks2[a].x)
    ||(MAN.x + MAN.width + 100 === blocks2[a].x)) && ((MAN.y + MAN.height === blocks1[i].y)
    ||(MAN.y + MAN.height + 50 === blocks1[i].y)
    ||(MAN.y + MAN.height + 100 === blocks1[i].y))) {
        MAN.y -= MAN.yDirection;
        aVse = true;
    }
    if (((MAN.x === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 50 === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 100 === blocks2[a].x + BLOCK2.width)) && ((MAN.x + MAN.width === blocks2[a].x)
    ||(MAN.x + MAN.width + 50 === blocks2[a].x)
    ||(MAN.x + MAN.width + 100 === blocks2[a].x)) && ((MAN.y === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 50 === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 100 === blocks1[i].y + BLOCK1.height))) {
        MAN.y += MAN.yDirection;
        aVse = true;
    }
}
function fourBlocks(i, a) {
    if ((MAN.x === blocks2[a].x + BLOCK2.width) 
    && (MAN.x + MAN.width === blocks2[a].x) 
    && (MAN.y === blocks1[i].y + BLOCK1.height) 
    && (MAN.y + MAN.height === blocks1[i].y)) {
        canvasContext.font = "48px Arial";
        canvasContext.fillStyle = "OrangeRed";
        canvasContext.fillText("Winner!!!", 150, 100);
    }
    if (((MAN.y + MAN.height + 50 === blocks1[i].y)
    ||(MAN.y + MAN.height + 100 === blocks1[i].y))  
    && ((MAN.y + 50 === blocks1[i].y + BLOCK1.height)
    ||(MAN.y + 100 === blocks1[i].y + BLOCK1.height)) 
    && ((MAN.x + 50 === blocks2[a].x + BLOCK2.width)
    ||(MAN.x + 100 === blocks2[a].x + BLOCK2.width)) 
    && (MAN.x + MAN.width + 50 === blocks2[a].x)
    ||(MAN.x + MAN.width + 100 === blocks2[a].x)) {
        MAN.x += MAN.xDirection;
        aVse = true;
    }
}
function updateMan() {
    if ((blocks1.length != 0) && (blocks2.length != 0)){ 
        for (var i = 0; i < blocks1.length; i += 1) {
            for (var a = 0; a < blocks2.length; a += 1) {
                fourBlocks(i, a);
                threeBlocks(i, a);
                twoBlocks(i, a);
                oneBlock(i, a);
            }
        }
    }
    if (blocks2.length === 0) {
        MAN.x += MAN.xDirection;
    }
    if (blocks1.length === 0) {
        MAN.y += MAN.yDirection;
    }
}
function drawBlock(){
    for (let i = 0; i < blocks2.length; i += 1) {
        canvasContext.fillStyle = BLOCK2.color;
        canvasContext.fillRect(blocks2[i].x, blocks2[i].y, BLOCK2.width, BLOCK2.height);
    }
    for (let i = 0; i < blocks1.length; i += 1) {
        canvasContext.fillStyle = BLOCK1.color;
        canvasContext.fillRect(blocks1[i].x, blocks1[i].y, BLOCK1.width, BLOCK1.height);
    }
}
function onCanvasMouseClick(event) {
    needUpdate = false;
    yC = event.clientY;
    xC = event.clientX;
    i = 0;

    while (i < 500) {
        i += 50; //добавить, чтобы если условие выполнялось, в массив добавлялся блок с определенными параметрами
        if (yC >i && yC < (i + 15)) {
            if (xC < 50 && xC > 0) {
                var BLOCK = {
                    x: 0,
                    y: i,
                }
                blocks1.push(BLOCK);
                needUpdate = true;
            }
            if (xC < 100 && xC > 50) {
                var BLOCK = {
                    x: 50,
                    y: i,
                }
                blocks1.push(BLOCK);
                needUpdate = true;
            }
            if (xC < 150 && xC > 100) {
                var BLOCK = {
                    x: 100,
                    y: i,
                }
                blocks1.push(BLOCK);
                needUpdate = true;
            }
            if (xC < 200 && xC > 150) {
                var BLOCK = {
                    x: 150,
                    y: i,
                }
                blocks1.push(BLOCK);
                needUpdate = true;
            }
            if (xC < 250 && xC > 200) {
                var BLOCK = {
                    x: 200,
                    y: i,
                }
                blocks1.push(BLOCK);
                needUpdate = true;
            }
            if (xC < 300 && xC > 250) {
                var BLOCK = {
                    x: 250,
                    y: i,
                }
                blocks1.push(BLOCK);
                needUpdate = true;
            }
            if (xC < 350 && xC > 300) {
                var BLOCK = {
                    x: 300,
                    y: i,
                }
                blocks1.push(BLOCK);
                needUpdate = true;
            }
            if (xC < 400 && xC > 350) {
                var BLOCK = {
                    x: 350,
                    y: i,
                }
                blocks1.push(BLOCK);
                needUpdate = true;
            }
            if (xC < 450 && xC > 400) {
                var BLOCK = {
                    x: 400,
                    y: i,
                }
                blocks1.push(BLOCK);
                needUpdate = true;
            }
            if (xC < 500 && xC > 450) {
                var BLOCK = {
                    x: 450,
                    y: i,
                }
                blocks1.push(BLOCK);
                needUpdate = true;
            }
        }
        if (xC >i && xC < (i + 15)) {
            if (yC < 50 && yC > 0) {
                var BLOCK = {
                    x: i,
                    y: 0,
                }
                blocks2.push(BLOCK);
                needUpdate = true;
            }
            if (yC < 100 && yC > 50) {
                var BLOCK = {
                    x: i,
                    y: 50,
                }
                blocks2.push(BLOCK);
                needUpdate = true;
            }
            if (yC < 150 && yC > 100) {
                var BLOCK = {
                    x: i,
                    y: 100,
                }
                blocks2.push(BLOCK);
                needUpdate = true;
            }
            if (yC < 200 && yC > 150) {
                var BLOCK = {
                    x: i,
                    y: 150,
                }
                blocks2.push(BLOCK);
                needUpdate = true;
            }
            if (yC < 250 && yC > 200) {
                var BLOCK = {
                    x: i,
                    y: 200,
                }
                blocks2.push(BLOCK);
                needUpdate = true;
            }
            if (yC < 300 && yC > 250) {
                var BLOCK = {
                    x: i,
                    y: 250,
                }
                blocks2.push(BLOCK);
                needUpdate = true;
            }
            if (yC < 350 && yC > 300) {
                var BLOCK = {
                    x: i,
                    y: 300,
                }
                blocks2.push(BLOCK);
                needUpdate = true;
            }
            if (yC < 400 && yC > 350) {
                var BLOCK = {
                    x: i,
                    y: 350,
                }
                blocks2.push(BLOCK);
                needUpdate = true;
            }
            if (yC < 450 && yC > 400) {
                var BLOCK = {
                    x: i,
                    y: 400,
                }
                blocks2.push(BLOCK);
                needUpdate = true;
            }
            if (yC < 500 && yC > 450) {
                var BLOCK = {
                    x: i,
                    y: 450,
                }
                blocks2.push(BLOCK);
                needUpdate = true;
            }
        }
    }
    if (needUpdate) {
        updateMan();
    }
}
function initEventsListeners() {
    window.addEventListener("click", onCanvasMouseClick);
}
function play() {
    drawFrame();
    //if (needUpdate) {
    //    updateMan();
    //}
    if ((MAN.x + MAN.width) >= GAME.width) {
        drawText();
    }
    if (MAN.x <= 0) {
        MAN.x = 0;
        drawText();
    }
    if (MAN.y <= 0) {
        MAN.y = 0;
        drawText();
    }
    if (MAN.y + MAN.height >= GAME.height) {
        MAN.y = GAME.height - MAN.height;
        drawText();
    }
    requestAnimationFrame(play);
}
initEventsListeners();
play();