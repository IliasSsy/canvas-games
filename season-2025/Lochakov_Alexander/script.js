var canvas = document.createElement("canvas")
document.body.appendChild(canvas)

var GAME = {
    width: 1500,
    height: 700,
    heightwall: 500,
    color: "gray",
}

canvas.width = GAME.width
canvas.height = GAME.height
var canvasContext = canvas.getContext("2d")

var PLAYER1 = {
    x: 50,
    y: 450,
    width: 76,
    heigth: 168,
    color: "blue",
    xSpeed: 10,
    ySpeed: 5,
    health: 100,
    xHealth: 50,
    yHealth: 100,
    meeleAttack: 0.1
}

var PLAYER2 = {
    x: 1375,
    y: 450,
    width: 76,
    heigth: 168,
    color: "red",
    xSpeed: 10,
    ySpeed: 5,
    health: 100,
    xHealth: 1150,
    yHealth: 100,
    meeleAttack: 0.1
}

var KEY1 = {
    up: false,
    down: false,
    left: false,
    right: false,
    x: false,
    c: false,
    v: false
}

var KEY2 = {
    up: false,
    down: false,
    left: false,
    right: false,
    p: false,
    l: false,
    k: false
}

var BULLET1 = {
    color: "cyan",
    x: 0,
    y: 0,
    radius: 25,
    xSpeed: 15,
    countLeft: 0,
    countRight: 0,
    damage: 10,
    splash: 500
}

var BULLET2 = {
    color: "#800808",
    x: 1500,
    y: 0,
    radius: 25,
    xSpeed: 15,
    countLeft: 0,
    countRight: 0,
    damage: 10,
    splash: 500
}

var HEALTH1 = {
    width: 300,
    height: 40
}

var HEALTH2 = {
    width: 300,
    height: 40
}

var COMBO1 = {
    color: "blue",
    x: 50,
    y: 150,
    width: 100,
    height: 10
}

var COMBO2 = {
    color: "red",
    x: 1350,
    y: 150,
    width: 100,
    height: 10
}

var APTECHKA = {
    x: Math.random() * (GAME.width - 200) + 100,
    y: (Math.random() * 200) + 350,
    width: 120,
    height: 94,
    count: 0
}

var STRONGDAMAGE = {
    x: Math.random() * (GAME.width - 200) + 100,
    y: (Math.random() * 200) + 350,
    width: 67,
    height: 113,
    count: 0
}

var STRONGDAMAGELINE1 = {
    color: "orange",
    x: 50,
    y: 180,
    width: 0,
    height: 10
}

var STRONGDAMAGELINE2 = {
    color: "orange",
    x: 1350,
    y: 180,
    width: 0,
    height: 10
}

var STRONGLONGATTACK = {
    x: Math.random() * (GAME.width - 200) + 100,
    y: (Math.random() * 200) + 350,
    width: 67,
    height: 113,
    count: 0
}

var STRONGLONGLINE1 = {
    color: "B22222",
    x: 50,
    y: 210,
    width: 0,
    height: 10
}

var STRONGLONGLINE2 = {
    color: "B22222",
    x: 1350,
    y: 210,
    width: 0,
    height: 10
}

function play() {
    if ((PLAYER1.health > 0) && (PLAYER2.health > 0)) {
        drawFrame()
        requestAnimationFrame(play)
    }
    if (PLAYER2.health <= 0) {
        return printWinPlayer1()
    }
    if (PLAYER1.health <=0) {
        return printWinPlayer2()
    }
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height)
    drawBackground()
    drawPlayer1()
    updatePlayer1()
    drawPlayer2()
    updatePlayer2()
    healthPlayer(PLAYER1, HEALTH1)
    healthPlayer(PLAYER2, HEALTH2)
    comboPlayer(COMBO1)
    comboPlayer(COMBO2)
    drawStrongDamageLine(STRONGDAMAGELINE1)
    drawStrongDamageLine(STRONGDAMAGELINE2)
    drawStrongLongLine(STRONGLONGLINE1)
    drawStrongLongLine(STRONGLONGLINE2)
    updateStrongLongAttack()
    updateStrongDamage1(STRONGDAMAGELINE1, PLAYER1)
    updateStrongDamage1(STRONGDAMAGELINE2, PLAYER2)
    updateStrongLongAttack1(STRONGLONGLINE1, BULLET1)
    updateStrongLongAttack1(STRONGLONGLINE2, BULLET2)
    updateStrongDamage()
    updateAptechka()
    updateCombo(COMBO1)
    updateCombo(COMBO2)
    updateBullet2()
    updateBullet1()
    console.log(APTECHKA.count)
}

function drawBackground() {
    base_image = new Image()
    base_image.src = 'img/backgroundfight.jpg'
    canvasContext.drawImage(base_image, 0, 0)
}

function healing() {
    base_image = new Image()
    base_image.src = 'img/aptechka.png'
    canvasContext.drawImage(base_image, APTECHKA.x, APTECHKA.y)
    canvasContext.strokeStyle = "Black"
    canvasContext.lineWidth = 0.1
    canvasContext.strokeRect(APTECHKA.x, APTECHKA.y, APTECHKA.width, APTECHKA.height)
}

function drawStrongDamage() {
    base_image = new Image()
    base_image.src = 'img/doubledamage.png'
    canvasContext.drawImage(base_image, STRONGDAMAGE.x, STRONGDAMAGE.y)
    canvasContext.strokeStyle = "Black"
    canvasContext.lineWidth = 0.1
    canvasContext.strokeRect(STRONGDAMAGE.x, STRONGDAMAGE.y, STRONGDAMAGE.width, STRONGDAMAGE.height)
}

function drawStrongLongAttack() {
    base_image = new Image()
    base_image.src = 'img/longattack.png'
    canvasContext.drawImage(base_image, STRONGLONGATTACK.x, STRONGLONGATTACK.y)
    canvasContext.strokeStyle = "Black"
    canvasContext.lineWidth = 0.1
    canvasContext.strokeRect(STRONGLONGATTACK.x, STRONGLONGATTACK.y, STRONGLONGATTACK.width, STRONGLONGATTACK.height)
}

function updateAptechka() {
    if (APTECHKA.count < 1) {
        APTECHKA.count += 0.01
    }
    if (APTECHKA.count >= 1) {
        healing()
    }
    clampAptechka()
}

function updateStrongDamage() {
    if (STRONGDAMAGE.count < 1) {
        STRONGDAMAGE.count += 0.011
    }
    if (STRONGDAMAGE.count >= 1) {
        drawStrongDamage()
    }
    clampStrongDamage()
}

function updateStrongLongAttack() {
    if (STRONGLONGATTACK.count < 1) {
        STRONGLONGATTACK.count += 0.009
    }
    if (STRONGLONGATTACK.count >= 1) {
        drawStrongLongAttack()
    }
    clampStrongLongAttack()
}

function comboPlayer(combo) {
    canvasContext.fillStyle = combo.color
    canvasContext.fillRect(combo.x, combo.y, combo.width, combo.height)
    canvasContext.fillStyle = combo.color
    canvasContext.font = "16pt Times New Roman"
    canvasContext.fillText(`COMBO ${combo.width}/100`, combo.x - 10, combo.y + combo.height + 20)
}

function drawPlayer1() {
    base_image = new Image()
    base_image.src = 'img/obiwan.png'
    canvasContext.drawImage(base_image, PLAYER1.x, PLAYER1.y)
    canvasContext.strokeStyle = 'black'
    canvasContext.lineWidth = 0.05
    canvasContext.strokeRect(PLAYER1.x, PLAYER1.y, PLAYER1.width, PLAYER1.heigth)
}

function drawPlayer2() {
    base_image = new Image()
    base_image.src = 'img/darthvader1.png'
    canvasContext.drawImage(base_image, PLAYER2.x, PLAYER2.y)
    canvasContext.strokeStyle = 'black'
    canvasContext.lineWidth = 0.05
    canvasContext.strokeRect(PLAYER2.x, PLAYER2.y, PLAYER2.width, PLAYER2.heigth)
}

function drawBullet1() {
    canvasContext.fillStyle = BULLET1.color
    canvasContext.beginPath()
    canvasContext.arc(BULLET1.x, BULLET1.y, BULLET1.radius, 0, 2 * Math.PI)
    canvasContext.fill()
}

function drawBullet2() {
    canvasContext.fillStyle = BULLET2.color
    canvasContext.beginPath()
    canvasContext.arc(BULLET2.x, BULLET2.y, BULLET2.radius, 0, 2 * Math.PI)
    canvasContext.fill()
}

function drawSaberBlue() {
    base_image = new Image()
    base_image.src = 'img/sabobiwan.png'
    canvasContext.drawImage(base_image, PLAYER1.x + PLAYER1.width / 2 + 10, PLAYER1.y + 35)
}

function drawSaberRed() {
    base_image = new Image()
    base_image.src = 'img/darthsaber.png'
    canvasContext.drawImage(base_image, PLAYER2.x - 88, PLAYER2.y + 65)
}

function drawStrongDamageLine(damage) {
    canvasContext.fillStyle = damage.color
    canvasContext.fillRect(damage.x, damage.y, damage.width, damage.height)
    base_image = new Image()
    base_image.src = 'img/saber.png'
    canvasContext.drawImage(base_image, damage.x + damage.width + 10, damage.y)
}

function drawStrongLongLine(damage) {
    canvasContext.fillStyle = damage.color
    canvasContext.fillRect(damage.x, damage.y, damage.width, damage.height)
    base_image = new Image()
    base_image.src = 'img/mishen.png'
    canvasContext.drawImage(base_image, damage.x + damage.width + 10, damage.y)
}

function updatePlayer1() {
    if (KEY1.up === true) {
        PLAYER1.y -= PLAYER1.ySpeed
    }
    if (KEY1.down === true) {
        PLAYER1.y += PLAYER1.ySpeed
    }
    if (KEY1.left === true) {
        PLAYER1.x -= PLAYER1.xSpeed
    }
    if (KEY1.right === true) {
        PLAYER1.x += PLAYER1.xSpeed
    }
    if (KEY1.x === true) {
        drawSaberBlue()
        if ((Math.abs(PLAYER1.x - PLAYER2.x) <= 85) && (Math.abs(PLAYER1.y - PLAYER2.y) <=20)) {
            PLAYER2.health -= PLAYER1.meeleAttack
            HEALTH2.width -= PLAYER1.meeleAttack * 3
        }
    }
    if (KEY1.c === true) {
        BULLET1.x = PLAYER1.x
        BULLET1.y = (PLAYER1.y + PLAYER1.heigth / 2)
        if (BULLET1.countLeft === 0) {
            BULLET1.countRight = 1
        }
    }
    if (KEY1.v === true) {
        BULLET1.x = PLAYER1.x
        BULLET1.y = (PLAYER1.y + PLAYER1.heigth / 2)
        if (BULLET1.countRight === 0) {
            BULLET1.countLeft = 1
        }
    }
    clampPlayerPosition(PLAYER1)
}

function updatePlayer2() {
    if (KEY2.up === true) {
        PLAYER2.y -= PLAYER2.ySpeed
    }
    if (KEY2.down === true) {
        PLAYER2.y += PLAYER2.ySpeed
    }
    if (KEY2.left === true) {
        PLAYER2.x -= PLAYER2.xSpeed
    }
    if (KEY2.right === true) {
        PLAYER2.x += PLAYER2.xSpeed
    }
    if (KEY2.p === true) {
        drawSaberRed()
        if ((Math.abs(PLAYER1.x - PLAYER2.x) <= 85) && (Math.abs(PLAYER1.y - PLAYER2.y) <=20)) {
            PLAYER1.health -= PLAYER2.meeleAttack
            HEALTH1.width -= PLAYER2.meeleAttack * 3
        }
    }
    if (KEY2.l === true) {
        BULLET2.x = PLAYER2.x
        BULLET2.y = (PLAYER2.y + PLAYER2.heigth / 2)
        if (BULLET2.countRight === 0) {
            BULLET2.countLeft = 1
        }
    }
    if (KEY2.k === true) {
        BULLET2.x = PLAYER2.x
        BULLET2.y = (PLAYER2.y + PLAYER2.heigth / 2)
        if (BULLET2.countLeft === 0) {
            BULLET2.countRight = 1
        }
    }
    clampPlayerPosition(PLAYER2)
}

function updateBullet1() {
    if (BULLET1.countRight === 1) {
        drawBullet1()
        BULLET1.x += BULLET1.xSpeed
        COMBO1.width = 0
    }
    if (BULLET1.countLeft === 1) {
        drawBullet1()
        BULLET1.x -= BULLET1.xSpeed
        COMBO1.width = 0
    }
    clampBulletPosition1()
}

function updateBullet2() {
    if (BULLET2.countLeft === 1) {
        drawBullet2()
        BULLET2.x -= BULLET2.xSpeed
        COMBO2.width = 0
    }
    if (BULLET2.countRight === 1) {
        drawBullet2()
        BULLET2.x += BULLET2.xSpeed
        COMBO2.width = 0
    }
    clampBulletPosition2()
}

function updateCombo(combo) {
    if (combo.width < 100) {
        combo.width += 0.5
    }
}

function updateStrongDamage1(line, player) {
    if (line.width > 0) {
        line.width -= 0.1
        player.meeleAttack = 0.5
    }
    if (line.width <= 0) {
        line.width = 0
        player.meeleAttack = 0.1
    }
}

function updateStrongLongAttack1(line, bullet) {
    if (line.width > 0) {
        line.width -= 0.1
        bullet.damage = 15
    }
    if (line.width <= 0) {
        line.width = 0
        bullet.damage = 10
    }
}

function initEventsListener() {
    window.addEventListener("keydown", onCanvasKeyDown)
    window.addEventListener("keyup", onCanvasKeyUp)
}

function onCanvasKeyDown(event) {
    if (event.key === "ArrowUp") {
        KEY2.up = true
    }
    if (event.key === "ArrowDown") {
        KEY2.down = true
    }
    if (event.key === "ArrowLeft") {
        KEY2.left = true
    } 
    if (event.key === "ArrowRight") {
        KEY2.right = true
    }
    if ((event.key === "w") || (event.key === "ц") || (event.key === "W") || (event.key === "Ц")) {
        KEY1.up = true
    }
    if ((event.key === "s") || (event.key === "ы") || (event.key === "S") || (event.key === "Ы")) {
        KEY1.down = true
    }
    if ((event.key === "a") || (event.key === "ф") || (event.key === "A") || (event.key === "Ф")) {
        KEY1.left = true
    } 
    if ((event.key === "d") || (event.key === "в") || (event.key === "D") || (event.key === "В")) {
        KEY1.right = true
    }
    if ((event.key === "x") || (event.key === "ч") || (event.key === "X") || (event.key === "Ч")) {
        KEY1.x = true
    }
    if ((event.key === "p") || (event.key === "з") || (event.key === "P") || (event.key === "З")) {
        KEY2.p = true
    }
    if (((event.key === "c") || (event.key === "с") || (event.key === "C") || (event.key === "С")) && (COMBO1.width === 100)) {
        KEY1.c = true
    }
    if (((event.key === "l") || (event.key === "д") || (event.key === "L") || (event.key === "Д")) && (COMBO2.width === 100)) {
        KEY2.l = true
    }
    if (((event.key === "v") || (event.key === "м") || (event.key === "V") || (event.key === "М")) && (COMBO1.width === 100)) {
        KEY1.v = true
    }
    if (((event.key === "k") || (event.key === "л") || (event.key === "K") || (event.key === "Л")) && (COMBO2.width === 100)) {
        KEY2.k = true
    }
}

function onCanvasKeyUp(event) {
    if (event.key === "ArrowUp") {
        KEY2.up = false
    }
    if (event.key === "ArrowDown") {
        KEY2.down = false
    }
    if (event.key === "ArrowLeft") {
        KEY2.left = false
    } 
    if (event.key === "ArrowRight") {
        KEY2.right = false
    }
    if ((event.key === "w") || (event.key === "ц") || (event.key === "W") || (event.key === "Ц")) {
        KEY1.up = false
    }
    if ((event.key === "s") || (event.key === "ы") || (event.key === "S") || (event.key === "Ы")) {
        KEY1.down = false
    }
    if ((event.key === "a") || (event.key === "ф") || (event.key === "A") || (event.key === "Ф")) {
        KEY1.left = false
    } 
    if ((event.key === "d") || (event.key === "в") || (event.key === "D") || (event.key === "В")) {
        KEY1.right = false
    }
    if ((event.key === "x") || (event.key === "ч") || (event.key === "X") || (event.key === "Ч")) {
        KEY1.x = false
    }
    if ((event.key === "p") || (event.key === "з") || (event.key === "P") || (event.key === "З")) {
        KEY2.p = false
    }
    if ((event.key === "c") || (event.key === "с") || (event.key === "C") || (event.key === "С")) {
        KEY1.c = false
    }
    if ((event.key === "l") || (event.key === "д") || (event.key === "L") || (event.key === "Д")) {
        KEY2.l = false
    }
    if ((event.key === "v") || (event.key === "м") || (event.key === "V") || (event.key === "М")) {
        KEY1.v = false
    }
    if ((event.key === "k") || (event.key === "л") || (event.key === "K") || (event.key === "Л")) {
        KEY2.k = false
    }
}

function clampPlayerPosition(player) {
    if (player.x < 0) {
        player.x = 0
    } 
    if (player.x + player.width > GAME.width) {
        player.x = GAME.width - player.width
    }
    if (player.y + player.heigth > GAME.height) {
        player.y = GAME.height - player.heigth
    }
    if (player.y + player.heigth < GAME.heightwall) {
        player.y = GAME.heightwall - player.heigth
    }
}

function clampBulletPosition1() {
    if ((BULLET1.x + BULLET1.radius > GAME.width) && (BULLET1.countRight !== 0)){
        BULLET1.countRight = 0
    }
    if ((BULLET1.x + BULLET1.radius >= PLAYER2.x) && (BULLET1.x - BULLET1.radius <= PLAYER2.x + PLAYER2.width) && (BULLET1.y - BULLET1.radius >= PLAYER2.y) && (BULLET1.y + BULLET1.radius <= PLAYER2.y + PLAYER2.heigth) && (BULLET1.countRight !== 0)) {
        BULLET1.countRight = 0
        PLAYER2.health -= BULLET1.damage
        PLAYER2.x += BULLET1.splash
        HEALTH2.width -= BULLET1.damage * 3
    }
    if ((BULLET1.x - BULLET1.radius < 0) && (BULLET1.countLeft !== 0)) {
        BULLET1.countLeft = 0
    }
    if ((BULLET1.x - BULLET1.radius <= PLAYER2.x + PLAYER2.width) && (BULLET1.x + BULLET1.radius >= PLAYER2.x) && (BULLET1.y - BULLET1.radius >= PLAYER2.y) && (BULLET1.y + BULLET1.radius <= PLAYER2.y + PLAYER2.heigth) && (BULLET1.countLeft !== 0)) {
        BULLET1.countLeft = 0
        PLAYER2.health -= BULLET1.damage
        PLAYER2.x -= BULLET1.splash
        HEALTH2.width -= BULLET1.damage * 3
    }
}

function clampBulletPosition2() {
    if ((BULLET2.x - BULLET2.radius < 0) && (BULLET2.countLeft !== 0)) {
        BULLET2.countLeft = 0
    }
    if ((BULLET2.x - BULLET2.radius <= PLAYER1.x + PLAYER1.width) && (BULLET2.x + BULLET2.radius >= PLAYER1.x) && (BULLET2.y - BULLET2.radius >= PLAYER1.y) && (BULLET2.y + BULLET2.radius <= PLAYER1.y + PLAYER1.heigth) && (BULLET2.countLeft !== 0)) {
        BULLET2.countLeft = 0
        PLAYER1.health -= BULLET2.damage
        PLAYER1.x -= BULLET2.splash
        HEALTH1.width -= BULLET2.damage * 3
    }
    if ((BULLET2.x + BULLET2.radius > GAME.width) && (BULLET2.countRight !== 0)) {
        BULLET2.countRight = 0
    }
    if ((BULLET2.x + BULLET2.radius >= PLAYER1.x) && (BULLET2.x - BULLET2.radius <= PLAYER1.x + PLAYER1.width) && (BULLET2.y - BULLET2.radius >= PLAYER1.y) && (BULLET2.y + BULLET2.radius <= PLAYER1.y + PLAYER1.heigth) && (BULLET2.countRight !== 0)) {
        BULLET2.countRight = 0
        PLAYER1.health -= BULLET2.damage
        PLAYER1.x += BULLET2.splash
        HEALTH1.width -= BULLET2.damage * 3
    }
}

function clampAptechka() {
    if ((PLAYER1.x + PLAYER1.width >= APTECHKA.x) && (PLAYER1.x + PLAYER1.width <= APTECHKA.x + APTECHKA.width) && (APTECHKA.y >= PLAYER1.y) && (APTECHKA.y + APTECHKA.height <= PLAYER1.y + PLAYER1.heigth)) {
        APTECHKA.count = 0
        APTECHKA.x = Math.random() * (GAME.width - 200) + 100
        APTECHKA.y = (Math.random() * 200) + 350
        if (PLAYER1.health != 100) {
            PLAYER1.health = 100
            HEALTH1.width = 300
        }
    }
    if ((PLAYER2.x + PLAYER2.width >= APTECHKA.x) && (PLAYER2.x + PLAYER2.width <= APTECHKA.x + APTECHKA.width) && (APTECHKA.y >= PLAYER2.y) && (APTECHKA.y + APTECHKA.height <= PLAYER2.y + PLAYER2.heigth)) {
        APTECHKA.count = 0
        APTECHKA.x = Math.random() * (GAME.width - 200) + 100
        APTECHKA.y = (Math.random() * 200) + 350
        if (PLAYER2.health != 100) {
            PLAYER2.health = 100
            HEALTH2.width = 300
        }
    }
}

function clampStrongDamage() {
    if ((PLAYER1.x + PLAYER1.width >= STRONGDAMAGE.x) && (PLAYER1.x + PLAYER1.width <= STRONGDAMAGE.x + STRONGDAMAGE.width) && (STRONGDAMAGE.y >= PLAYER1.y) && (STRONGDAMAGE.y + STRONGDAMAGE.height <= PLAYER1.y + PLAYER1.heigth)) {
        STRONGDAMAGE.count = 0
        STRONGDAMAGELINE1.width = 100
        STRONGDAMAGE.x = Math.random() * (GAME.width - 200) + 100
        STRONGDAMAGE.y = (Math.random() * 200) + 350
    }
    if ((PLAYER2.x + PLAYER2.width >= STRONGDAMAGE.x) && (PLAYER2.x + PLAYER2.width <= STRONGDAMAGE.x + STRONGDAMAGE.width) && (STRONGDAMAGE.y >= PLAYER2.y) && (STRONGDAMAGE.y + STRONGDAMAGE.height <= PLAYER2.y + PLAYER2.heigth)) {
        STRONGDAMAGE.count = 0
        STRONGDAMAGELINE2.width = 100
        STRONGDAMAGE.x = Math.random() * (GAME.width - 200) + 100
        STRONGDAMAGE.y = (Math.random() * 200) + 350
    }
}

function clampStrongLongAttack() {
    if ((PLAYER1.x + PLAYER1.width >= STRONGLONGATTACK.x) && (PLAYER1.x + PLAYER1.width <= STRONGLONGATTACK.x + STRONGLONGATTACK.width) && (STRONGLONGATTACK.y >= PLAYER1.y) && (STRONGLONGATTACK.y + STRONGLONGATTACK.height <= PLAYER1.y + PLAYER1.heigth)) {
        STRONGLONGATTACK.count = 0
        STRONGLONGLINE1.width = 100
        STRONGLONGATTACK.x = Math.random() * (GAME.width - 200) + 100
        STRONGLONGATTACK.y = (Math.random() * 200) + 350
    }
    if ((PLAYER2.x + PLAYER2.width >= STRONGLONGATTACK.x) && (PLAYER2.x + PLAYER2.width <= STRONGLONGATTACK.x + STRONGLONGATTACK.width) && (STRONGLONGATTACK.y >= PLAYER2.y) && (STRONGLONGATTACK.y + STRONGLONGATTACK.height <= PLAYER2.y + PLAYER2.heigth)) {
        STRONGLONGATTACK.count = 0
        STRONGLONGLINE2.width = 100
        STRONGLONGATTACK.x = Math.random() * (GAME.width - 200) + 100
        STRONGLONGATTACK.y = (Math.random() * 200) + 350
    }
}

function healthPlayer(player, heal) {
    canvasContext.fillStyle = "green"
    canvasContext.font = "32pt Times New Roman"
    canvasContext.fillText(`Health: ${player.health}/100`, player.xHealth, player.yHealth)
    canvasContext.fillStyle = "green"
    canvasContext.fillRect(player.xHealth, player.yHealth, heal.width, heal.height)
}

function printWinPlayer1() {
    drawBackground()
    canvasContext.fillStyle = "Blue"
    canvasContext.font = "52pt Times New Roman"
    canvasContext.fillText("PLAYER 1 WIN", 400, 400)
    base_image1 = new Image()
    base_image1.src = 'img/obiwan.png'
    canvasContext.drawImage(base_image1, 450, 450)
    base_image2 = new Image()
    base_image2.src = 'img/grobik.png'
    canvasContext.drawImage(base_image2, 650, 530)
    requestAnimationFrame(printWinPlayer1)
}

function printWinPlayer2() {
    drawBackground()
    canvasContext.fillStyle = "Red"
    canvasContext.font = "52pt Times New Roman"
    canvasContext.fillText("PLAYER 2 WIN", 400, 400)
    base_image1 = new Image()
    base_image1.src = 'img/darthvader1.png'
    canvasContext.drawImage(base_image1, 450, 450)
    base_image2 = new Image()
    base_image2.src = 'img/grobik.png'
    canvasContext.drawImage(base_image2, 650, 530)
    requestAnimationFrame(printWinPlayer2)
}

initEventsListener()
play()