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
const container = document.querySelector('.container');

// Handle Yes answer
function answer(choice){
  if(choice === 'yes'){
    currentQuestion++;
    if (currentQuestion < questions.length){
      if(questionEl) questionEl.textContent = questions[currentQuestion];
    }
    else{
      showGift();
    }
  }
}

// No button dodging (guarded)
if(noBtn){
  noBtn.addEventListener('mouseover', moveNoButton);
  noBtn.addEventListener('touchstart', function (e) { e.preventDefault(); moveNoButton(); }, { passive: false });
  noBtn.addEventListener('click', moveNoButton);
}

function moveNoButton(){
  // Position the No button inside the .container (so absolute positioning is relative to container)
  // Fallback to window if container is not found
  const parent = container || document.body;
  const parentRect = parent.getBoundingClientRect();

  // Use the button's own dimensions
  const btnW = noBtn ? noBtn.offsetWidth : 60;
  const btnH = noBtn ? noBtn.offsetHeight : 36;

  // Compute random position inside parent bounds with some padding
  const padding = 10;
  const maxX = Math.max(0, parentRect.width - btnW - padding * 2);
  const maxY = Math.max(0, parentRect.height - btnH - padding * 2);

  const x = padding + Math.floor(Math.random() * (maxX + 1));
  const y = padding + Math.floor(Math.random() * (maxY + 1));

  if(noBtn){
    // Because .no is absolutely positioned relative to the container, set left/top accordingly
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }
}

// Show final gift
function showGift(){
  const root = document.querySelector('.container');
  if(!root) return;
  root.innerHTML = `
    <h2>Yay! I love you too! ❤️</h2>
    <p>You are my everything 😘</p>
  `;
  launchHearts();
}

// Floating heart animation
function launchHearts(){
  setInterval(() => {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.classList.add('heart');
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, 300);
}
