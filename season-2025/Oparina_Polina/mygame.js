var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

var GAME = {
    width: 1450,
    height: 700,
    background: "#0A0623"
};
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

const WINDOW = {
    width: 400,
    height: 300,
    cornerRadius: 20,
    borderWidth: 5
};

const PLAYER_WINDOW = {
    x: 200,
    y: 150,
    fill: "rgba(76,175,80,0.3)",
    stroke: "#4caf50"
};

const COMPUTER_WINDOW = {
    x: 850,
    y: 150,
    fill: "rgba(239,83,80,0.3)",
    stroke: "#ef5350"
};

const COLORS = {
    background: "#0A0623",
    text: "white",
    computerMarble: "#FF4444"
};

const TEXT = {
    player: "ВАШИ ШАРИКИ",
    computer: "ШАРИКИ КОМПЬЮТЕРА",
    fontSize: "28px Georgia",
    countFontSize: "36px Georgia",
    betFontSize: "20px Georgia",
    title: "Игра в шарики (구슬 놀이)",
    instructions: "20px Georgia"
};

const MARBLES = {
    radius: 18,
    spacing: 40,
    perRow: 8,
    playerStartX: 230,
    playerStartY: 480,
    computerStartX: 880,
    computerStartY: 480
};

const COLOR_PRESETS = {
    purple: "#8A2BE2",
    blue: "#4169E1", 
    emerald: "#00FF7F",
    gold: "#FFD700",
    white: "#FFFFFF"
};

let playerMarbles = 10;
let computerMarbles = 10;
let playerBet = 0;
let computerBet = 0;
let gamePhase = 'bet';
let resultMessage = "";
let gameEnded = false;
let gameResult = "";
let disappearingMarbles = [];
let inputBlocked = false;
let colorSelectionMode = true;
let selectedColor = "#8A2BE2";
let gameModeSelection = false;
let selectedGameMode = "";
let tournamentRounds = 0;
let playerWins = 0;
let computerWins = 0;
let currentRound = 1;
let showVictoryMessage = false;
let victoryMessageTimer = 0;
let victoryParticles = [];
let defeatParticles = [];
let showEndAnimation = false;
let endAnimationTimer = 0;
let hoveredColorIndex = -1;
let pulseAnimation = 0;

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function drawRoundedRect(x, y, width, height, radius, fillColor, strokeColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.roundRect(x, y, width, height, radius);
    canvasContext.fill();
    
    canvasContext.strokeStyle = strokeColor;
    canvasContext.lineWidth = WINDOW.borderWidth;
    canvasContext.beginPath();
    canvasContext.roundRect(x, y, width, height, radius);
    canvasContext.stroke();
}

function drawButton(x, y, width, height, text) {
    canvasContext.fillStyle = "#8A2BE2";
    canvasContext.beginPath();
    canvasContext.roundRect(x, y, width, height, 10);
    canvasContext.fill();
    
    canvasContext.strokeStyle = "white";
    canvasContext.lineWidth = 2;
    canvasContext.beginPath();
    canvasContext.roundRect(x, y, width, height, 10);
    canvasContext.stroke();
    
    canvasContext.fillStyle = "white";
    canvasContext.font = "20px Georgia";
    const textX = x + (width - canvasContext.measureText(text).width) / 2;
    const textY = y + height / 2 + 7;
    canvasContext.fillText(text, textX, textY);
}

function getHighlightColor(baseColor) {
    const num = parseInt(baseColor.slice(1), 16);
    const R = Math.min(255, (num >> 16) + 80);
    const G = Math.min(255, (num >> 8 & 0x00FF) + 80);
    const B = Math.min(255, (num & 0x0000FF) + 80);
    return `rgb(${R}, ${G}, ${B})`;
}

function drawGlassMarble(x, y, radius, baseColor, pulse = 0) {
    const currentRadius = radius + pulse * 3;
    const highlightPos = currentRadius * 0.3;
    const highlightColor = getHighlightColor(baseColor);
    
    const gradient = canvasContext.createRadialGradient(
        x - highlightPos, y - highlightPos, 0,
        x, y, currentRadius
    );
    gradient.addColorStop(0, highlightColor);
    gradient.addColorStop(0.15, `rgba(${parseInt(baseColor.slice(1, 3), 16)}, ${parseInt(baseColor.slice(3, 5), 16)}, ${parseInt(baseColor.slice(5, 7), 16)}, 0.6)`);
    gradient.addColorStop(0.3, baseColor);
    gradient.addColorStop(1, darkenColor(baseColor, 40));
    
    canvasContext.fillStyle = gradient;
    canvasContext.beginPath();
    canvasContext.arc(x, y, currentRadius, 0, Math.PI * 2);
    canvasContext.fill();
    
    canvasContext.strokeStyle = highlightColor;
    canvasContext.lineWidth = 1;
    canvasContext.beginPath();
    canvasContext.arc(x, y, currentRadius, 0, Math.PI * 2);
    canvasContext.stroke();
    
    const highlightGradient = canvasContext.createRadialGradient(
        x - highlightPos, y - highlightPos, 0,
        x - highlightPos, y - highlightPos, currentRadius * 0.4
    );
    highlightGradient.addColorStop(0, highlightColor);
    highlightGradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    canvasContext.fillStyle = highlightGradient;
    canvasContext.beginPath();
    canvasContext.arc(x - highlightPos, y - highlightPos, currentRadius * 0.4, 0, Math.PI * 2);
    canvasContext.fill();
}

function darkenColor(color, percent) {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + 
                 (R<255?R<1?0:R:255)*0x10000 +
                 (G<255?G<1?0:G:255)*0x100 +
                 (B<255?B<1?0:B:255)).toString(16).slice(1);
}

function drawMarbles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
        const row = Math.floor(i / MARBLES.perRow);
        const col = i % MARBLES.perRow;
        const marbleX = x + col * MARBLES.spacing;
        const marbleY = y + row * MARBLES.spacing;
        drawGlassMarble(marbleX, marbleY, MARBLES.radius, color);
    }
}

function drawWindow(x, y, title, fillColor, strokeColor, marblesCount, marblesColor, marblesX, marblesY) {
    drawRoundedRect(x, y, WINDOW.width, WINDOW.height, WINDOW.cornerRadius, fillColor, strokeColor);
    
    canvasContext.fillStyle = COLORS.text;
    canvasContext.font = TEXT.fontSize;
    const titleX = x + (WINDOW.width - canvasContext.measureText(title).width) / 2;
    canvasContext.fillText(title, titleX, y + 105);
    
    canvasContext.font = TEXT.countFontSize;
    const countText = marblesCount.toString();
    const countX = x + (WINDOW.width - canvasContext.measureText(countText).width) / 2;
    canvasContext.fillText(countText, countX, y + 165);
    
    drawMarbles(marblesX, marblesY, marblesCount, marblesColor);
}

function drawTitle() {
    if (colorSelectionMode || gameModeSelection) {
        canvasContext.fillStyle = COLORS.text;
        canvasContext.font = "48px Georgia";
        const titleX = (GAME.width - canvasContext.measureText(TEXT.title).width) / 2 + 8;
        canvasContext.fillText(TEXT.title, titleX, 180);
    }
}

function drawGameTitle() {
    canvasContext.fillStyle = COLORS.text;
    canvasContext.font = "48px Georgia";
    const titleX = (GAME.width - canvasContext.measureText(TEXT.title).width) / 2 + 8;
    canvasContext.fillText(TEXT.title, titleX, 80);
}

function drawColorSelection() {
    drawBackground();
    drawTitle();
    
    canvasContext.fillStyle = COLORS.text;
    canvasContext.font = "36px Georgia";
    canvasContext.fillText("ВЫБЕРИТЕ ЦВЕТ ВАШИХ ШАРИКОВ", 420, 300);
    
    const colors = Object.entries(COLOR_PRESETS);
    const startX = 500;
    const startY = 400;
    const spacing = 120;
    
    colors.forEach(([name, color], index) => {
        const x = startX + index * spacing;
        const y = startY;
        
        const pulse = index === hoveredColorIndex ? Math.sin(pulseAnimation) * 0.5 + 0.5 : 0;
        drawGlassMarble(x, y, 30, color, pulse);
        
        canvasContext.fillStyle = COLORS.text;
        canvasContext.font = "18px Georgia";
        let text = "";
        if (name === 'purple') text = "Фиолетовый";
        if (name === 'blue') text = "Голубой";
        if (name === 'emerald') text = "Зелёный";
        if (name === 'gold') text = "Золотой";
        if (name === 'white') text = "Белый";
        
        const textX = x - canvasContext.measureText(text).width / 2;
        canvasContext.fillText(text, textX, y + 60);
    });
}

function drawGameModeSelection() {
    drawBackground();
    drawTitle();
    
    canvasContext.fillStyle = COLORS.text;
    canvasContext.font = "36px Georgia";
    canvasContext.fillText("ВЫБЕРИТЕ РЕЖИМ ИГРЫ", 500, 300);
    
    drawButton(300, 400, 250, 80, "ОБЫЧНАЯ ИГРА");
    drawButton(600, 400, 250, 80, "ТУРНИР");
    drawButton(900, 400, 250, 80, "НЕВОЗМОЖНО");
    
    canvasContext.fillStyle = COLORS.text;
    canvasContext.font = "16px Georgia";
    canvasContext.fillText("Победа при 20 шариках", 300, 510);
    canvasContext.fillText("3 раунда, победа", 600, 500);
    canvasContext.fillText("при 2+ выигранных", 600, 520);
    canvasContext.fillText("Компьютер всегда", 900, 500);
    canvasContext.fillText("выигрывает!", 900, 520);
}

function createParticle(x, y, color, isVictory) {
    return {
        x: x,
        y: y,
        color: color,
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 10,
        speedY: (Math.random() - 0.5) * 10 - 5,
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
        isVictory: isVictory
    };
}

function createVictoryAnimation() {
    victoryParticles = [];
    for (let i = 0; i < 80; i++) {
        const x = Math.random() * GAME.width;
        const y = Math.random() * GAME.height;
        const colors = ["#4caf50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFFFFF"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        victoryParticles.push(createParticle(x, y, color, true));
    }
}

function createDefeatAnimation() {
    defeatParticles = [];
    for (let i = 0; i < 60; i++) {
        const x = Math.random() * GAME.width;
        const y = Math.random() * GAME.height;
        const colors = ["#ef5350", "#F44336", "#FF5722", "#795548", "#000000"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        defeatParticles.push(createParticle(x, y, color, false));
    }
}

function updateParticles() {
    if (showEndAnimation) {
        if (gameResult === "VICTORY") {
            for (let i = victoryParticles.length - 1; i >= 0; i--) {
                const p = victoryParticles[i];
                p.x += p.speedX;
                p.y += p.speedY;
                p.speedY += 0.1;
                p.life -= p.decay;
                
                if (p.life <= 0) {
                    victoryParticles.splice(i, 1);
                }
            }
            
            if (victoryParticles.length < 20 && endAnimationTimer < 120) {
                for (let i = 0; i < 5; i++) {
                    const x = Math.random() * GAME.width;
                    const y = 0;
                    const colors = ["#4caf50", "#8BC34A", "#CDDC39", "#FFEB3B"];
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    victoryParticles.push(createParticle(x, y, color, true));
                }
            }
        } else {
            for (let i = defeatParticles.length - 1; i >= 0; i--) {
                const p = defeatParticles[i];
                p.x += p.speedX;
                p.y += p.speedY;
                p.speedY += 0.15;
                p.life -= p.decay;
                
                if (p.life <= 0) {
                    defeatParticles.splice(i, 1);
                }
            }
        }
        
        endAnimationTimer++;
        if (endAnimationTimer > 180) {
            showEndAnimation = false;
        }
    }
}

function drawParticles() {
    if (showEndAnimation) {
        if (gameResult === "VICTORY") {
            victoryParticles.forEach(p => {
                canvasContext.save();
                canvasContext.globalAlpha = p.life;
                canvasContext.fillStyle = p.color;
                canvasContext.beginPath();
                canvasContext.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                canvasContext.fill();
                canvasContext.restore();
            });
        } else {
            defeatParticles.forEach(p => {
                canvasContext.save();
                canvasContext.globalAlpha = p.life;
                canvasContext.fillStyle = p.color;
                canvasContext.beginPath();
                canvasContext.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                canvasContext.fill();
                canvasContext.restore();
            });
        }
    }
}

function drawPlayerWindow() {
    drawWindow(
        PLAYER_WINDOW.x, 
        PLAYER_WINDOW.y, 
        TEXT.player, 
        PLAYER_WINDOW.fill, 
        PLAYER_WINDOW.stroke,
        playerMarbles,
        selectedColor,
        MARBLES.playerStartX,
        MARBLES.playerStartY
    );
    
    canvasContext.fillStyle = COLORS.text;
    canvasContext.font = TEXT.betFontSize;
    const betText = "Ваша ставка: " + playerBet;
    const betX = PLAYER_WINDOW.x + (WINDOW.width - canvasContext.measureText(betText).width) / 2;
    canvasContext.fillText(betText, betX, PLAYER_WINDOW.y + 205);
    
    if (selectedGameMode === "tournament") {
        canvasContext.fillStyle = COLORS.text;
        canvasContext.font = "16px Georgia";
        const roundText = `Раунд: ${currentRound}/3`;
        const winsText = `Победы: ${playerWins} | ${computerWins}`;
        canvasContext.fillText(roundText, PLAYER_WINDOW.x + 20, PLAYER_WINDOW.y + 250);
        canvasContext.fillText(winsText, PLAYER_WINDOW.x + 20, PLAYER_WINDOW.y + 270);
    }
}

function drawComputerWindow() {
    drawWindow(
        COMPUTER_WINDOW.x, 
        COMPUTER_WINDOW.y, 
        TEXT.computer, 
        COMPUTER_WINDOW.fill, 
        COMPUTER_WINDOW.stroke,
        computerMarbles,
        COLORS.computerMarble,
        MARBLES.computerStartX,
        MARBLES.computerStartY
    );
    
    canvasContext.fillStyle = COLORS.text;
    canvasContext.font = TEXT.betFontSize;
    const betText = selectedGameMode === "impossible" ? "Ставка компьютера: ???" : "Ставка компьютера: ?";
    const betX = COMPUTER_WINDOW.x + (WINDOW.width - canvasContext.measureText(betText).width) / 2;
    canvasContext.fillText(betText, betX, COMPUTER_WINDOW.y + 205);
}

function drawInstructions() {
    canvasContext.fillStyle = COLORS.text;
    canvasContext.font = TEXT.instructions;
    
    canvasContext.fillText("1 - нечет", 665, 620);
    canvasContext.fillText("2 - чет", 665, 650);
    
    if (gamePhase === 'bet') {
        canvasContext.fillText("Сделайте ставку (нажмите цифру 1-10)", 535, 580);
    } else if (gamePhase === 'guess') {
        canvasContext.fillText("Угадайте ставку компьютера", 565, 580);
    }
    
    if (resultMessage) {
        canvasContext.font = "22px Georgia";
        canvasContext.fillText(resultMessage, 555, 520);
    }
}

function drawVictoryMessage() {
    if (showVictoryMessage && victoryMessageTimer > 0) {
        canvasContext.fillStyle = "#4caf50";
        canvasContext.font = "bold 40px Georgia";
        const message = "+1 VICTORY";
        const messageX = (GAME.width - canvasContext.measureText(message).width) / 2;
        const messageY = 350;
        canvasContext.fillText(message, messageX, messageY);
    }
}

function drawGameResult() {
    if (gameResult === "VICTORY") {
        canvasContext.fillStyle = "#4caf50";
        canvasContext.font = "bold 80px Georgia";
        const text = "VICTORY";
        const textX = (GAME.width - canvasContext.measureText(text).width) / 2;
        canvasContext.fillText(text, textX, 300);
    } else if (gameResult === "YOU LOSE") {
        canvasContext.fillStyle = "#ef5350";
        canvasContext.font = "bold 80px Georgia";
        const text = "GAME OVER";
        const textX = (GAME.width - canvasContext.measureText(text).width) / 2;
        canvasContext.fillText(text, textX, 300);
    }
    
    if (selectedGameMode === "tournament") {
        canvasContext.fillStyle = COLORS.text;
        canvasContext.font = "24px Georgia";
        const resultText = `Результат турнира: ${playerWins} - ${computerWins}`;
        const resultX = (GAME.width - canvasContext.measureText(resultText).width) / 2;
        canvasContext.fillText(resultText, resultX, 380);
    }
    
    drawButton(650, 450, 150, 50, "Сыграть ещё раз");
}

function drawFrame() {
    drawBackground();
    
    if (colorSelectionMode) {
        drawTitle();
        drawColorSelection();
    } else if (gameModeSelection) {
        drawTitle();
        drawGameModeSelection();
    } else if (gameEnded) {
        drawParticles();
        drawGameResult();
    } else {
        drawGameTitle();
        drawPlayerWindow();
        drawComputerWindow();
        drawInstructions();
        if (disappearingMarbles.length > 0) {
            drawBlinkingMarbles();
        }
        if (showVictoryMessage) {
            drawVictoryMessage();
        }
    }
}

function makeComputerBet() {
    if (selectedGameMode === "impossible") {
        computerBet = Math.floor(Math.random() * 10) + 1;
    } else {
        const maxBet = Math.min(computerMarbles, 10);
        computerBet = Math.floor(Math.random() * maxBet) + 1;
    }
}

function checkGuess(userGuess) {
    if (inputBlocked) return;
    const isComputerEven = computerBet % 2 === 0;
    let userWon;
    
    if (selectedGameMode === "impossible") {
        userWon = false;
    } else {
        userWon = (userGuess === 1 && !isComputerEven) || (userGuess === 2 && isComputerEven);
    }
    
    inputBlocked = true;   
    if (userWon) {
        const marblesToAnimate = Math.min(computerBet, computerMarbles);
        for (let i = 0; i < marblesToAnimate; i++) {
            const row = Math.floor(i / MARBLES.perRow);
            const col = i % MARBLES.perRow;
            const x = MARBLES.computerStartX + col * MARBLES.spacing;
            const y = MARBLES.computerStartY + row * MARBLES.spacing;
            disappearingMarbles.push(createBlinkAnimation(x, y, COLORS.computerMarble));
        }
        playerMarbles += computerBet;
        computerMarbles -= computerBet;
        resultMessage = "Вы угадали! +" + computerBet + " шариков";
        
        if (selectedGameMode === "tournament" && (playerMarbles >= 20 || computerMarbles <= 0)) {
            showVictoryMessage = true;
            victoryMessageTimer = 120;
        }
    } else {
        const marblesToAnimate = Math.min(playerBet, playerMarbles);
        for (let i = 0; i < marblesToAnimate; i++) {
            const row = Math.floor(i / MARBLES.perRow);
            const col = i % MARBLES.perRow;
            const x = MARBLES.playerStartX + col * MARBLES.spacing;
            const y = MARBLES.playerStartY + row * MARBLES.spacing;
            disappearingMarbles.push(createBlinkAnimation(x, y, selectedColor));
        }
        playerMarbles -= playerBet;
        computerMarbles += playerBet;
        resultMessage = selectedGameMode === "impossible" ? "" : "Вы не угадали! -" + playerBet + " шариков";
    }
    
    setTimeout(() => {
        checkGameEnd();
    }, 1000);
}

function checkGameEnd() {
    if (selectedGameMode === "normal" || selectedGameMode === "impossible") {
        if (playerMarbles >= 20 || computerMarbles <= 0) {
            gameEnded = true;
            gameResult = "VICTORY";
            inputBlocked = false;
            showEndAnimation = true;
            endAnimationTimer = 0;
            createVictoryAnimation();
        } else if (playerMarbles <= 0) {
            gameEnded = true;
            gameResult = "YOU LOSE";
            inputBlocked = false;
            showEndAnimation = true;
            endAnimationTimer = 0;
            createDefeatAnimation();
        } else {
            setTimeout(() => {
                playerBet = 0;
                gamePhase = 'bet';
                resultMessage = "";
                inputBlocked = false;
            }, 1500);
        }
    } else if (selectedGameMode === "tournament") {
        if (playerMarbles >= 20 || computerMarbles <= 0) {
            playerWins++;
            if (playerWins >= 2 || currentRound >= 3) {
                gameEnded = true;
                gameResult = playerWins >= 2 ? "VICTORY" : "YOU LOSE";
                inputBlocked = false;
                showEndAnimation = true;
                endAnimationTimer = 0;
                if (playerWins >= 2) {
                    createVictoryAnimation();
                } else {
                    createDefeatAnimation();
                }
            } else {
                currentRound++;
                setTimeout(() => {
                    resetRound();
                }, 2000);
            }
        } else if (playerMarbles <= 0) {
            computerWins++;
            if (computerWins >= 2 || currentRound >= 3) {
                gameEnded = true;
                gameResult = computerWins >= 2 ? "YOU LOSE" : "VICTORY";
                inputBlocked = false;
                showEndAnimation = true;
                endAnimationTimer = 0;
                if (computerWins >= 2) {
                    createDefeatAnimation();
                } else {
                    createVictoryAnimation();
                }
            } else {
                currentRound++;
                setTimeout(() => {
                    resetRound();
                }, 2000);
            }
        } else {
            setTimeout(() => {
                playerBet = 0;
                gamePhase = 'bet';
                resultMessage = "";
                inputBlocked = false;
            }, 1500);
        }
    }
}

function resetRound() {
    playerMarbles = 10;
    computerMarbles = 10;
    playerBet = 0;
    gamePhase = 'bet';
    resultMessage = "";
    inputBlocked = false;
    showVictoryMessage = false;
    victoryMessageTimer = 0;
}

function resetGame() {
    playerMarbles = 10;
    computerMarbles = 10;
    playerBet = 0;
    gamePhase = 'bet';
    resultMessage = "";
    gameEnded = false;
    gameResult = "";
    inputBlocked = false;
    colorSelectionMode = true;
    gameModeSelection = false;
    selectedGameMode = "";
    tournamentRounds = 0;
    playerWins = 0;
    computerWins = 0;
    currentRound = 1;
    showVictoryMessage = false;
    victoryMessageTimer = 0;
    victoryParticles = [];
    defeatParticles = [];
    showEndAnimation = false;
    endAnimationTimer = 0;
    hoveredColorIndex = -1;
    pulseAnimation = 0;
}

function handleClick(x, y) {
    if (colorSelectionMode) {
        const colors = Object.entries(COLOR_PRESETS);
        const startX = 500;
        const startY = 400;
        const spacing = 120;
        
        colors.forEach(([name, color], index) => {
            const circleX = startX + index * spacing;
            const circleY = startY;
            const distance = Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2);
            
            if (distance <= 35) {
                selectedColor = color;
                colorSelectionMode = false;
                gameModeSelection = true;
            }
        });
    } else if (gameModeSelection) {
        if (x >= 300 && x <= 550 && y >= 400 && y <= 480) {
            selectedGameMode = "normal";
            gameModeSelection = false;
        }
        if (x >= 600 && x <= 850 && y >= 400 && y <= 480) {
            selectedGameMode = "tournament";
            gameModeSelection = false;
            tournamentRounds = 3;
        }
        if (x >= 900 && x <= 1150 && y >= 400 && y <= 480) {
            selectedGameMode = "impossible";
            gameModeSelection = false;
        }
    } else if (gameEnded) {
        const buttonX = 650;
        const buttonY = 450;
        const buttonWidth = 150;
        const buttonHeight = 50;
        
        if (x >= buttonX && x <= buttonX + buttonWidth && 
            y >= buttonY && y <= buttonY + buttonHeight) {
            resetGame();
        }
    }
}

function handleMouseMove(x, y) {
    if (colorSelectionMode) {
        const colors = Object.entries(COLOR_PRESETS);
        const startX = 500;
        const startY = 400;
        const spacing = 120;
        
        let newHoveredIndex = -1;
        colors.forEach(([name, color], index) => {
            const circleX = startX + index * spacing;
            const circleY = startY;
            const distance = Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2);
            
            if (distance <= 35) {
                newHoveredIndex = index;
            }
        });
        
        hoveredColorIndex = newHoveredIndex;
    }
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    handleClick(x, y);
});

canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    handleMouseMove(x, y);
});

document.addEventListener('keydown', function(event) {
    if (gameEnded || inputBlocked || colorSelectionMode || gameModeSelection) return;
    
    const key = event.key;
    
    if (gamePhase === 'bet') {
        if (key >= '1' && key <= '9' || key === '0') {
            const bet = parseInt(key);
            if (bet >= 1 && bet <= 10 && bet <= playerMarbles) {
                playerBet = bet;
                makeComputerBet();
                gamePhase = 'guess';
                resultMessage = "";
            }
        }
    } else if (gamePhase === 'guess') {
        if (key === '1' || key === '2') {
            const guess = parseInt(key);
            checkGuess(guess);
        }
    }
});

function updateBlinkAnimations() {
    for (let i = disappearingMarbles.length - 1; i >= 0; i--) {
        const anim = disappearingMarbles[i];
        anim.progress += 0.04;
        anim.alpha = Math.abs(Math.sin(anim.progress * Math.PI * 4)) * (1 - anim.progress * 0.7);
        if (anim.progress >= 1) {
            disappearingMarbles.splice(i, 1);
        }
    }
    
    if (showVictoryMessage && victoryMessageTimer > 0) {
        victoryMessageTimer--;
        if (victoryMessageTimer <= 0) {
            showVictoryMessage = false;
        }
    }
    
    updateParticles();
    
    pulseAnimation += 0.1;
}

function createBlinkAnimation(x, y, color) {
    return {
        x: x,
        y: y,
        color: color,
        progress: 0,
        alpha: 1
    };
}

function drawBlinkingMarbles() {
    disappearingMarbles.forEach(anim => {
        if (anim.alpha <= 0) return;
        
        canvasContext.save();
        canvasContext.globalAlpha = anim.alpha;
        
        const highlightPos = MARBLES.radius * 0.3;
        const highlightColor = getHighlightColor(anim.color);
        
        const gradient = canvasContext.createRadialGradient(
            anim.x - highlightPos, anim.y - highlightPos, 0,
            anim.x, anim.y, MARBLES.radius
        );
        gradient.addColorStop(0, highlightColor);
        gradient.addColorStop(0.15, `rgba(${parseInt(anim.color.slice(1, 3), 16)}, ${parseInt(anim.color.slice(3, 5), 16)}, ${parseInt(anim.color.slice(5, 7), 16)}, 0.6)`);
        gradient.addColorStop(0.3, anim.color);
        gradient.addColorStop(1, darkenColor(anim.color, 40));
        
        canvasContext.fillStyle = gradient;
        canvasContext.beginPath();
        canvasContext.arc(anim.x, anim.y, MARBLES.radius, 0, Math.PI * 2);
        canvasContext.fill();
        
        canvasContext.strokeStyle = highlightColor;
        canvasContext.lineWidth = 1;
        canvasContext.beginPath();
        canvasContext.arc(anim.x, anim.y, MARBLES.radius, 0, Math.PI * 2);
        canvasContext.stroke();
        
        const highlightGradient = canvasContext.createRadialGradient(
            anim.x - highlightPos, anim.y - highlightPos, 0,
            anim.x - highlightPos, anim.y - highlightPos, MARBLES.radius * 0.4
        );
        highlightGradient.addColorStop(0, highlightColor);
        highlightGradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        canvasContext.fillStyle = highlightGradient;
        canvasContext.beginPath();
        canvasContext.arc(anim.x - highlightPos, anim.y - highlightPos, MARBLES.radius * 0.4, 0, Math.PI * 2);
        canvasContext.fill();
        
        canvasContext.restore();
    });
}

function play() {
    updateBlinkAnimations();
    drawFrame();
    requestAnimationFrame(play);
}

play();