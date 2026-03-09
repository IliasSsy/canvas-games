var GAME = {
    width: 626,
    height: 417,
    background: "#F5F0E1",
    score: 0, // добавил счет, чтобы по нему отрисовывать экран победы, так как у тебя было в планах это окно отрисовать
    // сменить потом на 0, когда начнешь делать логику игры
    clicks: 0,
    timer: 0,
    timeStartQuestion: 0,
    currentQuestion: false,    // создали поле для текущего вопроса, который будем выбирать из общего списка вопросов
                               // при запуске игры вопрос отсутствует
}

// ##### подготовка инструментов рисования ###############
var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");
// var myButton = document.getElementById что это за строчка, не понятно.. надо удалить))
// ######################################################

var answerButton = document.getElementById('answer');
var clickButton = document.getElementById('click');

// объявляем функцию отрисовки фона
function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

// объявляем функцию отрисовки экрана победы
function drawWinScreen() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    canvasContext.fillStyle = "tomato";
    canvasContext.font = "96px Arial";
    canvasContext.textAlign = "center";
    canvasContext.fillText("VICTORY", GAME.width / 2, GAME.height / 2);
}

// объявляем функцию отрисовки счета
function drawScore() {
    canvasContext.fillStyle = "gray";
    canvasContext.textAlign = "left";
    canvasContext.font = "32px Arial";
    canvasContext.fillText("Score: " + GAME.score, 20, 50);
}

// объявляем функцию отрисовки кликов
function drawAnswer() {
    canvasContext.fillStyle = "gray";
    canvasContext.textAlign = "right";
    canvasContext.font = "32px Arial";
    canvasContext.fillText("Answer: " + GAME.clicks, GAME.width - 30, 50);
}

// объявляем функцию отрисовки кликов
function drawQuestion() {
    canvasContext.fillStyle = "black";
    canvasContext.textAlign = "center";
    canvasContext.font = "32px Arial";
    canvasContext.fillText(GAME.question.text, GAME.width / 2, GAME.height / 2);
}

// объявляем функцию отрисовки таймера
function drawTimer() {
    if (GAME.timer > GAME.question.time) {
        canvasContext.fillStyle = "red"; // как только таймер вышел рисуем его красным
    } else {
        canvasContext.fillStyle = "green"; // пока таймер не вышел рисуем его зеленым
    }
    canvasContext.textAlign = "right";
    canvasContext.font = "20px monospace";
    canvasContext.fillText(GAME.timer.toFixed(2), GAME.width - 30, 100);
}

// объявляем функцию отрисовки кадра
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    // функции отрисовки элементов игры
    drawScore();
    drawAnswer();
    drawQuestion();
    drawTimer();
}

function updateTimer() {
    var time = new Date(); // Берем текущее время и из него вычитаем время,
                            // в которое пользователь начал решать пример
    GAME.timer = time.getTime() / 1000 - GAME.timeStartQuestion;
}

// объявляем функцию перелистывания кадров
function play() {
    if (GAME.score > 10) {
        drawWinScreen();
    } else {
        drawFrame();
        // update   - создать функцию для пересчета игры
        updateTimer(); // функция пересчета таймера
        requestAnimationFrame(play);
    }
}

function onAnswer() {
    // проверяем время ответа
    if (GAME.timer > GAME.question.time) {
        GAME.score = GAME.score - 1;
        alert('Время вышло');
    }
    // проверяем правильное ли количество кликов
    else if (GAME.clicks === GAME.question.answer) {  // сверяем с правильным ответом
        GAME.score = GAME.score + 1;
        alert('Ответ верный');
    } else {
        GAME.score = GAME.score - 1;
        alert('Ответ неверный');
    }

    GAME.clicks = 0 // сбрасываем счетчик
    chooseNewQuestion();
}

function onClick() {
    GAME.clicks = GAME.clicks + 1;
    console.log(GAME.clicks)
}

function chooseNewQuestion() {

    var levelQuestions; // создаем переменную в которую положим все вопросы текущего уровня

    if (GAME.score <= 3) {
        levelQuestions = QUESTIONS.easy;
    } else if (GAME.score <= 7) {
        levelQuestions = QUESTIONS.medium;
    } else if (GAME.score > 7) {
        levelQuestions = QUESTIONS.hard;
    }

    // эту строчку я взял из интернета, она берет случайный вопрос из массива вопросов
    var question = levelQuestions[Math.floor(Math.random() * levelQuestions.length)];
    // выбрали рендомный вопрос в зависимости от текущего уровня

    GAME.question = question;
    var currentTime = new Date()
    GAME.timeStartQuestion = currentTime.getTime() / 1000;
}

// объявляем функцию прослушивания событий
function initEventsListeners() {
    // обработчик для кнопки ответа
    answerButton.onclick = onAnswer;

    // обработчик для кнопки клика, при клике увеличиваем счетчик и выводим  его в консоль для твоей отладки
    clickButton.onclick = onClick;
}

initEventsListeners();
chooseNewQuestion();
play(); // вызываем функцию перелистывания кадров