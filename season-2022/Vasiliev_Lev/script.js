var GAME = {
    Width: 650,
    Height: 650,
    Background: "Black"
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.Width;
canvas.height = GAME.Height;
var canvasContext = canvas.getContext("2d");

var Tank = {
    x: 200,
    y: 600,
    width: 50,
    height: 50,
    xDirection: 5,
    yDirection: 5,
    model: new Image()
}
var timeTank=2000;

var Tank1 = {
    x: Tank.x,
    y: Tank.y,
    width: 50,
    height: 50,
    xDirection: 10,
    yDirection: 10,
    model: new Image()
}
var Tank2 = {
    x: Tank.x,
    y: Tank.y,
    width: 50,
    height: 50,
    xDirection: 10,
    yDirection: 10,
    model: new Image()
}
var Tank3 = {
    x: Tank.x,
    y: Tank.y,
    width: 50,
    height: 50,
    xDirection: 10,
    yDirection: 10,
    model: new Image()
}

var AbstractBlock = {
    width: 50,
    height: 50,
    model: new Image()
}

var bullet = {
    x: Tank.x + 25,
    y: Tank.y +5,
    v: 10,
    color: "grey",
    radius: 5,
}
var direction 



var AbstractTvrag = {
    width: 50,
    height: 50,
    model: new Image()
}

var AbstractTvrag1 = {
    width: 50,
    height: 50,
    model: new Image()
}

var AbstractTvrag2 = {
    width: 50,
    height: 50,
    model: new Image()
}

var AbstractBlock1 = {
    width: 50,
    height: 50,
    model: new Image()
}

var AbstractBlock2 = {
    width: 50,
    height: 50,
    model: new Image()
}

var AbstractBlock3 = {
    width: 50,
    height: 50,
    model: new Image()
}

var Blocks = [];

var Tvrag = [];

var Tvrag1 = [];

var Tvrag2 = [];

var Blocks1 = [];

var Blocks2 = [];

var Blocks3 = [];

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.Width, GAME.Height);
    drawBackground();
    drawbullet();
    drawTank();
    drawTvrag();
    drawTvrag1();
    drawTvrag2();
    drawBlocks();
    drawBlocks1();
    drawBlocks2();
    drawBlocks3();
}

function drawBackground() {
    canvasContext.fillStyle = GAME.Background;
    canvasContext.fillRect(0, 0, GAME.Width, GAME.Height);
}

function ShootTank(){
    if (Tank.direction===0){
    bullet.x=Tank.x+30;
    bullet.y=Tank.y + bullet.radius;
    }
    if (Tank.direction===1){
    bullet.x=Tank.x+bullet.radius;
    bullet.y=Tank.y+30;
    }
    if (Tank.direction===2){
    bullet.x=Tank.x +30-bullet.radius;
    bullet.y=Tank.y+50;
    }
    if (Tank.direction===3){
    bullet.x=Tank.x+50+bullet.radius;
    bullet.y=Tank.y+30;
    }
}


function InitTank() {
    Tank.model.src = './tank1.png';
}

function InitTvrag1() {
    var InitialX = 600;
    var InitialY = 250;
    for (var i = 0; i <= 0; i += 1) {
        Tvrag1.push({
            x: InitialX,
            y: InitialY,
            width: AbstractTvrag1.width,
            height: AbstractTvrag1.height
        });
        InitialY += AbstractTvrag1.height;
    }
    AbstractTvrag1.model.src = './tvrag1.png';
}

function InitTvrag2() {
    var InitialX = 0;
    var InitialY = 0;
    for (var i = 0; i <= 0; i += 1) {
        Tvrag2.push({
            x: InitialX,
            y: InitialY,
            width: AbstractTvrag2.width,
            height: AbstractTvrag2.height
        });
        InitialY += AbstractTvrag2.height;
    }
    AbstractTvrag2.model.src = './tvrag2.png';
    var InitialX = 0;
    var InitialY = 450;
    for (var i = 0; i <= 0; i += 1) {
        Tvrag2.push({
            x: InitialX,
            y: InitialY,
            width: AbstractTvrag2.width,
            height: AbstractTvrag2.height
        });
        InitialY += AbstractTvrag2.height;
    }
    AbstractTvrag2.model.src = './tvrag2.png';
    var InitialX = 300;
    var InitialY = 0;
    for (var i = 0; i <= 0; i += 1) {
        Tvrag2.push({
            x: InitialX,
            y: InitialY,
            width: AbstractTvrag2.width,
            height: AbstractTvrag2.height
        });
        InitialY += AbstractTvrag2.height;
    }
    AbstractTvrag2.model.src = './tvrag2.png';
}

function InitTvrag() {
    var InitialX = 300;
    var InitialY = 400;
    for (var i = 0; i <= 0; i += 1) {
        Tvrag.push({
            x: InitialX,
            y: InitialY,
            width: AbstractTvrag.width,
            height: AbstractTvrag.height
        });
        InitialY += AbstractTvrag.height;
    }
    AbstractTvrag.model.src = './tvrag.png';

    var InitialX = 500;
    var InitialY = 50;
    for (var i = 0; i <= 0; i += 1) {
        Tvrag.push({
            x: InitialX,
            y: InitialY,
            width: AbstractTvrag.width,
            height: AbstractTvrag.height
        });
        InitialY += AbstractTvrag.height;
    }
    AbstractTvrag.model.src = './tvrag.png';

    var InitialX = 500;
    var InitialY = 550;
    for (var i = 0; i <= 0; i += 1) {
        Tvrag.push({
            x: InitialX,
            y: InitialY,
            width: AbstractTvrag.width,
            height: AbstractTvrag.height
        });
        InitialY += AbstractTvrag.height;
    }
    AbstractTvrag.model.src = './tvrag.png';
}

function InitBlocks() {
    var InitialX = 50;
    var InitialY = 50;
    for (var i = 0; i <= 1; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';

    var InitialX = 100;
    var InitialY = 150;
    for (var i = 0; i <= 1; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';

    var InitialX = 50;
    var InitialY = 300;
    for (var i = 0; i <= 2; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialX += AbstractBlock.width;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 50;
    var InitialY = 400;
    for (var i = 0; i <= 3; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 150;
    var InitialY = 450;
    for (var i = 0; i <= 1; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 250;
    var InitialY = 250;
    for (var i = 0; i <= 0; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 250;
    var InitialY = 350;
    for (var i = 0; i <= 2; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 350;
    var InitialY = 350;
    for (var i = 0; i <= 2; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 300;
    var InitialY = 450;
    for (var i = 0; i <= 0; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 550;
    var InitialY = 300;
    for (var i = 0; i <= 3; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 550;
    var InitialY = 200;
    for (var i = 0; i <= 0; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 550;
    var InitialY = 50;
    for (var i = 0; i <= 1; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 550;
    var InitialY = 550;
    for (var i = 0; i <= 1; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 450;
    var InitialY = 50;
    for (var i = 0; i <= 1; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 450;
    var InitialY = 200;
    for (var i = 0; i <= 0; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 450;
    var InitialY = 350;
    for (var i = 0; i <= 0; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 450;
    var InitialY = 450;
    for (var i = 0; i <= 0; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 450;
    var InitialY = 550;
    for (var i = 0; i <= 1; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 500;
    var InitialY = 600;
    for (var i = 0; i <= 0; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 150;
    var InitialY = 600;
    for (var i = 0; i <= 0; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 250;
    var InitialY = 550;
    for (var i = 0; i <= 1; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 300;
    var InitialY = 550;
    for (var i = 0; i <= 0; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
    var InitialX = 350;
    var InitialY = 550;
    for (var i = 0; i <= 1; i += 1) {
        Blocks.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock.width,
            height: AbstractBlock.height
        });
        InitialY += AbstractBlock.height;
    }
    AbstractBlock.model.src = './block.png';
}

function InitBlocks1() {
    var InitialX = 150;
    var InitialY = 0;
    for (var i = 0; i <= 1; i += 1) {
        Blocks1.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock1.width,
            height: AbstractBlock1.height
        });
        InitialY += AbstractBlock1.height;
    }
    AbstractBlock1.model.src = './block1.png';
    var InitialX = 0;
    var InitialY = 400;
    for (var i = 0; i <= 0; i += 1) {
        Blocks1.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock1.width,
            height: AbstractBlock1.height
        });
        InitialY += AbstractBlock1.height;
    }
    AbstractBlock1.model.src = './block1.png';
    var InitialX = 150;
    var InitialY = 350;
    for (var i = 0; i <= 1; i += 1) {
        Blocks1.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock1.width,
            height: AbstractBlock1.height
        });
        InitialY += AbstractBlock1.height;
    }
    AbstractBlock1.model.src = './block1.png';
    var InitialX = 300;
    var InitialY = 200;
    for (var i = 0; i <= 0; i += 1) {
        Blocks1.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock1.width,
            height: AbstractBlock1.height
        });
        InitialY += AbstractBlock1.height;
    }
    AbstractBlock1.model.src = './block1.png';
    var InitialX = 350;
    var InitialY = 0;
    for (var i = 0; i <= 0; i += 1) {
        Blocks1.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock1.width,
            height: AbstractBlock1.height
        });
        InitialY += AbstractBlock1.height;
    }
    AbstractBlock1.model.src = './block1.png';
    var InitialX = 350;
    var InitialY = 300;
    for (var i = 0; i <= 0; i += 1) {
        Blocks1.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock1.width,
            height: AbstractBlock1.height
        });
        InitialY += AbstractBlock1.height;
    }
    AbstractBlock1.model.src = './block1.png';
    var InitialX = 400;
    var InitialY = 250;
    for (var i = 0; i <= 0; i += 1) {
        Blocks1.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock1.width,
            height: AbstractBlock1.height
        });
        InitialY += AbstractBlock1.height;
    }
    AbstractBlock1.model.src = './block1.png';
    var InitialX = 450;
    var InitialY = 150;
    for (var i = 0; i <= 0; i += 1) {
        Blocks1.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock1.width,
            height: AbstractBlock1.height
        });
        InitialY += AbstractBlock1.height;
    }
    AbstractBlock1.model.src = './block1.png';
    var InitialX = 500;
    var InitialY = 100;
    for (var i = 0; i <= 0; i += 1) {
        Blocks1.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock1.width,
            height: AbstractBlock1.height
        });
        InitialY += AbstractBlock1.height;
    }
    AbstractBlock1.model.src = './block1.png';
    var InitialX = 500;
    var InitialY = 450;
    for (var i = 0; i <= 0; i += 1) {
        Blocks1.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock1.width,
            height: AbstractBlock1.height
        });
        InitialY += AbstractBlock1.height;
    }
    AbstractBlock1.model.src = './block1.png';
    var InitialX = 600;
    var InitialY = 200;
    for (var i = 0; i <= 0; i += 1) {
        Blocks1.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock1.width,
            height: AbstractBlock1.height
        });
        InitialY += AbstractBlock1.height;
    }
    AbstractBlock1.model.src = './block1.png';
}

function InitBlocks2() {
    var InitialX = 0;
    var InitialY = 200;
    for (var i = 0; i <= 1; i += 1) {
        Blocks2.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock2.width,
            height: AbstractBlock2.height
        });
        InitialY += AbstractBlock2.height;
    }
    AbstractBlock2.model.src = './block2.png';
    var InitialX = 50;
    var InitialY = 250;
    for (var i = 0; i <= 0; i += 1) {
        Blocks2.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock2.width,
            height: AbstractBlock2.height
        });
        InitialY += AbstractBlock2.height;
    }
    AbstractBlock2.model.src = './block2.png';
    var InitialX = 200;
    var InitialY = 300;
    for (var i = 0; i <= 2; i += 1) {
        Blocks2.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock2.width,
            height: AbstractBlock2.height
        });
        InitialX += AbstractBlock2.width;
    }
    AbstractBlock2.model.src = './block2.png';
    var InitialX = 200;
    var InitialY = 350;
    for (var i = 0; i <= 0; i += 1) {
        Blocks2.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock2.width,
            height: AbstractBlock2.height
        });
        InitialX += AbstractBlock2.height;
    }
    AbstractBlock2.model.src = './block2.png';

    var InitialX = 500;
    var InitialY = 200;
    for (var i = 0; i <= 2; i += 1) {
        Blocks2.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock2.width,
            height: AbstractBlock2.height
        });
        InitialY += AbstractBlock2.height;
    }
    AbstractBlock2.model.src = './block2.png';
}

function InitBlocks3() {
    var InitialX = 300;
    var InitialY = 600;
    for (var i = 0; i <= 0; i += 1) {
        Blocks3.push({
            x: InitialX,
            y: InitialY,
            width: AbstractBlock3.width,
            height: AbstractBlock3.height
        });
        InitialY += AbstractBlock3.height;
    }
    AbstractBlock3.model.src = './block3.png';
}

function drawBlocks2() {
    for (var i = 0; i <= Blocks2.length - 1; i += 1) {
        canvasContext.drawImage(AbstractBlock2.model, Blocks2[i].x, Blocks2[i].y, Blocks2[i].width, Blocks2[i].height);
    }
}

function drawBlocks3() {
    for (var i = 0; i <= Blocks3.length - 1; i += 1) {
        canvasContext.drawImage(AbstractBlock3.model, Blocks3[i].x, Blocks3[i].y, Blocks3[i].width, Blocks3[i].height);
    }
}

function drawTank() {
    canvasContext.drawImage(Tank.model, Tank.x, Tank.y, Tank.width, Tank.height);
}

function drawbullet() {
    canvasContext.fillStyle = bullet.color;
    canvasContext.beginPath();
    canvasContext.arc(bullet.x,bullet.y,bullet.radius, 0, 2 * Math.PI);
    canvasContext.fill();
}
function updatebullet(){
    bullet.x+=bullet.v;
    bullet.y += bullet.v;
    drawbullet();
}
function drawTvrag() {
    for (var i = 0; i <= Tvrag.length - 1; i += 1) {
        canvasContext.drawImage(AbstractTvrag.model, Tvrag[i].x, Tvrag[i].y, Tvrag[i].width, Tvrag[i].height);
    }
}

function drawTvrag1() {
    for (var i = 0; i <= Tvrag1.length - 1; i += 1) {
        canvasContext.drawImage(AbstractTvrag1.model, Tvrag1[i].x, Tvrag1[i].y, Tvrag1[i].width, Tvrag1[i].height);
    }
}
function deleteTvrag() {
    for (var i = 0; i < Tvrag1.length; i += 1) {
        if (bullet.y + bullet.radius >= Tvrag1[i].y) {
            bullet.v = 0;
        }
    }
}
function deleteTvrag1() {
    for (var i = 0; i < Tvrag2.length; i += 1) {
        if ((bullet.y + bullet.radius < Tvrag2[i].y + Tvrag2.height)
            || (bullet.x + bullet.radius > Tvrag2.x)); {
            bullet.v = 0
            
        }
    }
}



function drawTvrag2() {
    for (var i = 0; i <= Tvrag2.length - 1; i += 1) {
        canvasContext.drawImage(AbstractTvrag2.model, Tvrag2[i].x, Tvrag2[i].y, Tvrag2[i].width, Tvrag2[i].height);
    }
}
function deleteTvrag2() {
    for (var i = 0; i < Tvrag2.length; i += 1) {
        if ((bullet.y + bullet.radius < Tvrag2[i].y + Tvrag2.height)
            || (bullet.x + bullet.radius > Tvrag2.x)
            || (bullet.x + bullet.radius < Tvrag2.x + Tvrag2.width)) {
            bullet.v = 0;
        }
    }
}


function drawBlocks() {
    for (var i = 0; i <= Blocks.length - 1; i += 1) {
        canvasContext.drawImage(AbstractBlock.model, Blocks[i].x, Blocks[i].y, Blocks[i].width, Blocks[i].height);
    }
}

function drawBlocks1() {
    for (var i = 0; i <= Blocks1.length - 1; i += 1) {
        canvasContext.drawImage(AbstractBlock1.model, Blocks1[i].x, Blocks1[i].y, Blocks1[i].width, Blocks1[i].height);
    }
}



function initEventsListeners() {
    window.addEventListener("keydown", onCanvasKeyDown);
}

function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        Tank.x = Tank.x - Tank.xDirection;
        clampTankPosition("Left");  
        Tank.direction = 1;
    }
    if (event.key === "ArrowRight") {
        Tank.x = Tank.x + Tank.xDirection;
        clampTankPosition("Right");
        Tank.direction = 3;
    }
    if (event.key === "ArrowUp") {
        Tank.y = Tank.y - Tank.yDirection;
        clampTankPosition("Up");
        Tank.direction = 0;
    }
    if (event.key === "ArrowDown") {
        Tank.y = Tank.y + Tank.yDirection;
        clampTankPosition("Down");
        Tank.direction = 2;
    }
    console.log(event.key)
    if (event.key === " "){
        console.log(bullet.v)
        updatebullet;
    }
    
}

function play() {
    drawFrame();
    updatebullet();
    requestAnimationFrame(play);
}

function clampTankPosition(direction) {
    if (Tank.x < 0) {
        Tank.x = 0;
    }
    if (Tank.y < 0) {
        Tank.y = 0;
    }
    if (Tank.x + Tank.width > GAME.Width) {
        Tank.x = GAME.Width - Tank.width;
    }
    if (Tank.y + Tank.height > GAME.Height) {
        Tank.y = GAME.Height - Tank.height;
    }
    for(let i = 0; i < Blocks.length; i++) {
        if (direction === "Right" && (Tank.x + Tank.width >= Blocks[i].x)
            && ((Tank.y < Blocks[i].y + Blocks[i].height && Tank.y + Tank.height > Blocks[i].y)
                && (Tank.x <= Blocks[i].x))) {
            Tank.x = Blocks[i].x - Tank.width;
        }
        if (direction === "Left" && (Tank.x <= Blocks[i].x + Blocks[i].width)
            && ((Tank.y < Blocks[i].y + Blocks[i].height && Tank.y + Tank.height > Blocks[i].y)
            && (Tank.x + Tank.width >= Blocks[i].x + Blocks[i].width))) {
            Tank.x = Blocks[i].x + Tank.width;
        }
        if (direction === "Up" && (Tank.y <= Blocks[i].y + Blocks[i].height)
            && ((Tank.x + Tank.width > Blocks[i].x && Tank.x < Blocks[i].x + Blocks[i].width)
            && (Tank.y + Tank.height >= Blocks[i].y + Blocks[i].height))) {
            Tank.y = Blocks[i].y + Tank.height ;
        }
        if (direction === "Down" && (Tank.y + Tank.height >= Blocks[i].y)
            && ((Tank.x + Tank.width > Blocks[i].x && Tank.x < Blocks[i].x + Blocks[i].width)
            && (Tank.y  <= Blocks[i].y))) {
            Tank.y = Blocks[i].y - Tank.height;
        }
    }
    for(let i = 0; i < Blocks1.length; i++) {
        if (direction === "Right" && (Tank.x + Tank.width >= Blocks1[i].x)
            && ((Tank.y < Blocks1[i].y + Blocks1[i].height && Tank.y + Tank.height > Blocks1[i].y)
                && (Tank.x <= Blocks1[i].x))) {
            Tank.x = Blocks1[i].x - Tank.width;
        }
        if (direction === "Left" && (Tank.x <= Blocks1[i].x + Blocks1[i].width)
            && ((Tank.y < Blocks1[i].y + Blocks1[i].height && Tank.y + Tank.height > Blocks1[i].y)
            && (Tank.x + Tank.width >= Blocks1[i].x + Blocks1[i].width))) {
            Tank.x = Blocks1[i].x + Tank.width;
        }
        if (direction === "Up" && (Tank.y <= Blocks1[i].y + Blocks1[i].height)
            && ((Tank.x + Tank.width > Blocks1[i].x && Tank.x < Blocks1[i].x + Blocks1[i].width)
            && (Tank.y + Tank.height >= Blocks1[i].y + Blocks1[i].height))) {
            Tank.y = Blocks1[i].y + Tank.height ;
        }
        if (direction === "Down" && (Tank.y + Tank.height >= Blocks1[i].y)
            && ((Tank.x + Tank.width > Blocks1[i].x && Tank.x < Blocks1[i].x + Blocks1[i].width)
            && (Tank.y  <= Blocks1[i].y))) {
            Tank.y = Blocks1[i].y - Tank.height;
        }
    }
    if (event.key === "ArrowLeft") {
        Tank.model.src = './tank2.png';
    }
    if (event.key === "ArrowUp") {
        Tank.model.src = './tank1.png';
    }
    if (event.key === "ArrowDown") {
        Tank.model.src = './tank3.png';
    }
    if (event.key === "ArrowRight") {
        Tank.model.src = './tank4.png';
    }
}
initEventsListeners();
InitBlocks();
InitBlocks1();
ShootTank();
InitTank();
InitTvrag();
InitTvrag1();
InitTvrag2();
InitBlocks2();
InitBlocks3();
play();