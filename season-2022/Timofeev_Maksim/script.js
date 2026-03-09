// Display/UI

 // Статусы плиток, сщздание доски, пометка плиток, раскрытие плиток, выйгрыш, пройгрыш
import { TILE_STATUSES, createBoard, markTile, revealTile, checkWin, chrckLose } from "./mineaweeper.js";     


// Создание доски
const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 20;
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector('.board');
const minesLeftText = document.querySelector('[data-mine-count]');
const messageText = document.querySelector('.subtext');


// Настройка доски
board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element);
        
        tile.element.addEventListener('click', () => {
            revealTile(board, tile);
            checkGameEnd();
        });
       
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault();
            markTile(tile);
            listMinesLeft();
        });
    });
});


// Создание доски
boardElement.style.setProperty("--size", BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;


// Список мин
function listMinesLeft() {
    const markTilesCount = board.reduce((count, row) => {

        return (
            count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length);

    }, 0);

    minesLeftText.textContent = NUMBER_OF_MINES - markTilesCount;
}


// Окончание  игры
function checkGameEnd() {
    const win = checkWin(board);
    const lose = chrckLose(board);

    if (win || lose) {
        boardElement.addEventListener('click', stopProp, { capture: true });
        boardElement.addEventListener('contextmenu', stopProp, { capture: true });
    }

    if (win) {
        messageText.textContent = 'Тебе повезло';
    }

    if (lose) {
        messageText.textContent = 'Ты взорвался';
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === TILE_STATUSES.MARKED) markTile(tile);
                if (tile.mine) revealTile(board, tile);
            });
        });
    }

}


function stopProp(e) {
    e.stopImmediatePropagation();
}


