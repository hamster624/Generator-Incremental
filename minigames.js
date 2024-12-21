let clickerScore = 0;
let memoryGameCards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 8;

function startClicker() {
    document.getElementById("gameArea").innerHTML = `
        <h3>Clicker Game</h3>
        <p>Click to increase score.</p>
        <button onclick="clickToIncreaseScore()">Click Me!</button>
        <p>Score: <span id="clickerScore">${clickerScore}</span></p>
        <button onclick="closeGame()">Close Game</button>
    `;
}

function clickToIncreaseScore() {
    clickerScore++;
    document.getElementById("clickerScore").textContent = clickerScore;
}

function startMemoryGame() {
    memoryGameCards = generateMemoryCards();
    matchedPairs = 0;
    flippedCards = [];
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('memory-game');

    memoryGameCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.setAttribute('data-index', index);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    document.getElementById("gameArea").innerHTML = `
        <h3>Memory Card Matching</h3>
        <p>Click to flip the cards and match pairs!</p>
        <button onclick="closeGame()">Close Game</button>
    `;
    document.getElementById("gameArea").appendChild(gameBoard);
}

function generateMemoryCards() {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cards = [...cardValues, ...cardValues];
    return shuffle(cards);
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex, temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    const cardIndex = this.getAttribute('data-index');
    this.textContent = memoryGameCards[cardIndex];
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (memoryGameCards[firstCard.getAttribute('data-index')] === memoryGameCards[secondCard.getAttribute('data-index')]) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === totalPairs) {
            alert("You Win! All pairs matched!");
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
        }, 1000);
    }

    flippedCards = [];
}

let isGameRunning = false;
let gameInterval;
let snake = [{x: 5, y: 5}];
let direction = {x: 1, y: 0};
let food = {x: 10, y: 10};
let boardSize = 20;

function startSnake() {
    const gameArea = document.getElementById("gameArea");

    if (isGameRunning) {
        gameArea.innerHTML = '';
        isGameRunning = false;
        return;
    }

    gameArea.innerHTML = `
        <h3>Snake Game</h3>
        <p>Do you want to start?</p>
        <button onclick="startGame()">Yes, Start!</button>
        <button onclick="closeGame()">No, Close</button>
    `;
}

function closeGame() {
    document.getElementById("gameArea").innerHTML = '';
}

function startGame() {
    isGameRunning = true;
    snake = [{x: 5, y: 5}];
    direction = {x: 1, y: 0};
    food = {x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize)};

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

    addMobileControls(gameBoard);
}

function updateSnakeGame(board) {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || isSnakeCollision(head)) {
        clearInterval(gameInterval);
        alert("Game Over! You hit the wall or yourself.");
        isGameRunning = false;
        document.getElementById("gameArea").innerHTML = `
            <h3>Snake Game</h3>
            <p>Game Over! Do you want to play again?</p>
            <button onclick="startGame()">Yes, Play Again</button>
            <button onclick="closeGame()">No, Close</button>
        `;
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = {x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize)};
    } else {
        snake.pop();
    }

    board.innerHTML = '';
    snake.forEach(segment => {
        const segmentElement = document.createElement('div');
        segmentElement.style.position = 'absolute';
        segmentElement.style.width = '20px';
        segmentElement.style.height = '20px';
        segmentElement.style.backgroundColor = 'green';
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

window.addEventListener('keydown', (event) => {
    if (!isGameRunning) return;

    if (event.key === 'w' || event.key === 'ArrowUp') {
        if (direction.y === 0) {
            direction = {x: 0, y: -1};
        }
    } else if (event.key === 's' || event.key === 'ArrowDown') {
        if (direction.y === 0) {
            direction = {x: 0, y: 1};
        }
    } else if (event.key === 'a' || event.key === 'ArrowLeft') {
        if (direction.x === 0) {
            direction = {x: -1, y: 0};
        }
    } else if (event.key === 'd' || event.key === 'ArrowRight') {
        if (direction.x === 0) {
            direction = {x: 1, y: 0};
        }
    }
});

function addMobileControls(board) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.position = 'absolute';
    buttonsContainer.style.bottom = '10px';
    buttonsContainer.style.left = '50%';
    buttonsContainer.style.transform = 'translateX(-50%)';
    buttonsContainer.style.display = 'flex';

    const directions = ['Up', 'Down', 'Left', 'Right'];

    directions.forEach((direction) => {
        const button = document.createElement('button');
        button.textContent = direction;
        button.style.margin = '5px';
        button.style.padding = '10px';

        button.addEventListener('click', () => {
            switch (direction) {
                case 'Up':
                    if (direction.y === 0) {
                        direction = {x: 0, y: -1};
                    }
                    break;
                case 'Down':
                    if (direction.y === 0) {
                        direction = {x: 0, y: 1};
                    }
                    break;
                case 'Left':
                    if (direction.x === 0) {
                        direction = {x: -1, y: 0};
                    }
                    break;
                case 'Right':
                    if (direction.x === 0) {
                        direction = {x: 1, y: 0};
                    }
                    break;
            }
        });

        buttonsContainer.appendChild(button);
    });

    board.appendChild(buttonsContainer);
}
