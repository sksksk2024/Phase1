const choices = ['rock', 'paper', 'scissors'];
let score = 0;

const model = document.getElementById('model');
const overlay = document.getElementById('model-overlay');

function playGame(userChoice) {
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  let result = '';
  const section1 = document.getElementById('section1');
  const section2 = document.getElementById('section2');
  const userChoiceImg = document.getElementById('user-choice-img');
  const userChoiceBg = document.getElementById('user-choice-img');
  const computerChoiceImg = document.getElementById('computer-choice-img');
  const computerChoiceBg = document.getElementById('computer-choice-img');

  section1.classList.add('hidden');
  section2.classList.remove('hidden');
  computerChoiceBg.classList.remove(`main__choice--${computerChoice}`);
  computerChoiceBg.classList = `main__choice--${computerChoice}`;
  computerChoiceImg.src = `./images/icon-${computerChoice}.svg`;
  computerChoiceImg.alt = computerChoice;

  userChoiceBg.classList.remove(`main__choice--${userChoice}`);
  userChoiceBg.classList = `main__choice--${userChoice}`;

  userChoiceImg.src = `./images/icon-${userChoice}.svg`;
  userChoiceImg.alt = userChoice;

  if (userChoice === computerChoice) {
    result = 'DRAW';
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = 'YOU WIN';
    score++;
  } else {
    result = 'YOU LOSE';
    score--;
  }

  document.getElementById('score').textContent = `${score}`;

  document.getElementById('game-result').textContent = `${result}`;
  const again = document.getElementById('play-again');
  again.addEventListener('click', () => {
    section2.classList.add('hidden');
    section1.classList.remove('hidden');
  });
}

const openModel = () => {
  model.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModel = () => {
  model.classList.add('hidden');
  overlay.classList.add('hidden');
};

overlay.addEventListener('click', closeModel);
