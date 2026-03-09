'use strict'

const canvasHeight = 1000;
const canvasWidth = 1000;
const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');

canvas.height = canvasHeight;
canvas.width = canvasWidth;

let game = {
    moveUp1: false,
    moveRight1: false,
    moveDown1: false,
    moveLeft1: false,
    moveUp2: false,
    moveRight2: false,
    moveDown2: false,
    moveLeft2: false
}

const netq = 100;

let Player1 = {
    x: 0,
    y: 0,
    direction: 2,
    dead: false,
    bullet: {
        speed: 50,
        size: 20,
        color: "orange",
    }
};

let Player2 = {
    x: 9,
    y: 9,
    direction: 0,
    dead: false,
    bullet: {
        speed: 50,
        size: 20,
        color: "red",
    }
};

// создали пустой массив летящих снарядов
let bullets = [];

let tankUp1 = new Image();
let tankRight1 = new Image();
let tankDown1 = new Image();
let tankLeft1 = new Image();
let tankUpDead1 = new Image();
let tankDownDead1 = new Image();
let tankLeftDead1 = new Image();
let tankRightDead1 = new Image();
tankUp1.src = 'images/tank_up.png';
tankRight1.src = 'images/tank_right.png';
tankDown1.src = 'images/tank_down.png';
tankLeft1.src = 'images/tank_left.png';
tankUpDead1.src = 'images/tank_updead.png';
tankDownDead1.src = 'images/tank_downdead.png';
tankRightDead1.src = 'images/tank_rightdead.png';
tankLeftDead1.src = 'images/tank_leftdead.png';

let tankUp2 = new Image();
let tankRight2 = new Image();
let tankDown2 = new Image();
let tankLeft2 = new Image();
let tankDown2Dead = new Image();
let tankUp2Dead = new Image();
let tankLeft2Dead = new Image();
let tankRight2Dead = new Image();
tankUp2.src = 'images/tank_up2.png';
tankRight2.src = 'images/tank_right2.png';
tankDown2.src = 'images/tank_down2.png';
tankLeft2.src = 'images/tank_left2.png';
tankDown2Dead.src = 'images/tank_down2dead.png';
tankUp2Dead.src = 'images/tank_up2dead.png';
tankLeft2Dead.src = 'images/tank_left2dead.png';
tankRight2Dead.src = 'images/tank_right2dead.png';

let bg = new Image();
let cage = new Image();
let house = new Image();
let palmtree = new Image();
let cannon = new Image();
let hammer = new Image();
bg.src = 'images/main_bg.png';
cage.src = 'images/block1.png';
house.src = 'images/block2.png';
palmtree.src = 'images/block3.png';
cannon.src = 'images/block4.png';
hammer.src = 'images/block5.png';

window.addEventListener('keydown', (event) => {
    // добавили перезагрузку страницы при нажатии на пробел или интер если игра закончена
    if ((event.key === 'Enter' || event.code === 'Space') && (Player1.dead || Player2.dead)) {
        location.reload();
    }
    if (event.key === 'w') {
        if (Player1.direction === 0) {
            game.moveUp1 = true;
        }
        Player1.direction = 0;
    }
    if (event.key === 'a') {
        if (Player1.direction === 3) {
            game.moveLeft1 = true;
        }
        Player1.direction = 3;
    }    
    if (event.key === 's') {
        if (Player1.direction === 2) {
            game.moveDown1 = true;
        }
        Player1.direction = 2;
    }
    if (event.key === 'd') {
        if (Player1.direction === 1) {
            game.moveRight1 = true;
        }
        Player1.direction = 1;
    }
    if (event.key === 'f') {
        shoot(1);
    }
    
    if (event.key === 'ArrowUp') {
        if (Player2.direction === 0) {
            game.moveUp2 = true;
        }
        Player2.direction = 0;
    }
    if (event.key === 'ArrowLeft') {
        if (Player2.direction === 3) {
            game.moveLeft2 = true;
        }
        Player2.direction = 3;
    }
    if (event.key === 'ArrowDown') {
        if (Player2.direction === 2) {
            game.moveDown2 = true;
        }
        Player2.direction = 2;
    }
    if (event.key === 'ArrowRight') {
        if (Player2.direction === 1) {
            game.moveRight2 = true;
        }
        Player2.direction = 1;
    }
    if (event.key === 'j') {
        shoot(2);
    }
});

function shoot(player) {
    if (player === 1) {
        bullets.push({
            ownerPlayer: player,
            x: (Player1.x + 0.5) * netq,
            y: (Player1.y + 0.5) * netq,
            direction: Player1.direction,
            speed: Player1.bullet.speed,
            size: Player1.bullet.size,
        })
    }
    if (player === 2) {
        bullets.push({
            ownerPlayer: player,
            x: (Player2.x + 0.5) * netq,
            y: (Player2.y + 0.5) * netq,
            direction: Player2.direction,
            speed: Player2.bullet.speed,
            size: Player2.bullet.size,
        })
    }
}

function checkForHit() {
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].ownerPlayer === 1) {
            if ((bullets[i].y >= Player2.y * netq)
                && (bullets[i].y <= (Player2.y + 1) * netq)
                && (bullets[i].x >= Player2.x * netq)
                && (bullets[i].x <= (Player2.x + 1) * netq)
            ) {
                Player2.dead = true;
                console.log('dead2');
            }
        }
        if (bullets[i].ownerPlayer === 2) {
            if ((bullets[i].y >= Player1.y * netq)
                && (bullets[i].y <= (Player1.y + 1) * netq)
                && (bullets[i].x >= Player1.x * netq)
                && (bullets[i].x <= (Player1.x + 1) * netq)
            ) {
                Player1.dead = true;
                console.log('dead1');
            }
        }
    }
}

function moveBullets() {
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].direction === 0) {
            bullets[i].y -= bullets[i].speed
        }
        if (bullets[i].direction === 1) {
            bullets[i].x += bullets[i].speed
        }
        if (bullets[i].direction === 2) {
            bullets[i].y += bullets[i].speed
        }
        if (bullets[i].direction === 3) {
            bullets[i].x -= bullets[i].speed
        }
    }
}

function updateBullets() {
    moveBullets();// передвигаем снаряды на их скорость

    checkForHit(); // проверяем попал ли снаряд в противника

    // сюда дальше добавлять проверки на то, чтобы, например, не пробивать блоки
    // или например на попадание в бонусный блок "ракеты", который увеличивает скорость твоих снарядов или их размер
}

function updateFrame() {
    updateBullets();

    for (let i = 0; i < obstacles.length; i++) {
        if ((Player1.y - 1 === obstacles[i].y) && (Player1.x === obstacles[i].x)) {
            game.moveUp1 = false;
        }
        if ((Player1.y + 1 === obstacles[i].y) && (Player1.x === obstacles[i].x)) {
            game.moveDown1 = false;
        }
        if ((Player1.x - 1 === obstacles[i].x) && (Player1.y === obstacles[i].y)) {
            game.moveLeft1 = false;
        }
        if ((Player1.x + 1 === obstacles[i].x) && (Player1.y === obstacles[i].y)) {
            game.moveRight1 = false;
        }

        if ((Player2.y - 1 === obstacles[i].y) && (Player2.x === obstacles[i].x)) {
            game.moveUp2 = false;
        }
        if ((Player2.y + 1 === obstacles[i].y) && (Player2.x === obstacles[i].x)) {
            game.moveDown2 = false;
        }
        if ((Player2.x - 1 === obstacles[i].x) && (Player2.y === obstacles[i].y)) {
            game.moveLeft2 = false;
        }
        if ((Player2.x + 1 === obstacles[i].x) && (Player2.y === obstacles[i].y)) {
            game.moveRight2 = false;
        }
    }

    if ((Player1.y > 0) && (game.moveUp1)) {
        Player1.y--;
        game.moveUp1 = false;
    }
    if ((Player1.x > 0) && (game.moveLeft1)) {
        Player1.x--;
        game.moveLeft1 = false;
    }
    if ((Player1.y < 9) && (game.moveDown1)) {
        Player1.y++;
        game.moveDown1 = false;
    }
    if ((Player1.x < 9) && (game.moveRight1)) {
        Player1.x++;
        game.moveRight1 = false;
    }

    if ((Player2.y > 0) && (game.moveUp2)) {
        Player2.y--;
        game.moveUp2 = false;
    }
    if ((Player2.x > 0) && (game.moveLeft2)) {
        Player2.x--;
        game.moveLeft2 = false;
    }
    if ((Player2.y < 9) && (game.moveDown2)) {
        Player2.y++;
        game.moveDown2 = false;
    }
    if ((Player2.x < 9) && (game.moveRight2)) {
        Player2.x++;
        game.moveRight2 = false;
    }

    clearMovings();
}

function clearMovings() {
    game.moveUp1 = false;
    game.moveRight1 = false;
    game.moveDown1 = false;
    game.moveLeft1 = false;
    game.moveUp2 = false;
    game.moveRight2 = false;
    game.moveDown2 = false;
    game.moveLeft2 = false;
}

function clearFrame() {
    canvasContext.clearRect(0,0,canvasWidth, canvasHeight);
    canvasContext.drawImage(bg, 0, 0);
}

function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        if(obstacles[i].block === 1) {
            canvasContext.drawImage(cage, obstacles[i].x * netq, obstacles[i].y * netq);
        }
        if(obstacles[i].block === 2) {
            canvasContext.drawImage(house, obstacles[i].x * netq, obstacles[i].y * netq);
        }
        if(obstacles[i].block === 3) {
            canvasContext.drawImage(palmtree, obstacles[i].x * netq, obstacles[i].y * netq);
        }
        if(obstacles[i].block === 4) {
            canvasContext.drawImage(cannon, obstacles[i].x * netq, obstacles[i].y * netq);
        }
        if(obstacles[i].block === 5) {
            canvasContext.drawImage(hammer, obstacles[i].x * netq, obstacles[i].y * netq);
        }
    }
}

function drawPlayer1() {
    if (Player1.dead === false) {
        if (Player1.direction === 0){
            canvasContext.drawImage(tankUp1, Player1.x * netq, Player1.y * netq);
        }
        if (Player1.direction === 1){
            canvasContext.drawImage(tankRight1, Player1.x * netq, Player1.y * netq);
        }
        if (Player1.direction === 2){
            canvasContext.drawImage(tankDown1, Player1.x * netq, Player1.y * netq);
        }
        if (Player1.direction === 3){
            canvasContext.drawImage(tankLeft1, Player1.x * netq, Player1.y * netq);
        }
    }
}

function drawPlayer2() {
    if (Player2.dead === false) {
        if (Player2.direction === 0){
            canvasContext.drawImage(tankUp2, Player2.x * netq, Player2.y * netq);
        }
        if (Player2.direction === 1){
            canvasContext.drawImage(tankRight2, Player2.x * netq, Player2.y * netq);
        }
        if (Player2.direction === 2){
            canvasContext.drawImage(tankDown2, Player2.x * netq, Player2.y * netq);
        }
        if (Player2.direction === 3){
            canvasContext.drawImage(tankLeft2, Player2.x * netq, Player2.y * netq);
        }
    }
}

function drawBullets() {
    for(let i = 0; i < bullets.length; i++) {
        canvasContext.beginPath();
        if(bullets[i].ownerPlayer === 1) {
            canvasContext.fillStyle = Player1.bullet.color;
        }
        if(bullets[i].ownerPlayer === 2) {
            canvasContext.fillStyle = Player2.bullet.color;
        }
        canvasContext.arc(bullets[i].x, bullets[i].y, bullets[i].size/2, 0, Math.PI*2);
        canvasContext.fill();
    }
}

function drawFrame() {
    clearFrame();
    drawObstacles();

    drawBullets();

    drawPlayer1();
    drawPlayer2();
}

function play() {
    if ((Player1.dead === false) && (Player2.dead === false)) {
        updateFrame();
        drawFrame()
        requestAnimationFrame(play);
    } else {
        if (Player1.dead) {
            if (Player1.direction === 0){
                canvasContext.drawImage(tankUpDead1, Player1.x * netq, Player1.y * netq);
            }
            if (Player1.direction === 1){
                canvasContext.drawImage(tankRightDead1, Player1.x * netq, Player1.y * netq);
            }
            if (Player1.direction === 2){
                canvasContext.drawImage(tankDownDead1, Player1.x * netq, Player1.y * netq);
            }
            if (Player1.direction === 3){
                canvasContext.drawImage(tankLeftDead1, Player1.x * netq, Player1.y * netq);
            }
        } else {
            if (Player2.direction === 0){
                canvasContext.drawImage(tankUp2Dead, Player2.x * netq, Player2.y * netq);
            }
            if (Player2.direction === 1){
                canvasContext.drawImage(tankRight2Dead, Player2.x * netq, Player2.y * netq);
            }
            if (Player2.direction === 2){
                canvasContext.drawImage(tankDown2Dead, Player2.x * netq, Player2.y * netq);
            }
            if (Player2.direction === 3){
                canvasContext.drawImage(tankLeft2Dead, Player2.x * netq, Player2.y * netq);
            }
        }
        canvasContext.font = '32px Arial';
        canvasContext.fillStyle = 'white';
        canvasContext.textAlign = 'center';
        canvasContext.fillText('Game over! Press key for restart', canvasWidth / 2, canvasHeight / 2);
    }
}

play();
