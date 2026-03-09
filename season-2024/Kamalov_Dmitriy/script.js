var GAME = {
    width: window.innerWidth,
    height: window.innerHeight,
    img: new Image(),
    cnt_img: 0,
    cnt_text: 0
}
var countClicks = 0;
var countSpases = 0;
var countArrowRights = 0;
var countImages = 11;
var images = [];
var num_game = 1;
var texts = [['<Управление>', 'Следующее изображение: Пробел, >'], ['Эта маленькая поучительная игра про бывалого охотника за головами.', ' В своей жизни он совершил много хорошего и плохого.'], ['Но вот однажды он повстречал бродягу, который рассказал ему легенду ', 'о настоящем смысле жизни, который находится в пещере', 'на вершине местной горы.'], ['Взвесив все за и против, он решился отправиться в пещеру.'], ['*Подьём на гору*'], ['<Охотник>', 'Ну вот пещера перед нами.', 'Вперёд!'], ['*Ползём*'], ['Неожиданно перед глазами охотника появилась развилка', 'Что выберешь? (На стене видна надпись: решение богатыря)', 'Жми клавишу 1, 2 или 3 (слево на право)'], ['Перед охотником открывается прекрасный вид.', 'Но вдруг он замечает кого-то неподалёку'], ['<Незнакомец>', 'Ну здравствуй, охотник.', 'Я знал что ты придёшь', 'Тебе надо пройти 3 испытания для получения желаемого'], ['Первое испытание - арканоид.', 'Цель - заработать 10 очков', 'Если шарик касается низа -1 очко'], ['Первое испытание пройдено!'], ['Второе ипспытание. Вы должны исправить 30 багов, поймав их.', 'Чтобы это сделать кликайте по ним.', 'Заработайте 30 очков.'], ['Второе испытание пройдено!'], ['В третьем испытании мы проверим твою реакцию', 'Твоя цель - кликнуть по 15 мишеням.', 'За каждое пропущенную мишень -1 очко'], ['Третье испытание пройдено!'], ['<Незнакомец>', 'Ну что же, я дам тебе желаемое'], ['<Незнакомец>', 'В этом сундуке хранится смысл жизни'], ['Открытие...', '<Охотник>', 'Почему он пустой?!'], ['<Незнакомец>', 'Потому что смысл жизни для каждого человека свой!'], ['Спасибо за прохождение игры!'], ['<Немного информации>', 'Количество кликов: ', 'Количество пробелов: ', 'Количетсво стрелки вправо: ']];
for (let i = 0; i < countImages + 11; i++) {
    images[i] = "image" + i;
}


var canvas = document.getElementById('canvas');

var canvasContent = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var AUDIO = {
    src: new Audio('music/background_music.mp3'),
    off: true
}
AUDIO.src.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

var lostScore = new Audio('music/lostScore.mp3');
var bounceBall = new Audio('music/bounce.mp3');
var errorSound = new Audio('music/error.mp3');
var fireSound = new Audio('music/fire.mp3');
var nextSlideSound = new Audio('music/nextSlide.mp3');
var dragonSound = new Audio('music/dragon.mp3');
var manFall = new Audio('music/manFall.mp3');

var img_title = new Image();

img_title.src = 'images/title.jpg';

img_title.onload = function () {
    drawTheImage(img_title);
    canvasContent.font = 90 + "px cursive";
    canvasContent.fillStyle = '#146CF0';
    canvasContent.textAlign = 'center';
    canvasContent.fillText('The dungeon of the meaning of life', GAME.width / 2, GAME.height / 2);
    canvasContent.lineWidth = 3;
    canvasContent.strokeText('The dungeon of the meaning of life', GAME.width / 2, GAME.height / 2);

    canvasContent.font = 50 + "px monospace";
    canvasContent.fillStyle = 'white';
    canvasContent.textAlign = 'center';
    canvasContent.lineWidth = 2;
    canvasContent.fillText('Нажми пробел чтобы продолжить...', GAME.width / 2, (GAME.height - 80 + GAME.height) / 2);
    canvasContent.strokeText('Нажми пробел чтобы продолжить...',  GAME.width / 2, (GAME.height - 80 + GAME.height) / 2);
};

GAME.img.onload = function () {
    drawTheImage(GAME.img);
    canvasContent.fillStyle = 'rgba(47, 237, 215, 0.5)'
    canvasContent.fillRect(0, GAME.height - 200, GAME.width, GAME.height);
    drawText(GAME.width / 2, (GAME.height - 310 + GAME.height) / 2, 50);

};


window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    GAME.width = canvas.width;
    GAME.height = canvas.height;
    drawTheImage(GAME.img);
};

function drawTheImage(img) {
    canvasContent.drawImage(img, 0, 0, img.width, img.height, 0, 0, GAME.width, GAME.height);
}

function clearWindow() {
    canvasContent.clearRect(0, 0, GAME.width, GAME.height);
}


function initEventsListeners() {
    window.addEventListener('keydown', onCanvasMouseMoveOrKeyDown);
}

function removeEventsListeners() {
    window.removeEventListener('keydown', onCanvasMouseMoveOrKeyDown);
}
function onCanvasMouseMoveOrKeyDown(event) {
    if (AUDIO.off){
        AUDIO.src.play();
        AUDIO.off = false;
    }
    if (event.type === 'keydown') {
        if (event.code === 'Space') {
            countSpases++;
        } else if (event.key === 'ArrowRight') {
            countArrowRights++;
        }else {
            return;
        }
    }

    if (GAME.cnt_img < countImages) {
        nextSlideSound.play();
        GAME.img.src = 'images/' + images[GAME.cnt_img] + '.jpg';
        //drawTheImage(GAME.img);
        GAME.cnt_img += 1;
    } else {
        removeEventsListeners();
        play();
    }
}

function drawText(x, y, size) {
    canvasContent.font = size + "px sans-serif";
    canvasContent.fillStyle = 'black';
    canvasContent.textAlign = 'center';
    canvasContent.lineWidth = '0.4';
    canvasContent.strokeStyle = 'white';
    let yIncr = 0;
    for (let t of texts[GAME.cnt_text]) {
        canvasContent.fillText(t, x, y + yIncr);
        canvasContent.strokeText(t, x, y + yIncr);
        yIncr += size;
    }
    if (GAME.cnt_text === 7) {
        removeEventsListeners();
        window.addEventListener('keydown', onCanvasKeyDown);
    }
    GAME.cnt_text += 1;
}

function onCanvasKeyDown(event) {
    if (event.code === 'Digit1') {
        window.removeEventListener('keydown', onCanvasKeyDown);
        defeatCaveScreen1();
    } else if (event.code === 'Digit2') {
        window.removeEventListener('keydown', onCanvasKeyDown);
        defeatCaveScreen2();
    } else if (event.code === 'Digit3') {
        window.removeEventListener('keydown', onCanvasKeyDown);
        initEventsListeners();
        let event = {
            type: 'click',
        }
        onCanvasMouseMoveOrKeyDown(event);
    }
}

function defeatCaveScreen1() {
    removeEventsListeners();
    let img_dragon = new Image();
    img_dragon.src = 'images/defeat_dragon.jpg';
    img_dragon.onload = function () {
        dragonSound.play();
        drawTheImage(img_dragon);
        canvasContent.fillStyle = 'rgba(47, 237, 215, 0.5)'
        canvasContent.fillRect(0, GAME.height - 200, GAME.width, GAME.height);

        canvasContent.font = 50 + "px sans-serif";
        canvasContent.fillStyle = 'black';
        canvasContent.textAlign = 'center';

        canvasContent.fillText('Выходя из прохода охотник столкнулся с драконом.', GAME.width / 2, (GAME.height - 250 + GAME.height) / 2);
        canvasContent.fillText('Он понимает что не выживет в этой схватке. ', GAME.width / 2, (GAME.height - 250 + GAME.height) / 2 + 50);
    }
    window.addEventListener('click', defeatScreen);
    window.addEventListener('keydown', defeatScreen);
}
function defeatCaveScreen2() {
    removeEventsListeners();
    let img_trap = new Image();
    img_trap.src = 'images/defeat_trap.jpg';
    img_trap.onload = function () {
        manFall.play();
        drawTheImage(img_trap);
        canvasContent.fillStyle = 'rgba(47, 237, 215, 0.5)'
        canvasContent.fillRect(0, GAME.height - 200, GAME.width, GAME.height);

        canvasContent.font = 50 + "px sans-serif";
        canvasContent.fillStyle = 'black';
        canvasContent.textAlign = 'center';

        canvasContent.fillText('Выходя из прохода охотник спотыкается и падает в ловушку.', GAME.width / 2, (GAME.height - 250 + GAME.height) / 2);
        canvasContent.fillText('<Охотник>', GAME.width / 2, (GAME.height - 250 + GAME.height) / 2 + 50);
        canvasContent.fillText('Читай больше сказок, игрок!', GAME.width / 2, (GAME.height - 250 + GAME.height) / 2 + 100);
    }
    window.addEventListener('click', defeatScreen);
    window.addEventListener('keydown', defeatScreen);
}

function defeatScreen(event) {
    if (event.type === 'keydown') {
        if (event.code !== 'Space') {
            return;
        }
    }
    window.removeEventListener('click', defeatScreen);
    window.removeEventListener('keydown', defeatScreen);


    let img_defeat = new Image();
    img_defeat.src = 'images/defeat.jpg';
    img_defeat.onload = function () {
        drawTheImage(img_defeat);
    }

}

function play() {
    removeEventsListeners();
    clearWindow();
    if (num_game == 1) {
        game1InitEventsListeners();
        canvas.width = GAME1.width;
        canvas.height = GAME1.height;

        play1();
    } else if (num_game == 2) {
        canvas.width = GAME2.width;
        canvas.height = GAME2.height;
        background2.src = 'images/game2_background.jpg'
        initEventsListeners2();
        callAddBalls();
        play2();
    } else if (num_game == 3) {
        canvas.width = GAME3.width;
        canvas.height = GAME3.height;
        aim_sprite.src = 'sprites/aim.png';
        initEventsListeners3();
        callUpdateAim();
        play3();
    }else if (num_game == 4){
        AUDIO.src.pause();
    }

}
initEventsListeners();

























var BALL = {
    color: '#FF6E40',
    x: 100,
    y: 100,
    radius: 10,
    xDirection: 3,
    yDirection: 5,
}

var RACKET = {
    x: 0,
    y: 450,
    width: 100,
    height: 20,
    color: '#1E3D59',
    xDirection: 10,
    score: 0,
}

var GAME1 = {
    width: 600,
    height: 600,
    color: '#F5F0E1',
}

function drawBackground() {
    canvasContent.fillStyle = GAME1.color;
    canvasContent.fillRect(0, 0, GAME1.width, GAME1.height);
}

function drawBall() {
    canvasContent.fillStyle = BALL.color;
    canvasContent.beginPath();
    canvasContent.arc(BALL.x, BALL.y, BALL.radius, 0, 2 * Math.PI);
    canvasContent.closePath();
    canvasContent.fill();
}

function drawRacket() {
    canvasContent.fillStyle = RACKET.color;
    canvasContent.fillRect(RACKET.x, RACKET.y, RACKET.width, RACKET.height);
}

function updateBall() {
    BALL.x += BALL.xDirection;
    BALL.y += BALL.yDirection;
    if (BALL.y + BALL.radius > GAME1.height) {
        lostScore.play();
        RACKET.score -= 1;
        BALL.x = getRandom(BALL.radius, GAME1.width-BALL.radius);
        BALL.y = 100;
    }
    if ((BALL.y - BALL.radius < 0)) {
        BALL.yDirection = -BALL.yDirection;
        bounceBall.play();
    }
    if ((BALL.x + BALL.radius > GAME1.width) || (BALL.x - BALL.radius < 0)) {
        BALL.xDirection = -BALL.xDirection;
        bounceBall.play();
    }
    var topCollision = BALL.y + BALL.radius > RACKET.y;
    var leftCollision = BALL.x + BALL.radius > RACKET.x;
    var rightCollision = BALL.x - BALL.radius < RACKET.x + RACKET.width;
    var downCollision = BALL.y - BALL.radius < RACKET.y + RACKET.height;
    if (topCollision && leftCollision && rightCollision && downCollision) {
        bounceBall.play();
        BALL.yDirection = -BALL.yDirection;
        //BALL.xDirection = -BALL.xDirection;
        RACKET.score += 1;
    }
}

function clampRacketPosition() {
    if (RACKET.x + RACKET.width > GAME1.width) {
        RACKET.x = GAME1.width - RACKET.width;
    }
    if (RACKET.x < 0) {
        RACKET.x = 0;
    }
}

function game1InitEventsListeners() {
    window.addEventListener('mousemove', onCanvasMouseMove);
    window.addEventListener('keydown', onCanvasKeyDown1);
}

function onCanvasKeyDown1(event) {
    if (event.key === 'ArrowLeft') {
        RACKET.x -= RACKET.xDirection;
    }
    if (event.key === 'ArrowRight') {
        RACKET.x += RACKET.xDirection;
    }
    clampRacketPosition();
}

function onCanvasMouseMove(event) {
    RACKET.x = event.clientX;
    clampRacketPosition();
}

function drawScore() {
    canvasContent.font = "40px serif";
    canvasContent.fillStyle = 'white';
    canvasContent.strokeStyle = 'black';
    canvasContent.lineWidth = 1;
    canvasContent.fillText("Score: " + RACKET.score, 10, 50);
    canvasContent.strokeText("Score: " + RACKET.score, 10, 50)
}

function drawVictoryScreen() {
    canvasContent.font = "110px sans-serif";
    canvasContent.fillStyle = 'black';
    canvasContent.textAlign = 'center';
    canvasContent.fillText("VICTORY", GAME1.width / 2, GAME1.height / 2);
}

function drawFrame() {
    canvasContent.clearRect(0, 0, GAME1.width, GAME1.height);
    drawBackground();
    drawBall();
    drawRacket();
    drawScore();
}

function play1() {
    drawFrame();
    if (RACKET.score < 10) {
        updateBall();
        requestAnimationFrame(play1);
    }
    else {
        window.removeEventListener('mousemove', onCanvasMouseMove);
        window.removeEventListener('keydown', onCanvasKeyDown1);
        canvasContent.clearRect(0, 0, GAME1.width, GAME1.height);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        countImages += 2;
        initEventsListeners();
        let event = {
            type: 'click'
        }
        num_game = 2;
        onCanvasMouseMoveOrKeyDown(event);

    }

}
























var GAME2 = {
    width: window.innerWidth,
    height: window.innerHeight,
    color: '#F5F0E1',
    score: 0
}




var balls = [];

var radiusBalls = 20;






var background2 = new Image();
background2.onload = function () {
    drawTheImage(background2);
}
function drawBackground2() {
    drawTheImage(background2);
}


function initEventsListeners2() {
    window.addEventListener('click', onCanvasMouseClick2);
}

function onCanvasMouseClick2(event) {
    countClicks++;
    let i = 0;
    let n = balls.length;
    while (i < n) {
        if (((event.offsetX > balls[i][0] - radiusBalls) && (event.offsetX < balls[i][0] + radiusBalls)) && ((event.offsetY > balls[i][1] - radiusBalls) && (event.offsetY < balls[i][1] + radiusBalls))) {
            errorSound.play();
            balls.splice(i, 1);
            GAME2.score++;
            n--;
            continue;
        }
        i++;
    }
}

function drawTheSprite(sprite, x, y, width_need, height_need) {
    canvasContent.drawImage(sprite, 0, 0, sprite.width, sprite.height, x - width_need / 2, y - height_need / 2, width_need, height_need);
}
var error_sprite = new Image();
error_sprite.onload = function () {
    drawTheSprite(error_sprite, balls[0][0], balls[0][1], 30, 30);
};
function drawBalls() {
    let i = 0;
    n = balls.length;
    error_sprite.src = 'sprites/error.png';
    while (i < n) {
        drawTheSprite(error_sprite, balls[i][0], balls[i][1], 30, 30)
        i += 1;
    }
    // for (let b of balls) {
    //     canvasContent.fillStyle = 'red';
    //     canvasContent.beginPath();
    //     canvasContent.arc(b[0], b[1], radiusBalls, 0, 2 * Math.PI);
    //     canvasContent.closePath();
    //     canvasContent.fill();
    // }
}
function updateBalls() {
    for (let b of balls) {
        b[0] += b[2];
        b[1] += b[3];
    }
    let i = 0;
    let n = balls.length;
    while (i < n) {
        if (balls[i][1] - radiusBalls > GAME2.height) {
            balls.splice(i, 1);
            n--;
            continue;
        } else if ((balls[i][0] - radiusBalls < 0) || (balls[i][0] + radiusBalls > GAME2.width)) {
            balls[i][2] = -balls[i][2];
        }
        i++;
    }

}
function addRandomBalls() {
    for (let i = 0; i < getRandom(5, 15); i++) {
        balls.unshift([getRandom(radiusBalls, GAME2.width - radiusBalls), radiusBalls, randomChoose([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]), getRandom(1, 5)]);
    }
}

function randomChoose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

var timer = null;
function callAddBalls() {
    addRandomBalls();
    timer = setTimeout(callAddBalls, getRandom(1000, 3000));
}

function drawScore2() {
    canvasContent.font = "40px serif";
    canvasContent.fillStyle = 'white';
    canvasContent.strokeStyle = 'black';
    canvasContent.lineWidth = 1;
    canvasContent.fillText("Score: " + GAME2.score, 10, 50);
    canvasContent.strokeText("Score: " + GAME2.score, 10, 50)
}

function drawFrame2() {
    canvasContent.clearRect(0, 0, GAME2.width, GAME2.height);
    drawBackground2();
    drawBalls();
    drawScore2();
}



function play2() {
    drawFrame2();
    if (GAME2.score < 30) {
        updateBalls();
        requestAnimationFrame(play2);
    }
    else {
        window.removeEventListener('click', onCanvasMouseClick2);
        clearTimeout(timer);
        canvasContent.clearRect(0, 0, GAME2.width, GAME2.height);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        countImages += 2;
        initEventsListeners();
        let event = {
            type: 'click'
        }
        num_game = 3;
        onCanvasMouseMoveOrKeyDown(event);

    }

}
























var GAME3 = {
    width: window.innerWidth,
    height: window.innerHeight,
    color: '#F5F0E1',
    score: 1
}

var AIM = {
    width: 50,
    height: 50,
    x: 300,
    y: 300,
    on: true
}

function drawBackground3() {
    canvasContent.fillStyle = GAME3.color;
    canvasContent.fillRect(0, 0, GAME3.width, GAME3.height);
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function removeAim() {
    if (AIM.on) {
        AIM.on = false;
    }
}

var aim_sprite = new Image();
aim_sprite.onload = function () {
    drawAim();
}


function drawTheSprite(sprite, x, y, width_need, height_need) {
    canvasContent.drawImage(sprite, 0, 0, sprite.width, sprite.height, x, y, width_need, height_need);
}

function drawAim() {
    if (AIM.on) {
        drawTheSprite(aim_sprite, AIM.x, AIM.y, AIM.width, AIM.height);
    }
}

function updateAim() {
    AIM.x = getRandom(AIM.width, GAME3.width - AIM.width);
    AIM.y = getRandom(AIM.height, GAME3.height - AIM.height);
    if (AIM.on) {
        lostScore.play();
        GAME3.score--;
    } else {
        AIM.on = true;
    }


}

var timer3 = null;
function callUpdateAim() {
    updateAim();
    timer3 = setTimeout(callUpdateAim, 1000);
}

function initEventsListeners3() {
    window.addEventListener('click', onCanvasMouseClick3);
}

function onCanvasMouseClick3(event) {
    countClicks++;
    if (AIM.on) {
        if (((event.offsetX > AIM.x) && (event.offsetX < AIM.x + AIM.width)) && ((event.offsetY > AIM.y) && (event.offsetY < AIM.y + AIM.height))) {
            fireSound.play();
            removeAim();
            GAME3.score++;
        }
    }
}

function drawScore3() {
    canvasContent.font = "40px serif";
    canvasContent.fillStyle = 'white';
    canvasContent.strokeStyle = 'black';
    canvasContent.lineWidth = 1;
    canvasContent.fillText("Score: " + GAME3.score, 10, 50);
    canvasContent.strokeText("Score: " + GAME3.score, 10, 50)
}

function drawFrame3() {
    canvasContent.clearRect(0, 0, GAME3.width, GAME3.height);
    drawBackground3();
    drawAim();
    drawScore3();
}
function play3() {
    drawFrame3()
    if (GAME3.score < 15) {
        requestAnimationFrame(play3);
    }
    else {

        window.removeEventListener('click', onCanvasMouseClick3);
        clearTimeout(timer3);
        canvasContent.clearRect(0, 0, GAME3.width, GAME3.height);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        countImages += 7;
        initEventsListeners();
        let event = {
            type: 'click'
        }
        num_game = 4;
        texts[21][1] += countClicks;
        texts[21][2] += countSpases;
        texts[21][3] += countArrowRights;
        onCanvasMouseMoveOrKeyDown(event);
    }
}
