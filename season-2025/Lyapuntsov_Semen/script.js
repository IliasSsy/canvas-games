var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var canvasContent = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 500;
canvas.style.border = "2px solid #333";
canvas.style.background = "#000";
document.body.style.backgroundColor = "#222";
document.body.style.margin = "0";
document.body.style.padding = "20px";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.fontFamily = "Arial, sans-serif";
var score = 0;
var gameOver = false;
var paused = false;
var restartButton = document.createElement("button");
restartButton.textContent = "Новая игра";
restartButton.style.marginTop = "10px";
restartButton.style.padding = "8px 20px";
restartButton.style.fontSize = "16px";
restartButton.style.display = "none";
restartButton.style.backgroundColor = "#4CAF50";
restartButton.style.color = "white";
restartButton.style.border = "none";
restartButton.style.borderRadius = "4px";
restartButton.style.cursor = "pointer";
document.body.appendChild(restartButton);
var player = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    width: 40,
    height: 25,
    speed: 6,
    color: "#4CAF50"
};
var bullets = [];
var enemies = [];
var enemyRows = 4;
var enemyCols = 8;
var enemyWidth = 35;
var enemyHeight = 25;
var enemySpeed = 1;
var enemyDirection = 1;
function createEnemies() {
    enemies = [];
    var colors = ["#FF5252", "#FF9800", "#2196F3", "#E91E63"];
    for (var row = 0; row < enemyRows; row++) {
        for (var col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * (enemyWidth + 15) + 40,
                y: row * (enemyHeight + 15) + 40,
                width: enemyWidth,
                height: enemyHeight,
                color: colors[row % colors.length],
                alive: true
            });
        }
    }
}
function drawPlayer() {
    canvasContent.fillStyle = player.color;
    canvasContent.fillRect(player.x - player.width/2, player.y - player.height/2, player.width, player.height);
    canvasContent.fillStyle = "#81C784";
    canvasContent.beginPath();
    canvasContent.moveTo(player.x - player.width/4, player.y - player.height/2);
    canvasContent.lineTo(player.x + player.width/4, player.y - player.height/2);
    canvasContent.lineTo(player.x, player.y - player.height/2 - 10);
    canvasContent.closePath();
    canvasContent.fill();
    canvasContent.fillStyle = "#FF9800";
    canvasContent.fillRect(player.x - player.width/3, player.y + player.height/2 - 5, player.width/4, 5);
    canvasContent.fillRect(player.x + player.width/12, player.y + player.height/2 - 5, player.width/4, 5);
}
function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].alive) {
            var enemy = enemies[i];
            canvasContent.fillStyle = enemy.color;
            canvasContent.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            canvasContent.fillStyle = "#000";
            canvasContent.fillRect(enemy.x + 8, enemy.y + 8, 5, 5);
            canvasContent.fillRect(enemy.x + enemy.width - 13, enemy.y + 8, 5, 5);
            canvasContent.fillRect(enemy.x + 12, enemy.y + enemy.height - 10, enemy.width - 24, 3);
            canvasContent.fillStyle = enemy.color;
            for (var j = 0; j < 3; j++) {
                canvasContent.fillRect(enemy.x + 5 + j * 10, enemy.y + enemy.height, 5, 8);
            }
        }
    }
}
function drawBullets() {
    canvasContent.fillStyle = "#FFEB3B";
    for (var i = 0; i < bullets.length; i++) {
        canvasContent.beginPath();
        canvasContent.arc(bullets[i].x, bullets[i].y, bullets[i].radius, 0, Math.PI * 2);
        canvasContent.fill();
        canvasContent.fillStyle = "rgba(255, 235, 59, 0.4)";
        canvasContent.beginPath();
        canvasContent.arc(bullets[i].x, bullets[i].y, bullets[i].radius + 2, 0, Math.PI * 2);
        canvasContent.fill();
        canvasContent.fillStyle = "#FFEB3B";
    }
}
function drawUI() {
    canvasContent.fillStyle = "#FFF";
    canvasContent.font = "16px Arial";
    canvasContent.fillText("Счет: " + score, 10, 25);
    if (paused) {
        canvasContent.fillStyle = "rgba(0, 0, 0, 0.7)";
        canvasContent.fillRect(0, 0, canvas.width, canvas.height);
        canvasContent.fillStyle = "#FFF";
        canvasContent.font = "36px Arial";
        canvasContent.textAlign = "center";
        canvasContent.fillText("ПАУЗА", canvas.width / 2, canvas.height / 2);
        canvasContent.font = "18px Arial";
        canvasContent.fillText("Нажмите ESC для продолжения", canvas.width / 2, canvas.height / 2 + 40);
        canvasContent.textAlign = "left";
    }
    if (gameOver) {
        canvasContent.fillStyle = "rgba(0, 0, 0, 0.8)";
        canvasContent.fillRect(0, 0, canvas.width, canvas.height);
        canvasContent.fillStyle = "#FFF";
        canvasContent.font = "36px Arial";
        canvasContent.textAlign = "center";
        canvasContent.fillText("ИГРА ОКОНЧЕНА", canvas.width / 2, canvas.height / 2 - 30);
        canvasContent.font = "24px Arial";
        canvasContent.fillText("Ваш счет: " + score, canvas.width / 2, canvas.height / 2 + 10);
        canvasContent.font = "18px Arial";
        canvasContent.fillText("Нажмите кнопку 'Новая игра'", canvas.width / 2, canvas.height / 2 + 50);
        canvasContent.textAlign = "left";
        restartButton.style.display = "block";
    }
}
function updateEnemies() {
    var moveDown = false;
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].alive) {
            enemies[i].x += enemySpeed * enemyDirection;
            if (enemies[i].x + enemies[i].width > canvas.width || enemies[i].x < 0) {
                moveDown = true;
            }
        }
    }
    if (moveDown) {
        enemyDirection *= -1;
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].alive) {
                enemies[i].y += 20;
                if (enemies[i].y + enemies[i].height > player.y) {
                    gameOver = true;
                }
            }
        }
    }
}
function updateBullets() {
    for (var i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= 7;
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            continue;
        }
        for (var j = 0; j < enemies.length; j++) {
            if (enemies[j].alive && 
                bullets[i].x < enemies[j].x + enemies[j].width &&
                bullets[i].x > enemies[j].x &&
                bullets[i].y < enemies[j].y + enemies[j].height &&
                bullets[i].y > enemies[j].y) {
                enemies[j].alive = false;
                bullets.splice(i, 1);
                score += 10;
                createExplosion(enemies[j].x + enemies[j].width/2, enemies[j].y + enemies[j].height/2);
                var allDead = true;
                for (var k = 0; k < enemies.length; k++) {
                    if (enemies[k].alive) {
                        allDead = false;
                        break;
                    }
                }
                if (allDead) {
                    createEnemies();
                    enemySpeed += 0.5;
                }
                break;
            }
        }
    }
}
function createExplosion(x, y) {
    canvasContent.fillStyle = "#FF9800";
    canvasContent.beginPath();
    canvasContent.arc(x, y, 10, 0, Math.PI * 2);
    canvasContent.fill();
    canvasContent.fillStyle = "#FF5252";
    canvasContent.beginPath();
    canvasContent.arc(x, y, 6, 0, Math.PI * 2);
    canvasContent.fill();
    canvasContent.fillStyle = "#FFEB3B";
    canvasContent.beginPath();
    canvasContent.arc(x, y, 3, 0, Math.PI * 2);
    canvasContent.fill();
}
var keys = {};
window.addEventListener("keydown", function(e) {
    keys[e.key] = true;
    if (e.key === " " && !gameOver && !paused) {
        bullets.push({
            x: player.x,
            y: player.y - player.height/2,
            radius: 3
        });
    }
    if (e.key === "Escape" && !gameOver) {
        paused = !paused;
    }
});
window.addEventListener("keyup", function(e) {
    keys[e.key] = false;
});
function updatePlayer() {
    if (keys["ArrowLeft"] && player.x - player.width/2 > 0) {
        player.x -= player.speed;
    }
    if (keys["ArrowRight"] && player.x + player.width/2 < canvas.width) {
        player.x += player.speed;
    }
}
function resetGame() {
    score = 0;
    gameOver = false;
    paused = false;
    player.x = canvas.width / 2;
    bullets = [];
    enemySpeed = 1;
    enemyDirection = 1;
    restartButton.style.display = "none";
    createEnemies();
}
restartButton.addEventListener("click", function() {
    resetGame();
});
function gameLoop() {
    canvasContent.clearRect(0, 0, canvas.width, canvas.height);
    if (!gameOver && !paused) {
        updatePlayer();
        updateEnemies();
        updateBullets();
        drawEnemies();
        drawPlayer();
        drawBullets();
    }
    drawUI();
    requestAnimationFrame(gameLoop);
}
createEnemies();
gameLoop();