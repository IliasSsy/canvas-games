var GAME = {
    width: 1000,
    height: 700,
    background: "#F5F0E1",
}

var spMenu = new Image();
spMenu.src = "./fon.png";

var MENU = {
    width: GAME.width,
    height: GAME.height,
    background: '#FF9933',
    img: spMenu,
}

var aud1 = new Audio();
aud1.src = './aud1.mp3';

var aud2 = new Audio();
aud2.src = './aud2.mp3';

var aud3 = new Audio();
aud3.src = './aud3.mp3';

var aud4 = new Audio();
aud4.src = './aud4.mp3';

var aud5 = new Audio();
aud5.src = './aud5.mp3';

var aud = [aud1, aud2, aud3, aud4, aud5];

var CountAud = 5;

var AudPlayed = false;

var spKorab = new Image();
spKorab.src = './spKorab.png';

var spKorab2 = new Image();
spKorab2.src = './spKorab2.png';

var enemy1 = new Image();
enemy1.src = './enemy1.png';

var enemy2 = new Image();
enemy2.src = './enemy2.png';

var enemy3 = new Image();
enemy3.src = './enemy3.png';

var spBackground = new Image();
spBackground.src = "./background.png";

var EnemyBullet = new Image();
EnemyBullet.src = "./EnemyBullet.png";

var PlayerBullet = new Image();
PlayerBullet.src = "./PlayerBullet.png";

var Background0 = new Image();
Background0.src = "./Background0.jpg"

var obj;

var single = false;

var spawn = 200;

var win = '';

var click = false;

var pause = false;

var randomChislo = 0;

var gameOver = false;

var time = 0;

var score = 0;

var cursor = new Image();
cursor.src = './cursor.png';

var MOUSE = {
        x: 0,
        y: 0,
        img: cursor,
}

var BUTTON1 = {
    x: 400,
    y: 350,
    color: '#FF6666',
}

var BUTTON2 = {
    x: 410,
    y: 350,
    color: '#FF6666',
}

var BUTTON3 = {
    x: 400,
    y: 250,
    color: '#FF6666',
}

var BUTTON4 = {
    x: 400,
    y: 250,
    color: '#FF6666',
}

var KORAB1 = {
    width: 60,
    height: 30,
    x: 20,
    y: 20,
    Direction: -5,
    color: "#000000",
    flag_top: false,
    flag_down: true,
    flag_dvig: false,
    fire: false,
    time: 0,
    img: spKorab,
}

var KORAB2 = {
    width: 60,
    height: 30,
    x: GAME.width - 80,
    y: GAME.height - 50,
    Direction: 5,
    color: "#000000",
    flag_top: true,
    flag_down: false,
    flag_dvig: false,
    fire: false,
    time: 0,
    img: spKorab2,
}

var BULLETS_PLAYER = [];

var BULLETS_ENEMYES = [];

var variableEnemyes = [{x: 1100,
                            y: 0,
                            size: 40,
                            Direction: -10,
                            color: "#000000",
                            fireRate: 150,
                            hp: 1,
                            count: 0,
                            Score: 100,
                            img: enemy1,
                            explosion: false,}, 
                        {x: 1100,
                            y: 0,
                            size: 40,
                            Direction: -3,
                            color: "#000000",
                            fireRate: 75,
                            hp: 3,
                            count: 0,
                            Score: 200,
                            img: enemy2,
                            explosion: false,},
                        {x: 1100,
                            y: 0,
                            size: 40,
                            Direction: -1,
                            color: "#000000",
                            fireRate: 100,
                            hp: 5,
                            count: 0,
                            Score: 200,
                            img: enemy3,
                            explosion: false,}];

var ENEMYES = [];

var played = false;

var ANIMATION = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    size: 200,
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");
canvasContext.font = "48px serif";

function init() {
    ANIMATION.img.src ='./pngegg.png'
    ANIMATION.img.onload = () => {
    ANIMATION.imgIsLoad = true  
}

}
function Events() {
    window.addEventListener("keydown", onCanvasKeyDown);
    window.addEventListener("keyup", onCanvasKeyUp);
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("mousedown", onCanvasMouseDown);
    window.addEventListener("mouseup", onCanvasMouseUp);
}

function plosh(x1, y1, x2, y2, x3, y3) {
    return 0.5 * Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function updateBullets(bullets) {
    for (var el of bullets) {
        el.x += el.speed;
        if (el.x < -100 || el.x > 1100) {
            bullets.splice(bullets.indexOf(el), 1);
        } 
    }
}

function updateFire() {
    if (KORAB1.fire) {
        if (KORAB1.time % 10 == 0) {
            append_bull(KORAB1.x + 5 + KORAB1.width, KORAB1.y + KORAB1.height / 2, 20, "red", BULLETS_PLAYER, PlayerBullet);
        }
        KORAB1.time += 1;
    }
    if (KORAB2.fire) {
        if (KORAB2.time % 10 == 0) {
        append_bull(KORAB2.x - 5, KORAB2.y + KORAB2.height / 2, -20, "blue", BULLETS_PLAYER, PlayerBullet);
        }
        KORAB2.time += 1;
    }
}
function drawbullets(bullets) {
    for (var el of bullets) {
        canvasContext.drawImage(el.img, el.x, el.y - 3, 12, 12);
    }
}

function drawbackground() {
    if (single) {
    canvasContext.drawImage(spBackground, 0, 0, GAME.width, GAME.height);
    }
    else if (played) {
        canvasContext.drawImage(Background0, 0, 0, GAME.width, GAME.height);
    }
}

function append_bull(x, y, speed, color, bullets, img) {
    bullets.push({
        x: x,
        y: y,
        speed: speed,
        color: color,
        img: img,
    })
}

function appendEnemy(enemyes, variable) {
    if (time % spawn == 0) {
        obj = Object.assign({}, variable[getRandomInt(3)]);
        obj.y = getRandomInt(650) + 10;
        enemyes.push(obj);
        spawn = getRandomInt(100) + 50;
    }
}

function drawAnimation (enemy) {
        if (ANIMATION.imgIsLoad) {canvasContext.drawImage(ANIMATION.img, ANIMATION.count*ANIMATION.size, 0, ANIMATION.size, ANIMATION.size, enemy.x, enemy.y, ANIMATION.size - 150, ANIMATION.size - 150)};
        ANIMATION.count++;
        if (ANIMATION.count == 4) {
            ANIMATION.count = 0;
            ENEMYES.splice(ENEMYES.indexOf(enemy), 1);
            score += enemy.Score;
        }
}
function drawEnemyes(enemyes) {
    for (var enemy of enemyes) {
        if (enemy.hp > 0) {
        canvasContext.drawImage(enemy.img, enemy.x, enemy.y, enemy.size, enemy.size);
        }
}

    }

function updateEnemyes(enemyes) {
    for (var enemy of enemyes) {
        enemy.x += enemy.Direction;
        enemy.count += 1;
        if (enemy.x < -100) {
            enemyes.splice(enemyes.indexOf(enemy), 1);
        } 
        if (enemy.count % enemy.fireRate === 0) {
        append_bull(enemy.x + 5 + 20, enemy.y + enemy.size / 2, -20, 'pink', BULLETS_ENEMYES, EnemyBullet);
        }
        for (bullet of BULLETS_PLAYER) {
        if (bullet.x >= enemy.x && bullet.x <= enemy.x + enemy.size && bullet.y >= enemy.y && bullet.y <= enemy.y + enemy.size && !enemy.explosion) {
            enemy.hp -= 1;
            BULLETS_PLAYER.splice(BULLETS_PLAYER.indexOf(bullet), 1);
        }
    }
    if (enemy.hp <= 0) {
        drawAnimation(enemy);
    }
    }
    
    
}

function drawkorab(korab) {
    canvasContext.drawImage(korab.img, korab.x, korab.y, korab.width, korab.height);
}

function drawmenu() {
    canvasContext.drawImage(MENU.img, 0, 0, MENU.width, MENU.height);
    canvasContext.fillStyle = BUTTON1.color;
    canvasContext.beginPath();
    canvasContext.fillRect(BUTTON1.x - 3, BUTTON1.y - 40, 180, 55);
    canvasContext.fillStyle = 'black';
    canvasContext.fillText("2 игрока", BUTTON1.x, BUTTON1.y);
    canvasContext.fillStyle = BUTTON4.color;
    canvasContext.beginPath();
    canvasContext.fillRect(BUTTON4.x + 7, BUTTON4.y - 40, 160, 55);
    canvasContext.fillStyle = 'black';
    canvasContext.fillText("1 игрок", BUTTON4.x + 10, BUTTON4.y);
}

function drawcursor() {
    canvasContext.drawImage(MOUSE.img, MOUSE.x - 12, MOUSE.y - 10, 30, 50);
}
function onCanvasMouseDown(event) {
    if (MOUSE.x >= BUTTON1.x + 4 && MOUSE.x <= BUTTON1.x + 185 && MOUSE.y >= BUTTON1.y - 32 && MOUSE.y <= BUTTON1.y + 25 && event.which == 1 && !played && !click) {
        normal();
        played = true;
        click = true;
        if (!AudPlayed) {
        aud[getRandomInt(CountAud)].play();
        AudPlayed = true;
        }
}
    if (MOUSE.x >= BUTTON2.x + 4 && MOUSE.x <= BUTTON2.x + 155 && MOUSE.y >= BUTTON2.y - 32 && MOUSE.y <= BUTTON2.y + 20 && event.which == 1 && gameOver && !click) {
        if (single) {
            normal();
            KORAB1.y = 330;
            single = true;
            click = true;
        }
        else {
        normal();
        click = true;
        }
        if (!AudPlayed) {
            aud[getRandomInt(CountAud)].play();
            AudPlayed = true;
            }
}
    if (MOUSE.x >= BUTTON3.x + 4 && MOUSE.x <= BUTTON3.x + 175 && MOUSE.y >= BUTTON3.y - 32 && MOUSE.y <= BUTTON3.y + 20 && event.which == 1 && gameOver && !click) {
        normal();
        played = false;
        click = true;
        if (!AudPlayed) {
            aud[getRandomInt(CountAud)].play();
            AudPlayed = true;
            }
}
    if (MOUSE.x >= BUTTON4.x + 14 && MOUSE.x <= BUTTON4.x + 175 && MOUSE.y >= BUTTON4.y - 32 && MOUSE.y <= BUTTON4.y + 23 && !played && !click) {
        normal();
        KORAB1.y = 330;
        single = true;
        played = true;
        click = true;
        if (!AudPlayed) {
            aud[getRandomInt(CountAud)].play();
            AudPlayed = true;
            }
}
}

function onCanvasMouseUp(event) {
    click = false;
}


function updateButton() {
    if (MOUSE.x >= BUTTON1.x + 4 && MOUSE.x <= BUTTON1.x + 185 && MOUSE.y >= BUTTON1.y - 32 && MOUSE.y <= BUTTON1.y + 25) {
        BUTTON1.color = '#CCCCCC';
    }
    else {
        BUTTON1.color = '#FF6666';
    }
    if (MOUSE.x >= BUTTON2.x + 4 && MOUSE.x <= BUTTON2.x + 155 && MOUSE.y >= BUTTON2.y - 32 && MOUSE.y <= BUTTON2.y + 20) {
        BUTTON2.color = '#CCCCCC';
    }
    else {
        BUTTON2.color = '#FF6666';
    }
    if (MOUSE.x >= BUTTON3.x + 4 && MOUSE.x <= BUTTON3.x + 175 && MOUSE.y >= BUTTON3.y - 32 && MOUSE.y <= BUTTON3.y + 20) {
        BUTTON3.color = '#CCCCCC';
    }
    else {
        BUTTON3.color = '#FF6666';
    }
    if (MOUSE.x >= BUTTON4.x + 14 && MOUSE.x <= BUTTON4.x + 175 && MOUSE.y >= BUTTON4.y - 32 && MOUSE.y <= BUTTON4.y + 23) {
        BUTTON4.color = '#CCCCCC';
    }
    else {
        BUTTON4.color = '#FF6666';
    }
}

function normal() {
        score = 0;
        KORAB1.x = 20,
        KORAB1.y = 20,
        KORAB1.Direction = -5,
        KORAB1.flag_top = false,
        KORAB1.flag_down = true,
        KORAB1.flag_dvig = false,
        KORAB2.x = GAME.width - 80,
        KORAB2.y = GAME.height - 50,
        KORAB2.Direction = 5,
        KORAB2.flag_top = true,
        KORAB2.flag_down = false,
        KORAB2.flag_dvig = false,
        BULLETS_PLAYER = [];
        BULLETS_ENEMYES = [];
        gameOver = false;
        pause = false;
        single = false;
        ENEMYES = [];
        time = 0;
}
function drawframe() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    if (played) {
    drawbackground();
    drawbullets(BULLETS_PLAYER);
    drawkorab(KORAB1);
    if (!single) {
    drawkorab(KORAB2);
    }
    }
    else {
    drawmenu();
    }
    updateButton()
    if (single) {
        if (!gameOver) {
        canvasContext.fillStyle = 'red';
        canvasContext.fillText('Score: ' + score, 600, 50);
        }
        drawbullets(BULLETS_ENEMYES);
        drawEnemyes(ENEMYES);
    }
    if (gameOver) {
        GameOver();
    }
    if (!played || gameOver) {
    drawcursor();
    }
}

function GameOver() {
    canvasContext.fillStyle = BUTTON2.color;
    canvasContext.beginPath();
    canvasContext.fillRect(BUTTON2.x - 3, BUTTON2.y - 40, 150, 50);
    canvasContext.fillStyle = 'black';
    canvasContext.fillText("Заново", BUTTON2.x, BUTTON2.y);
    canvasContext.fillStyle = BUTTON3.color;
    canvasContext.fillRect(BUTTON3.x - 3, BUTTON3.y - 40, 170, 50);
    canvasContext.fillStyle = 'black';
    canvasContext.fillText("В меню", BUTTON3.x, BUTTON3.y);
    canvasContext.fillStyle = 'red';
    canvasContext.fillText(win, 300, 100);
}
function updatekorab(korab) {
    if (!(korab.flag_top || korab.flag_down) && korab.flag_dvig) {
    korab.y += korab.Direction;
    }
    if (korab.y + korab.height + 20 >= GAME.height) {
        korab.flag_top = true;
    }
    if (korab.y <= 20) {
        korab.flag_down = true;
    }
    for (var bullet of BULLETS_PLAYER) {
        var first = plosh(korab.x, korab.y, korab.x, korab.y + korab.height, bullet.x, bullet.y);
        var second = plosh(korab.x, korab.y, korab.x + korab.width, korab.y + korab.height / 2, bullet.x, bullet.y);
        var third = plosh(korab.x, korab.y + korab.height, korab.x + korab.width, korab.y + korab.height / 2, bullet.x, bullet.y);
        var fourth = plosh(korab.x, korab.y, korab.x, korab.y + korab.height, korab.x + korab.width, korab.y + korab.height / 2);
        if (first + second + third == fourth) {
            gameOver = true;
            if (bullet.color == 'blue') {
                win = "Выиграл 2 игрок"
            }
            else if (bullet.color == 'red'){
                win = "Выиграл 1 игрок"
            }
        }
    }
    for (var bullet of BULLETS_ENEMYES) {
        var first = plosh(korab.x, korab.y - korab.height / 4, korab.x, korab.y + korab.height + korab.height / 4, bullet.x, bullet.y);
        var second = plosh(korab.x, korab.y - korab.height / 4, korab.x + korab.width, korab.y + korab.height / 2, bullet.x, bullet.y);
        var third = plosh(korab.x, korab.y + korab.height + korab.height / 4, korab.x + korab.width, korab.y + korab.height / 2, bullet.x, bullet.y);
        var fourth = plosh(korab.x, korab.y - korab.height / 4, korab.x, korab.y + korab.height + korab.height / 4, korab.x + korab.width, korab.y + korab.height / 2);
        if (first + second + third == fourth) {
            gameOver = true;
            win = "         Score: " + score;
        }
    }

}

function play() {
    drawframe();
    if (played && !gameOver) {
    updateBullets(BULLETS_PLAYER);
    updatekorab(KORAB1);
    updateFire();
    if (!single) {
    updatekorab(KORAB2);
    }
    else {
    if (!gameOver) {
    updateBullets(BULLETS_ENEMYES);
    appendEnemy(ENEMYES, variableEnemyes);
    updateEnemyes(ENEMYES);
    }
    }
    }
    time += 1;
    init();
    if (aud1.ended || aud2.ended || aud3.ended || aud4.ended || aud5.ended) {
        aud1.pause();
        aud2.pause();
        aud3.pause();
        aud4.pause();
        aud5.pause();
        aud1.currentTime = 0;
        aud2.currentTime = 0;
        aud3.currentTime = 0;
        aud4.currentTime = 0;
        aud5.currentTime = 0;
        aud[getRandomInt(CountAud)].play();
    }
    requestAnimationFrame(play);
}

function onCanvasKeyDown(event) {
    if (!KORAB2.flag_dvig) {
    if (event.code == 'KeyK' && played && !gameOver && !single) {
        if (KORAB2.flag_top) {
            KORAB2.y -= Math.abs(KORAB2.Direction);
        }
        if (KORAB2.flag_down) {
            KORAB2.y += Math.abs(KORAB2.Direction);
        }
        KORAB2.Direction *= -1;
        KORAB2.flag_top = false;
        KORAB2.flag_down = false;
        KORAB2.flag_dvig = true;
    }
}
if (!KORAB1.flag_dvig) {
    if (event.code == 'KeyS' && played && !gameOver) {
        if (KORAB1.flag_top) {
            KORAB1.y -= Math.abs(KORAB1.Direction) ;
        }
        if (KORAB1.flag_down) {
            KORAB1.y += Math.abs(KORAB1.Direction) ;
        }
        KORAB1.Direction *= -1
        KORAB1.flag_top = false;
        KORAB1.flag_down = false;
        KORAB1.flag_dvig = true;
    }
}
if (event.code == 'Backspace') {
    normal();
    played = false;
}

if (event.code == 'KeyR') {
    if (played) {
    if (single) {
        normal();
        single = true;
        KORAB1.y = 330;
    }
    else {normal();}
    }
}

if (event.code == 'KeyA') {
    KORAB1.fire = true;
}

if (event.code == 'KeyL') {
    KORAB2.fire = true;
}

    console.log('Строковый код: ', event.code);
  };

  function onCanvasKeyUp(event) {
    if (event.code == 'KeyK' && played && !gameOver) {
        KORAB2.flag_dvig = false;
        if (!AudPlayed) {
            aud[getRandomInt(CountAud)].play();
            AudPlayed = true;
            }
    }
    if (event.code == 'KeyS' && played && !gameOver) {
        KORAB1.flag_dvig = false;
        if (!AudPlayed) {
            aud[getRandomInt(CountAud)].play();
            AudPlayed = true;
            }
    }
    if (event.code == 'KeyA') {
        KORAB1.fire = false;
        KORAB1.time = 0;
        if (!AudPlayed) {
            aud[getRandomInt(CountAud)].play();
            AudPlayed = true;
            }
    }
    if (event.code == 'KeyL') {
        KORAB2.fire = false;
        KORAB2.time = 0;
        if (!AudPlayed) {
            aud[getRandomInt(CountAud)].play();
            AudPlayed = true;
            }
    }
    if (event.code == 'KeyP') {
        aud1.pause();
        aud2.pause();
        aud3.pause();
        aud4.pause();
        aud5.pause();
        aud1.currentTime = 0;
        aud2.currentTime = 0;
        aud3.currentTime = 0;
        aud4.currentTime = 0;
        aud5.currentTime = 0;
        aud[getRandomInt(CountAud)].play();
    }

  }

function onCanvasMouseMove(event) {
    MOUSE.x = event.clientX;
    MOUSE.y = event.clientY;
}


Events()
play();