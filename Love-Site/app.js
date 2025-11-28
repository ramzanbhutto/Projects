const questions = [
  "Do you love me? ❤️",
  "Will you always be with me? 💍",
  "Do you think about me every day? 🥰",
  "Would you like to go on a date with me soon? 🍽️",
  "Will you Hug and Kiss me😘?",
  "Do you promise to never break my heart? 💖"
];

let currentQuestion = 0;
const questionEl = document.getElementById('question');
const noBtn = document.getElementById('noBtn');

// Handle Yes answer
function answer(choice) {
  if (choice === 'yes') {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      questionEl.textContent = questions[currentQuestion];
    } else {
      showGift();
    }
  }
}

// No button dodging
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);

function moveNoButton() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Show final gift
function showGift() {
  document.querySelector('.container').innerHTML = `
    <h2>Yay! I love you too! ❤️</h2>
    <p>You are my everything 😘</p>
  `;
  launchHearts();
}

// Floating heart animation
function launchHearts() {
  setInterval(() => {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.classList.add('heart');
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, 300);
}
