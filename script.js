class RockPaperScissors {
  constructor() {
    this.choices = ['rock', 'paper', 'scissors'];

    this.extendedChoices = ['rock', 'paper', 'scissors', 'lizard', 'spock']; // Bonus mode
    this.isBonusMode = false; // Tracks whether bonus mode is active

    this.score = 0;
    this.model = document.getElementById('model');
    this.overlay = document.getElementById('model-overlay');
    this.section1 = document.getElementById('section1');
    this.section2 = document.getElementById('section2');
    this.userChoiceImg = document.getElementById('user-choice-img');
    this.userChoiceBg = document.getElementById('user-choice-img');
    this.computerChoiceImg = document.getElementById('computer-choice-img');
    this.computerChoiceBg = document.getElementById('computer-choice-img');
    this.scoreElement = document.getElementById('score');
    this.gameResult = document.getElementById('game-result');
    this.playAgainBtn = document.getElementById('play-again');

    this.overlay.addEventListener('click', () => this.closeModel());
    this.playAgainBtn.addEventListener('click', () => this.resetGame());
  }

  playGame(userChoice) {
    let options;
    options = this.isBonusMode ? 5 : 3;
    const computerChoice = this.choices[Math.floor(Math.random() * options)];

    this.section1.classList.add('hidden');
    this.section2.classList.remove('hidden');

    // Update user choice display
    this.userChoiceBg.className = `main__choice main__choice--${userChoice}`;
    this.userChoiceImg.src = `./images/icon-${userChoice}.svg`;
    this.userChoiceImg.alt = userChoice;

    // Update computer choice display
    this.computerChoiceBg.className = `main__choice main__choice--${computerChoice}`;
    this.computerChoiceImg.src = `./images/icon-${computerChoice}.svg`;
    this.computerChoiceImg.alt = computerChoice;

    const result = this.determineWinner(userChoice, computerChoice);
    this.updateScore(result);
  }

  toggleBonusMode() {
    this.isBonusMode = !this.isBonusMode;

    // Toggle choices between standard and bonus mode
    this.choices = this.isBonusMode
      ? this.extendedChoices
      : ['rock', 'paper', 'scissors'];

    // Toggle visibility of Lizard and Spock buttons
    document.getElementById('lizard').classList.toggle('hidden');
    document.getElementById('spock').classList.toggle('hidden');

    // Change the background path image
    const pathImage = document.getElementById('game-path');
    pathImage.src = this.isBonusMode
      ? './images/bg-pentagon.svg'
      : './images/bg-triangle.svg';

    // Switching the classic button to bonus button classes
    const paperButton = document.getElementById('paper');
    const scissorsButton = document.getElementById('scissors');
    const rockButton = document.getElementById('rock');

    if (this.isBonusMode) {
      paperButton.classList.remove('paper');
      paperButton.classList.add('paper-bonus');
      scissorsButton.classList.remove('scissors');
      scissorsButton.classList.add('scissors-bonus');
      rockButton.classList.remove('rock');
      rockButton.classList.add('rock-bonus');
    } else {
      paperButton.classList.add('paper');
      paperButton.classList.remove('paper-bonus');
      scissorsButton.classList.add('scissors');
      scissorsButton.classList.remove('scissors-bonus');
      rockButton.classList.add('rock');
      rockButton.classList.remove('rock-bonus');
    }

    // Switching Rules between the game modes
    const rulesImg = document.getElementById('rulesImg');
    rulesImg.src = this.isBonusMode
      ? './images/image-rules-bonus.svg'
      : './images/image-rules.svg';

    // Update UI to reflect the mode
    document.querySelector('.footer__bonus').textContent = this.isBonusMode
      ? 'Standard Mode'
      : 'Bonus Mode';
  }

  updateChoiceDisplay(element, choice) {
    element.parentElement.className = `main__choice ${choice}`;
    element.src = `./images/icon-${choice}.svg`;
    element.alt = choice;
  }

  determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) return 'DRAW';

    const winConditions = {
      rock: ['scissors', 'lizard'],
      paper: ['rock', 'spock'],
      scissors: ['paper', 'lizard'],
      lizard: ['spock', 'paper'],
      spock: ['scissors', 'rock'],
    };

    if (winConditions[userChoice].includes(computerChoice)) {
      this.score++;
      return 'YOU WIN';
    } else {
      this.score--;
      return 'YOU LOSE';
    }
  }

  updateScore(result) {
    this.gameResult.textContent = result;
    this.scoreElement.textContent = this.score;
  }

  resetGame() {
    this.section2.classList.add('hidden');
    this.section1.classList.remove('hidden');
  }

  openModel() {
    this.model.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
  }

  closeModel() {
    this.model.classList.add('hidden');
    this.overlay.classList.add('hidden');
  }
}

const game = new RockPaperScissors();

// Attach event listeners to buttons
document.querySelectorAll('.main__choice').forEach((button) => {
  button.addEventListener('click', (e) => game.playGame(e.currentTarget.id));
});

document.querySelector('.footer__bonus').addEventListener('click', () => {
  game.toggleBonusMode();
});

document
  .getElementById('rulesBtn')
  .addEventListener('click', () => game.openModel());
document
  .getElementById('close')
  .addEventListener('click', () => game.closeModel());
