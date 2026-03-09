// Конфигурация игры
const GAME = {
    width: window.innerWidth,
    height: window.innerHeight,
    gravity: 0.5,
    maxJumpHeight: 140,
    spriteScale: 2,
    roundTime: 99
}

// Переменные для таймера и состояния игры
let gameTime = GAME.roundTime
let gameTimer = null
let gameStarted = false
let gameOver = false

// Спрайты - проверь что пути правильные!
const SPRITES = {
    player1: {
        idle: 'img/evil_eye/idle.jpg',
        walk: 'img/evil_eye/walk.jpg',
        jump: 'img/evil_eye/jump.jpg',
        sit: 'img/evil_eye/sit.jpg',
        weakHand: 'img/evil_eye/weak_hand.jpg',
        strongHand: 'img/evil_eye/strong_hand.jpg',
        weakLeg: 'img/evil_eye/weak_leg.jpg', 
        strongLeg: 'img/evil_eye/strong_leg.jpg',
        block_up: 'img/evil_eye/block_up.jpg',
        block_down: 'img/evil_eye/block_down.jpg',
        stun: 'img/evil_eye/stun.jpg'
    },
    player2: {
        idle: 'img/okarun/idle.jpg',
        walk: 'img/okarun/walk.jpg',
        jump: 'img/okarun/jump.jpg',
        sit: 'img/okarun/sit.jpg',
        weakHand: 'img/okarun/weak_hand.jpg',
        strongHand: 'img/okarun/strong_hand.jpg',
        weakLeg: 'img/okarun/weak_leg.jpg',
        strongLeg: 'img/okarun/strong_leg.jpg',
        block_up: 'img/okarun/block_up.jpg',
        block_down: 'img/okarun/block_down.jpg',
        stun: 'img/okarun/stun.jpg'
    }
}

// Загрузчик спрайтов с улучшенной обработкой ошибок
class SpriteLoader {
    constructor() {
        this.images = {}
        this.loaded = 0
        this.total = 0
        this.isLoaded = false
        this.errors = []
    }

    load(sprites, onComplete) {
        this.total = 0
        this.loaded = 0
        this.errors = []
        
        for (const [character, animations] of Object.entries(sprites)) {
            this.images[character] = {}
            for (const [animation, url] of Object.entries(animations)) {
                this.total++
                const img = new Image()
                img.onload = () => {
                    this.loaded++
                    console.log(`✅ Загружен: ${character}.${animation}`)
                    if (this.loaded === this.total) {
                        this.isLoaded = true
                        if (this.errors.length > 0) {
                            console.warn('Есть ошибки загрузки:', this.errors)
                        }
                        onComplete()
                    }
                }
                img.onerror = () => {
                    this.loaded++
                    this.errors.push(`${character}.${animation}: ${url}`)
                    console.error(`❌ Ошибка загрузки: ${character}.${animation} - ${url}`)
                    if (this.loaded === this.total) {
                        this.isLoaded = true
                        console.warn('Есть ошибки загрузки:', this.errors)
                        onComplete()
                    }
                }
                img.src = url
                this.images[character][animation] = img
            }
        }
        
        if (this.total === 0) {
            this.isLoaded = true
            onComplete()
        }
    }

    getSprite(character, animation) {
        const sprite = this.images[character]?.[animation]
        if (!sprite) {
            console.warn(`Спрайт не найден: ${character}.${animation}`)
        }
        return sprite
    }
}

const spriteLoader = new SpriteLoader()

let firstFighter, secondFighter
let canvas, cntx

// Функция запуска таймера
function startGameTimer() {
    if (gameTimer) {
        clearInterval(gameTimer)
    }
    
    gameTime = GAME.roundTime
    gameStarted = true
    gameOver = false
    
    gameTimer = setInterval(() => {
        gameTime--
        
        if (gameTime <= 0) {
            endGameByTime()
        }
    }, 1000)
}

// Функция завершения игры по времени
function endGameByTime() {
    gameOver = true
    clearInterval(gameTimer)
    
    let winner = determineWinner()
    showGameOverScreen(winner, "time")
}

// Функция завершения игры по смерти
function endGameByDeath() {
    gameOver = true
    clearInterval(gameTimer)
    
    let winner = determineWinner()
    showGameOverScreen(winner, "death")
}

// Функция определения победителя
function determineWinner() {
    if (firstFighter.health <= 0 && secondFighter.health <= 0) {
        return "draw"
    } else if (firstFighter.health <= 0) {
        return "second"
    } else if (secondFighter.health <= 0) {
        return "first"
    } else if (firstFighter.health > secondFighter.health) {
        return "first"
    } else if (secondFighter.health > firstFighter.health) {
        return "second"
    } else {
        return "draw"
    }
}

// Функция показа экрана завершения игры
function showGameOverScreen(winner, reason) {
    let message = ""
    
    if (winner === "first") {
        message = `Победил ${firstFighter.name}!`
    } else if (winner === "second") {
        message = `Победил ${secondFighter.name}!`
    } else {
        message = "Ничья!"
    }
    
    if (reason === "time") {
        message += " (Время вышло)"
    } else {
        message += " (Нокаут)"
    }
    
    const overlay = document.createElement('div')
    overlay.style.position = 'fixed'
    overlay.style.top = '0'
    overlay.style.left = '0'
    overlay.style.width = '100%'
    overlay.style.height = '100%'
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    overlay.style.display = 'flex'
    overlay.style.flexDirection = 'column'
    overlay.style.justifyContent = 'center'
    overlay.style.alignItems = 'center'
    overlay.style.color = 'white'
    overlay.style.fontFamily = 'Arial, sans-serif'
    overlay.style.zIndex = '1000'
    
    const messageElement = document.createElement('div')
    messageElement.style.fontSize = '48px'
    messageElement.style.fontWeight = 'bold'
    messageElement.style.marginBottom = '20px'
    messageElement.textContent = message
    
    const restartButton = document.createElement('button')
    restartButton.textContent = 'Играть снова'
    restartButton.style.padding = '15px 30px'
    restartButton.style.fontSize = '24px'
    restartButton.style.cursor = 'pointer'
    restartButton.style.backgroundColor = '#4CAF50'
    restartButton.style.color = 'white'
    restartButton.style.border = 'none'
    restartButton.style.borderRadius = '5px'
    
    restartButton.onclick = function() {
        document.body.removeChild(overlay)
        resetGame()
    }
    
    overlay.appendChild(messageElement)
    overlay.appendChild(restartButton)
    document.body.appendChild(overlay)
}

// Функция сброса игры
function resetGame() {
    if (gameTimer) {
        clearInterval(gameTimer)
    }
    
    fight()
    startGameTimer()
}

// Функции управления игроками
function movePlayerOne(event) {
    if (event.repeat) return
    if (firstFighter.state === 'attacking' || firstFighter.isStunned || firstFighter.isBlocking) return

    if (event.code === 'ShiftLeft') {
        firstFighter.startBlock()
    }

    if (event.code === 'KeyW' && !firstFighter.isJumping && !firstFighter.isSit) {
        firstFighter.ySpeed = -15
        firstFighter.isJumping = true
        firstFighter.isHoldingJump = true
        firstFighter.jumpStartY = firstFighter.y
    }
    if (event.code === 'KeyA' && !firstFighter.isSit && firstFighter.state !== 'attacking') {
        firstFighter.xSpeed = -15
    }
    if (event.code === 'KeyD' && !firstFighter.isSit && firstFighter.state !== 'attacking') {
        firstFighter.xSpeed = 15
    }
    if (event.code === 'KeyS' && !firstFighter.isJumping) {
        firstFighter.isSit = true
        firstFighter.height = 150
        firstFighter.y = GAME.height - 150
    }

    if (event.code === 'KeyQ' && !firstFighter.isSit) {
        firstFighter.handAttack.drawAttack()
    }
    if (event.code === 'KeyE' && !firstFighter.isSit) {
        firstFighter.strongHandAttack.drawAttack()
    }
    if (event.code === 'KeyZ' && !firstFighter.isSit) {
        firstFighter.legAttack.drawAttack()
    }
    if (event.code === 'KeyX' && !firstFighter.isSit) {
        firstFighter.strongLegAttack.drawAttack()
    }
}

function movePlayerTwo(event) {
    if (event.repeat) return
    if (secondFighter.state === 'attacking' || secondFighter.isStunned || secondFighter.isBlocking) return

    if (event.code === 'ShiftRight') {
        secondFighter.startBlock()
    }

    if (event.code === 'ArrowUp' && !secondFighter.isJumping && !secondFighter.isSit) {
        secondFighter.ySpeed = -15
        secondFighter.isJumping = true
        secondFighter.isHoldingJump = true
        secondFighter.jumpStartY = secondFighter.y
    }
    if (event.code === 'ArrowLeft' && !secondFighter.isSit && secondFighter.state !== 'attacking') {
        secondFighter.xSpeed = -15
    }
    if (event.code === 'ArrowRight' && !secondFighter.isSit && secondFighter.state !== 'attacking') {
        secondFighter.xSpeed = 15
    }
    if (event.code === 'ArrowDown' && !secondFighter.isJumping) {
        secondFighter.isSit = true
        secondFighter.height = 150
        secondFighter.y = GAME.height - 150
    }

    if (event.code === 'Numpad4' && !secondFighter.isSit) {
        secondFighter.handAttack.drawAttack()
    }
    if (event.code === 'Numpad5' && !secondFighter.isSit) {
        secondFighter.strongHandAttack.drawAttack()
    }
    if (event.code === 'Numpad1' && !secondFighter.isSit) {
        secondFighter.legAttack.drawAttack()
    }
    if (event.code === 'Numpad2' && !secondFighter.isSit) {
        secondFighter.strongLegAttack.drawAttack()
    }
}

function stopPlayerOne(event) {
    if (event.code === 'ShiftLeft') {
        firstFighter.stopBlock()
    }
    if (event.code === 'KeyW') {
        firstFighter.isHoldingJump = false
    }
    if (event.code === 'KeyA' || event.code === 'KeyD') {
        firstFighter.xSpeed = 0
    }
    if (event.code === 'KeyS' && !firstFighter.isJumping) {
        firstFighter.height = 300
        firstFighter.isSit = false
        firstFighter.y = GAME.height - 300
    }
}

function stopPlayerTwo(event) {
    if (event.code === 'ShiftRight') {
        secondFighter.stopBlock()
    }
    if (event.code === 'ArrowUp') {
        secondFighter.isHoldingJump = false
    }
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
        secondFighter.xSpeed = 0
    }
    if (event.code === 'ArrowDown' && !secondFighter.isJumping) {
        secondFighter.height = 300
        secondFighter.isSit = false
        secondFighter.y = GAME.height - 300
    }
}

function initEventListener() {
    window.addEventListener('keydown', movePlayerOne)
    window.addEventListener('keyup', stopPlayerOne)

    window.addEventListener('keydown', movePlayerTwo)
    window.addEventListener('keyup', stopPlayerTwo)
}

function updateGame() {
    firstFighter.update()
    secondFighter.update()

    if (firstFighter.checkCollision(secondFighter)) {
        resolveFightersCollision(firstFighter, secondFighter)
    }

    checkAttackCollision()

    firstFighter.checkBounds()
    secondFighter.checkBounds()
}

function resolveFightersCollision(fighter1, fighter2) {
    const rect1 = fighter1.getBounds()
    const rect2 = fighter2.getBounds()
    
    const overlapX = Math.min(rect1.right - rect2.x, rect2.right - rect1.x)
    const overlapY = Math.min(rect1.bottom - rect2.y, rect2.bottom - rect1.y)
    
    if (overlapX < overlapY) {
        if (rect1.x < rect2.x) {
            fighter1.x = rect2.x - fighter1.width
            fighter2.x = rect1.right
        } else {
            fighter1.x = rect2.right
            fighter2.x = rect1.x - fighter2.width
        }
        fighter1.xSpeed = 0
        fighter2.xSpeed = 0
    } else {
        if (rect1.y < rect2.y) {
            fighter1.y = rect2.y - fighter1.height
            fighter1.ySpeed = 0
            fighter1.isJumping = false
        } else {
            fighter2.y = rect1.y - fighter2.height
            fighter2.ySpeed = 0
            fighter2.isJumping = false
        }
    }
}

function checkAttackCollision() {
    // Проверяем атаку первого бойца
    if (firstFighter.state === 'attacking' && firstFighter.attackHitbox) {
        if (checkHitboxCollision(firstFighter.attackHitbox, secondFighter.getBounds())) {
            if (!firstFighter.attackHitbox.damageDealt) {
                
                // ПРОТИВНИК В БЛОКЕ
                if (secondFighter.isBlocking) {
                    // УДАР НОГОЙ ПРОБИВАЕТ ВЕРХНИЙ БЛОК И ОТПРАВЛЯЕТ В СТАН
                    if (firstFighter.currentAttack.type === 'down' && secondFighter.blockType === 'up') {
                        // Удар ногой пробивает верхний блок - полный урон и стан
                        secondFighter.takeDamage(firstFighter.currentAttack.damage)
                        secondFighter.getStunned()
                    }
                    else if (secondFighter.checkBlockEffectiveness(firstFighter.currentAttack.type)) {
                        // Успешный блок - минимальный отскок
                        if (firstFighter.facing === 'right') {
                            secondFighter.xSpeed = -2
                            firstFighter.xSpeed = 1
                        } else {
                            secondFighter.xSpeed = 2
                            firstFighter.xSpeed = -1
                        }
                    } else {
                        // Неудачный блок - частичный урон
                        secondFighter.takeDamage(firstFighter.currentAttack.damage * 0.3)
                    }
                }
                // ОБЫЧНЫЙ УДАР
                else {
                    secondFighter.takeDamage(firstFighter.currentAttack.damage)
                }
                
                if (secondFighter.health <= 0 && !gameOver) {
                    endGameByDeath()
                }
                
                firstFighter.attackHitbox.damageDealt = true
            }
        }
    }
    
    // Проверяем атаку второго бойца
    if (secondFighter.state === 'attacking' && secondFighter.attackHitbox) {
        if (checkHitboxCollision(secondFighter.attackHitbox, firstFighter.getBounds())) {
            if (!secondFighter.attackHitbox.damageDealt) {
                
                if (firstFighter.isBlocking) {
                    // УДАР НОГОЙ ПРОБИВАЕТ ВЕРХНИЙ БЛОК И ОТПРАВЛЯЕТ В СТАН
                    if (secondFighter.currentAttack.type === 'down' && firstFighter.blockType === 'up') {
                        // Удар ногой пробивает верхний блок - полный урон и стан
                        firstFighter.takeDamage(secondFighter.currentAttack.damage)
                        firstFighter.getStunned()
                    }
                    else if (firstFighter.checkBlockEffectiveness(secondFighter.currentAttack.type)) {
                        // Успешный блок - минимальный отскок
                        if (secondFighter.facing === 'right') {
                            firstFighter.xSpeed = -2
                            secondFighter.xSpeed = 1
                        } else {
                            firstFighter.xSpeed = 2
                            secondFighter.xSpeed = -1
                        }
                    } else {
                        // Неудачный блок - частичный урон
                        firstFighter.takeDamage(secondFighter.currentAttack.damage * 0.3)
                    }
                }
                else {
                    firstFighter.takeDamage(secondFighter.currentAttack.damage)
                }
                
                if (firstFighter.health <= 0 && !gameOver) {
                    endGameByDeath()
                }
                
                secondFighter.attackHitbox.damageDealt = true
            }
        }
    }
}

function checkHitboxCollision(hitbox1, hitbox2) {
    return hitbox1.x < hitbox2.x + hitbox2.width &&
           hitbox1.x + hitbox1.width > hitbox2.x &&
           hitbox1.y < hitbox2.y + hitbox2.height &&
           hitbox1.y + hitbox1.height > hitbox2.y
}

function drawHealthBars() {
    const barWidth = 400
    const barHeight = 30
    const margin = 50
    const topMargin = 20
    
    // Фон для шкал HP
    cntx.fillStyle = '#333'
    cntx.fillRect(margin, topMargin, barWidth, barHeight)
    cntx.fillRect(GAME.width - margin - barWidth, topMargin, barWidth, barHeight)
    
    // HP первого бойца
    const firstFighterHPWidth = (firstFighter.health / 100) * barWidth
    cntx.fillStyle = firstFighter.health > 30 ? '#00ff00' : '#ff0000'
    cntx.fillRect(margin + barWidth - firstFighterHPWidth, topMargin, firstFighterHPWidth, barHeight)
    
    // HP второго бойца
    const secondFighterHPWidth = (secondFighter.health / 100) * barWidth
    cntx.fillStyle = secondFighter.health > 30 ? '#00ff00' : '#ff0000'
    cntx.fillRect(GAME.width - margin - barWidth, topMargin, secondFighterHPWidth, barHeight)
    
    // Белые рамки
    cntx.strokeStyle = '#fff'
    cntx.lineWidth = 2
    cntx.strokeRect(margin, topMargin, barWidth, barHeight)
    cntx.strokeRect(GAME.width - margin - barWidth, topMargin, barWidth, barHeight)
    
    // Имена бойцов
    cntx.fillStyle = '#fff'
    cntx.font = 'bold 20px Arial'
    cntx.textAlign = 'left'
    cntx.fillText(firstFighter.name, margin + 10, topMargin + 22)
    
    cntx.textAlign = 'right'
    cntx.fillText(secondFighter.name, GAME.width - margin - 10, topMargin + 22)
    
    // Таймер
    cntx.font = 'bold 30px Arial'
    cntx.textAlign = 'center'
    cntx.fillStyle = gameTime <= 10 ? '#ff0000' : '#ffffff'
    cntx.fillText(gameTime.toString().padStart(2, '0'), GAME.width / 2, topMargin + 25)
}

function drawGame() {
    // Полностью черный фон
    cntx.fillStyle = '#000000'
    cntx.fillRect(0, 0, GAME.width, GAME.height)
    
    drawHealthBars()
    
    firstFighter.drawStance()
    secondFighter.drawStance()
}

function gameLoop() {
    if (!gameOver) {
        updateGame()
        drawGame()
    }
    requestAnimationFrame(gameLoop)
}

function fight() {
    firstFighter = new Fighter('Evil Eye', 100, GAME.width / 2 - 400, GAME.height - 300, 'player1')

    firstFighter.handAttack = new Attack(4, false, firstFighter, 'up')
    firstFighter.animations.weakHand = new Animation(firstFighter, [
        {sprite: 'weakHand', hitFrame: -1},
        {sprite: 'weakHand', hitFrame: 1},
        {sprite: 'weakHand', hitFrame: -1}
    ], 80)

    firstFighter.strongHandAttack = new Attack(8, true, firstFighter, 'up')
    firstFighter.animations.strongHand = new Animation(firstFighter, [
        {sprite: 'strongHand', hitFrame: -1},
        {sprite: 'strongHand', hitFrame: -1}, 
        {sprite: 'strongHand', hitFrame: 2},
        {sprite: 'strongHand', hitFrame: -1},
        {sprite: 'strongHand', hitFrame: -1}
    ], 120)

    firstFighter.legAttack = new Attack(4, false, firstFighter, 'down')
    firstFighter.animations.weakLeg = new Animation(firstFighter, [
        {sprite: 'weakLeg', hitFrame: -1},
        {sprite: 'weakLeg', hitFrame: 1},
        {sprite: 'weakLeg', hitFrame: -1}
    ], 80)

    firstFighter.strongLegAttack = new Attack(8, true, firstFighter, 'down')
    firstFighter.animations.strongLeg = new Animation(firstFighter, [
        {sprite: 'strongLeg', hitFrame: -1},
        {sprite: 'strongLeg', hitFrame: -1}, 
        {sprite: 'strongLeg', hitFrame: 2},
        {sprite: 'strongLeg', hitFrame: -1},
        {sprite: 'strongLeg', hitFrame: -1}
    ], 120)

    firstFighter.animations.stun = new Animation(firstFighter, [
        {sprite: 'stun', hitFrame: -1},
        {sprite: 'stun', hitFrame: -1},
        {sprite: 'stun', hitFrame: -1}
    ], 100, true)

    firstFighter.animations.block_up = new Animation(firstFighter, [
        {sprite: 'block_up', hitFrame: -1}
    ], 100, true)

    firstFighter.animations.block_down = new Animation(firstFighter, [
        {sprite: 'block_down', hitFrame: -1}
    ], 100, true)

    secondFighter = new Fighter('Okarun', 100, GAME.width / 2 + 200, GAME.height - 300, 'player2')

    secondFighter.handAttack = new Attack(4, false, secondFighter, 'up')
    secondFighter.animations.weakHand = new Animation(secondFighter, [
        {sprite: 'weakHand', hitFrame: -1},
        {sprite: 'weakHand', hitFrame: 1},
        {sprite: 'weakHand', hitFrame: -1}
    ], 80)
    
    secondFighter.strongHandAttack = new Attack(8, true, secondFighter, 'up')
    secondFighter.animations.strongHand = new Animation(secondFighter, [
        {sprite: 'strongHand', hitFrame: -1},
        {sprite: 'strongHand', hitFrame: -1}, 
        {sprite: 'strongHand', hitFrame: 2},
        {sprite: 'strongHand', hitFrame: -1},
        {sprite: 'strongHand', hitFrame: -1}
    ], 120)

    secondFighter.legAttack = new Attack(4, false, secondFighter, 'down')
    secondFighter.animations.weakLeg = new Animation(secondFighter, [
        {sprite: 'weakLeg', hitFrame: -1},
        {sprite: 'weakLeg', hitFrame: 1},
        {sprite: 'weakLeg', hitFrame: -1}
    ], 80)

    secondFighter.strongLegAttack = new Attack(8, true, secondFighter, 'down')
    secondFighter.animations.strongLeg = new Animation(secondFighter, [
        {sprite: 'strongLeg', hitFrame: -1},
        {sprite: 'strongLeg', hitFrame: -1}, 
        {sprite: 'strongLeg', hitFrame: 2},
        {sprite: 'strongLeg', hitFrame: -1},
        {sprite: 'strongLeg', hitFrame: -1}
    ], 120)

    secondFighter.animations.stun = new Animation(secondFighter, [
        {sprite: 'stun', hitFrame: -1},
        {sprite: 'stun', hitFrame: -1},
        {sprite: 'stun', hitFrame: -1}
    ], 100, true)

    secondFighter.animations.block_up = new Animation(secondFighter, [
        {sprite: 'block_up', hitFrame: -1}
    ], 100, true)

    secondFighter.animations.block_down = new Animation(secondFighter, [
        {sprite: 'block_down', hitFrame: -1}
    ], 100, true)

    initEventListener()
    startGameTimer()
    gameLoop()
}

// Классы игры
class Fighter {
    constructor(name, health, x, y, characterType) {
        this.name = name
        this.health = health
        this.maxHealth = health
        this.state = 'normal'
        this.characterType = characterType

        this.x = x
        this.y = y
        this.width = 200
        this.height = 300
        this.xSpeed = 0
        this.ySpeed = 0

        this.isJumping = false
        this.isHoldingJump = false
        this.isSit = false
        this.jumpStartY
        this.attackHitbox
        this.currentAttack

        this.handAttack
        this.strongHandAttack
        this.legAttack
        this.strongLegAttack

        this.spriteX = x
        this.spriteY = y
        this.spriteWidth = 200
        this.spriteHeight = 300
        this.facing = x < GAME.width / 2 ? 'right' : 'left'

        this.animations = {}
        this.currentAnimation
        this.isStunned = false
        this.stunAnimation = null
        this.lastDamageTaken = 0

        this.isBlocking = false
        this.blockStance = null
        this.blockType = 'up' // 'up' или 'down'
        
        this.attackHitboxCreated = false
        
        this.isMoving = false
        this.walkFrame = 0
        this.lastWalkUpdate = 0
    }

    update() {
        this.isMoving = Math.abs(this.xSpeed) > 1
        
        if (this.isMoving) {
            this.updateWalkAnimation()
        }
        
        if (this.isStunned) {
            this.xSpeed = 0
            return
        }
        
        if (this.isBlocking) {
            this.xSpeed = 0
        }

        // ПРИ АТАКЕ НЕЛЬЗЯ ХОДИТЬ - обнуляем скорость
        if (this.state === 'attacking') {
            this.xSpeed = 0
        }

        if (Math.abs(this.xSpeed) > 10) {
            this.xSpeed *= 0.95
            if (Math.abs(this.xSpeed) < 1) {
                this.xSpeed = 0
            }
        }

        this.x += this.xSpeed
        
        if (!this.isHoldingJump) {
            this.ySpeed += GAME.gravity
        }
        this.y += this.ySpeed

        if (this.isHoldingJump && this.y <= this.jumpStartY - GAME.maxJumpHeight) {
            this.isHoldingJump = false
        }

        if (this.y >= GAME.height - this.height) {
            this.y = GAME.height - this.height
            this.ySpeed = 0
            this.isJumping = false
        }

        this.spriteX = this.x
        this.spriteY = this.y

        if (this.currentAnimation) {
            this.currentAnimation.update()

            if (!this.currentAnimation.isPlaying && this.attackHitbox) {
                this.attackHitbox = null
            }
        }

        this.updateFacing()
        
        // Автоматическое определение типа блока в зависимости от позы
        if (this.isBlocking) {
            this.updateBlockType()
        }
    }

    updateWalkAnimation() {
        const now = Date.now()
        if (now - this.lastWalkUpdate > 200) {
            this.walkFrame = (this.walkFrame + 1) % 4
            this.lastWalkUpdate = now
        }
    }

    updateFacing() {
        if (this === firstFighter) {
            this.facing = this.x < secondFighter.x ? 'right' : 'left'
        } else {
            this.facing = this.x < firstFighter.x ? 'right' : 'left'
        }
    }
    
    updateBlockType() {
        // Если сидим - нижний блок, если стоим - верхний блок
        this.blockType = this.isSit ? 'down' : 'up'
    }
    
    checkBlockEffectiveness(attackType) {
        // Блок эффективен только против атак того же типа
        // Верхний блок против верхних атак, нижний блок против нижних атак
        // УДАР НОГОЙ ПРОБИВАЕТ ВЕРХНИЙ БЛОК - возвращаем false
        if (attackType === 'down' && this.blockType === 'up') {
            return false
        }
        return this.blockType === attackType
    }
    
    checkBounds() {
        if (this.x < 0) this.x = 0
        if (this.x > GAME.width - this.width) this.x = GAME.width - this.width
        if (this.y < 0) this.y = 0
        if (this.y > GAME.height - this.height) this.y = GAME.height - this.height
    }

    drawStance() {
        let currentSprite = this.getCurrentSprite()
        
        if (currentSprite && spriteLoader.isLoaded) {
            this.drawSprite(currentSprite)
        } else {
            this.drawFallback()
        }

        cntx.fillStyle = 'white'
        cntx.font = '16px Arial'
        cntx.fillText(this.name, this.spriteX, this.spriteY - 10)
    }

    getCurrentSprite() {
        if (this.isStunned) {
            return spriteLoader.getSprite(this.characterType, 'stun')
        } else if (this.isBlocking) {
            // Возвращаем соответствующий спрайт блока в зависимости от типа
            if (this.blockType === 'up') {
                return spriteLoader.getSprite(this.characterType, 'block_up')
            } else {
                return spriteLoader.getSprite(this.characterType, 'block_down')
            }
        } else if (this.currentAnimation && this.currentAnimation.isPlaying) {
            return this.currentAnimation.getCurrentSprite()
        } else if (this.isSit) {
            return spriteLoader.getSprite(this.characterType, 'sit')
        } else if (this.isJumping) {
            return spriteLoader.getSprite(this.characterType, 'jump')
        } else if (this.isMoving) {
            return spriteLoader.getSprite(this.characterType, 'walk')
        } else {
            return spriteLoader.getSprite(this.characterType, 'idle')
        }
    }

    drawSprite(sprite) {
        if (!sprite) return
        
        let drawHeight, drawWidth, drawX, drawY
        
        // Для анимаций ударов ногами используем высоту в 2 раза меньше
        if (this.currentAnimation && this.currentAnimation.isPlaying) {
            const currentAttack = this.currentAttack
            if (currentAttack && currentAttack.type === 'down') {
                // Для ударов ногами - высота в 2 раза меньше
                drawHeight = this.height / 2
                const spriteAspectRatio = sprite.naturalWidth / sprite.naturalHeight
                drawWidth = drawHeight * spriteAspectRatio
                
                // Центрируем по низу хитбокса для ударов ногами
                drawX = this.spriteX + (this.spriteWidth - drawWidth) / 2
                drawY = this.spriteY + this.spriteHeight - drawHeight
            } else {
                // Для остальных анимаций используем стандартную высоту
                drawHeight = this.height
                const spriteAspectRatio = sprite.naturalWidth / sprite.naturalHeight
                drawWidth = drawHeight * spriteAspectRatio
                drawX = this.spriteX + (this.spriteWidth - drawWidth) / 2
                drawY = this.spriteY
            }
        } else {
            // Стандартное масштабирование для не-анимационных состояний
            drawHeight = this.height
            const spriteAspectRatio = sprite.naturalWidth / sprite.naturalHeight
            drawWidth = drawHeight * spriteAspectRatio
            drawX = this.spriteX + (this.spriteWidth - drawWidth) / 2
            drawY = this.spriteY
        }
        
        cntx.save()
        
        if (this.facing === 'right') {
            cntx.drawImage(sprite, drawX, drawY, drawWidth, drawHeight)
        } else {
            cntx.scale(-1, 1)
            cntx.drawImage(sprite, -drawX - drawWidth, drawY, drawWidth, drawHeight)
        }
        
        cntx.restore()
    }

    drawFallback() {
        let color = 'black'
        
        if (this.isStunned) color = 'red'
        else if (this.isBlocking) color = 'green'
        else if (this.currentAnimation && this.currentAnimation.isPlaying) color = 'blue'
        else if (this.isSit) color = 'purple'
        else if (this.isJumping) color = 'orange'
        else if (this.isMoving) color = 'yellow'

        if (this.facing === 'right') {
            cntx.fillStyle = color
            cntx.fillRect(this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight)
        } else {
            cntx.save()
            cntx.scale(-1, 1)
            cntx.fillStyle = color
            cntx.fillRect(-this.spriteX - this.spriteWidth, this.spriteY, this.spriteWidth, this.spriteHeight)
            cntx.restore()
        }
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y, 
            width: this.width,
            height: this.height,
            right: this.x + this.width,
            bottom: this.y + this.height
        }
    }

    checkCollision(otherFighter) {
        const rect1 = this.getBounds()
        const rect2 = otherFighter.getBounds()
        
        return rect1.x < rect2.right && 
            rect1.right > rect2.x && 
            rect1.y < rect2.bottom && 
            rect1.bottom > rect2.y
    }

    takeDamage(damage) {
        if (this.isStunned) return
        
        this.health -= damage
        this.lastDamageTaken = damage
        
        this.getStunned()
        
        if (this.health < 0) this.health = 0
    }

    getStunned() {
        this.isStunned = true
        this.state = 'stunned'
        this.xSpeed = 0
        
        if (this.animations.stun) {
            this.currentAnimation = this.animations.stun
            this.currentAnimation.start()
            
            setTimeout(() => {
                this.isStunned = false
                this.state = 'normal'
                if (this.currentAnimation === this.animations.stun) {
                    this.currentAnimation.stop()
                }
            }, 400)
        }
    }

    startBlock() {
        if (this.isStunned || this.state === 'attacking') return
        
        this.isBlocking = true
        this.state = 'blocking'
        
        // Определяем тип блока в зависимости от позы
        this.blockType = this.isSit ? 'down' : 'up'
        
        // Используем соответствующую анимацию блока
        const blockAnimationName = this.blockType === 'up' ? 'block_up' : 'block_down'
        if (this.animations[blockAnimationName]) {
            this.currentAnimation = this.animations[blockAnimationName]
            this.currentAnimation.start()
        }
    }

    stopBlock() {
        this.isBlocking = false
        this.state = 'normal'
        if (this.currentAnimation && (
            this.currentAnimation === this.animations.block_up || 
            this.currentAnimation === this.animations.block_down
        )) {
            this.currentAnimation.stop()
        }
    }
}

class Attack {
    constructor(damage, isStrong, fighter, type) {
        this.damage = damage
        this.isStrong = isStrong
        this.type = type
        this.fighter = fighter
        // Хитбокс не выходит за ширину спрайта
        this.width = fighter.width * 0.6
        this.height = 40
    }

    drawAttack() {
        if (this.fighter.state === 'attacking' || (this.fighter.currentAnimation && this.fighter.currentAnimation.isPlaying)) return
        
        let animationName
        if (this.type === 'up') {
            animationName = this.isStrong ? 'strongHand' : 'weakHand'
        } else {
            animationName = this.isStrong ? 'strongLeg' : 'weakLeg'
        }
        
        this.fighter.currentAnimation = this.fighter.animations[animationName]
        this.fighter.currentAnimation.start()
        this.fighter.currentAttack = this
        this.fighter.state = 'attacking'
    }

    getHitbox() {
        var x = this.fighter.x
        var y = this.fighter.y
        let width = this.width
        let height = this.height

        if (this.fighter.facing === 'right') {
            x += this.fighter.width * 0.7 // Хитбокс начинается от 70% ширины спрайта
        } else {
            x -= width + this.fighter.width * 0.1 // Хитбокс не выходит за левую границу
        }

        if (this.type === 'up') {
            y += 80 // Верхние удары - на уровне груди
        } else {
            y += this.fighter.height - 60 // Нижние удары - на уровне ног
            height = 50
        }
        
        if (this.isStrong) {
            width = this.fighter.width * 0.8
        }

        return { x, y, width, height }
    }
}

class Animation {
    constructor(fighter, frames, frameDuration, isLoop = false) {
        this.fighter = fighter
        this.frames = frames
        this.frameDuration = frameDuration
        this.isLoop = isLoop
        this.currentFrame = 0
        this.isPlaying = false
        this.startTime = 0
    }

    draw() {
        const sprite = this.getCurrentSprite()
        if (sprite) {
            this.fighter.drawSprite(sprite)
        }
    }

    getCurrentSprite() {
        const frame = this.getCurrentFrame()
        if (!frame) return null
        
        const spriteName = frame.sprite
        return spriteLoader.getSprite(this.fighter.characterType, spriteName)
    }

    start() {
        this.isPlaying = true
        this.currentFrame = 0
        this.startTime = Date.now()
        this.fighter.state = 'attacking'
    }
    
    update() {
        if (!this.isPlaying) return
        
        const elapsed = Date.now() - this.startTime
        this.currentFrame = Math.floor(elapsed / this.frameDuration)
        
        if (this.currentFrame >= this.frames.length) {
            if (this.isLoop) {
                this.currentFrame = this.currentFrame % this.frames.length
                this.startTime = Date.now() - (this.currentFrame * this.frameDuration)
            } else {
                this.stop()
                return
            }
        }
        
        const frame = this.getCurrentFrame()
        if (frame && frame.hitFrame === this.currentFrame && this.fighter.currentAttack) {
            if (!this.fighter.attackHitbox && !this.fighter.attackHitboxCreated) {
                this.fighter.attackHitbox = this.fighter.currentAttack.getHitbox()
                this.fighter.attackHitbox.damageDealt = false
                this.fighter.attackHitboxCreated = true
            }
        }
        
        if (frame && frame.hitFrame !== this.currentFrame) {
            this.fighter.attackHitboxCreated = false
        }
    }
    
    stop() {
        this.isPlaying = false
        this.fighter.state = 'normal'
        this.fighter.attackHitbox = null
        this.fighter.attackHitboxCreated = false
    }
    
    getCurrentFrame() {
        if (this.currentFrame < 0 || this.currentFrame >= this.frames.length) {
            return null
        }
        return this.frames[this.currentFrame]
    }
}

// Инициализация игры
function initGame() {
    canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    cntx = canvas.getContext('2d')

    canvas.width = GAME.width
    canvas.height = GAME.height

    // Загружаем спрайты и запускаем игру
    spriteLoader.load(SPRITES, () => {
        fight()
    })
}

// Запуск игры при загрузке страницы
window.addEventListener('load', initGame)