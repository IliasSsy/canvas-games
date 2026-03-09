var GAME = {
    width: window.innerWidth - 16,
    height: window.innerHeight - 16,
    gameOver: false,
    money: 150,
    level: 1,
    time: 0,
    coefficientMoney: 0.934,
    pause: false,
}

var canvas = document.createElement("canvas")
document.body.appendChild(canvas)
canvas.width = GAME.width
canvas.height = GAME.height
var canvasContext = canvas.getContext("2d")

window.addEventListener("contextmenu", e => e.preventDefault())

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function drawBackground() {
    //canvasContext.drawImage(backgroundImg, 0, 0, 736, 518, 0, 0, GAME.width, GAME.height)
    canvasContext.fillStyle = "White"
    canvasContext.fillRect(0, 0, GAME.width, GAME.height)
}

var ENEMY = []
var GUN = []
var BULLET = []
var CENTRE = {
    color: "Aqua",
    maxHealth: 1400,
    health: 1400,
    size: 30
}

var RECORD = {
    level: 1,
    time: 0,
}

var speedTime = 1
var timeTime = 0

function drawBullet() {
    BULLET.forEach(function (bullet) {
        canvasContext.fillStyle = bullet.color
        canvasContext.beginPath()
        canvasContext.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI)
        canvasContext.fill()
    })
}

function updateBullet() {
    BULLET.forEach(function (bullet) {
        bullet.x += bullet.xSpeed
        bullet.y += bullet.ySpeed
        if (bullet.x < 0 || bullet.x > GAME.width || bullet.y < 0 || bullet.y > GAME.height) {
            BULLET.splice(BULLET.indexOf(bullet), 1)
        }
        else {
            var resultLocate = locateEntity(ENEMY, bullet, "radius", bullet.radius)
            var nearestEnemy = resultLocate.nearest
            if (nearestEnemy) {
                BULLET.splice(BULLET.indexOf(bullet), 1)
                nearestEnemy.health -= bullet.damage
                if (nearestEnemy.health <= 0) {
                    ENEMY.splice(ENEMY.indexOf(nearestEnemy), 1)
                    GAME.money += Math.ceil(nearestEnemy.reward * GAME.coefficientMoney ** GAME.level)
                }
            }
        }
    })
}

function drawGun() {
    GUN.forEach(function (gun) {
        //canvasContext.fillStyle = "Black"
        //canvasContext.beginPath()
        //canvasContext.fillRect(gun.x - gun.size / 2 - 1, gun.y - gun.size / 2 - 1, gun.size + 2, gun.size + 2)
        canvasContext.fillStyle = gun.color
        canvasContext.beginPath()
        canvasContext.fillRect(gun.x - gun.size / 2, gun.y - gun.size / 2, gun.size, gun.size)
        canvasContext.fill()
        var occupancy = gun.health / gun.maxHealth
        drawHealthBar(gun.x, gun.y - gun.size / 2 - 9, occupancy, gun.size / 2 + 7)
    })
}

function updateGun() {
    GUN.forEach(function (gun) {
        if (gun.recharge == 0) {
            var resultLocate = locateEntity(ENEMY, gun, gun.radius)
            var nearestEnemy = resultLocate.nearest
            if (nearestEnemy) {
                var speeds = speedCalculator(gun.x, gun.y, nearestEnemy.x, nearestEnemy.y, gun.speed)
                var xSpeed = speeds[0]
                var ySpeed = speeds[1]
                BULLET.push({
                    color: gun.bulletColor,
                    x: gun.x,
                    y: gun.y,
                    xSpeed: xSpeed,
                    ySpeed: ySpeed,
                    radius: gun.bulletRadius,
                    damage: gun.damage,
                })
                gun.recharge = gun.maxRecharge
            }
        }
        else {
            gun.recharge -= 1
        }
    })
}

window.addEventListener("mousedown", spawnGun)
function spawnGun(event) {
    var resultLocate = locateEntity(GUN, { x: event.clientX - 15, y: event.clientY - 15 }, "size", 5)
    if ((((GAME.width / 2) - event.clientX + 15) ** 2 + ((GAME.height / 2) - event.clientY + 15) ** 2) ** 0.5 <= CENTRE.size || resultLocate.minDistance <= 40) { }
    else {
        if (event.buttons === 1 && GAME.money >= 50 && !event.shiftKey) {
            GAME.money -= 50
            GUN.push({
                color: "Gray",
                x: event.clientX - 10,
                y: event.clientY - 10,
                radius: 400,
                maxRecharge: 20,
                recharge: 0,
                maxHealth: 150,
                health: 150,
                size: 20,
                damage: 20,
                speed: 25,
                bulletColor: "Black",
                bulletRadius: 4,
            })
        }
        if (event.buttons === 2 && GAME.money >= 25 && !event.shiftKey) {
            GAME.money -= 25
            GUN.push({
                color: "Sienna",
                x: event.clientX - 10,
                y: event.clientY - 10,
                maxRecharge: Infinity,
                recharge: Infinity,
                maxHealth: 600,
                health: 600,
                size: 20,
            })
        }
        if (event.buttons === 1 && GAME.money >= 250 && event.shiftKey) {
            GAME.money -= 250
            GUN.push({
                color: "DimGray",
                x: event.clientX - 15,
                y: event.clientY - 15,
                radius: 800,
                maxRecharge: 90,
                recharge: 0,
                maxHealth: 300,
                health: 300,
                size: 30,
                damage: 200,
                speed: 25,
                bulletColor: "DarkRed",
                bulletRadius: 6,
            })
        }
        if (event.buttons === 2 && GAME.money >= 150 && event.shiftKey) {
            GAME.money -= 150
            GUN.push({
                color: "SaddleBrown",
                x: event.clientX - 15,
                y: event.clientY - 15,
                maxRecharge: Infinity,
                recharge: Infinity,
                maxHealth: 2200,
                health: 2200,
                size: 30,
            })
        }
    }
}

window.addEventListener("mousedown", deleteGun)
function deleteGun(event) {
    var resultLocate = locateEntity(GUN, { x: event.clientX - 7.5, y: event.clientY - 7.5 }, "size", 5)
    console.log(resultLocate)
    if (event.buttons === 4 && resultLocate.minDistance <= 10) {
        GUN.splice(GUN.indexOf(resultLocate.nearest), 1)
    }
}

function drawEnemy() {
    ENEMY.forEach(function (enemy) {
        canvasContext.fillStyle = enemy.color
        canvasContext.beginPath()
        canvasContext.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI)
        canvasContext.fill()
        var occupancy = enemy.health / enemy.maxHealth
        drawHealthBar(enemy.x, enemy.y - enemy.radius - 8, occupancy, enemy.radius + 6)
    })
}

function updateEnemy() {
    ENEMY.forEach(function (enemy) {
        if ((((GAME.width / 2) - enemy.x) ** 2 + ((GAME.height / 2) - enemy.y) ** 2) ** 0.5 <= CENTRE.size) {
            CENTRE.health -= enemy.damage
            if (CENTRE.health <= 0) {
                GAME.gameOver = true
            }
        }
        else {
            var resultLocate = locateEntity(GUN, enemy, "size")
            var nearestGun = resultLocate.nearest
            if (nearestGun) {
                nearestGun.health -= enemy.damage
                if (nearestGun.health <= 0) {
                    GUN.splice(GUN.indexOf(nearestGun), 1)
                }
            }
            else {
                enemy.x += enemy.xSpeed
                enemy.y += enemy.ySpeed
            }
        }
    })
}

function spawnEnemy(color, speed, radius, health, damage, reward) {
    var side = getRandomInt(1, 4)
    if (side === 1) {
        var x = getRandomInt(0, GAME.width)
        var y = 0
    }
    if (side === 2) {
        var x = getRandomInt(0, GAME.width)
        var y = GAME.height
    }
    if (side === 3) {
        var x = 0
        var y = getRandomInt(0, GAME.height)
    }
    if (side === 4) {
        var x = GAME.width
        var y = getRandomInt(0, GAME.height)
    }
    var speeds = speedCalculator(x, y, GAME.width / 2, GAME.height / 2, speed)
    var xSpeed = speeds[0]
    var ySpeed = speeds[1]
    ENEMY.push({
        color: color,
        x: x,
        y: y,
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        radius: radius,
        maxHealth: health,
        health: health,
        damage: damage,
        reward: reward,
    })
}

function speedCalculator(x1, y1, x2, y2, speed) {
    var from = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5 / speed
    var xSpeed = (x2 - x1) / from
    var ySpeed = (y2 - y1) / from
    return [xSpeed, ySpeed]
}

function locateEntity(list, entity, minRequiredDistance, minRequiredDistance2 = 0) {
    if (typeof (minRequiredDistance) === "string") {
        var nearest = false
        var minDistance = 10 ** 6
        list.forEach(function (enemy) {
            var distance = ((entity.x - enemy.x) ** 2 + (entity.y - enemy.y) ** 2) ** 0.5
            if (distance < enemy[minRequiredDistance] + minRequiredDistance2 && distance < minDistance) {
                minDistance = distance
                nearest = enemy
            }
        })
        return { nearest: nearest, minDistance: minDistance }
    }
    else {
        var nearest = false
        var minDistance = 10 ** 6
        list.forEach(function (enemy) {
            var distance = ((entity.x - enemy.x) ** 2 + (entity.y - enemy.y) ** 2) ** 0.5
            if (distance < minRequiredDistance + minRequiredDistance2 && distance < minDistance) {
                minDistance = distance
                nearest = enemy
            }
        })
        return { nearest: nearest, minDistance: minDistance }
    }
}

function updateLevel() {
    if ((GAME.time + 1) % (30 * 60) == 0) {
        GAME.level += 1
    }
    var i = Math.floor(GAME.level ** 2 / (32 ** 2))
    while (i > 0) {
        spawnEnemy("Green", 1, 10, 100, 1.2, 3)
        i -= 1
    }
    if (getRandomInt(1, 32 ** 2) <= GAME.level ** 2 % (32 ** 2)) {
        spawnEnemy("Green", 1, 10, 100, 1.2, 3)
    }
    var i = Math.floor(GAME.level ** 2 / (64 ** 2))
    while (i > 0) {
        spawnEnemy("HotPink", 5, 9, 70, 2.5, 6)
        i -= 1
    }
    if (getRandomInt(1, 64 ** 2) <= GAME.level ** 2 % (64 ** 2)) {
        spawnEnemy("HotPink", 5, 9, 70, 2.5, 6)
    }
    var i = Math.floor(GAME.level ** 2 / (128 ** 2))
    while (i > 0) {
        spawnEnemy("Red", 0.45, 20, 1200, 2.5, 40)
        i -= 1
    }
    if (getRandomInt(1, 128 ** 2) <= GAME.level ** 2 % (128 ** 2)) {
        spawnEnemy("Red", 0.45, 20, 1200, 2.5, 40)
    }
    var i = Math.floor(GAME.level ** 2 / (256 ** 2))
    while (i > 0) {
        spawnEnemy("Orange", 1, 14, 1200, 4, 140)
        i -= 1
    }
    if (getRandomInt(1, 256 ** 2) <= GAME.level ** 2 % (256 ** 2)) {
        spawnEnemy("Orange", 1, 14, 1200, 4, 140)
    }
    var i = Math.floor(GAME.level ** 2 / (512 ** 2))
    while (i > 0) {
        spawnEnemy("Purple", 0.34, 38, 8500, 15, 600)
        i -= 1
    }
    if (getRandomInt(1, 512 ** 2) <= GAME.level ** 2 % (512 ** 2)) {
        spawnEnemy("Purple", 0.34, 38, 8500, 15, 600)
    }
}

function drawHealthBar(x, y, occupancy, width) {
    occupancy *= (width * 2)
    canvasContext.fillStyle = "Black"
    canvasContext.beginPath()
    canvasContext.fillRect(x - (width + 1), y - 1, width * 2 + 2, 7)
    canvasContext.fill()
    canvasContext.fillStyle = "Red"
    canvasContext.beginPath()
    canvasContext.fillRect(x - width, y, width * 2, 5)
    canvasContext.fill()
    canvasContext.fillStyle = "Green"
    canvasContext.beginPath()
    canvasContext.fillRect(x - width, y, occupancy, 5)
    canvasContext.fill()
}

function drawCenter() {
    var centerX = GAME.width / 2 - CENTRE.size / 2
    var centerY = GAME.height / 2 - CENTRE.size / 2
    canvasContext.fillStyle = "Black"
    canvasContext.beginPath()
    canvasContext.fillRect(centerX - 1, centerY - 1, CENTRE.size + 2, CENTRE.size + 2)
    canvasContext.fillStyle = CENTRE.color
    canvasContext.beginPath()
    canvasContext.fillRect(centerX, centerY, CENTRE.size, CENTRE.size)
    var occupancy = CENTRE.health / CENTRE.maxHealth
    drawHealthBar(centerX + CENTRE.size / 2, centerY - 12, occupancy, 23)
}

function drawText(color, font, textAlign, textBaseline, text, x, y) {
    canvasContext.fillStyle = color
    canvasContext.font = font
    canvasContext.textAlign = textAlign
    canvasContext.textBaseline = textBaseline
    canvasContext.fillText(text, x, y)
}

function drawGameOver() {
    drawBackground()
    GAME.pause = false
    RECORD.level = Math.max(GAME.level, RECORD.level)
    RECORD.time = Math.max(Math.floor(GAME.time / 60), Math.floor(RECORD.time))
    drawText("Black", "160px Arial", "center", "middle", "GAME OVER", GAME.width / 2, GAME.height / 2)
    drawText("Black", "64px Arial", "center", "middle", "Дожил до " + String(GAME.level) + " уровня", GAME.width / 2, GAME.height / 2 + 100)
    drawText("Black", "48px serif", "center", "middle", "Время жизни:" + String(Math.floor(GAME.time / 60)), GAME.width / 2, GAME.height - 50)
    drawText("Black", "48px serif", "right", "middle", "Рекорд:", GAME.width - 50, 30)
    drawText("Black", "48px serif", "right", "middle", "Уровень: " + String(RECORD.level), GAME.width - 50, 80)
    drawText("Black", "48px serif", "right", "middle", "Время: " + String(RECORD.time), GAME.width - 50, 130)
    drawText("Black", "36px serif", "center", "middle", "Нажмите R для перезапуска", GAME.width / 2, 30)
}

function drawStats() {
    drawText("Black", "48px serif", "right", "bottom", "Баланс:" + String(GAME.money), GAME.width - 50, GAME.height - 20)
    textDimensions = canvasContext.measureText("Баланс:" + String(GAME.money)).width
    drawText("Black", "48px serif", "right", "bottom", "Время:" + String(Math.floor(GAME.time / 60)), GAME.width - 60 - textDimensions, GAME.height - 20)
    textDimensions += canvasContext.measureText("Время:" + String(Math.floor(GAME.time / 60))).width
    drawText("Black", "48px serif", "right", "bottom", "Уровень:" + String(GAME.level), GAME.width - 70 - textDimensions, GAME.height - 20)
    textDimensions += canvasContext.measureText("Уровень:" + String(GAME.level)).width
    drawText("Black", "48px serif", "right", "bottom", "Ускорение: x" + String(speedTime), GAME.width - 80 - textDimensions, GAME.height - 20)
}

function drawManagement() {
    canvasContext.fillStyle = "Black"
    canvasContext.font = "24px serif"
    canvasContext.textAlign = "left"
    canvasContext.textBaseline = "bottom"
    canvasContext.fillText("СКМ - удалить пушку", 0, GAME.height - 20)
    canvasContext.fillText("< - замедлить время", 0, GAME.height - 40)
    canvasContext.fillText("> - ускорить время", 0, GAME.height - 60)
    canvasContext.fillText("Shift + ПКМ - поставить улучшенную стену (150)", 0, GAME.height - 80)
    canvasContext.fillText("Shift + ЛКМ - поставить улучшенную пушку (250)", 0, GAME.height - 100)
    canvasContext.fillText("ПКМ - поставить стену (25)", 0, GAME.height - 120)
    canvasContext.fillText("ЛКМ - поставить пушку (50)", 0, GAME.height - 140)
}

window.addEventListener("keydown", pause)
function pause(event) {
    if (event.key === "Escape") {
        GAME.pause = !GAME.pause
    }
}

function drawPause() {
    canvasContext.fillStyle = "Black"
    canvasContext.font = "160px Arial"
    canvasContext.textAlign = "center"
    canvasContext.textBaseline = "middle"
    canvasContext.fillText("ПАУЗА", GAME.width / 2, GAME.height / 2)
}

window.addEventListener("keydown", reloadGame)
function reloadGame(event) {
    if ((event.key === "r" || event.key === "R" || event.key === "к" || event.key === "К") && GAME.gameOver === true) {
        GAME.width = window.innerWidth - 16
        GAME.height = window.innerHeight - 16
        GAME.gameOver = false
        GAME.money = 150
        GAME.level = 1
        GAME.time = 0
        canvas.width = GAME.width
        canvas.height = GAME.height
        CENTRE.health = CENTRE.maxHealth
        ENEMY.splice(0, 10 ** 6)
        GUN.splice(0, 10 ** 6)
        BULLET.splice(0, 10 ** 6)
    }
}

window.addEventListener("keydown", speedingUpTime)
function speedingUpTime(event) {
    if (event.key === "." || event.key === ">" || event.key === "ю" || event.key === "Ю") {
        speedTime = Math.min(speedTime * 2, 2 ** 5)
    }
    if (event.key === "," || event.key === "<" || event.key === "б" || event.key === "Б") {
        speedTime = Math.max(speedTime / 2, 2 ** -5)
    }
}

function drawFrame() {
    drawBackground()
    drawCenter()
    drawGun()
    drawBullet()
    drawEnemy()
    drawStats()
    drawManagement()
}

function updateAll() {
    updateBullet()
    updateEnemy()
    updateGun()
    updateLevel()
}

function play() {
    if (GAME.gameOver) {
        drawGameOver()
    }
    if (GAME.pause) {
        drawPause()
    }
    if (!GAME.gameOver && !GAME.pause) {
        timeTime += speedTime
        while (timeTime >= 1) {
            timeTime -= 1
            updateAll()
            GAME.time += 1
        }
        drawFrame()
    }
    requestAnimationFrame(play)
}


//backgroundImg = new Image()
//backgroundImg.src = "./background.png"

play()

//Рекорд
//32
//954