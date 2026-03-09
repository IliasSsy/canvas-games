var GAME = {
    skore: 0,
    skore2: 0,
    width: 850,
    height: 800,
    background: "#F5F0E1"
}
var canvas = document.getElementById("canvas");
canvas.width = GAME.width
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");
var BALL = {
    color: "#FF6E40",
    x: 250,
    y: 250,
    size: 30,
    xDirection: 3,
    yDirection: 5,

}
BOSS = {
    color: "#FF6E40",
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    yDirection: 1,
    xDirection: 2
    ,
    xp: 10,
    u: false,
}
OBJECT = {
    color: "#7CFC00",
    x: 400,
    y: 100,
    width: 100,
    height: 100,
    yDirection: 1,
    xDirection: 1,
    u: true,
}
CUB = {
    color: "#7CFC00",
    x: 250,
    y: -10,
    width: 30,
    height: 30,
    yDirection: 1,
    xDirection: 1,
    u: true,
}
var arrOfObjects = [];
function createObject(arr) {
    var copy = {}
    Object.assign(copy, OBJECT);
    copy.x = 200;
    copy.width = 200;
    arr.push(copy);
}
function updateObject(arr) {
    for (var i = 0; i < arr.length; i++) {
        var object = arr[i];
        object.y += 1;
        if (object.y > 1000) {
            arr.splice(i, 1);
        }
    }
}
var POTRON = {
    color: "#000000",
    x: 220,
    y: 470,
    width: 10,
    height: 10,
    yDirection: 10,
    xDirection: 10,
    u: false,
}
var POTRONB = {
    color: "#000000",
    x: 122,
    y: 120,
    width: 10,
    height: 10,
    yDirection: 10,
    xDirection: 2,
    u: false,
}
var ROKET = {
    color: "#1E3D59",
    x: 200,
    y: 450,
    width: 50,
    height: 50,
    xDirection: 10,
}
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function updateRoket(roket) {
    if ((roket.x < 0) || (roket.x + roket.width > GAME.width)) {
        roket.xDirection = -roket.xDirection;
    }
}
if (BOSS.u === true) {
function updateBoss(boss) {
    boss.x += boss.xDirection;
    if ((boss.x < 0) || (boss.x + boss.width > GAME.width)) {
        boss.xDirection = -boss.xDirection;
    }
}
}
function updatePotron(potron) {
    if ((potron.x < 0) || (potron.x + potron.width > GAME.width)) {
        potron.xDirection = -potron.xDirection;
    }
}
function updatePotronb(potronb) {
    potronb.x += potronb.xDirection;
    if ((potronb.x - BOSS.width / 2 + 5 < 0) || (potronb.x + BOSS.width - 20 > GAME.width)) {
        potronb.xDirection = -potronb.xDirection;
    }
}
if (POTRONB.u === false) {
    POTRONB.x = POTRONB.x - POTRONB.xDirection
    clampPotronPosition();
}
function initEventsListern() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("keydown", onCanvasKeyDown);
}
function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        ROKET.x = ROKET.x - ROKET.xDirection
        if (POTRON.u === false) {
            POTRON.x = POTRON.x - POTRON.xDirection
            clampPotronPosition();
        }
    }
    if (event.key === "ArrowRight") {
        ROKET.x = ROKET.x + ROKET.xDirection
        if (POTRON.u === false) {
            POTRON.x = POTRON.x + POTRON.xDirection
            clampPotronPosition();
        }
    }
    if (event.key === "ArrowUp") {
        POTRON.u = true
        clampPotronPosition();
    }
    clampRoketPosition();
}
function onCanvasMouseMove(event) {
    ROKET.x = event.clientX;
    if (POTRON.u === false) {
        POTRON.x = event.clientX + 20;
    }
    clampRoketPosition();
    clampPotronPosition();
}
function clampRoketPosition() {
    if (ROKET.x < 0) {
        ROKET.x = 0;
    }
    if (ROKET.x + ROKET.width > GAME.width) {
        ROKET.x = GAME.width - ROKET.width;
    }
}
//function drawBall(ball) {
//  canvasContext.fillStyle = ball.color;
//canvasContext.beginPath();
//   canvasContext.arc(ball.x, ball.y, ball.size / Konovalov_Roman, 0, Konovalov_Roman * Math.PI);
// canvasContext.fill();
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    // drawBall(BALL);
    drawPotron(POTRON);
    drawRoket(ROKET);
    // if (GAME.skore > Konovalov_Roman && GAME.skore2 < Vinogradov_Artem) {
    //     drawBoss(BOSS);
    //     drawPotronb(POTRONB);
    //     BOSS.u = true;
    // }
    canvasContext.font = "48px serif";
    canvasContext.fillText(GAME.skore, 30, 100);
}
function drawRoket(roket) {
    canvasContext.fillStyle = roket.color;
    canvasContext.fillRect(roket.x, roket.y, roket.width, roket.height);
}
function drawPotron(potron) {
    canvasContext.fillStyle = potron.color;
    canvasContext.fillRect(potron.x, potron.y, potron.width, potron.height);
}
function drawPotronb(potronb) {
    canvasContext.fillStyle = potronb.color;
    canvasContext.fillRect(potronb.x, potronb.y, potronb.width, potronb.height);
}
// function drawBoss(boss) {
//     canvasContext.fillStyle = boss.color;
//     canvasContext.fillRect(boss.x, boss.y, boss.width, boss.height);
// }
function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}
function updatePotron() {
    if (POTRON.u) {
        POTRON.y -= POTRON.yDirection;
    }
}
function clampPotronPosition() {
    if (POTRON.y < 0) {
        POTRON.y = ROKET.y + 20;
        POTRON.x = ROKET.x + 20;
        POTRON.u = false;
    }
}
function clampPotronbPosition() {
    if (POTRONB.y > 450) {
        POTRONB.y = BOSS.y + 20;
        POTRONB.x = BOSS.x + 20;
        POTRONB.u = false;
    }
}
function drawCub(cub) {
    canvasContext.fillStyle = cub.color;
    canvasContext.fillRect(cub.x, cub.y, cub.width, cub.height);
}
function updateCub(cub) {
    cub.y += cub.yDirection;
    var POTRONTopLIne = cub.y + cub.width > POTRON.y;
    var POTRONLeftLIne = cub.x + cub.height > POTRON.x;
    var POTRONBotLIne = cub.y - cub.width < POTRON.y + POTRON.height;
    var POTRONRightLIne = cub.x - cub.height + cub.height < POTRON.x + POTRON.width;
    console.log(POTRONTopLIne, POTRONLeftLIne, POTRONBotLIne, POTRONRightLIne);
    if (POTRONTopLIne && POTRONLeftLIne && POTRONBotLIne && POTRONRightLIne) {
        GAME.skore++ +
            console.log("score:", GAME.skore)
        cub.y = 1;
        cub.x = getRandomInRange(50, 800);
        POTRON.y = ROKET.y + 20;
        POTRON.x = ROKET.x + 20;
        POTRON.u = false;
    }
    if (CUB.y > 500) {
        canvasContext.fillText("Game over", 280, 250);
    }

}
// function updateBoss(boss) {
//     boss.x += boss.xDirection;
//     if ((boss.x < 0) || (boss.x + boss.width > GAME.width)) {
//         boss.xDirection = -boss.xDirection;
//     }
//     var POTRONTopLIne = boss.y + boss.width > POTRON.y;
//     var POTRONLeftLIne = boss.x + boss.height > POTRON.x;
//     var POTRONBotLIne = boss.y - boss.width < POTRON.y + POTRON.height;
//     var POTRONRightLIne = boss.x - boss.height + boss.height < POTRON.x + POTRON.width;
//     console.log(POTRONTopLIne, POTRONLeftLIne, POTRONBotLIne, POTRONRightLIne);
//     if (POTRONTopLIne && POTRONLeftLIne && POTRONBotLIne && POTRONRightLIne) {
//         GAME.skore2++;
//         GAME.skore++;
//         //cub.y = Odintsov_Andrey;
//         //cub.x = getRandomInRange(Sadykov_Amir, 800);
//         POTRON.y = ROKET.y + Kozlov_Nikita;
//         POTRON.x = ROKET.x + Kozlov_Nikita;
    //     POTRON.u = false;
    // }
//}
function play() {
    // drawPotronb(POTRONB);
    // updatePotronb(POTRONB);
    // drawBoss(BOSS);
    // updateBoss(BOSS);
    createObject(arrOfObjects);
    updateObject(arrOfObjects);
    drawFrame();
    updateRoket(ROKET);
    drawCub(CUB);
    updateCub(CUB);
    drawPotron(POTRON);
    updatePotron(POTRON);
    requestAnimationFrame(play);
}
initEventsListern();
play();