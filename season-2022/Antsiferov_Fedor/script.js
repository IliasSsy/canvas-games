var canvas = document.getElementById('canvas'); //получаем узел нашего холста, для использования канваса мы должны его обьяявить, какой id он имет в html файле, то мы и пишем в скобочки
var ctx = canvas.getContext('2d'); //рисовать в 2д пространстве

var canvasWidth = 1500; //размер холста две строки
var canvasHeight = 540;

//ctx.fillRect(0, 0, canvasWidth, canvasHeight); //создаем канвас то есть полотно убираем потому что рисуется в drawframe
var starttime = Date.now(); //сколько прошло время от начала игры
var deltateleport = 3000; //интервал времени между телепортами
var GAME = {
    width: 1900,
    height: 940,
}
var imgbulletleft = new Image()
var imgbulletright = new Image()
var imgknifeleft = new Image()
var imgkniferight = new Image()

imgbulletleft.src = './bulletleft.png'
imgbulletright.src = './bulletright.png'
imgknifeleft.src = './knifeleft.png'
imgkniferight.src = './kniferight.png'

var imgpistol = new Image()
imgpistol.src = './pistol.png'

var imgrpg = new Image()
imgrpg.src = './rpg.png'
var maska = {
    img: new Image(),
    imgIsLoad: false,
    width: 100,
    height: 70,
    x1: 1470,
    y1: 455,
    x2: 51,
    y2: 317,
};

var Player1 = {
    height: 100,
    width: 100,
    xdirection: 7,
    img: new Image(),
    leftPressed: false,
    rightPressed: false,
    jumpPressed: false,
    speed: 16,//- начальная скорость
    y: 675,
    paddleX: 100,
    imgIsLoad: false,
    yspawn: 675,
    xspawn: 100,
    maxspeed: 32,
    jumpcount: 0, // сколько прыжков сделано
    jumps: 1,
    rechargeteleport: 0, // сколько времени прошло с последнего телепорта
    startteleport: Date.now() - deltateleport, // для начала игры чтобы чел мог тпхнуться
    rechargebullet: 0, // сколько времени прошло с последнего выстрела
    deltabullet: 200, // интервал времени между выстрелами
    startbullet: Date.now(), //- deltabullet, новая точка отсчета
    side: "right",
    fireon: false,
    hp: 5,
    max_hp: 5, // чтобы после смерти восстанавливаться
    number: 1,
    ammo: 10,
    rechargeweapon: 4000,
    reload: false,
    startreload: Date.now(),
    reloading: 0,
    max_ammo: 15,
    kills: 0,
    radius: 30, //
    dmg_hit: 2,
    starthit: Date.now(), // момент выстрела
    rechargehit: 0,
    deltahit: 1000,
    hittime: 150,
    hitting: false,
    img_knife: imgknifeleft,
}
Player1.starthit -= Player1.deltahit; //ударили новая точка отсчета
Player1.startbullet -= Player1.deltabullet;
var Player2 = {
    height: 100,
    width: 100,
    xdirection: 7,
    img: new Image(),
    leftPressed: false,
    rightPressed: false,
    jumpPressed: false,
    speed: 16,
    y: 665,
    paddleX: 1600,
    imgIsLoad: false,
    yspawn: 665,
    xspawn: 1600,
    maxspeed: 32,
    jumpcount: 0,
    jumps: 1,
    rechargeteleport: 0,
    startteleport: Date.now() - deltateleport,
    rechargebullet: 0,
    deltabullet: 200,
    startbullet: Date.now(), //- deltabullet,
    side: "left",
    fireon: false,
    hp: 5,
    max_hp: 5,
    number: 2,
    ammo: 10,
    rechargeweapon: 4000,
    reload: false,
    startreload: Date.now(),
    reloading: 0,
    max_ammo: 15,
    kills: 0,
    radius: 30,
    dmg_hit: 2,
    starthit: Date.now(),
    rechargehit: 0,
    deltahit: 1000,
    hittime: 150,
    hitting: false,
    img_knife: imgknifeleft,
}
Player2.startbullet -= Player2.deltabullet; //сразу могли стрелять 
Player2.starthit -= Player2.deltahit;
var bullets = [];

var field = {
    img: new Image(),
    imgIsLoad: false, // для изображения
}
var blocks = [{
    x: 0,
    y: 640,
    width: 680,
    crash1: false,
    crash2: false,
},
{
    x: 0,
    y: 775,
    width: 950,
    crash1: false,
    crash2: false,
}
]

var audio = new Audio(); // Создаём новый элемент Audio
audio.src = './music.mp3'; // Указываем путь к звуку "клика"
//audio.autoplay = true;

// Автоматически запускаем

function add_block(xa, ya, widtha) {
    blocks.push({
        x: xa,
        y: ya,
        width: widtha,
        crash1: false,
        crash2: false
    })
}

add_block(0, 535, 275);
add_block(850, 670, 55);
add_block(620, 570, 38);
add_block(620, 540, 38);
add_block(620, 510, 38);// add_block(620, 480, Leontiev_Stepan); // поломанная
add_block(620, 420, 38);
add_block(620, 390, 38);
add_block(510, 317, 210);
add_block(595, 240, 32);
add_block(1050, 400, 243);
add_block(1402, 765, 500);
add_block(1520, 630, 500);
add_block(1510, 530, 35);
add_block(1617, 401, 300);
add_block(1763, 326, 42);
add_block(51, 393, 42);

function initPlayer1() { // указываем местоположение картинки игроков
    Player1.img.src = './player1.png'
    Player1.img.onload = () => {
        Player1.imgIsLoad = true
    }
}
function initPlayer2() {
    Player2.img.src = './player2.png'
    Player2.img.onload = () => {
        Player2.imgIsLoad = true
    }
}
//Рисуем персонажей и фон; Вызываем поле
// Ставим на фон картинку в джаве подключаем картинку указываем местоположение прописываем потом в консоли эту функцию
function initfield() {
    ctx.fillStyle = "black";

    field.img.src = './area.jpg'
    field.img.onload = () => {
        field.imgIsLoad = true
    }
}
function initmaska() {
    maska.img.src = './maska.png'
    maska.img.onload =
        () => {
            maska.imgIsLoad = true
        }
}


function drawmaska() {
    if (maska.imgIsLoad) {
        ctx.drawImage(maska.img, maska.x1, maska.y1, maska.width, maska.height);
        ctx.drawImage(maska.img, maska.x2, maska.y2, maska.width, maska.height);
    }
}
function drawfield() {
    if (field.imgIsLoad) ctx.drawImage(field.img, 0, 0, GAME.width, GAME.height);
}
function drawPlayer(player) {
    if (player.imgIsLoad) {
        ctx.drawImage(player.img, player.paddleX, player.y, player.width, player.height);
    }
}

// function drawBackground() {
// ctx.fillStyle = GAME.background; У нас закрашивается канвас хотя у нас канвас -картинка
// ctx.fillRect(0, 0, GAME.width, GAME.height);
// }
box = {
    width: 30,
    heiwght: 30,
}
function drawpistol() {
    ctx.fillRect(imgpistol, getRandomInt(GAME.width), getRandomInt(GAME.height), box.width, box.height);
}

function drawpistol() {
    ctx.fillRect(imgrpg, getRandomInt(GAME.width), getRandomInt(GAME.height), box.width, box.height);
}

function drawbar(player) {
    ctx.fillStyle = "red";
    ctx.fillRect(player.paddleX, player.y + player.height, player.width * (player.hp / player.max_hp), 15);
    if (player.reload) {
        ctx.fillStyle = "yellow"
        ctx.fillRect(player.paddleX, player.y + player.height + 30, player.width * (player.reloading / player.rechargeweapon), 15);
    }
}

function drawtext() {
    ctx.fillStyle = "black"
    ctx.font = "italic 30pt Arial"
    ctx.fillText("Player1: " + Player1.kills, 20, 50);
    ctx.fillText("Player2: " + Player2.kills, 1600, 50);
}

function drawknife(player) {
    if (player.side == "right") {
        ctx.drawImage(imgkniferight, player.paddleX + player.width * 0.5, player.y + 40, player.radius * 2.5, 30)
    }
    else {
        ctx.drawImage(imgknifeleft, player.paddleX + player.width * 0.5, player.y + 40, -(player.radius * 2.5), 30)
    }
}

function appendbullet(xa, ya, widtha, heighta, speeda, numbofplayera, damagea, imga) {
    bullets.push({
        x: xa,
        y: ya,
        width: widtha,
        height: heighta,
        speed: speeda,
        number: numbofplayera,
        damage: damagea,
        img: imga,
    })
}

function drawbullets() {
    for (var bullet of bullets) { //задаем новую переменную
        ctx.drawImage(bullet.img, bullet.x, bullet.y, bullet.width + 30, bullet.height + 30);
    }
}

function updatebullets(player) {
    for (var bullet of bullets) { // для каждой пуля в массиве пуль изменяем координату x относительно скорости каждой пули соответственно
        bullet.x += bullet.speed
        if (bullet.x - 200 > GAME.width || bullet.x + 200 < 0 || bullet.y > GAME.height + 200 || bullet.y < -200) {
            bullets.splice(bullets.indexOf(bullet), 1) // сколько удаляется пуль начиная с этого индекса
        }
    }
    if (player.fireon && player.rechargebullet >= player.deltabullet && !player.reload) {
        if (player.side == "right") { appendbullet(player.paddleX + player.width, player.y + 20, 20, 10, 8, player.number, 1, imgbulletright) }
        else { appendbullet(player.paddleX, player.y + 20, 20, 10, -8, player.number, 1, imgbulletleft) }
        player.startbullet = Date.now(); // новая точка отсчёта времени.(время после того как запустили пулю последнюю)
        player.ammo -= 1
        if (player.ammo <= 0) {
            player.reload = true
            player.startreload = Date.now() //новая точка отсчета
        }
    }
}

function kill(player) {
    player.hp = player.max_hp
    player.paddleX = player.xspawn
    player.y = player.yspawn
    player.reload = false
    player.startreload = Date.now() - player.rechargeweapon
    player.ammo = player.max_ammo
    if (player.number == 1) {
        Player2.kills += 1
    }
    else {
        Player1.kills += 1
    }
}

function teleport(player) {
    if (player.y > GAME.height) {
        player.y = player.yspawn - 800
        player.x = player.xspawn
        player.speed = 8
        player.hp -= 2
        if (player.hp <= 0) {
            kill(player)
        }
    }


}
function updatePlayer(player) {
    if (player.hitting) {
        if (player.rechargehit >= player.deltahit) {
            player.hitting = false;
        }
    }
    if (player.rightPressed && player.paddleX - 15 < canvas.width - player.width) { // клавиша зажата и переменная true, поэтому движение плавное
        player.paddleX += player.xdirection;
    }
    else if (player.leftPressed && player.paddleX > 0) {
        player.paddleX -= player.xdirection;
    }
    for (var bullet of bullets) {
        if (bullet.number != player.number && bullet.x < player.paddleX + player.width && bullet.x + bullet.width > player.paddleX && bullet.y < player.y + player.height && bullet.y + bullet.height > player.y) {
            player.hp -= bullet.damage
            if (player.hp <= 0) {
                kill(player)
            }
            bullets.splice(bullets.indexOf(bullet), 1)
        }


    }
    if (player.reload) {
        if (player.reloading >= player.rechargeweapon) {
            player.reload = false
            player.ammo =
                player.max_ammo
            player.startreload = Date.now()
        }
    }

}

function updatejump(player) {
    if (player.jumpPressed) {
        player.y -= player.speed

        for (var block of blocks) {// пробегаем каждый обьект, СРАВНИВАЕТСЯ С i паскаль

            if (player.speed < 0) { // если тело падает
                // координата y вычисляется из (y в данный момент вычитается y(скорость(ускорение)) - тело прыгает, если speed < 0 => ТЕЛО ПАДАЕТ
                if (player.number == 1) {
                    if (!block.crash1 && player.y + player.height > block.y && player.y < block.y && player.paddleX <= block.x + block.width && player.paddleX + player.width >= block.x) { // игрок входит вблок
                    // если блок существует, низ игрока находится ниже(>) платформы и вверх игрока находился выше(<), левая сторона игрока на=ходится левее правой границы платформы - правая граница игрока находтся правее левой границы платформы
                        player.y = block.y - player.height // чтобы не заходил за границу блока
                        player.jumpPressed = false
                        player.jumpcount = 0 // обнуляем кол во прыжков и скорость
                        player.speed = 0
                        for (var block of blocks) { // пробегаем каждую платформу чтобы они все стали существующими
                            if (player.number == 1) {
                                block.crash1 = false
                            }
                            else {
                                block.crash2 = false
                            }
                        }
                        break //если мы нашли платформу на которую можем встать то другие не рассматриваем и прерываем цикл for (var block of blocks)
                    }
                }
                else {
                    if (block.crash2 == false && player.y + player.height > block.y && player.y < block.y && player.paddleX <= block.x + block.width && player.paddleX + player.width >= block.x) {
                        // если блок существует, низ игрока находится ниже(>) платформы и вверх игрока находился выше(<), левая сторона игрока находится левее правой границы платформы - правая граница игрока находтся правее левой границы платформы
                        player.y = block.y - player.height // чтобы не заходил за границу блока
                        player.jumpPressed = false
                        player.jumpcount = 0 // обнуляем кол во прыжков и скорость
                        player.speed = 0
                        for (var block of blocks) { // пробегаем каждую платформу чтобы они все стали существующими
                            if (player.number == 1) {
                                block.crash1 = false
                            }
                            else {
                                block.crash2 = false
                            }
                        }
                        break //если мы нашли платформу на которую можем встать то другие не рассматриваем и прерываем цикл for (var block of blocks)
                    }
                }
            }

            else { // если скорость больше или равна 0 -> двигается вверх тело
                if (player.y + player.height > block.y && player.y < block.y) {
                    if (player.number == 1) {
                        block.crash1 = true // чтобы ломать блоки при движении наверх
                    }
                    else { block.crash2 = true }
                }
                else {
                    if (player.number == 1) {
                        block.crash1 = false
                    }
                    else { block.crash2 = false }
                }
            }
        }

        if (player.jumpPressed && Math.abs(player.speed) < player.maxspeed) { // чтобы скорость увеличвалась до максимальной
            player.speed -= 0.8 // ускорение
        }
    }
    else { // если он идет идет и обрыв он падает
        for (var block of blocks) {
            if (player.y + player.height == block.y && !(player.paddleX <= block.x + block.width && player.paddleX + player.width >= block.x)) { // если он выходит за границы платфоомы на которой стоит
                player.speed = 0
                player.y += 2 // под блок проваливалась
                if (player.number == 1) { block.crash1 = true }
                else { block.crash2 = true } // ломаем блок на котором стояли, чтобы он не мешал движению
                player.jumpPressed = true // чтобы происходило свободное падение
            }
        }
    }
}

function changeimg() {
    if (Player1.leftPressed) {
        Player1.img.src = './m_player1.png'
        Player1.img.onload = () => {
            Player1.imgIsLoad = true
        }
    }
    if (Player1.rightPressed) {
        Player1.img.src = './player1.png'
        Player1.img.onload = () => {
            Player1.imgIsLoad = true
        }
    }
    if (Player2.leftPressed) {
        Player2.img.src = './player2.png'
        Player2.img.onload = () => {
            Player2.imgIsLoad = true
        }
    }
    if (Player2.rightPressed) {
        Player2.img.src = './m_player2.png'
        Player2.img.onload = () => {
            Player2.imgIsLoad = true
        }
    }
}

function hit(player) {
    if (player.number == 1) {
        Player1.starthit = Date.now()
        Player1.hitting = true
        if (player.side == 'right') {
            Player1.img_knife = imgkniferight
            if (Player2.paddleX < player.paddleX + player.width + player.radius &&
                Player2.paddleX + Player2.width > player.paddleX + (player.width * 0.5) && Player2.y < player.y + (player.height * 0.75) && Player2.y + Player2.height > player.y + (player.height * 0.25)) {
                Player2.hp -= player.dmg_hit
                if (Player2.hp <= 0) {
                    kill(Player2)
                }
            }
        }
        else {
            Player1.img_knife = imgknifeleft
            if (Player2.paddleX < player.paddleX + (player.width * 0.5) && Player2.paddleX + Player2.width > player.paddleX - player.radius && Player2.y < player.y + (player.height * 0.75) && Player2.y + Player2.height > player.y + (player.height * 0.25)) {
                Player2.hp -= player.dmg_hit
                if (Player2.hp <= 0) {
                    kill(Player2)
                }
            }
        }
    }
    else {
        Player2.starthit = Date.now()
        Player2.hitting = true
        if (player.side == 'right') {
            Player2.img_knife = imgkniferight
            if (Player1.paddleX < player.paddleX + player.width + player.radius && Player1.paddleX + Player1.width > player.paddleX + (player.width * 0.5) && Player1.y < player.y + (player.height * 0.75) && Player1.y + Player1.height > player.y + (player.height * 0.25)) {
                Player1.hp -= player.dmg_hit
                if (Player1.hp <= 0) {
                    kill(Player1)
                }
            }
        }
        else {
            Player2.img_knife = imgknifeleft
            if (Player1.paddleX < player.paddleX + (player.width * 0.5) && Player1.paddleX + Player1.width > player.paddleX - player.radius && Player1.y < player.y + (player.height * 0.75) && Player1.y + Player1.height > player.y + (player.height * 0.25)) {
                Player1.hp -= player.dmg_hit
                if (Player1.hp <= 0) {
                    kill(Player1)
                }
            }
        }
    }
}

function keydown(e) { // нажатие клавиш
    console.log(e.code)
    if (e.code == "Numpad6") {
        Player2.side = "right";
        Player2.rightPressed = true;
        audio.play();
    }
    if (e.code == "Numpad4") {
        Player2.leftPressed = true;
        Player2.side = "left";
        audio.play();
    }
    if (e.code == "Numpad8") {
        if (Player2.jumpcount < Player2.jumps) { // можно создать двойной прыжок
            Player2.jumpPressed = true;
            Player2.speed = 16;
            Player2.jumpcount += 1;
        }
        audio.play();
    }
    if (e.code == "Numpad5") {
        if (Player2.y + Player2.height == 393 && Player2.paddleX + Player2.width >= 0 && Player2.paddleX <= 200 && Player2.rechargeteleport >= deltateleport) { Player2.startteleport = Date.now(); Player2.paddleX = 1465; Player2.y = 430 } // если тело находится в отрезке телепорта то оно может телепортироваться с интревалом deltateleport
        else if (Player2.y == 430 && Player2.paddleX <= 1660 && Player2.paddleX + Player2.width >= 1400 && Player2.rechargeteleport >= deltateleport) { Player2.startteleport = Date.now(); Player2.y = 293; Player2.paddleX = 50 } // когда чел телепортировался то обнуляем таймер и запускаем снова(перезаписываем, меняем точку отсчета)
        else if (Player2.jumpPressed == false && Player2.y < 650) { // jumppressed - свободное падение
            Player2.jumpPressed = true;
            Player2.y += 2
            Player2.speed = 0;
        }
        audio.play();
    }

    if (e.keyCode == 186 && !Player2.reload) {
        Player2.fireon = true
        audio.play();
    }

    if (e.keyCode == 222 && !Player2.hitting) {
        hit(Player2)
        audio.play();
    }

    if (e.keyCode == 86 && !Player1.hitting) {
        hit(Player1)
        audio.play();
    }

    if (e.keyCode == 67 && !Player1.reload) {
        Player1.fireon = true
        audio.play();
    }

    if (e.keyCode == 68) {
        Player1.rightPressed = true;
        Player1.side = "right";
        audio.play();
    }
    if (e.code == "KeyA") {
        Player1.leftPressed = true;
        Player1.side = "left";
        audio.play();
    }
    if (e.code == "KeyW") {
        if (Player1.jumpcount < Player1.jumps) { // можно создать двойной прыжок
            Player1.jumpPressed = true;
            Player1.speed = 16;
            Player1.jumpcount += 1;
        }
        audio.play();
    }
    if (e.code == "KeyS") {
        if (Player1.y + Player1.height == 393 && Player1.paddleX + Player1.width >= 0 && Player1.paddleX <= 200 && Player1.rechargeteleport >= deltateleport) {
            Player1.startteleport = Date.now();
            Player1.paddleX = 1465; Player1.y = 430
        }
        else if (Player1.y == 430 && Player1.paddleX <= 1660 && Player1.paddleX + Player1.width >= 1400 && Player1.rechargeteleport >= deltateleport) { Player1.startteleport = Date.now(); Player1.y = 293; Player1.paddleX = 50 }
        else if (Player1.jumpPressed == false && Player1.y < 650) { // jumppressed - свободное падение
            Player1.jumpPressed = true;
            Player1.y += 2
            Player1.speed = 0;
        }
        audio.play();
    }

    if (e.code == "KeyY") {
        if (Player1.kills > Player2.kills) { var winner = 1 } if (Player2.kills > Player1.kills) { var winner = 2 } if (Player2.kills == Player1.kills) { var winner = 3 }
        if (winner == 1 || winner == 2) { alert('Победил ' + winner + ' Игрок') } else { alert('Победила ничья') }
        Player1.kills = 0; Player2.kills = 0; audio.currentTime=0; audio.play();
        Player1.paddleX=Player1.xspawn; Player2.paddleX=Player2.xspawn; Player1.y=Player1.yspawn; Player2.y=Player2.yspawn;}
    
}
function keyup(e) { //отжатие клавиш
    if
        (e.code == "Numpad6") {
        Player2.rightPressed = false;
    }
    if (e.code == "Numpad4") {
        Player2.leftPressed = false;
    }
    if (e.code == "KeyD") {
        Player1.rightPressed = false;
    }
    if (e.code == "KeyA") {
        Player1.leftPressed = false;
    }
    if (e.keyCode == 186) {
        Player2.fireon = false
    }
    if (e.keyCode == 67) {
        Player1.fireon = false
    }
}

function initEventsListeners() {
    // window.addEventListener('mousemove', onCanvasMouseMove);
    document.addEventListener("keydown", keydown, false);
    document.addEventListener("keyup", keyup, false);
}
function drawFrame() {
    ctx.clearRect(0, 0, GAME.width, GAME.height); // очищаю поле
    // drawBackground(); //поле рисуется
    drawfield(); //картинка на поле
    if (Player1.hitting && Player1.rechargehit <= Player1.hittime) {
        drawknife(Player1)
    }
    if (Player2.hitting && Player2.rechargehit <= Player2.hittime) {
        drawknife(Player2)
    }
    drawPlayer(Player1);
    drawPlayer(Player2);
    drawbullets();
    drawbar(Player1);
    drawbar(Player2);
    drawmaska();
    changeimg();
    drawtext();
}
function play() {
    var time = Date.now() - starttime; // сколько время прошло с начала сеанса в милисекундах
    Player1.rechargeteleport = Date.now() - Player1.startteleport;
    Player2.rechargeteleport = Date.now() - Player2.startteleport
    Player1.rechargebullet = Date.now() - Player1.startbullet
    Player2.rechargebullet = Date.now() - Player2.startbullet
    Player1.reloading = Date.now() - Player1.startreload
    Player2.reloading = Date.now() - Player2.startreload
    Player1.rechargehit = Date.now() - Player1.starthit
    Player2.rechargehit = Date.now() - Player2.starthit
    drawFrame();
    //console.log(audio);
    // console.log("x: " + Player1.paddleX);
    // console.log("y: " + Player1.y);
    updatePlayer(Player1);
    updatePlayer(Player2);
    updatebullets(Player1);
    updatebullets(Player2);
    updatejump(Player1); // мы написали в параметр обьект
    updatejump(Player2);
    teleport(Player1);
    teleport(Player2);
    requestAnimationFrame(play); // рекурсивная функция(запускает сама себя)

}
canvas.width = GAME.width; //размер поля равен размер канваса
canvas.height = GAME.height;
initEventsListeners();
initPlayer2();
initfield();
initmaska();
initPlayer1();
play();