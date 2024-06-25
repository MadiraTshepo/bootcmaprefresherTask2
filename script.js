// Array to hold all the cards
const cardsArray = [
    { id: 1, letter: 'A' },
    { id: 2, letter: 'A' },
    { id: 3, letter: 'B' },
    { id: 4, letter: 'B' },
    { id: 5, letter: 'C' },
    { id: 6, letter: 'C' },
    { id: 7, letter: 'D' },
    { id: 8, letter: 'D' },
    { id: 9, letter: 'E' },
    { id: 10, letter: 'E' },
    { id: 11, letter: 'F' },
    { id: 12, letter: 'F' },
    { id: 13, letter: 'G' },
    { id: 14, letter: 'G' },
    { id: 15, letter: 'H' },
    { id: 16, letter: 'H' }
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let pairsFound = 0;

// Shuffle function to randomize card positions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to create game board
function createBoard() {
    shuffle(cardsArray);
    const gameBoard = document.querySelector('.game-board');

    cardsArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'hidden');
        cardElement.dataset.id = card.id;
        cardElement.innerHTML = `<span class="front">${card.letter}</span>`;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Function to handle card flipping
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.remove('hidden');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Function to check if two flipped cards match
function checkForMatch() {
    let isMatch = firstCard.dataset.id === secondCard.dataset.id;

    isMatch ? disableCards() : unflipCards();
}

// Function to disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    pairsFound++;
    if (pairsFound === 8) {
        setTimeout(() => {
            alert('Congratulations! You won the game!');
        }, 500);
    }

    resetBoard();
}

// Function to unflip cards if they don't match
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');

        resetBoard();
    }, 1000);
}

// Function to reset board after each turn
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Function to restart the game
function restartGame() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';
    pairsFound = 0;
    createBoard();
}

// Initialize the game board
createBoard();

