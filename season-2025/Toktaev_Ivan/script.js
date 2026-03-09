const GAME = {
    width: 900,
    height: 900,
    background: '#101747'
}

const maxAmountOfEnemyBullets = 10;
const mediumDistanceBetweenEnemies = 80;
const simpleBulletWidth = 80;
const simpleBulletHeight = 80;
const flankBulletHeight = 30;
const flankBulletWidth = 30;
const minPlayerScore = 0;
const minPlayerHealth = 0;
const healEfficiency = 5;
const amountOfSpawnedRockets = 20;

let playerBullets = [];
let enemyBullets = [];
let rockets = [];

let areAllEnemiesOnField = false;
let isBonusOnField = false;
let isBurstHappened = false;
let areOptionsSetted = false;
let timeOfFlankFireUsing = 0;
let amountOfEnemyBullets = 0;
let burstEnemy = {
    xPosition: 0,
    yPosition: 0,
    serialNumber: 0,
    width: 0,
    height: 0
}

//настраиваемые параметры
let maxPlayerScore = 0;
let maxAmountOfEnemies = 0;
let timeOfUntakenBonusExisting = 0;

let gameState = 'start';


let PLAYER = {
    xPosition: 425,
    yPosition: 750,
    width: 50,
    height: 80,
    bonus: 'none',
    health: 0,
    score: 0
}

let ENEMY = {
    xPosition: 0,
    yPosition: 0,
    serialNumber: 0,
    width: 60,
    height: 60,
    animationTics: 0
}

let PLAYERBULLET = {
    xPosition: 0,
    yPosition: 0,
    speed: 10,
    width: 0,
    height: 0,
    type: ''
}

let ENEMYBULLET = {
    xPosition: 0,
    yPosition: 0,
    speed: 5,
    width: 100,
    height: 40
}

let ENEMYSPRITE = {
    image: new Image(),
    imageIsLoad: false
}

let PLAYERBULLETSPRITE = {
    image: new Image(),
    imageIsLoad: false
}

let ENEMYBULLETSPRITE = {
    image: new Image(),
    imageIsLoad: false
}

let PLAYERSPRITE = {
    image: new Image(),
    imageIsLoad: false
}

let BONUS = {
    xPosition: 0,
    yPosition: 750,
    width: 60,
    height: 60,
    state: 'none'
}

let ROCKET = {
    xPosition: 0,
    yPosition: 1000,
    width: 70,
    height: 100,
    speed: 5,
}

let BONUSSPRITE = {
    image: new Image(),
    imageIsLoad: false
}

let FLANKBULLETSPRITE = {
    image: new Image(),
    imageIsLoad: false
}

let ANIMATEDBURST = {
    image: new Image(),
    imageIsLoad: false,
    width: 80,
    height: 80
}

let ROCKETSPRITE = {
    image: new Image(),
    imageIsLoad: false
}

let HEALSPRITE = {
    image: new Image(),
    imageIsLoad: false
}

let enemies = []
let speedOfEnemyColums = [
    Math.random() + 0.3,
    Math.random() + 0.3,
    Math.random() + 0.3,
    Math.random() + 0.3,
    Math.random() + 0.3,
    Math.random() + 0.3,
    Math.random() + 0.3,
    Math.random() + 0.3,
    Math.random() + 0.3,
    Math.random() + 0.3
]

const canvas = document.getElementById('canvas');
canvas.width = GAME.width;
canvas.height = GAME.height;
const canvasContext = canvas.getContext('2d');

function drawGameField() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function spawnEnemyLine() {
    for (let i = 0; i < 10; i++) {
        ENEMY = {
            xPosition: (i + 1) * mediumDistanceBetweenEnemies,
            yPosition: -100,
            serialNumber: i,
            width: ENEMY.width,
            height: ENEMY.height
        };
        enemies.push(ENEMY);
    }
}

function initSprites() {
    ENEMYSPRITE.image.src = "./assets/enemy.png";
    ENEMYSPRITE.image.onload = () => {
        ENEMYSPRITE.imageIsLoad = true;
    }
    PLAYERBULLETSPRITE.image.src = "./assets/bullet.png";
    PLAYERBULLETSPRITE.image.onload = () => {
        PLAYERBULLETSPRITE.imageIsLoad = true;
    }
    ENEMYBULLETSPRITE.image.src = "./assets/enemy_bullet.png";
    ENEMYBULLETSPRITE.image.onload = () => {
        ENEMYBULLETSPRITE.imageIsLoad = true;
    }
    PLAYERSPRITE.image.src = "./assets/battleship.png";
    PLAYERSPRITE.image.onload = () => {
        PLAYERSPRITE.imageIsLoad = true;
    }

    FLANKBULLETSPRITE.image.src = "./assets/flank_fire_bonus.png";
    FLANKBULLETSPRITE.image.onload = () => {
        FLANKBULLETSPRITE.imageIsLoad = true;
    }

    ROCKETSPRITE.image.src = "./assets/rocket_bonus.png";
    ROCKETSPRITE.image.onload = () => {
        ROCKETSPRITE.imageIsLoad = true;
    }

    HEALSPRITE.image.src = "./assets/heal_bonus.png";
    HEALSPRITE.image.onload = () => {
        HEALSPRITE.imageIsLoad = true;
    }

}

function initBurstAnimation() {
    ANIMATEDBURST.image.src = "./assets/burst_sprite.png";
    ANIMATEDBURST.image.onload = () => {
        ANIMATEDBURST.imageIsLoad = true;
    }
}


function drawPlayer() {
    if (PLAYERSPRITE.imageIsLoad) {
        canvasContext.drawImage(PLAYERSPRITE.image, PLAYER.xPosition, PLAYER.yPosition, PLAYER.width, PLAYER.height)
    }
}

function drawEnemies() {
    enemies.forEach(enemy => {
        if (ENEMYSPRITE.imageIsLoad) {
            canvasContext.drawImage(
                ENEMYSPRITE.image,
                enemy.xPosition,
                enemy.yPosition,
                enemy.width,
                enemy.height
            );
        }
    });
}

function moveEnemies() {
    enemies.forEach(enemy => {
        enemy.yPosition += speedOfEnemyColums[enemy.serialNumber]
        if (enemy.yPosition >= 0) {
            areAllEnemiesOnField = true;
        }
        else {
            areAllEnemiesOnField = false;
        }
    })
}

function movePlayerBullets() {
    playerBullets.forEach(bullet => {
        if (bullet.type === 'simpleBullet') {
            bullet.yPosition -= bullet.speed;
        }
        if (bullet.type === 'rightFlankBullet') {
            bullet.yPosition -= bullet.speed;
            bullet.xPosition += bullet.speed / 2;
        }
        if (bullet.type === 'leftFlankBullet') {
            bullet.yPosition -= bullet.speed;
            bullet.xPosition -= bullet.speed / 2;
        }
    })
}

function drawPlayerBullets() {
    playerBullets.forEach(bullet => {
        if (bullet.type === 'simpleBullet') {
            if (PLAYERBULLETSPRITE.imageIsLoad) {
                canvasContext.drawImage(
                    PLAYERBULLETSPRITE.image,
                    bullet.xPosition,
                    bullet.yPosition,
                    bullet.width,
                    bullet.height
                )
            }
        }
        if (bullet.type === 'rightFlankBullet' || bullet.type === 'leftFlankBullet') {
            if (PLAYERBULLETSPRITE.imageIsLoad) {
                canvasContext.drawImage(
                    FLANKBULLETSPRITE.image,
                    bullet.xPosition + 10,
                    bullet.yPosition,
                    bullet.width,
                    bullet.height
                )
            }
        }

    });
}

function drawEnemyBullets() {
    let shootingEnemy = Math.round(Math.random() * (enemies.length - 1));
    if (amountOfEnemyBullets < maxAmountOfEnemyBullets && enemies[shootingEnemy].yPosition >= 0) {
        ENEMYBULLET = {
            xPosition: enemies[shootingEnemy].xPosition + enemies[shootingEnemy].width / 2,
            yPosition: enemies[shootingEnemy].yPosition + enemies[shootingEnemy].height,
            speed: ENEMYBULLET.speed,
            width: ENEMYBULLET.width,
            height: ENEMYBULLET.height
        }
        enemyBullets.push(ENEMYBULLET);
        amountOfEnemyBullets++;
    }

    enemyBullets.forEach(bullet => {
        canvasContext.drawImage(ENEMYBULLETSPRITE.image, bullet.xPosition, bullet.yPosition, bullet.width, bullet.height);
    })
}

function drawBurstAnimation(spriteElementX, spriteElementY, spriteElementWidth, spriteElementHeight) {
    if (ANIMATEDBURST.imageIsLoad) {
        canvasContext.drawImage(
            ANIMATEDBURST.image,
            spriteElementX,
            spriteElementY,
            spriteElementWidth,
            spriteElementHeight,
            burstEnemy.xPosition,
            burstEnemy.yPosition,
            burstEnemy.width,
            burstEnemy.height
        )
    }
}

function animateBurstSprite() {
    if (isBurstHappened) {
        if (burstEnemy.animationTics >= 5 && burstEnemy.animationTics <= 10) { drawBurstAnimation(0, 0, 120, 110) };
        if (burstEnemy.animationTics >= 10 && burstEnemy.animationTics <= 15) { drawBurstAnimation(120, 0, 120, 110) };
        if (burstEnemy.animationTics >= 15 && burstEnemy.animationTics <= 20) { drawBurstAnimation(250, 0, 220, 160) };
        if (burstEnemy.animationTics >= 20 && burstEnemy.animationTics <= 25) { drawBurstAnimation(470, 0, 230, 160) };
        if (burstEnemy.animationTics >= 25 && burstEnemy.animationTics <= 30) { drawBurstAnimation(700, 0, 240, 220) };
        if (burstEnemy.animationTics >= 30 && burstEnemy.animationTics <= 35) { drawBurstAnimation(940, 0, 200, 190) };
        if (burstEnemy.animationTics > 35) {
            burstEnemy.animationTics = 0;
            isBurstHappened = false;
        }
        burstEnemy.animationTics++;
    }

}


function checkCollision() {
    playerBullets.forEach(bullet => { // столкновение врага со снарядом игрока
        enemies.forEach(enemy => {
            if (bullet.yPosition <= enemy.yPosition + enemy.height &&
                bullet.yPosition >= enemy.yPosition &&
                bullet.xPosition + bullet.width / 2 >= enemy.xPosition &&
                bullet.xPosition + bullet.width / 2 <= enemy.xPosition + enemy.width
            ) {
                playerBullets = playerBullets.filter((filteredBullet) => filteredBullet !== bullet);
                enemies = enemies.filter((filteredEnemy) => filteredEnemy !== enemy);

                burstEnemy.xPosition = enemy.xPosition;
                burstEnemy.yPosition = enemy.yPosition;
                burstEnemy.width = enemy.width;
                burstEnemy.height = enemy.height;
                burstEnemy.animationTics = 0;

                isBurstHappened = true;

                PLAYER.score += 10;


            }
        })
    })

    rockets.forEach(rocket => { // столкновение врага с ракетой
        enemies.forEach(enemy => {
            if (rocket.yPosition <= enemy.yPosition + enemy.height &&
                rocket.yPosition >= enemy.yPosition &&
                rocket.xPosition + rocket.width / 2 >= enemy.xPosition &&
                rocket.xPosition + rocket.width / 2 <= enemy.xPosition + enemy.width
            ) {
                rockets = rockets.filter((filteredRocket) => filteredRocket !== rocket);
                enemies = enemies.filter((filteredEnemy) => filteredEnemy !== enemy);

                burstEnemy.xPosition = enemy.xPosition;
                burstEnemy.yPosition = enemy.yPosition;
                burstEnemy.width = enemy.width;
                burstEnemy.height = enemy.height;

                PLAYER.score += 10;

                isBurstHappened = true;

            }
        })
    })


    enemyBullets.forEach(bullet => { //столкновение вражеского снаряда с игроком
        if (bullet.yPosition >= PLAYER.yPosition &&
            bullet.xPosition + bullet.width / 2 >= PLAYER.xPosition &&
            bullet.xPosition + bullet.width / 2 <= PLAYER.xPosition + PLAYER.width
        ) {
            enemyBullets = enemyBullets.filter((filteredBullet) => filteredBullet !== bullet);
            amountOfEnemyBullets--;
            PLAYER.health--;
        }

        if (bullet.yPosition >= GAME.height) { //выход вражеского снаряда за границы экрана
            enemyBullets = enemyBullets.filter((filteredBullet) => filteredBullet !== bullet);
            amountOfEnemyBullets--;
        }
    })

    if (PLAYER.xPosition <= BONUS.xPosition + BONUS.width / 2 &&
        PLAYER.xPosition + PLAYER.width >= BONUS.xPosition + BONUS.width / 2) { // столкновение игрока с бонусом
        if (BONUS.state === 'flank fire') {
            timeOfFlankFireUsing = 35;
            PLAYER.bonus = 'flankFire';
        }
        if (BONUS.state === 'rocket attack') {
            timeOfFlankFireUsing = 0;
            PLAYER.bonus = 'rocketAttack';
        }
        if (BONUS.state === 'heal') {
            PLAYER.bonus = 'heal';
        }
        BONUS.state = 'none';

    }

    enemies.forEach(enemy => {
        if (enemy.yPosition + enemy.height >= PLAYER.yPosition && // столкновение врага с игроком
            enemy.xPosition + enemy.width / 2 >= PLAYER.xPosition &&
            enemy.xPosition + enemy.width / 2 <= PLAYER.xPosition + PLAYER.width
        ) {
            enemies = enemies.filter((filteredEnemy) => filteredEnemy !== enemy);
            PLAYER.health--;
        }

        if (enemy.yPosition >= GAME.height) { // выход врага за границы экрана
            enemies = enemies.filter((filteredEnemy) => filteredEnemy !== enemy);
        }
    })
}

function moveEnemyBullets() {
    enemyBullets.forEach(bullet => {
        bullet.yPosition += bullet.speed;
    })
}

function drawBonus() {
    if (!isBonusOnField) {
        setTimeout(() => {
            let bonusType = Math.ceil(Math.random() * 3);
            BONUS.xPosition = Math.random() * GAME.width;

            if (bonusType === 1) {
                BONUS.state = 'flank fire';
                BONUSSPRITE.image.src = "./assets/flank_fire_bonus.png";
            }
            if (bonusType === 2) {
                BONUS.state = 'rocket attack';
                BONUSSPRITE.image.src = "./assets/rocket_bonus.png";
            }
            if (bonusType === 3) {
                BONUS.state = 'heal';
                BONUSSPRITE.image.src = "./assets/heal_bonus.png";
            } 

            setTimeout(() => {
                BONUS.state = 'none';
                isBonusOnField = false;
            }, timeOfUntakenBonusExisting);
        }, timeOfUntakenBonusExisting);
        isBonusOnField = true;
    }


    BONUSSPRITE.image.onload = () => {
        BONUSSPRITE.imageIsLoad = true;
    }

    if (BONUS.state !== 'none' && BONUSSPRITE.imageIsLoad) {
        canvasContext.drawImage(BONUSSPRITE.image, BONUS.xPosition, BONUS.yPosition, BONUS.width, BONUS.height);
    }
}

function spawnRockets() {
    for (let i = 0; i < amountOfSpawnedRockets; i++) {
        ROCKET = {
            xPosition: Math.random() * (GAME.width - ROCKET.width),
            yPosition: ROCKET.yPosition,
            width: ROCKET.width,
            height: ROCKET.height,
            speed: ROCKET.speed
        };
        rockets.push({
            xPosition: Math.random() * GAME.width,
            yPosition: ROCKET.yPosition,
            width: ROCKET.width,
            height: ROCKET.height,
            speed: ROCKET.speed
        });
    }

}

function drawRockets() {
    rockets.forEach((rocket) => {
        if (ROCKETSPRITE.imageIsLoad) {
            canvasContext.drawImage(
                ROCKETSPRITE.image,
                rocket.xPosition,
                rocket.yPosition,
                rocket.width,
                rocket.height
            );
        }
    })
}

function moveRockets() {
    rockets.forEach((rocket) => {
        rocket.yPosition -= rocket.speed;
    })
}

function drawTextParameters() {
    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "lightblue";
    canvasContext.fillText(PLAYER.score + ' SCORES', 20, 40);
    canvasContext.fillText(PLAYER.health + ' LIVES', 20, 80);
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawGameField();
    drawPlayer();
    if (enemies.length < 10 || (enemies.length < maxAmountOfEnemies && areAllEnemiesOnField)) {
        spawnEnemyLine();
    }
    drawBonus();
    drawPlayerBullets();
    movePlayerBullets();
    drawEnemies();
    moveEnemies();
    drawEnemyBullets();
    moveEnemyBullets();
    if (PLAYER.bonus === 'rocketAttack') {
        spawnRockets();
        PLAYER.bonus = 'none';
    }
    if (PLAYER.bonus === 'heal') {
        console.log('!!!')
        PLAYER.health += healEfficiency;
        PLAYER.bonus = 'none';
    }
    drawRockets();
    moveRockets();
    drawTextParameters();
    checkCollision();
    animateBurstSprite();
}

function keyBoardEvents(key) {
    if ((key === 'd' || key === 'D') && PLAYER.xPosition + PLAYER.width <= GAME.width) {
        PLAYER.xPosition += 15;
    }
    if ((key === 'a' || key === 'A') && PLAYER.xPosition >= 0) {
        PLAYER.xPosition -= 15;
    }
    if (key === 'r' || key === 'R') {

        areOptionsSetted = false;

        document.getElementById('option_health').value = '';
        document.getElementById('option_score').value = '';
        document.getElementById('option_enemies').value = '';
        document.getElementById('option_time_interval').value = '';

        let successMessage = document.getElementById('success_message');
        let errorMessage = document.getElementById('error_message');     

        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');

        let optionsContainer = document.getElementById('options_container');
        optionsContainer.classList.remove('hidden')

        gameState = 'start';
    }
    if (key === ' ') {
        PLAYERBULLET = {
            xPosition: PLAYER.xPosition - 15,
            yPosition: PLAYER.yPosition - simpleBulletHeight,
            width: simpleBulletWidth,
            height: simpleBulletHeight,
            speed: PLAYERBULLET.speed,
            type: 'simpleBullet'
        }
        playerBullets.push(PLAYERBULLET);

        if (PLAYER.bonus === 'flankFire') {

            PLAYERBULLET = {
                xPosition: PLAYER.xPosition,
                yPosition: PLAYER.yPosition - flankBulletHeight,
                width: flankBulletWidth,
                height: flankBulletHeight,
                speed: PLAYERBULLET.speed,
                type: 'rightFlankBullet'
            }
            playerBullets.push(PLAYERBULLET);

            PLAYERBULLET = {
                xPosition: PLAYER.xPosition,
                yPosition: PLAYER.yPosition - flankBulletHeight,
                width: flankBulletWidth,
                height: flankBulletHeight,
                speed: PLAYERBULLET.speed,
                type: 'leftFlankBullet'
            }
            playerBullets.push(PLAYERBULLET);

            if (timeOfFlankFireUsing === 0) {
                PLAYER.bonus = 'none';
            }
            timeOfFlankFireUsing--;
        }
    }
}

function initEventListeners() {
    const gameField = document.getElementById('canvas')
    const submitButton = document.getElementById('submin_button')

    window.addEventListener('keydown', (event) => {
        keyBoardEvents(event.key);
    });

    gameField.addEventListener('click', () => {
        if (gameState === 'start' && areOptionsSetted) {
            let optionsContainer = document.getElementById('options_container');        
            optionsContainer.classList.add('hidden');
            gameState = 'active';
        }
    })
 
    submitButton.addEventListener('click', () => {
        let playerHealthField = document.getElementById('option_health');
        let playerScoreField = document.getElementById('option_score');
        let enemiesAmountField = document.getElementById('option_enemies');
        let timeIntervalField = document.getElementById('option_time_interval');
        let successMessage = document.getElementById('success_message');
        let errorMessage = document.getElementById('error_message');

        if (parseInt(playerHealthField.value) > 0 &&
            parseInt(playerScoreField.value) > 0 &&
            parseInt(enemiesAmountField.value) > 0 &&
            parseInt(timeIntervalField.value) > 0
        ) {
            PLAYER.health = parseInt(playerHealthField.value);
            maxPlayerScore = parseInt(playerScoreField.value);
            maxAmountOfEnemies = parseInt(enemiesAmountField.value);
            timeOfUntakenBonusExisting = parseInt(timeIntervalField.value)

            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');

            areOptionsSetted = true;
        }
        else {
            successMessage.classList.add('hidden');
            errorMessage.classList.remove('hidden');

            areOptionsSetted = false;
        }
    })

}

function gameStart() {
    let startGameField = {
        image: new Image(),
    }

    startGameField.image.src = "./assets/start_window.png";
    startGameField.image.onload = () => {
        canvasContext.drawImage(startGameField.image, 0, 0, GAME.width, GAME.height)
        canvasContext.font = "64px Arial";
        canvasContext.fillStyle = "lightblue";
        canvasContext.fillText("CLICK ON FIELD", 200, 400);
        canvasContext.fillText("TO START", 290, 480);
    }
}

function gameOver() {
    let defeatGameField = {
        image: new Image(),
    }

    defeatGameField.image.src = "./assets/defeat_window.avif";
    defeatGameField.image.onload = () => {
        canvasContext.drawImage(defeatGameField.image, 0, 0, GAME.width, GAME.height);
        canvasContext.font = "64px Arial";
        canvasContext.fillStyle = "red";
        canvasContext.fillText("GAME OVER", 250, 400);
        canvasContext.fillText("PRESS R TO RESTART", 110, 480);
    }
}

function gameVictory() {
    let defeatGameField = {
        image: new Image(),
    }

    defeatGameField.image.src = "./assets/victory_window.jpg";
    defeatGameField.image.onload = () => {
        canvasContext.drawImage(defeatGameField.image, 0, 0, GAME.width, GAME.height);
        canvasContext.font = "64px Arial";
        canvasContext.fillStyle = "lightblue";
        canvasContext.fillText("VICTORY", 310, 400);
        canvasContext.fillText("PRESS R TO RESTART", 110, 480);
    }
} 

function play() {
    if (gameState === 'start') {
        gameStart();
    }
    if (gameState === 'active') {
        drawFrame();
        if (PLAYER.health === minPlayerHealth) {
            PLAYER.score = minPlayerScore;
            PLAYER.health = minPlayerHealth;
            gameState = 'defeat';
            enemyBullets = [];
            playerBullets = [];
            enemies = [];
        }
        console.log(PLAYER.score, maxPlayerScore)
        if (PLAYER.score === maxPlayerScore) {
            PLAYER.score = minPlayerScore;
            PLAYER.health = minPlayerHealth;
            gameState = 'victory';
            enemyBullets = [];
            playerBullets = [];
            enemies = [];
        }
    }
    if (gameState === 'defeat') {
        gameOver();
    }
    if (gameState === 'victory') {
        gameVictory();
    }
    requestAnimationFrame(play);
}

initBurstAnimation();
initSprites();
initEventListeners();

play();