import { levels } from "./levels.js";


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let GAME = {
    width: 600,
    height: 500,
    bgc: "#54d8fc",
    CamX: 0,
    CamY: 0,
    HP: {
        score: 0,
        default: 3,
        x: 20,
        y: 10,
        radius: 7,
        color: "#f20"
    },
    level: 0,
    run: false,
    status: 1,
    
    brick: new Image(),
    brickIsLoad: false,
    
    draw () {
        if (BALL.imgIsLoad) {
            for (let i = 0; i < this.HP.score; i++) {
                ctx.drawImage(
                    BALL.img, 
                    i * this.HP.x + this.HP.radius,
                    this.HP.y - this.HP.radius,
                    this.HP.radius * 2,
                    this.HP.radius * 2,
                );
            }
        } else {
            ctx.fillStyle = this.HP.color;
            ctx.beginPath();
            for (let i = 0; i < this.HP.score; i++) {
                ctx.arc(
                    i * this.HP.x + this.HP.radius * 1.5, 
                    this.HP.y, 
                    this.HP.radius, 0, Math.PI * 2
                );
            }
            ctx.closePath();
            ctx.fill();
        }
    },
    update () {
        if (!this.HP.score) {
            this.run = false;
        }
    },
    moveCam() {
        if (BALL.x < GAME.width / 2) {
            this.CamX = 0
        } else if (BALL.x > GROUND.length - GAME.width / 2) {
            this.CamX = GROUND.length - GAME.width;
        } else {
            this.CamX = BALL.x - this.width / 2
        }
    },
    start () {
        this.HP.score = this.HP.default;
        this.run = true;
        this.status = 1;
        BALL.lastCheckPoint = NaN;
        play();
    },
    selectLevel (level) {
        if (level < levels.length && level >= 0) {
            GROUND = new Ground(levels[level]);
            this.start();
        }
    },
    initBrickImg () {
        this.brick.src = "./sources/brick.png";
        this.brick.onload = () => {
            this.brickIsLoad = true;
        }
    },
    clear() {
        if (this.brickIsLoad) {
            for (
                let y = 0; y < this.height; 
                y += GROUND.brickWidth
            ) {
                for (
                    let x = 0; 
                    x < GROUND.length; 
                    x += GROUND.brickWidth
                ) {
                    ctx.drawImage(
                        this.brick, 
                        x - this.CamX, y,
                        GROUND.brickWidth,
                        GROUND.brickWidth,
                    );
                }
            }
        } else {
            ctx.clearRect(0, 0, this.width, this.height);
            ctx.fillStyle = GROUND.color;
            ctx.fillRect(0, 0, this.width, this.height);
        }
    }
}

let BALL = {
    lastCheckPoint: NaN,
    x: 0,
    y: 0,
    radius: 10,
    ySpeed: 0,
    xSpeed: 5,
    jumpSpeed: 12,
    G: 0.7,
    moveRight: false,
    moveLeft: false,
    isJump: false,
    color: "#00f",
    img: new Image(),
    imgIsLoad: false,
    initImg() {
        this.img.src = "./sources/ball.png"; 
        this.img.onload = () => {
            this.imgIsLoad = true;
        }
    },
    draw() {
        if (this.imgIsLoad) {
            ctx.drawImage(
                this.img, 
                this.x - this.radius - GAME.CamX, 
                this.y - this.radius,
                this.radius * 2,
                this.radius * 2,
            );
        } else {
            ctx.fillStyle = this.color;

            ctx.beginPath();
            ctx.arc(this.x - GAME.CamX, this.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }
    },
    update() {
        if (this.y > GAME.height) {
            this.kill();
        }
        if (!this.lastCheckPoint) {
            this.lastCheckPoint = levels[GAME.level].startPos;
            this.x = this.lastCheckPoint.x;
            this.y = this.lastCheckPoint.y;
        }
        this.move();
        this.jump();
        let hitCor = this.getHitCor();
        let groundY = GROUND.xToY(hitCor.x);

        if (hitCor.y < GROUND.zeroLevel - groundY) {
            this.y -= this.ySpeed;
            this.ySpeed -= this.G;
        } else {
            this.y = GROUND.zeroLevel - groundY - (this.radius * hitCor.cos);
            this.ySpeed = 0;
        }
        // console.log(
        //     `y=${this.y}\n` +
        //     `hy=${hitCor.y}\n` +
        //     `gy=${GROUND.zeroLevel - groundY}\n` +
        //     `(hy>=gy)=${hitCor.y >= GROUND.zeroLevel - groundY} => ` +
        //     `y=${GROUND.zeroLevel - groundY - (this.radius * hitCor.cos)}`
        // )
    },
    kill() {
        GAME.HP.score--;
        this.x = this.lastCheckPoint.x;
        this.y = this.lastCheckPoint.y;
    },
    jump() {
        if (!this.ySpeed && this.isJump) {
            this.ySpeed = this.jumpSpeed;
            this.y -= 1;
        }
    },
    move() {
        let speed;
        if (this.ySpeed) {
            speed = this.xSpeed * 2
        } else {
            speed = this.xSpeed * 2 * this.getHitCor().cos;
        }
        
        // this.x -= this.getHitCor().sin / 10;
        for (let i = 0; i < speed; i++) {
            let x = this.x + (this.moveRight - this.moveLeft) * 0.5;
            let rightGroundY = GROUND.xToY(this.x + this.radius);
            let rightFutGroundY = GROUND.xToY(x + this.radius);
            let leftGroundY = GROUND.xToY(this.x - this.radius);
            let leftFutGroundY = GROUND.xToY(x - this.radius);
            // console.log(`y=${groundY} fy=${GAME.height - futGroundY} ${this.y + this.radius}`);
            if (
                (rightFutGroundY - rightGroundY < GROUND.brickWidth || 
                this.y + this.radius <= GROUND.zeroLevel - rightFutGroundY) && x > this.x ||
                (leftFutGroundY - leftGroundY < GROUND.brickWidth ||
                this.y + this.radius <= GROUND.zeroLevel - leftFutGroundY) && x < this.x
            ) {
                this.x = x;
            }
            if (this.x <= this.radius) {
                this.x = this.radius + 1;
            } else if (this.x + this.radius * 2 >= GROUND.length) {
                GAME.status = 0;
            }
        }
    },
    getHitCor() {
        let corCenter = GROUND.getCor(this.x);
        let cos = corCenter.cos;
        let sin = corCenter.sin;
        // let cors = [
        //     GROUND.getCor(this.x - this.radius),
        //     GROUND.getCor(this.x + this.radius),
        // ]
        // let localX;
        // for (let cor of cors) {
        //     localX = cor.prevX - this.x;
        //     let sin = localX / GROUND.brickWidth;
        // }
        return {
            y: this.y + this.radius * cos,
            x: this.x + this.radius * sin,
            sin: sin,
            cos: cos
        }
    }
}

class Ground {
    constructor(level, color = "#a40") {
        this.brickWidth = 40;
        this.yCors = level.ground.map(x => {
            x.level *= this.brickWidth;
            return x;
        });
        this.length = (this.yCors.length - 1) * this.brickWidth;
        this.zeroLevel = GAME.height - this.brickWidth * 2;
        this.color = color;
        
        if (level.candles) {
            this.candles = level.candles.map(
                x => {
                    let candleX = (x + 0.5) * this.brickWidth;
                    let candleY = this.xToY(candleX);
                    return new Candle(
                        candleX, 
                        this.zeroLevel - candleY
                    )
                }
            );
        }
    }
    draw() {
        ctx.fillStyle = GAME.bgc;
        ctx.beginPath();
        ctx.moveTo(-GAME.CamX, 0)
        for (let x = 0; x < this.yCors.length; x++) {
            if (this.yCors[x].isSquareAngle) {
                ctx.lineTo(
                    (x - 1) * this.brickWidth - GAME.CamX,
                    this.zeroLevel - this.yCors[x].level
                );
            }
            ctx.lineTo(
                x * this.brickWidth - GAME.CamX,
                this.zeroLevel - this.yCors[x].level
            );
        }
        ctx.lineTo(this.length - GAME.CamX, 0);
        ctx.closePath();
        ctx.fill();
        this.drawCandles();
    }
    updateCandles() {
        if (this.candles) {
            for (let candle of this.candles) {
                candle.update();
            }
        }
    }
    drawCandles() {
        if (this.candles) {
            for (let candle of this.candles) {
                candle.draw();
            }
        }
    }
    xToY(x) {
        let cor = this.getCor(x)
        if (cor.SQAngle) {
            return cor.nextY
        }
        return cor.prevY + cor.deltaY * cor.stepX / this.brickWidth;
    }
    getCor(x) {
        let stepX = x % this.brickWidth;
        let prevX = Math.floor(x / this.brickWidth);
        let nextX = Math.ceil(x / this.brickWidth);

        let nextPoint = this.yCors[nextX];
        let nextY = nextPoint.level;
        let SQAngle = Boolean(nextPoint.isSquareAngle)
        let prevY = SQAngle ? nextY : this.yCors[prevX].level;

        let deltaY = nextY - prevY;
        let deltaX = this.brickWidth;
        let deltaCor = (deltaY ** 2 + deltaX ** 2) ** 0.5;

        let cos = deltaX / deltaCor;
        let sin = deltaY / deltaCor;
        return {
            stepX: stepX,
            nextX: nextX,
            prevX: prevX,
            nextY: nextY,
            SQAngle: SQAngle,
            prevY: prevY,
            deltaY: deltaY,
            deltaX: deltaX,
            deltaCor: deltaCor,

            sin: sin,
            cos: cos
        }
    }
}

class Candle {
    constructor(x, y) {
        this.height = 40
        this.width = 10;
        this.x = x;
        this.y = y;
        this.color = "#f90";
        this.stroke = "#472400";
    }
    draw () {
        let y1 = GROUND.xToY(this.x - this.width / 2);
        let y2 = GROUND.xToY(this.x + this.width / 2);
        let maxY = Math.max(y1, y2);
        ctx.fillStyle = this.stroke;
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(
            this.x - this.width / 2 - GAME.CamX, 
            GROUND.zeroLevel - y1
        );
        ctx.lineTo(
            this.x - this.width / 2 - GAME.CamX,  
            GROUND.zeroLevel - (maxY + this.height / 5 * 4)
        );
        ctx.lineTo(
            this.x + this.width / 2 - GAME.CamX, 
            GROUND.zeroLevel - (maxY + this.height / 5 * 4)
        );
        ctx.lineTo(
            this.x + this.width / 2 - GAME.CamX, 
            GROUND.zeroLevel - y2
        );
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.fillStyle = this.color;
        
        ctx.moveTo(
            this.x - this.width / 2 - GAME.CamX, 
            GROUND.zeroLevel - (maxY + this.height / 5 * 4)
        );
        ctx.lineTo(
            this.x - this.width / 2 - GAME.CamX,  
            GROUND.zeroLevel - (maxY + this.height)
        );
        ctx.lineTo(
            this.x + this.width / 2 - GAME.CamX, 
            GROUND.zeroLevel - (maxY + this.height)
        );
        ctx.lineTo(
            this.x + this.width / 2 - GAME.CamX, 
            GROUND.zeroLevel - (maxY + this.height / 5 * 4)
        );
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    update () {
        if (
            this.x - this.width / 2 < BALL.x + BALL.radius &&
            this.x + this.width * 1.5 > BALL.x &&
            this.y - this.height < BALL.y + BALL.radius
        ) {
            BALL.kill();
        }
    }
}

canvas.width = GAME.width;
canvas.height = GAME.height;

let GROUND = new Ground(levels[GAME.level]);


function play() {
    BALL.update();
    GROUND.updateCandles();
    drawFrame();
    GAME.update();
    if (!GAME.status) {
        GAME.selectLevel(++GAME.level);
        return;
    }
    if (GAME.run) {
        requestAnimationFrame(play);
    }
}

function drawFrame() {
    GAME.clear();
    GROUND.draw();
    BALL.draw();
    GAME.draw();
    GAME.moveCam();
}

function initEventListeners() {
    initJumpEvent();
    initMotionEvents();
    initDebugEvents();
    initGameEvents();
}

function initGameEvents() {
    window.addEventListener("keydown", (e) => {
        if (e.key == " " && !GAME.run) {
            GAME.start();
        }
    })
}

function initMotionEvents() {
    window.addEventListener("keyup", stopMotionHandler);
    window.addEventListener("keydown", beginMotionHandler);
}

function initJumpEvent() {
    window.addEventListener("keydown", (e) => {
        let key = e.key;
        if (key == "ArrowUp" || key == " ") {
            BALL.isJump = true;
        }
    });
    window.addEventListener("keyup", (e) => {
        let key = e.key;
        if (key == "ArrowUp" || key == " ") {
            BALL.isJump = false;
        }
    });
}

function initDebugEvents(){
    window.addEventListener("keydown", (e) => {
        if (e.key == "b") {
            console.log(BALL);
        } 
        if (e.key == "a") {
            BALL.x --;
        }
        if (e.key == "d") {
            BALL.x ++;
        }
    });
}

function stopMotionHandler(e) {
    let key = e.key;
    if (key == "ArrowRight") {
        BALL.moveRight = false;
    }
    if (key == "ArrowLeft") {
        BALL.moveLeft = false;
    }
}

function beginMotionHandler(e) {
    let key = e.key;
    if (key == "ArrowRight") {
        BALL.moveRight = true;
    }
    if (key == "ArrowLeft") {
        BALL.moveLeft = true;
    }
}

function initImages() {
    BALL.initImg();
    GAME.initBrickImg();
}
initImages();
initEventListeners();
GAME.start();