var GAME = {
    img: new Image(),
    imgIsLoad: false,
    score: 0,
    enemyCount: 25,
    width: 1200,
    height: 600,
    catchRadius: 50,
    HPheight: 5,
    HPcolor: 'red',
    EXPheight: 10,
    EXPcolor: '#5050e5',
    ifLevelUp: false,
    delay: 100,
    tick: 0,
}
var background = [];

var PAUSE = {
    color: "rgb(240, 112, 103, 0.5)",
    ifGameOver: false,
    height: GAME.height,
    width: GAME.width,
}

var UP = {
    width: 80,
    height: 80, 
    y: GAME.height / 2 - 40,
}
var ups = [];

function createUps()
{
    for (var i = 0; i < 6; i++)
    {
        ups.push({
            object: UP,
            img: new Image(),
            imgIsLoad: false,
            x: 235 + 130 * i,
            count: 0,
        })
    }
}

function createBackground(game)
{
    for (var i = 0; i < game.width / 60 + 2; i++)
    {
        for (var j = 0; j < game.height / 60 + 2; j++)
        {
            background.push({
                x: i * 60 - 60,
                y: j * 60 - 60,
                size: 60,
            })
        }
    }
}
function resetBackground()
{
    for (var i = 0; i < background.length; i++)
    {
        if (background[i].x >= GAME.width + 60)
        {
            background.push({
                x: -60,
                y: background[i].y,
                size: 60,
            })
            background.splice(i, 1)
        }
        if (background[i].x <= -120)
        {
            background.push({
                x: GAME.width,
                y: background[i].y,
                size: 60,
            })
            background.splice(i, 1)
        }
        if (background[i].y >= GAME.height + 60)
        {
            background.push({
                y: -60,
                x: background[i].x,
                size: 60,
            })
            background.splice(i, 1)
        }
        if (background[i].y <= -120)
        {
            background.push({
                y: GAME.height,
                x: background[i].x,
                size: 60,
            })
            background.splice(i, 1)
        }
    }
}

var PlAYER = {
    img_R: new Image(),
    imgIsLoad_R: false,
    img_L: new Image(),
    imgIsLoad_L: false,
    width: 40,
    height: 60,
    speed: 2,
    HP: 100,
    levelExp: 10,
    exp: 0,
    x: GAME.width / 2 - 20,
    y: GAME.height / 2 - 30,
}

var right = false;
var left = false;
var up = false;
var down = false;

var BOAR = {
    img_R: new Image(),
    img_L: new Image(),
    imgIsLoad_R: false,
    imgIsLoad_L: false,
    HP: 5,
    count: 0,
    width: 55,
    height: 30,
    xSpeed: 1,
    ySpeed: 0.5,
    hurt: 0.5,
    space: 2,
}
var tick = 0;
var enemys = [];

var ATTACK = {
    img_R: new Image(),
    img_L: new Image(),
    imgIsLoad_R: false,
    imgIsLoad_L: false,
    width: 60,
    height: 100,
    duration: 20,
    ifAttack: true,
    direction: true,
    x: PlAYER.x,
    y: GAME.height / 2 - 50,
}

var EXPERIENCE = {
    img: new Image(),
    imgIsLoad: false,
    speed: 3,
    width: 10,
    height: 15,
}
var experiences = [];

function init()
{
    BOAR.img_R.src = "images/Baton_R.png";
    BOAR.img_R.onload = () => {
        BOAR.imgIsLoad_R = true  
    }
    BOAR.img_L.src = "images/Baton_L.png";
    BOAR.img_L.onload = () => {
        BOAR.imgIsLoad_L = true  
    }
    GAME.img.src = "images/Background.png";
    GAME.img.onload = () => {
        GAME.imgIsLoad = true  
    }
    EXPERIENCE.img.src = "images/experience.png";
    EXPERIENCE.img.onload = () => {
        EXPERIENCE.imgIsLoad = true  
    }
    PlAYER.img_R.src = "images/Knight_R.png";
    PlAYER.img_R.onload = () => {
        PlAYER.imgIsLoad_R = true  
    }
    PlAYER.img_L.src = "images/Knight_L.png";
    PlAYER.img_L.onload = () => {
        PlAYER.imgIsLoad_L = true  
    }
    ATTACK.img_R.src = "images/SwordAttack_R.png";
    ATTACK.img_R.onload = () => {
        ATTACK.imgIsLoad_R = true  
    }
    ATTACK.img_L.src = "images/SwordAttack_L.png";
    ATTACK.img_L.onload = () => {
        ATTACK.imgIsLoad_L = true  
    }
    ups[0].img.src = "images/Attack.png";
    ups[0].img.onload = () => {
        ups[0].imgIsLoad = true  
    }
    ups[1].img.src = "images/Size.png";
    ups[1].img.onload = () => {
        ups[1].imgIsLoad = true  
    }
    ups[2].img.src = "images/Speed.png";
    ups[2].img.onload = () => {
        ups[2].imgIsLoad = true  
    }
    ups[3].img.src = "images/Move.png";
    ups[3].img.onload = () => {
        ups[3].imgIsLoad = true  
    }
    ups[4].img.src = "images/Defence.png";
    ups[4].img.onload = () => {
        ups[4].imgIsLoad = true  
    }
    ups[5].img.src = "images/Radius.png";
    ups[5].img.onload = () => {
        ups[5].imgIsLoad = true  
    }
}

function createEnemys(enemy, game)
{
    if (enemys.length <= GAME.enemyCount)
    {
        enemys.push({ // враги с левой части экрана
            object: enemy,
            x: Math.random() * 100 - 100 -enemy.width,
            y: Math.random() * game.height,
            oneHit: false,
            HP: enemy.HP,
            direction: true,
        });
        enemys.push({ // враги с правой части экрана
            object: enemy,
            x: Math.random() * 100 + game.width,
            y: Math.random() * game.height,
            oneHit: false,
            HP: enemy.HP,
            direction: true,
        });
        enemys.push({ // враги с верхней части экрана
            object: enemy,
            x: Math.random() * game.width,
            y: Math.random() * 100 - 100 -enemy.height,
            oneHit: false,
            HP: enemy.HP,
            direction: true,
        });
        enemys.push({ // враги с нижней части экрана
            object: enemy,
            x: Math.random() * game.width,
            y: Math.random() * 100 + game.height, 
            oneHit: false,
            HP: enemy.HP,
            direction: true,
        });
        
    }    
}

function moveEnemy()
{
    for (var i = 0; i < enemys.length; i++) // движение вправо
    {
        if (enemys[i].x < GAME.width / 2 - enemys[i].object.width / 2 && !PAUSE.ifGameOver && !GAME.ifLevelUp) // движение вправо
        {
            enemys[i].x += enemys[i].object.xSpeed;
            enemys[i].direction = true;
        }
        if (enemys[i].x > GAME.width / 2 - enemys[i].object.width / 2 && !PAUSE.ifGameOver && !GAME.ifLevelUp) // движение влево
        { 
            enemys[i].x -= enemys[i].object.xSpeed;
            enemys[i].direction = false;
        }
        if (enemys[i].y < GAME.height / 2 - enemys[i].object.height / 2 && !PAUSE.ifGameOver && !GAME.ifLevelUp) // движение вниз
        {
            enemys[i].y += enemys[i].object.ySpeed;
        }
        if (enemys[i].y > GAME.height / 2 - enemys[i].object.height / 2 && !PAUSE.ifGameOver && !GAME.ifLevelUp)  // движение вверх
        {
            enemys[i].y -= enemys[i].object.ySpeed;
        }
    }
}

function defeatEnemy(number)
{
    enemys.splice(number, 1);
    createEnemys(BOAR, GAME);
}

function collisionEnemy()
{
    for (var i = 0; i < enemys.length; i++)
    { 
        for (var j = 0; j < enemys.length; j++) // мешающие враги
        {
            var horizontalopCollision = (enemys[j].x <= enemys[i].x && enemys[i].x <= enemys[j].x + enemys[j].object.width) || (enemys[j].x <= enemys[i].x && enemys[i].x + enemys[i].object.width <= enemys[j].x + enemys[j].object.width)
            var verticalCollision = (enemys[j].y <= enemys[i].y && enemys[i].y <= enemys[j].y + enemys[j].object.height) || (enemys[j].y <= enemys[i].y && enemys[i].y + enemys[i].object.height <= enemys[j].y + enemys[j].object.height)
            if (i != j)
            {
                if (horizontalopCollision && enemys[i].y >= enemys[j].y && enemys[i].y <= enemys[j].y + enemys[j].object.height + enemys[j].object.space)
                {
                    enemys[i].y += 1.5 * enemys[i].object.ySpeed;
                    enemys[j].y -= 1.5 * enemys[i].object.ySpeed;
                }
                if (horizontalopCollision && enemys[i].y + enemys[i].object.height >= enemys[j].y - enemys[j].object.space && enemys[i].y + enemys[i].object.height <= enemys[j].y + enemys[j].object.height)
                {
                    enemys[i].y -= 1.5 * enemys[i].object.ySpeed;
                    enemys[j].y += 1.5 * enemys[i].object.ySpeed;
                }
                if (verticalCollision && enemys[i].x >= enemys[j].x  && enemys[i].x <= enemys[j].x + enemys[j].object.width + enemys[j].object.space)
                {
                    enemys[i].x += 1.5 * enemys[i].object.xSpeed;
                    enemys[j].x -= 1.5 * enemys[i].object.xSpeed;
                }
                if (verticalCollision && enemys[i].x + enemys[i].object.width >= enemys[j].x - enemys[j].object.space && enemys[i].x + enemys[i].object.width <= enemys[j].x + enemys[j].object.width)
                {
                    enemys[i].x -= 1.5 * enemys[i].object.xSpeed;
                    enemys[j].x += 1.5 * enemys[i].object.xSpeed;
                }
            }
        }
    }
}

function enemyOut()
{
    for (var i = 0; i < enemys.length; i++)
    { 
        if(enemys[i].x > GAME.width + 200 || enemys[i].x < -200 || enemys[i].y > GAME.height + 200 || enemys[i].y < -200)
        {
            defeatEnemy(i);
        }
    }
}

function collisionAttack(attack)
{
    for (var i = 0; i < enemys.length; i++) // мешающие враги
        {
            var topRight = enemys[i].x + enemys[i].object.width >= attack.x && enemys[i].x + enemys[i].object.width <= attack.x + attack.width && enemys[i].y >= attack.y && enemys[i].y <= attack.y + attack.height;
            var topLeft = enemys[i].x >= attack.x && enemys[i].x <= attack.x + attack.width && enemys[i].y >= attack.y && enemys[i].y <= attack.y + attack.height;
            var bottomRight = enemys[i].x + enemys[i].object.width >= attack.x && enemys[i].x + enemys[i].object.width <= attack.x + attack.width && enemys[i].y + enemys[i].object.height >= attack.y && enemys[i].y  + enemys[i].object.height <= attack.y + attack.height;
            var bottomLeft = enemys[i].x >= attack.x && enemys[i].x <= attack.x + attack.width && enemys[i].y + enemys[i].object.height >= attack.y && enemys[i].y  + enemys[i].object.height <= attack.y + attack.height;
            if ((topRight || topLeft || bottomRight || bottomLeft) && GAME.tick <= attack.duration && !enemys[i].oneHit) // нижняя граница
            {
                enemys[i].HP--;
                enemys[i].oneHit = true;
            }
            if(enemys[i].HP == 0)
            {
                experiences.push({
                    object: EXPERIENCE,
                    x: enemys[i].x + enemys[i].object.width / 2 - EXPERIENCE.width / 2,
                    y: enemys[i].y + enemys[i].object.height / 2 - EXPERIENCE.height / 2,
                });
                defeatEnemy(i);
                GAME.score++;
            }
        }
}

function movePlayer()
{
    for (var i = 0; i < Math.max(enemys.length, experiences.length, background.length); i++)
    {
        if (right && !PAUSE.ifGameOver && !GAME.ifLevelUp)
        {
            if (i < enemys.length)
            {
                enemys[i].x -= PlAYER.speed;
            }
            if (i < experiences.length)
            {
                experiences[i].x -= PlAYER.speed;
            }
            if (i < background.length)
            {
                background[i].x -= PlAYER.speed;
            }
            ATTACK.direction = true;
        }
        if (left && !PAUSE.ifGameOver && !GAME.ifLevelUp)
        {
            if (i < enemys.length)
            {
                enemys[i].x += PlAYER.speed;
            }
            if (i < experiences.length)
            {
                experiences[i].x += PlAYER.speed;
            }
            if (i < background.length)
            {
                background[i].x += PlAYER.speed;
            }
            ATTACK.direction = false;
        }
        if (down && !PAUSE.ifGameOver && !GAME.ifLevelUp)
        {
            if (i < enemys.length)
            {
                enemys[i].y -= PlAYER.speed;
            }
            if (i < experiences.length)
            {
                experiences[i].y -= PlAYER.speed;
            }
            if (i < background.length)
            {
                background[i].y -= PlAYER.speed;
            }
        }
        if (up && !PAUSE.ifGameOver && !GAME.ifLevelUp)
        {
            if (i < enemys.length)
            {
                enemys[i].y += PlAYER.speed;
            }
            if (i < experiences.length)
            {
                experiences[i].y += PlAYER.speed;
            }
            if (i < background.length)
            {
                background[i].y += PlAYER.speed;
            }
        }
    }
}

function catchExperience(player)
{
    for(var i = 0; i < experiences.length; i++)
    {
        if (Math.abs(player.x + player.width / 2 - experiences[i].x - experiences[i].object.width / 2) ** 2 + Math.abs(player.y + player.height / 2 - experiences[i].y - experiences[i].object.height / 2) ** 2 <= GAME.catchRadius ** 2)
        {
            if (experiences[i].x < GAME.width / 2 - experiences[i].object.width / 2) // движение вправо
            {
                experiences[i].x += experiences[i].object.speed;
            }
            if (experiences[i].x > GAME.width / 2 - experiences[i].object.width / 2) // движение влево
            { 
                experiences[i].x -= experiences[i].object.speed;
            }
            if (experiences[i].y < GAME.height / 2 - experiences[i].object.height / 2) // движение вниз
            {
                experiences[i].y += experiences[i].object.speed;
            }
            if (experiences[i].y > GAME.height / 2 - experiences[i].object.height / 2)  // движение вверх
            {
                experiences[i].y -= experiences[i].object.speed;
            }
        }
        if (experiences[i].x + experiences[i].object.width / 2 >= player.x && experiences[i].x + experiences[i].object.width / 2 <= player.x + player.width && experiences[i].y + experiences[i].object.height / 2 >= player.y && experiences[i].y + experiences[i].object.height / 2 <= player.y + player.height)
        {
            player.exp++
            experiences.splice(i, 1);
        }
    }
}

function collisionPlayer(player)
{
    for (var i = 0; i < enemys.length; i++) // мешающие враги
        {
            if (enemys[i].x + enemys[i].object.width / 2 >= player.x && enemys[i].x + enemys[i].object.width / 2 <= player.x + player.width && enemys[i].y + enemys[i].object.height / 2 >= player.y && enemys[i].y + enemys[i].object.height / 2 <= player.y + player.height && !GAME.ifLevelUp)
            {
                player.HP -= enemys[i].object.hurt;
            }
        }
}

function levelUp()
{
    if (PlAYER.exp == PlAYER.levelExp)
    {
        PlAYER.exp = 0;
        PlAYER.levelExp = Math.round(PlAYER.levelExp * 1.15);
        GAME.ifLevelUp = true;
    }
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

function drawBackground(background)
{
    if (GAME.imgIsLoad)
    {
        canvasContext.drawImage(GAME.img, background.x, background.y, background.size, background.size);
    }
}

function drawPlayer(player)
{
    if (ATTACK.direction && player.imgIsLoad_R)
    {
        canvasContext.drawImage(player.img_R, player.x, player.y, player.width, player.height,)
    }
    else if (player.imgIsLoad_L)
    {
        canvasContext.drawImage(player.img_L, player.x, player.y, player.width, player.height,)
    }
    canvasContext.fillStyle = GAME.HPcolor;
    if (player.HP >= 0)
    {
        canvasContext.fillRect(player.x, player.y + player.height, player.width / 100 * player.HP, GAME.HPheight);
    } 
}

function drawEnemy(enemy)
{
    if (enemy.direction && enemy.object.imgIsLoad_R)
    {
        canvasContext.drawImage(enemy.object.img_R, enemy.object.count * enemy.object.width, 0, enemy.object.width, enemy.object.height, enemy.x, enemy.y, enemy.object.width, enemy.object.height,)
    }
    else if (enemy.object.imgIsLoad_L)
    {
        canvasContext.drawImage(enemy.object.img_L, enemy.object.count * enemy.object.width, 0, enemy.object.width, enemy.object.height, enemy.x, enemy.y, enemy.object.width, enemy.object.height,)
    }
}

function animation()
{
    if (!PAUSE.ifGameOver && !GAME.ifLevelUp)
    {
        tick++;
    }
    if (tick == 50)
    {
        BOAR.count++;
        tick = 0;
    }
    if (BOAR.count == 4)
    {
        BOAR.count = 0;
    }
}

function drawAttack(attack)
{
    canvasContext.fillStyle = attack.color;
    if (attack.direction)
    {
        attack.x = GAME.width / 2 + PlAYER.width / 2;
    }
    else
    {
        attack.x = GAME.width / 2 - attack.width - PlAYER.width / 2;
    }
    if (attack.direction && attack.imgIsLoad_R)
    {
        canvasContext.drawImage(attack.img_R, attack.x, attack.y, attack.width, attack.height,)
    }
    else if (attack.imgIsLoad_L)
    {
        canvasContext.drawImage(attack.img_L, attack.x, attack.y, attack.width, attack.height,)
    }
}

function drawExperience(experience)
{
    if (experience.object.imgIsLoad)
    {
        canvasContext.drawImage(experience.object.img, experience.x, experience.y, experience.object.width, experience.object.height);
    }
}

function drawFrame()
{
    canvasContext.clearRect(0, 0, GAME.width, GAME.height)
    canvasContext.fillStyle = "#6abe30";
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
    for (var i = 0; i < background.length; i++)
    {
        drawBackground(background[i]);
    }
    for (var i = 0; i < experiences.length; i++)
    {
        drawExperience(experiences[i]);
    }
    drawPlayer(PlAYER);
    if (GAME.tick <= ATTACK.duration)
    {
        drawAttack(ATTACK);
    }
    else if (GAME.tick > ATTACK.duration + GAME.delay)
    {
        for (var i = 0; i < enemys.length; i++)
        {
            enemys[i].oneHit = false;
        }
        GAME.tick = 0;
    }
    for (var i = 0; i < enemys.length; i++)
    {
        drawEnemy(enemys[i]);
    }
    canvasContext.fillStyle = GAME.EXPcolor;
    canvasContext.fillRect(0, 0, GAME.width / PlAYER.levelExp * PlAYER.exp, GAME.EXPheight);
    if (PAUSE.ifGameOver)
    {
        drawPause(PAUSE);
        canvasContext.font = "22px Verdana";
        canvasContext.fillStyle = "black";
        canvasContext.fillText('GAME OVER', GAME.width / 2 - 70 , GAME.height / 2 - 11)
        canvasContext.fillText('Kills: ' + GAME.score.toString(), GAME.width / 2 - 70 , GAME.height / 2 + 20)
    }
    else if (GAME.ifLevelUp)
    {
        drawPause(PAUSE);
        for (var i = 0; i < 6; i++)
        {
            drawUp(ups[i]);
        }
    }
    else
    {
        GAME.tick++;
    }
}

function drawPause(pause)
{
    canvasContext.fillStyle = pause.color;
    canvasContext.fillRect(0, 0, pause.width, pause.height);
}

function drawUp(up)
{
    if (up.imgIsLoad)
    {
        canvasContext.drawImage(up.img, up.x, up.object.y, up.object.width, up.object.height);
    }
    canvasContext.strokeStyle = "black";
    canvasContext.fillStyle = "#fbc736";
    for(var i = 0; i < up.count; i++)
    {
        canvasContext.fillRect(up.x + 21.5 * i, up.object.y + up.object.height + 10, 15.5, 15.5);
        canvasContext.strokeRect(up.x + 21.5 * i, up.object.y + up.object.height + 10, 15.5, 15.5);
    }
    for(var j = i; j < 4; j++)
    {
        canvasContext.strokeRect(up.x + 21.5 * j, up.object.y + up.object.height + 10, 15.5, 15.5);
    }
}

function gameOver()
{
    if (PlAYER.HP <= 0)
    {
        PAUSE.ifGameOver = true;
    }
}

function update()
{ 
    if (!BOAR.imgIsLoad_L || !BOAR.imgIsLoad_R || !GAME.imgIsLoad)
    {
        init();
    }
    animation();
    resetBackground();
    moveEnemy();
    movePlayer();
    catchExperience(PlAYER);
    collisionAttack(ATTACK);
    collisionPlayer(PlAYER)
    collisionEnemy(); 
    gameOver();
    levelUp();
    enemyOut(); 
}

function play()
{
    drawFrame();
    update();
    requestAnimationFrame(play);
}

function start()
{
    initKeyboardHandlers();
    initMouseHandlers();
    createBackground(GAME);
    createUps(UP);
    setInterval(createEnemys, 2000, BOAR, GAME);
    play();
}

start();

function presedKey(e)
{
    if (e.code == "ArrowRight" || e.code == "KeyD") // движение вправо
    {
        right = true;
    }
    if (e.code == "ArrowLeft" || e.code == "KeyA") // движение влево
    { 
        left = true;
    }
    if (e.code == "ArrowDown" || e.code == "KeyS") // движение вниз
    {
        down = true;
    }
    if (e.code == "ArrowUp" || e.code == "KeyW")  // движение вверх
    {
        up = true;
    } 
}

function unPresedKey(e)
{
    if (e.code == "ArrowRight" || e.code == "KeyD") // движение вправо
    {
        right = false;
    }
    if (e.code == "ArrowLeft" || e.code == "KeyA") // движение влево
    { 
        left = false;
    }
    if (e.code == "ArrowDown" || e.code == "KeyS") // движение вниз
    {
        down = false;
    }
    if (e.code == "ArrowUp" || e.code == "KeyW")  // движение вверх
    {
        up = false;
    } 
}

function mouseClick(e)
{
    for(var i = 0; i < 6; i++)
    {
        if(e.clientX >= ups[i].x && e.clientX <= ups[i].x + ups[i].object.width && e.clientY >= ups[i].object.y && e.clientY <= ups[i].object.y + ups[i].object.height && ups[i].count < 4 && GAME.ifLevelUp)
        {
            switch(i)
            {
                case 0:
                    BOAR.HP--;
                    break;
                case 1:
                    ATTACK.width += 5;
                    ATTACK.height += 5;
                    ATTACK.y -= 2.5;
                    break;
                case 2:
                    GAME.delay -= 15;
                    break;
                case 3:
                     PlAYER.speed += 0.4;
                    break;
                case 4:
                    BOAR.hurt -= 0.1;
                    break;
                case 5:
                    GAME.catchRadius += 10;
                    break;
            }
            GAME.enemyCount += 5;
            PlAYER.HP = 100;
            ups[i].count++;
            GAME.ifLevelUp = false;
        }
    }
}

function initKeyboardHandlers()
{
    document.addEventListener('keydown', presedKey);
    document.addEventListener('keyup', unPresedKey);
}

function initMouseHandlers()
{
    canvas.addEventListener('click', mouseClick);
}