var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = 1500;
canvas.height = 900;

class Animation {
    constructor(skin, image, maxCount) {
        this.img = new Image();
        this.maxCount = maxCount
        this.imgIsLoaded = false
        this.isPlaying = false
        this.count = 0
        this.tick = 0

        this.img.src = "./assets//" + skin + "//" + image;

        this.img.onload = () => {
            this.imgIsLoaded = true
        }
    }

    drawAnimation(x, y, isAttack, Cancelable, spriteSize, imgSize) {
        this.isPlaying = true
        if (this.imgIsLoaded) {
            if (this.isPlaying) {
                context.drawImage(this.img, this.count * spriteSize, 0, spriteSize, spriteSize, x - imgSize / 2, y - imgSize / 2, imgSize, imgSize);
                this.tick++;
                if (this.tick === 6) {
                    this.count++;
                    this.tick = 0;
                }
                if (this.count === this.maxCount) {
                    this.count = 0;
                    if (Cancelable) {
                        this.isPlaying = false;
                    }
                    if (isAttack) {
                        GAME.isAttack = false;
                    }
                }
            }
        }
    }
    isActive() {
        return this.isPlaying
    }


    stop() {
        this.isPlaying = false;
    }
}

class Entity {
    constructor(x, y, skin, level, maxHP) {
        this.maxHP = maxHP;
        this.level = level;
        this.x = x;
        this.y = y;
        this.hp = maxHP
        this.money = 0
        this.attack01Right = new Animation(skin, "Attack01_Right.png", 5);
        this.attack02Right = new Animation(skin, "Attack02_Right.png", 5);
        this.attack03Right = new Animation(skin, "Attack03_Right.png", 8);
        this.deathRight = new Animation(skin, "Death_Right.png", 3);
        this.hurtRight = new Animation(skin, "Hurt_Right.png", 3);
        this.idleRight = new Animation(skin, "Idle_Right.png", 5);
        this.walkRight = new Animation(skin, "Walk_Right.png", 7);
        this.attack01Left = new Animation(skin, "Attack01_Left.png", 5);
        this.attack02Left = new Animation(skin, "Attack02_Left.png", 5);
        this.attack03Left = new Animation(skin, "Attack03_Left.png", 8);
        this.deathLeft = new Animation(skin, "Death_Left.png", 3);
        this.hurtLeft = new Animation(skin, "Hurt_Left.png", 3);
        this.idleLeft = new Animation(skin, "Idle_Left.png", 5);
        this.walkLeft = new Animation(skin, "Walk_Left.png", 7);
    }

    isNotIdle() {
        return this.attack01Left.isPlaying || this.attack01Right.isPlaying || this.attack02Left.isPlaying || this.attack02Right.isPlaying ||
            this.attack03Left.isPlaying || this.attack03Right.isPlaying || this.deathLeft.isPlaying || this.deathRight.isPlaying ||
            this.hurtLeft.isPlaying || this.hurtRight.isPlaying;
    }
}

class Level {
    constructor(levelBack, holes, startX, startY) {
        this.levelBack = new Image();
        this.holes = holes;
        this.startX = startX;
        this.startY = startY;
        this.levelBack.src = "./assets/" + levelBack
    }
}

class LootBoxe {
    constructor(x, y, hp, skin) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.skin = skin;

        this.img = new Image();
        this.img.src = './assets/' + skin + '/' + 'box_stay.png'

        this.breakAnimation = new Animation(skin, "box.png", 3);
    }
}

class fight {
    constructor(x, y, mobX, mobY, width, height, entit, player, rightSide) {
        this.x = x
        this.y = y
        this.mobX = mobX
        this.mobY = mobY
        this.width = width
        this.height = height
        this.entity = entit
        this.rightSide = rightSide
        this.enable = false
        this.isActive = true
        this.player = player
        this.isAttack = true

        this.animPlayer = 0
        this.animMob = 0
    }

    update() {

        if(this.enable) {

            updateTimingBar();

            if (timingBar.wasClicked) {
                if (this.isAttack) {
                    this.isAttack = false
                    this.entity.hp = this.entity.hp - timingBar.damageMultiplier

                    this.animPlayer = getRandom(1, 3)

                    if (this.animPlayer === 1) {
                        if (this.player.x > this.mobX) {
                            this.player.attack01Left.isPlaying = true
                        } else {
                            this.player.attack01Right.isPlaying = true
                        }
                    } else if (this.animPlayer === 2) {
                        if (this.player.x > this.mobX) {
                            this.player.attack02Left.isPlaying = true
                        } else {
                            this.player.attack02Right.isPlaying = true
                        }
                    } else if (this.animPlayer === 3) {
                        if (this.player.x > this.mobX) {
                            this.player.attack03Left.isPlaying = true
                        } else {
                            this.player.attack03Right.isPlaying = true
                        }
                    }

                    timingBar.wasClicked = false
                    if (this.entity.hp > 0) {
                        if (this.player.x > this.mobX) {
                            this.entity.hurtRight.isPlaying = true
                        } else {
                            this.entity.hurtLeft.isPlaying = true
                        }
                        timingBar.isActive = true
                    } else {
                        setTimeout(() => {
                            this.isActive = false
                            this.enable = false
                            this.player.money += 70
                            stopTimingBar();
                        }, 1000)
                    }
                } else {
                    this.isAttack = true
                    this.player.hp = this.player.hp + timingBar.damageMultiplier - GAME.mobsDamage

                    this.animMob = getRandom(1, 2)

                    if (this.animMob === 1) {
                        if (this.player.x > this.mobX) {
                            this.entity.attack01Right.isPlaying = true
                        } else {
                            this.entity.attack01Left.isPlaying = true
                        }
                    } else if (this.animMob === 2) {
                        if (this.player.x > this.mobX) {
                            this.entity.attack02Right.isPlaying = true
                        } else {
                            this.entity.attack02Left.isPlaying = true
                        }
                    }

                    timingBar.wasClicked = false
                    if (this.player.hp > 0) {
                        if (this.player.x > this.mobX) {
                            this.player.hurtLeft.isPlaying = true
                        } else {
                            this.player.hurtRight.isPlaying = true
                        }
                        timingBar.isActive = true
                    } else {
                        this.isActive = false
                        this.enable = false
                        if (this.player.x > this.mobX) {
                            this.player.deathLeft.drawAnimation(this.mobX, this.mobY, true, true, 300, GAME.unitSize)
                        } else {
                            this.player.deathRight.drawAnimation(this.mobX, this.mobY, false, true, 300, GAME.unitSize)
                        }
                    }

                    this.player.hp = this.player.hp - timingBar.enemyDamage
                    timingBar.wasClicked = false
                    if (this.player.hp > 0) {
                        timingBar.isActive = true
                    } else {

                    }
                }
            }
        }

        if (!this.entity.isNotIdle()) {
            if (this.player.x > this.mobX) {
                this.entity.idleRight.drawAnimation(this.mobX, this.mobY, false, false, 300, GAME.unitSize)
            } else {
                this.entity.idleLeft.drawAnimation(this.mobX, this.mobY, false, false, 300, GAME.unitSize)
            }
        } else {
            if (this.entity.attack01Left.isPlaying) {
                this.entity.attack01Left.drawAnimation(this.mobX, this.mobY, true, true, 300, GAME.unitSize)
            }
            else if (this.entity.attack01Right.isPlaying) {
                this.entity.attack01Right.drawAnimation(this.mobX, this.mobY, true, true, 300, GAME.unitSize)
            }
            else if (this.entity.attack02Left.isPlaying) {
                this.entity.attack02Left.drawAnimation(this.mobX, this.mobY, true, true, 300, GAME.unitSize)
            }
            else if (this.entity.attack02Right.isPlaying) {
                this.entity.attack02Right.drawAnimation(this.mobX, this.mobY, true, true, 300, GAME.unitSize)
            }
            else if (this.entity.deathLeft.isPlaying) {
                this.entity.deathLeft.drawAnimation(this.mobX, this.mobY, false, true, 300, GAME.unitSize)
            }
            else if (this.entity.deathRight.isPlaying) {
                this.entity.deathRight.drawAnimation(this.mobX, this.mobY, false, true, 300, GAME.unitSize)
            }
            else if (this.entity.hurtLeft.isPlaying) {
                this.entity.hurtLeft.drawAnimation(this.mobX, this.mobY, false, true, 300, GAME.unitSize)
            }
            else if (this.entity.hurtRight.isPlaying) {
                this.entity.hurtRight.drawAnimation(this.mobX, this.mobY, false, true, 300, GAME.unitSize)
            }
        }
        if (this.enable) {
            if (!this.player.isNotIdle()) {
                if (this.player.x > this.mobX) {
                    this.player.idleLeft.drawAnimation(this.player.x, this.player.y, false, false, 300, GAME.unitSize)
                } else {
                    this.player.idleRight.drawAnimation(this.player.x, this.player.y, false, false, 300, GAME.unitSize)
                }
            } else {
                if (this.player.attack01Left.isPlaying) {
                    this.player.attack01Left.drawAnimation(this.player.x, this.player.y, true, true, 300, GAME.unitSize)
                }
                else if (this.player.attack01Right.isPlaying) {
                    this.player.attack01Right.drawAnimation(this.player.x, this.player.y, true, true, 300, GAME.unitSize)
                }
                else if (this.player.attack02Left.isPlaying) {
                    this.player.attack02Left.drawAnimation(this.player.x, this.player.y, true, true, 300, GAME.unitSize)
                }
                else if (this.player.attack02Right.isPlaying) {
                    this.player.attack02Right.drawAnimation(this.player.x, this.player.y, true, true, 300, GAME.unitSize)
                }
                else if (this.player.attack03Left.isPlaying) {
                    this.player.attack03Left.drawAnimation(this.player.x, this.player.y, true, true, 300, GAME.unitSize)
                }
                else if (this.player.attack03Right.isPlaying) {
                    this.player.attack03Right.drawAnimation(this.player.x, this.player.y, true, true, 300, GAME.unitSize)
                }
                else if (this.player.deathLeft.isPlaying) {
                    this.player.deathLeft.drawAnimation(this.player.x, this.player.y, true, true, 300, GAME.unitSize)
                }
                else if (this.player.deathRight.isPlaying) {
                    this.player.deathRight.drawAnimation(this.player.x, this.player.y, true, true, 300, GAME.unitSize)
                }
                else if (this.player.hurtLeft.isPlaying) {
                    this.player.hurtLeft.drawAnimation(this.player.x, this.player.y, false, true, 300, GAME.unitSize)
                }
                else if (this.player.hurtRight.isPlaying) {
                    this.player.hurtRight.drawAnimation(this.player.x, this.player.y, false, true, 300, GAME.unitSize)
                }
            }
        }
        
    }

    startFight() {
        if (this.isActive) {
            if (player.x > this.x && player.x < this.x + this.width &&
                player.y > this.y && player.y < this.y + this.height) {
                this.enable = true;
                if (!timingBar.isActive) {
                    timingBar.x = this.x
                    timingBar.progress = this.x
                    timingBar.y = this.y - 50
                    timingBar.isActive = true
                }
            }
        }
    }
}

var lootBoxes = [
    new LootBoxe(200, 300, 10, "mini_box_1")
]

var GAME = {
    xDirection: 0,
    yDirection: 0,
    unitSize: 300,
    isMove: false,
    isAttack: false,
    isRight: true,
    playerWidth: 15,
    playerHeight: 20,
    mobsDamage: 20,
    isEnabled: true
}

var PRESSED_KEYS = {
    up: false,
    left: false,
    down: false,
    right: false
}

var HP_BAR = {
    0: new Image(),
    1: new Image(),
    2: new Image(),
    3: new Image(),
    4: new Image(),
    5: new Image(),
    6: new Image(),
    7: new Image(),
    8: new Image(),
    9: new Image(),
    10: new Image(),
    11: new Image()
}

var HOLES = [
    { x: 0, y: 0, width: 110, height: 900 },
    { x: 0, y: 0, width: 1500, height: 110 },
    { x: 110, y: 350, width: 65, height: 240 },
    { x: 0, y: 900, width: 1500, height: 90 },
    { x: 300, y: 728, width: 260, height: 125 },
    { x: 325, y: 100, width: 235, height: 100 },
    { x: 836, y: 100, width: 140, height: 105 },
    { x: 960, y: 100, width: 170, height: 70 },
    { x: 1095, y: 150, width: 100, height: 270 },
    { x: 835, y: 278, width: 143, height: 600 },
    { x: 960, y: 310, width: 500, height: 220 },
    { x: 745, y: 408, width: 170, height: 144 },
    { x: 232, y: 340, width: 100, height: 252 },
    { x: 325, y: 280, width: 235, height: 315 },
    { x: 295, y: 560, width: 265, height: 90 },
    { x: 540, y: 407, width: 115, height: 145 },
    { x: 110, y: 790, width: 800, height: 100 }
];

var level = new Level("level01.png", HOLES, 700, 290);

var player = new Entity(700, 290, "soldier", level, 100);

var fights = [
    new fight(350, 200, 450, 250, 220, 100, new Entity(200, 300, 'orc', level, 10), player),
    new fight(850, 210, 940, 250, 100, 200, new Entity(0, 0, 'orc', level, 15), player),
    new fight(330,630,440,700,220, 200, new Entity(0,0,'orc',level, 25), player,true)
]

var timingBar = {
    x: 0,
    y: 0,
    width: 250,
    height: 25,
    progress: 0,
    direction: 2,
    centerZone: { start: 120, end: 180 },
    isActive: false,
    wasClicked: false,
    damageMultiplier: 1,
    enemyDamage: 1
};

var lootBoxes = [
    new LootBoxe(200, 300, 10, 'mini_box_1'),
    new LootBoxe(250,200, 10, 'mini_chest'),
    new LootBoxe(140, 710, 10, 'mini_box_2'),
    new LootBoxe(1080, 220, 10, 'mini_box_2'),
    new LootBoxe(990,300,10,'mini_chest'),
    new LootBoxe(820,170,10,'mini_box_1')
]

function initBarImages() {
    HP_BAR[0].src = "./assets/hp_bar/hp_bar_00.png"
    HP_BAR[1].src = "./assets/hp_bar/hp_bar_01.png"
    HP_BAR[2].src = "./assets/hp_bar/hp_bar_02.png"
    HP_BAR[3].src = "./assets/hp_bar/hp_bar_03.png"
    HP_BAR[4].src = "./assets/hp_bar/hp_bar_04.png"
    HP_BAR[5].src = "./assets/hp_bar/hp_bar_05.png"
    HP_BAR[6].src = "./assets/hp_bar/hp_bar_06.png"
    HP_BAR[7].src = "./assets/hp_bar/hp_bar_07.png"
    HP_BAR[8].src = "./assets/hp_bar/hp_bar_08.png"
    HP_BAR[9].src = "./assets/heal_potion.png"
    HP_BAR[10].src = "./assets/coin/coin_1.png"
    HP_BAR[11].src = "./assets/end_frame.png"
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkSideCollision(sideX, sideY, hole) {
    if (sideX > hole.x &&
        sideX < hole.x + hole.width &&
        sideY > hole.y &&
        sideY < hole.y + hole.height) {
        return true
    }
}

function checkCollision(x, y) {
    ans = false
    var rightSideX = x + GAME.playerWidth;
    var leftSideX = x - GAME.playerWidth;
    var upSideY = y + GAME.playerHeight;
    var downSideY = y - GAME.playerHeight;
    HOLES.forEach(hole => {
        if (checkSideCollision(rightSideX, upSideY, hole) ||
            checkSideCollision(rightSideX, downSideY, hole) ||
            checkSideCollision(leftSideX, upSideY, hole) ||
            checkSideCollision(leftSideX, downSideY, hole)) {
            ans = true
        }
    })
    return ans;
}

function onMouseClick(event) {
    if (event.clientX > 1250 && event.clientX < 1350 && event.clientY > 150 && event.clientY < 250) {
        if (player.money >= 50) {
            player.money -= 50
            player.hp += 20
            if (player.hp > player.maxHP) {
                player.hp = player.maxHP
            }
        }
    }
    else if (event.button == 0 && !isFighting()) {
        attackBoxes();
        GAME.isAttack = true
    } else if (event.button == 0 && timingBar.isActive) {
        stopTimingBar()
        timingBar.wasClicked = true
    }
}

function onKeyDown(event) {
    if (event.key == 'ArrowLeft' && GAME.xDirection != -2) {
        GAME.xDirection -= 2;
        PRESSED_KEYS.left = true;
    } else if (event.key == 'ArrowRight' && GAME.xDirection !== 2) {
        GAME.xDirection += 2;
        PRESSED_KEYS.right = true;
    } else if (event.key == 'ArrowDown' && GAME.yDirection !== 2) {
        GAME.yDirection += 2;
        PRESSED_KEYS.down = true;
    } else if (event.key == 'ArrowUp' && GAME.yDirection !== -2) {
        GAME.yDirection -= 2;
        PRESSED_KEYS.up = true;
    }
}

function onKeyUp(event) {
    if (event.key == 'ArrowLeft') {
        GAME.xDirection = 0;
        PRESSED_KEYS.left = false;
    }
    if (event.key == 'ArrowRight') {
        GAME.xDirection = 0;
        PRESSED_KEYS.right = false;
    }
    if (event.key == 'ArrowDown') {
        GAME.yDirection = 0;
        PRESSED_KEYS.down = false;
    }
    if (event.key == 'ArrowUp') {
        GAME.yDirection = 0;
        PRESSED_KEYS.up = false;
    }
}

function onMouseMove(event) {
    if (!GAME.isAttack && !isFighting()) {
        if (event.clientX > player.x) {
            GAME.isRight = true;
        } else {
            GAME.isRight = false;
        }
    }
}

function initEventListener() {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('mousedown', onMouseClick)
}

initEventListener();

function endGame() {
    if (player.hp <= 0) {
        GAME.isEnabled = false;
        context.drawImage(HP_BAR[11],0,0,1500,900)
    } else {
        ans = true
        fights.forEach(fight => {
            if (fight.isActive) {
                ans = false
            }
        })
        if (ans) {
            setTimeout(() =>{GAME.isEnabled = false;
            context.drawImage(HP_BAR[11],0,0,1500,900)},2000)
        }
    }
}

function drawBackground() {
    context.drawImage(level.levelBack, 0, 0);
}

function drawTimingBar() {
    if (!timingBar.isActive) return;

    context.fillStyle = "white";
    context.fillRect(timingBar.x, timingBar.y, timingBar.width, timingBar.height);
}

function updateTimingBar() {
    if (timingBar.isActive) {
        drawTimingBar();
        if (timingBar.progress >= timingBar.x + timingBar.width) {
            timingBar.direction *= -1
        }
        if (timingBar.progress < timingBar.x) {
            timingBar.direction *= -1
        }

        timingBar.progress += timingBar.direction

        context.fillStyle = 'red'

        context.fillRect(timingBar.progress, timingBar.y, 5, timingBar.height)
    }
}


function startTimingBar() {
    timingBar.isActive = true;
    timingBar.progress = 0;
    timingBar.direction = 1;
}

function stopTimingBar() {
    timingBar.isActive = false;

    if (timingBar.progress <= timingBar.x + timingBar.width / 10) {
        timingBar.damageMultiplier = 0
    } else if (timingBar.progress <= timingBar.x + 2 * timingBar.width / 10) {
        timingBar.damageMultiplier = 1
    } else if (timingBar.progress <= timingBar.x + 3 * timingBar.width / 10) {
        timingBar.damageMultiplier = 2
    } else if (timingBar.progress <= timingBar.x + 4 * timingBar.width / 10) {
        timingBar.damageMultiplier = 3
    } else if (timingBar.progress <= timingBar.x + 5 * timingBar.width / 10) {
        timingBar.damageMultiplier = 4
    } else if (timingBar.progress <= timingBar.x + 6 * timingBar.width / 10) {
        timingBar.damageMultiplier = 4
    } else if (timingBar.progress <= timingBar.x + 7 * timingBar.width / 10) {
        timingBar.damageMultiplier = 3
    } else if (timingBar.progress <= timingBar.x + 8 * timingBar.width / 10) {
        timingBar.damageMultiplier = 2
    } else if (timingBar.progress <= timingBar.x + 9 * timingBar.width / 10) {
        timingBar.damageMultiplier = 1
    } else if (timingBar.progress <= timingBar.x + timingBar.width) {
        timingBar.damageMultiplier = 0
    }
}

function updatePlayer() {
    if (!GAME.isAttack && !isFighting()) {
        if (!checkCollision(player.x + GAME.xDirection, player.y + GAME.yDirection)) {
            player.x += GAME.xDirection;
            player.y += GAME.yDirection;
        }
    }
}

initBarImages();

function updateHpBar() {
    context.drawImage(HP_BAR[9], 1250, 150, 100, 100)
    context.drawImage(HP_BAR[10], 1250, 250, 32, 32)
    context.fillStyle = 'gold'
    context.font = '16px Arial'
    context.fillText(player.money, 1300, 270)
    var hpSection = player.maxHP / 8
    if (player.hp === 0) {
        context.drawImage(HP_BAR[0], 1150, 100, 100, 200);
    } else if (player.hp < hpSection) {
        context.drawImage(HP_BAR[1], 1150, 100, 100, 200);
    } else if (player.hp < 2 * hpSection) {
        context.drawImage(HP_BAR[2], 1150, 100, 100, 200);
    } else if (player.hp < 3 * hpSection) {
        context.drawImage(HP_BAR[3], 1150, 100, 100, 200);
    } else if (player.hp < 4 * hpSection) {
        context.drawImage(HP_BAR[4], 1150, 100, 100, 200);
    } else if (player.hp < 5 * hpSection) {
        context.drawImage(HP_BAR[5], 1150, 100, 100, 200);
    } else if (player.hp < 6 * hpSection) {
        context.drawImage(HP_BAR[6], 1150, 100, 100, 200);
    } else if (player.hp < 7 * hpSection) {
        context.drawImage(HP_BAR[7], 1150, 100, 100, 200);
    } else if (player.hp <= 8 * hpSection) {
        context.drawImage(HP_BAR[8], 1150, 100, 100, 200);
    }
}

function updateBoxes() {
    lootBoxes.forEach(lootBoxe => {
        if (lootBoxe.breakAnimation.isPlaying) {
            lootBoxe.breakAnimation.drawAnimation(lootBoxe.x, lootBoxe.y, true, 16, 50)
        } else {
            context.drawImage(lootBoxe.img, lootBoxe.x - 25, lootBoxe.y - 25, 50, 50)
        }
    })
}

function updateFights() {
    fights.forEach(fight => {
        if (fight.isActive) {
            fight.update();
        }
        fight.startFight();
    })
}

function isFighting() {
    ans = false
    fights.forEach(fight => {
        if (fight.enable) {
            ans = true
        }
    })
    return ans
}

function attackBoxes() {
    if (GAME.isRight) {
        x = player.x + 10
        y = player.y - 30
    } else {
        x = player.x - 40
        y = player.y - 30
    }
    width = 30
    height = 60

    lootBoxes.forEach(lootBox => {
        if (lootBox.x > x &&
            lootBox.x < x + width &&
            lootBox.y > y &&
            lootBox.y < y + height) {
            lootBox.breakAnimation.drawAnimation(lootBox.x, lootBox.y, true, 16, 50)
            lootBoxes = lootBoxes.filter(loot => loot !== lootBox)
            player.money += getRandom(20,30)
        }
    })
}


function drawFrame() {
    drawBackground();
    updateHpBar();
    updateBoxes();
    updateFights();
    updateTimingBar()
    updatePlayer();
    if (!isFighting()) {
        if (!GAME.isAttack) {
            if (GAME.isRight) {
                if (PRESSED_KEYS.down || PRESSED_KEYS.left || PRESSED_KEYS.up || PRESSED_KEYS.right) {
                    player.walkRight.drawAnimation(player.x, player.y, false, false, 300, GAME.unitSize);
                } else {
                    player.idleRight.drawAnimation(player.x, player.y, false, false, 300, GAME.unitSize);
                }
            } else {
                if (PRESSED_KEYS.down || PRESSED_KEYS.left || PRESSED_KEYS.up || PRESSED_KEYS.right) {
                    player.walkLeft.drawAnimation(player.x, player.y, false, false, 300, GAME.unitSize);
                } else {
                    player.idleLeft.drawAnimation(player.x, player.y, false, false, 300, GAME.unitSize);
                }
            }
        } else {
            if (GAME.isRight) {
                player.attack01Right.drawAnimation(player.x, player.y, true, true, 300, GAME.unitSize)
            } else {
                player.attack01Left.drawAnimation(player.x, player.y, true, true, 300, GAME.unitSize);
            }
        }
    }
}

function play() {
    drawFrame();

    endGame();  

    if (GAME.isEnabled) {
        requestAnimationFrame(play);
    }
}

setTimeout(() => {
    play()
}, 3000)

