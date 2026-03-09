var GAME = {
    width: 300,
    height: 525,
    color: '#00c2ff',
    color1: "#424242",
    widthExp: 300,
    heightExp: 25,
    colorExp: 'green',
    pauza: false,
    img: new Image(),
}

var PLAYER = {
    x: 0,
    y: 500,
    speedX: 5,
    atack: 3,
    gold: 1000,
    width: 25,
    height: 50,
    shot: false,
    ex: 0,
    lvl: 1,
    lvlUp: 1000,
    lvlMax: 10,
    city: 100,
    cityNorm: 100,
    cityReplay: 4000,
    img: new Image(),
}

var BBULET = {
    x: 0,
    y: 0,
    speedY: 5,
    width: 10,
    height: 15,
    alive: false,
    amount: 5,
    amountMax: 5,
    amountReplay: 500,
    img: new Image(),
}

var BOOM = {
    x: 0,
    y: 0,
    color: "red",
    size: 10,
    sizeMax: 40,
    sizeStart: 10,
    alive: false,
}

var ENEMY = {
    x: 0,
    y: -10,
    type: 0,
    alive: false,
    hp: 0,
    hpStart: 0,
    atack: 0,
    speedY: 0,
    height: 15,
    width: 15,
    speedYMax: 15,
    img: new Image(),
}

var BUY = {
    atack: 0,
    speed: 0,
    size: 0,
    bullet: 0,
}

var canvas = document.getElementById("canvas");
canvas.height = GAME.height;
canvas.width = GAME.width;
var canvasContext = canvas.getContext('2d');
var expCanvas = document.getElementById("exp");
expCanvas.height = GAME.heightExp;
expCanvas.width = GAME.widthExp;
var expCanvasContext = expCanvas.getContext('2d');
var time;
var canvasSt = document.getElementById("stat");
canvasSt.height = GAME.heightExp;
canvasSt.width = GAME.widthExp;
var canvasContextSt = canvasSt.getContext('2d');
var cityRepl = document.getElementById("cityReplay");
const pageWidth = document.documentElement.scrollWidth;


function cityReplay() {
    if (PLAYER.city == PLAYER.cityNorm)
        alert("Город не нуждается в востоновлении");
    else if (PLAYER.gold >= Math.floor((1 - PLAYER.city / PLAYER.cityNorm) * PLAYER.cityReplay)) {
        PLAYER.gold -= Math.floor((1 - PLAYER.city / PLAYER.cityNorm) * PLAYER.cityReplay);
        alert("Город успешно востановлен!");
        PLAYER.city = PLAYER.cityNorm;
    }
    else
        alert("Недостаточно золота");
}

function buy(type, num, lvl, gold, nom) {
    if (type == "atack") {
        if (BUY.atack + 1 < nom)
            alert("Необходимо купить предыдушее улучшение");
        else if (BUY.atack >= nom)
            alert("Данное улучшение уже купленно");
        else if (PLAYER.lvl < lvl)
            alert("Ваш уровень меньше необходимого, нужен " + lvl);
        else if (PLAYER.gold < gold)
            alert("У вас недостаточно золота, необходимо " + gold);
        else {
            PLAYER.atack += num;
            PLAYER.gold -= gold;
            BUY.atack++;
            alert("Усрешно купленно!");
        }
    }
    if (type == "speed") {
        if (BUY.speed + 1 < nom)
            alert("Необходимо купить предыдушее улучшение");
        else if (BUY.speed >= nom)
            alert("Данное улучшение уже купленно");
        else if (PLAYER.lvl < lvl)
            alert("Ваш уровень меньше необходимого, нужен " + lvl);
        else if (PLAYER.gold < gold)
            alert("У вас недостаточно золота, необходимо " + gold);
        else {
            BBULET.speedY += num;
            PLAYER.gold -= gold;
            BUY.speed++;
            alert("Усрешно купленно!");
        }
    }
    if (type == "size") {
        if (BUY.size + 1 < nom)
            alert("Необходимо купить предыдушее улучшение");
        else if (BUY.size >= nom)
            alert("Данное улучшение уже купленно");
        else if (PLAYER.lvl < lvl)
            alert("Ваш уровень меньше необходимого, нужен " + lvl);
        else if (PLAYER.gold < gold)
            alert("У вас недостаточно золота, необходимо " + gold);
        else {
            BOOM.sizeMax += num;
            PLAYER.gold -= gold;
            BUY.size++;
            alert("Усрешно купленно!");
        }
    }
    if (type == "bullet") {
        if (BUY.bullet + 1 < nom)
            alert("Необходимо купить предыдушее улучшение");
        else if (BUY.bullet >= nom)
            alert("Данное улучшение уже купленно");
        else if (PLAYER.lvl < lvl)
            alert("Ваш уровень меньше необходимого, нужен " + lvl);
        else if (PLAYER.gold < gold)
            alert("У вас недостаточно золота, необходимо " + gold);
        else {
            BBULET.amountMax += num;
            PLAYER.gold -= gold;
            BUY.bullet++;
            alert("Усрешно купленно!");
        }
    }
}

function initTextures() {
    if (PLAYER.city >= PLAYER.cityNorm * 0.90)
        GAME.img.src = "./textures/font.png";
    else if (PLAYER.city >= PLAYER.cityNorm * 0.50)
        GAME.img.src = "./textures/font1.png";
    else if (PLAYER.city >= PLAYER.cityNorm * 0.10)
        GAME.img.src = "./textures/font2.png";
    else if (PLAYER.city < PLAYER.cityNorm * 0.10)
        GAME.img.src = "./textures/font3.png";
    GAME.img.onload = () => {
        GAME.imgIsLoad = true;
    }
    BBULET.img.src = "./textures/racet.png";
    BBULET.img.onload = () => {
        BBULET.imgIsLoad = true;
    }
    PLAYER.img.src = "./textures/tyrel.png";
    PLAYER.img.onload = () => {
        PLAYER.imgIsLoad = true;
    }
}

function drawBackgraund() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = GAME.color;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height - 25);
    canvasContext.fillStyle = GAME.color1;
    canvasContext.fillRect(0, GAME.height - 25, GAME.width, 25);
    canvasContext.drawImage(GAME.img, 0, 400);

}

function updateCanvas() {
    drawBackgraund();
    updatePlayer();
    if (BBULET.alive)
        updateBullet();
    if (BOOM.alive)
        updateBoom();
    if (ENEMY.alive)
        updateEnemy();
    else
        spawnEnemy();
    collisia();
    stat();
}

function stat() {
    cityRepl.innerText = "Востоновить город: " + Math.floor((1 - PLAYER.city / PLAYER.cityNorm) * PLAYER.cityReplay);
    expCanvasContext.clearRect(0, 0, GAME.widthExp, GAME.heightExp);
    expCanvasContext.fillStyle = GAME.colorExp;
    expCanvasContext.fillRect(0, 0, GAME.widthExp * PLAYER.ex / PLAYER.lvlUp, GAME.heightExp);
    expCanvasContext.font = "20px Arial";
    expCanvasContext.fillStyle = "black";
    expCanvasContext.fillText(PLAYER.ex, 10, 20);
    expCanvasContext.fillText(PLAYER.lvlUp, 250, 20);
    canvasContextSt.clearRect(0, 0, GAME.widthExp, GAME.heightExp);
    canvasContextSt.fillStyle = GAME.color1;
    canvasContextSt.fillRect(0, 0, GAME.widthExp, GAME.heightExp);
    canvasContextSt.font = "20px Arial";
    canvasContextSt.fillStyle = "white";
    canvasContextSt.fillText("Gold " + PLAYER.gold, 10, 20);
    canvasContextSt.fillText("Lvl " + PLAYER.lvl, 250, 20);
    if (PLAYER.lvl == PLAYER.lvlMax) {
        expCanvasContext.clearRect(0, 0, GAME.widthExp, GAME.heightExp);
        expCanvasContext.fillStyle = GAME.colorExp;
        expCanvasContext.fillRect(0, 0, GAME.widthExp, GAME.heightExp);
        expCanvasContext.font = "20px Arial";
        expCanvasContext.fillStyle = "black";
        expCanvasContext.fillText("МАКСИМАЛЬНЫЙ УРОВЕНЬ", 15, 20)
    }
}

function collisia() {
    if (ENEMY.alive && BBULET.alive) {
        if (!(BBULET.x + BBULET.width < ENEMY.x) && !(BBULET.x > ENEMY.x + ENEMY.width)) {
            if (BBULET.y < ENEMY.y + ENEMY.height) {
                ENEMY.hp -= PLAYER.atack;
                BBULET.alive = false;
            }
        }
    }
    if (ENEMY.alive && BOOM.alive) {
        if (!(ENEMY.x + ENEMY.width < BOOM.x - BOOM.size) && !(ENEMY.x > BOOM.x + BOOM.width)) {
            if (ENEMY.y + ENEMY.height > BOOM.y - BOOM.size && ENEMY.y < BOOM.y + BOOM.size) {
                let traektory = ((ENEMY.x + ENEMY.width / 2 - BOOM.x) ** 2 + (ENEMY.y + ENEMY.height / 2 - BOOM.y) ** 2) ** (0.5);
                ENEMY.hp -= PLAYER.atack * BOOM.sizeStart / traektory;
            }
        }
    }
    if (BOOM.alive) {
        if (BOOM.y + BOOM.sizeMax >= 400) {
            PLAYER.city -= ENEMY.atack / 5 * BOOM.size / BOOM.sizeMax * 5;
            if (PLAYER.city < 0)
                PLAYER.city = 0;
        }
    }
}

function kill() {
    ENEMY.alive = false;
    ENEMY.y = -20;
    PLAYER.gold += Math.floor(((Math.floor(Math.random() * ENEMY.atack) + ENEMY.atack) * 10) * PLAYER.city / PLAYER.cityNorm);
    PLAYER.ex += Math.floor(((Math.floor(Math.random() * ENEMY.atack) + ENEMY.atack) * 10) * PLAYER.city / PLAYER.cityNorm);
}

function updateEnemy() {
    ENEMY.y += ENEMY.speedY
    if (ENEMY.y + ENEMY.height >= GAME.height - 25) {
        ENEMY.alive = false;
        ENEMY.y = -20;
        PLAYER.city -= Math.floor(ENEMY.atack * ENEMY.hp / ENEMY.hpStart);
        if (PLAYER.city < 0)
            PLAYER.city = 0;
    }
    canvasContext.drawImage(ENEMY.img, ENEMY.x, ENEMY.y, ENEMY.width, ENEMY.height);
    if (ENEMY.hp <= 0)
        kill();
}

function spawnEnemy() {
    ENEMY.type = Math.floor(Math.random() * 3);
    switch (ENEMY.type) {
        case 0:
            ENEMY.hpStart = Math.floor(Math.random() * (3 + PLAYER.lvl - 1)) + 1;
            ENEMY.atack = Math.floor(Math.random() * (3 + PLAYER.lvl - 1)) + 1;
            ENEMY.speedY = Math.floor(Math.random() * (3 + PLAYER.lvl - 3)) + 7;
            ENEMY.img.src = "./textures/sr-71.png";
            ENEMY.width = 25;
            ENEMY.height = 30;
            break;
        case 1:
            ENEMY.hpStart = Math.floor(Math.random() * (3 + PLAYER.lvl - 1)) + 4;
            ENEMY.atack = Math.floor(Math.random() * (3 + PLAYER.lvl - 1)) + 4;
            ENEMY.speedY = Math.floor(Math.random() * (3 + PLAYER.lvl - 3)) + 5;
            ENEMY.img.src = "./textures/f-16.png";
            ENEMY.width = 25;
            ENEMY.height = 25;
            break;
        case 2:
            ENEMY.hpStart = Math.floor(Math.random() * (3 + PLAYER.lvl - 1)) + 7;
            ENEMY.atack = Math.floor(Math.random() * (3 + PLAYER.lvl - 1)) + 7;
            ENEMY.speedY = Math.floor(Math.random() * (3 + PLAYER.lvl - 3)) + 3;
            ENEMY.img.src = "./textures/b-2.png";
            ENEMY.width = 30;
            ENEMY.height = 25;
            break;
    }
    if (ENEMY.speedY > ENEMY.speedYMax)
        ENEMY.speedY = ENEMY.speedYMax;
    ENEMY.img.onload = () => {
        ENEMY.imgIsLoad = true;
    }
    ENEMY.hp = ENEMY.hpStart
    ENEMY.x = Math.floor(Math.random() * (GAME.width - ENEMY.width - PLAYER.width)) + PLAYER.width / 2;
    ENEMY.alive = true;
}

function initEvent() {
    window.addEventListener('mousedown', onCanvasMouseDown);
    window.addEventListener('mousemove', onCanvasMouseMove);
    window.addEventListener('keydown', onCanvasKeyDown);
}

function playerPosition() {
    if (PLAYER.x + PLAYER.width >= GAME.width)
        PLAYER.x = GAME.width - PLAYER.width;
    if (PLAYER.x < 0)
        PLAYER.x = 0;
}

function onCanvasKeyDown(event) {
    if (event.key == 'a')
        PLAYER.x -= PLAYER.speedX;
    if (event.key == 'd')
        PLAYER.x += PLAYER.speedX;
    if (event.key == ' ' && (!BBULET.alive || !BOOM.alive) && BBULET.amount > 0) {
        PLAYER.shot = true;
        BBULET.amount--;
        time = new Date().getTime()
    }
    if (event.key == "Escape")
        GAME.pauza = !GAME.pauza;
    playerPosition();
}

function onCanvasMouseMove(event) {
    PLAYER.x = event.clientX - pageWidth / 2 + GAME.width / 2 - PLAYER.width / 2;
    playerPosition();
}

function onCanvasMouseDown(event) {
    if (event.button == 0 && (!BBULET.alive || !BOOM.alive) && BBULET.amount > 0) {
        PLAYER.shot = true;
        BBULET.amount--;
        time = new Date().getTime()
    }
}

function amountReplay() {
    var time1 = new Date().getTime()
    if (BBULET.amount < BBULET.amountMax && time1 - time >= BBULET.amountReplay) {
        BBULET.amount++;
        time = new Date().getTime()
    }
    for (i = 1; i <= BBULET.amount; i++) {
        canvasContext.drawImage(BBULET.img, 20 * i, 510, BBULET.width, BBULET.height);
    }
}

function spawnBoom(x, y, w, h) {
    BOOM.x = x + w / 2;
    BOOM.y = y + h / 2;
    BOOM.size = BOOM.sizeStart;
    BOOM.alive = true;
}

function updateBoom() {
    canvasContext.fillStyle = BOOM.color;
    canvasContext.beginPath();
    canvasContext.arc(BOOM.x, BOOM.y, BOOM.size, 0, 2 * Math.PI);
    canvasContext.closePath();
    canvasContext.fill();
    BOOM.size += 2;
    if (BOOM.size >= BOOM.sizeMax)
        BOOM.alive = false;
}

function updateBullet() {
    BBULET.y -= BBULET.speedY;
    if (BBULET.y <= 15) {
        BBULET.alive = false;
        spawnBoom(BBULET.x, BBULET.y, BBULET.width, BBULET.height);
    }
    canvasContext.drawImage(BBULET.img, BBULET.x, BBULET.y, BBULET.width, BBULET.height);
}

function updatePlayer() {
    canvasContext.drawImage(PLAYER.img, PLAYER.x, PLAYER.y - PLAYER.height, PLAYER.width, PLAYER.height);
    if (PLAYER.shot) {
        if (BBULET.alive) {
            BBULET.alive = false;
            spawnBoom(BBULET.x, BBULET.y, BBULET.width, BBULET.height);
        }
        BBULET.x = PLAYER.x + PLAYER.width / 2 - BBULET.width / 2;
        BBULET.y = PLAYER.y - PLAYER.height - BBULET.height;
        BBULET.alive = true;
        PLAYER.shot = false;
    }
    if (PLAYER.ex >= PLAYER.lvlUp) {
        PLAYER.ex -= PLAYER.lvlUp;
        PLAYER.lvl += 1
        PLAYER.lvlUp = Math.floor((PLAYER.lvlUp * 1.2) / 100) * 100;
    }
}

function play() {
    if (PLAYER.city == 0 && PLAYER.gold < PLAYER.cityReplay) {
        canvasContext.font = "40px Arial";
        canvasContext.fillStyle = "black";
        canvasContext.fillText("You lose", GAME.width / 3, GAME.height / 2);
    }
    else if (!GAME.pauza) {
        updateCanvas();
        amountReplay();
        initTextures();
    }
    else {
        canvasContext.font = "40px Arial";
        canvasContext.fillStyle = "black";
        canvasContext.fillText("Pause", GAME.width / 3, GAME.height / 2);
    }
    requestAnimationFrame(play);
}


initEvent();
play();

//alert("Приветствую новабранец! Сегодня твой день дежурства на этой базе ВВС, всё просто. Ты просто не должен сюда никого впускать и всё, ничего сложно.")