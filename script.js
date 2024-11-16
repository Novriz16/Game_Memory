const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let attempts = 0;
let flippedCards = [];
let matchedPairs = 0;

function shuffleCards(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createGameBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  const shuffledCards = shuffleCards([...cardsArray]);
  
  shuffledCards.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

function checkForMatch() {
  attempts++;
  document.getElementById('attempts').textContent = attempts;
  
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    matchedPairs++;
    flippedCards = [];

    if (matchedPairs === cardsArray.length / 2) {
      setTimeout(() => alert('Selamat! Anda menyelesaikan permainan!'), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

document.getElementById('start-button').addEventListener('click', () => {
  attempts = 0;
  matchedPairs = 0;
  document.getElementById('attempts').textContent = attempts;
  createGameBoard();
});
