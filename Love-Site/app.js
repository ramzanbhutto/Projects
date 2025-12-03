const questions = [
  "Do you feel too shy to talk, just like I do? ❤️",
  "Do you ever imagine how our first real conversation will feel? 🥰",
  "Do you believe in love that waits? ⏲️",
  "Do you hope for a future where two shy people build a home together?  ",
  "If one day I gather the courage to tell you everything… will your answer be a soft ‘yes’? 💞"
];

let currentQuestion = 0;
const questionEl = document.getElementById('question');
const noBtn = document.getElementById('noBtn');
const container = document.querySelector('.container');
let isMoving = false;

// Handle Yes answer
function answer(choice) {
  if (choice === 'yes') {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      if (questionEl) questionEl.textContent = questions[currentQuestion];
    } else {
      showGift();
    }
  }
}

// No button dodging - move BEFORE hover/click happens
if (noBtn) {
  noBtn.addEventListener('mouseenter', moveNoButton);
  noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveNoButton();
  }, { passive: false });
  
  // Also move on click attempt
  noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    moveNoButton();
  });
}

function moveNoButton() {
  if (isMoving) return; // Prevent multiple simultaneous moves
  isMoving = true;
  
  noBtn.style.position = "absolute";
  if (!noBtn || !container) {
    isMoving = false;
    return;
  }
  
  const containerRect = container.getBoundingClientRect();
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  
  // Create a safe zone around the button's current position
  const currentLeft = parseInt(noBtn.style.left) || 0;
  const currentTop = parseInt(noBtn.style.top) || 0;
  
  const padding = 20;
  const maxX = containerRect.width - btnW - padding * 2;
  const maxY = containerRect.height - btnH - padding * 2;
  
  let newX, newY;
  let attempts = 0;
  const maxAttempts = 20;
  
  // Keep trying until we find a position far enough from current position
  do {
    newX = padding + Math.floor(Math.random() * (maxX + 1));
    newY = padding + Math.floor(Math.random() * (maxY + 1));
    attempts++;
    
    // Calculate distance from current position
    const distance = Math.sqrt(Math.pow(newX - currentLeft, 2) + Math.pow(newY - currentTop, 2));
    
    // If distance is greater than 100px, use this position
    if (distance > 100 || attempts >= maxAttempts) {
      break;
    }
  } while (attempts < maxAttempts);
  
  // Apply the new position
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
  
  // Add a small delay before allowing next move
  setTimeout(() => {
    isMoving = false;
  }, 200);
}

// Show final gift
function showGift() {
  const root = document.querySelector('.container');
  if (!root) return;
  root.innerHTML = `
    <h2>I'll wait for you ❤️</h2>
    <p>You are my everything 💞</p>
    <p>Still have no one to share it with!🤍</p>
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
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, 300);
}
