let clickerScore = 0;
let memoryGameCards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 8;

function startClicker() {
    document.getElementById("gameArea").innerHTML = `
        <h3>Clicker Game</h3>
        <p>Click to increase your score—just a heads-up, this won’t affect your main game stats.</p>
        <button onclick="clickToIncreaseScore()">Click Me!</button>
        <p>Score: <span id="clickerScore">${clickerScore}</span></p>
        <button onclick="closeGame()">Close Game</button>
    `;
}

function clickToIncreaseScore() {
    clickerScore++;
    document.getElementById("clickerScore").textContent = clickerScore;
}
const memoryGameState = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    totalPairs: 0,
    lockBoard: false,
};

function resetMemoryGameState() {
    const values = [];
    const numPairs = 12;
    for (let i = 1; i <= numPairs; i++) {
        values.push(i, i);
    }
    values.push(null);

    for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
    }

    memoryGameState.cards = values.map(value => ({
        value,
        matched: false,
    }));
    memoryGameState.flippedCards = [];
    memoryGameState.matchedPairs = 0;
    memoryGameState.totalPairs = numPairs;
    memoryGameState.lockBoard = false;
}

function startMemoryGame() {
    if (memoryGameState.cards.length === 0) {
        resetMemoryGameState();
    }
    renderMemoryGame();
}

function renderMemoryGame() {
    const gameArea = document.getElementById("gameArea");
    gameArea.innerHTML = `<h3>Memory Game</h3>
    <button onclick="resetMemoryGameState(); renderMemoryGame();">Shuffle</button>
    <button onclick="closeGame()">Close Game</button>`;
    const board = document.createElement("div");
    board.classList.add("memory-board");

    memoryGameState.cards.forEach((card, index) => {
        if (!card.value) return;

        const cardElement = document.createElement("div");
        cardElement.classList.add("memory-card");

        if (card.matched || memoryGameState.flippedCards.includes(index)) {
            cardElement.classList.add("flipped");
            cardElement.textContent = card.value;
        } else {
            cardElement.textContent = '';
        }

        cardElement.addEventListener("click", () => flipMemoryCard(index));
        board.appendChild(cardElement);
    });

    board.style.display = "grid";
    board.style.gridTemplateColumns = "repeat(5, 1fr)";
    board.style.gap = "5px";
    gameArea.appendChild(board);
}

function flipMemoryCard(index) {
    if (memoryGameState.lockBoard || memoryGameState.flippedCards.includes(index) || memoryGameState.cards[index].matched) return;

    memoryGameState.flippedCards.push(index);
    renderMemoryGame();

    if (memoryGameState.flippedCards.length === 2) {
        memoryGameState.lockBoard = true;
        setTimeout(checkMemoryMatch, 1000);
    }
}

function checkMemoryMatch() {
    const [firstIndex, secondIndex] = memoryGameState.flippedCards;
    const firstCard = memoryGameState.cards[firstIndex];
    const secondCard = memoryGameState.cards[secondIndex];

    if (firstCard.value === secondCard.value) {
        firstCard.matched = true;
        secondCard.matched = true;
        memoryGameState.matchedPairs++;

        if (memoryGameState.matchedPairs === memoryGameState.totalPairs) {
            setTimeout(() => {
                alert("You Win! All pairs matched!");
                resetMemoryGameState();
                renderMemoryGame();
            }, 500);
        }
    }

    memoryGameState.flippedCards = [];
    memoryGameState.lockBoard = false;
    renderMemoryGame();
}

function saveMemoryGameStateToSaveGame(saveData) {
    saveData.memoryGame = {
        cards: memoryGameState.cards.map(card => ({
            value: card.value,
            matched: card.matched
        })),
        flippedCards: memoryGameState.flippedCards,
        matchedPairs: memoryGameState.matchedPairs,
        totalPairs: memoryGameState.totalPairs,
    };
}

function loadMemoryGameStateFromSaveGame(saveData) {
    if (saveData.memoryGame) {
        memoryGameState.cards = saveData.memoryGame.cards.map(card => ({
            value: card.value,
            matched: card.matched
        }));
        memoryGameState.flippedCards = saveData.memoryGame.flippedCards;
        memoryGameState.matchedPairs = saveData.memoryGame.matchedPairs;
        memoryGameState.totalPairs = saveData.memoryGame.totalPairs;
        memoryGameState.lockBoard = false;
    } else {
        resetMemoryGameState();
    }
}

let isGameRunning = false;
let gameInterval;
let snake = [{x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}];  // Start with 3 segments
let direction = {x: 1, y: 0};
let food = {x: 10, y: 10};
let boardSize = 20;

function startSnake() {
    isGameRunning = true;
    snake = [{x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}];  // Start with 3 segments
    direction = {x: 1, y: 0};
    food = generateFood();

    document.getElementById("gameArea").innerHTML = `
        <h3>Snake Game</h3>
        <p>Use W, A, S, D or Arrow keys to move the snake.</p>
        <button onclick="closeGame()">Close Game</button>
    `;
    
    const gameBoard = document.createElement('div');
    gameBoard.style.width = '400px';
    gameBoard.style.height = '400px';
    gameBoard.style.position = 'relative';
    gameBoard.style.border = '1px solid black';
    gameBoard.style.margin = 'auto';
    gameBoard.style.backgroundColor = '#f1f1f1';
    document.getElementById('gameArea').appendChild(gameBoard);

    gameInterval = setInterval(() => {
        updateSnakeGame(gameBoard);
    }, 200);

    addMobileControls();
}

function generateFood() {
    let newFood;
    do {
        newFood = {x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize)};
    } while (isFoodOnSnake(newFood));
    return newFood;
}

function isFoodOnSnake(food) {
    return snake.some(segment => segment.x === food.x && segment.y === food.y);
}

function updateSnakeGame(board) {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || isSnakeCollision(head)) {
        clearInterval(gameInterval);
        isGameRunning = false;
        document.getElementById("gameArea").innerHTML = `
            <h3>Snake Game</h3>
            <p>Game Over! Do you want to play again?</p>
            <button onclick="startSnake()">Yes, Play Again</button>
            <button onclick="closeGame()">No, Close</button>
        `;
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }

    board.innerHTML = '';
    snake.forEach((segment, index) => {
        const segmentElement = document.createElement('div');
        segmentElement.style.position = 'absolute';
        segmentElement.style.width = '20px';
        segmentElement.style.height = '20px';
        segmentElement.style.backgroundColor = index === 0 ? 'darkgreen' : 'green';  // Head is darker
        segmentElement.style.borderRadius = '50%';  // Make the snake round
        segmentElement.style.left = `${segment.x * 20}px`;
        segmentElement.style.top = `${segment.y * 20}px`;
        board.appendChild(segmentElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.position = 'absolute';
    foodElement.style.width = '20px';
    foodElement.style.height = '20px';
    foodElement.style.backgroundColor = 'red';
    foodElement.style.left = `${food.x * 20}px`;
    foodElement.style.top = `${food.y * 20}px`;
    board.appendChild(foodElement);
}

function isSnakeCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

function closeGame() {
    document.getElementById("gameArea").innerHTML = '';
}

function addMobileControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.style.position = 'absolute';
    controlsContainer.style.bottom = '10px';
    controlsContainer.style.left = '50%';
    controlsContainer.style.transform = 'translateX(-50%)';
    controlsContainer.style.display = 'flex';

    const directions = ['↑', '↓', '←', '→'];

    directions.forEach((directionLabel) => {
        const button = document.createElement('button');
        button.textContent = directionLabel;
        button.style.margin = '5px';
        button.style.padding = '10px';

        button.addEventListener('click', () => {
            if (!isGameRunning) return;
            if (directionLabel === '↑' && direction.y === 0) {
                direction = {x: 0, y: -1};
            } else if (directionLabel === '↓' && direction.y === 0) {
                direction = {x: 0, y: 1};
            } else if (directionLabel === '←' && direction.x === 0) {
                direction = {x: -1, y: 0};
            } else if (directionLabel === '→' && direction.x === 0) {
                direction = {x: 1, y: 0};
            }
        });

        controlsContainer.appendChild(button);
    });

    document.getElementById('gameArea').appendChild(controlsContainer);
}
window.addEventListener('keydown', (event) => {
    if (!isGameRunning) return;

    if (event.key === 'w' || event.key === 'ArrowUp') {
        if (direction.y === 0) direction = {x: 0, y: -1};
    } else if (event.key === 's' || event.key === 'ArrowDown') {
        if (direction.y === 0) direction = {x: 0, y: 1};
    } else if (event.key === 'a' || event.key === 'ArrowLeft') {
        if (direction.x === 0) direction = {x: -1, y: 0};
    } else if (event.key === 'd' || event.key === 'ArrowRight') {
        if (direction.x === 0) direction = {x: 1, y: 0};
    }
});
