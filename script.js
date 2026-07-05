const dayEl = document.getElementById('days');
const hourEl = document.getElementById('hours');
const minuteEl = document.getElementById('minutes');
const secondEl = document.getElementById('seconds');
const overlay = document.getElementById('openingOverlay');
const fireworksLayer = document.getElementById('fireworksLayer');
const confettiLayer = document.getElementById('confettiLayer');
const musicToggle = document.getElementById('musicToggle');
const birthdaySong = document.getElementById('birthdaySong');
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseOverlay = document.getElementById('surpriseOverlay');
const sparkleLayer = document.getElementById('sparkleLayer');

function createFireworks() {
  const colors = ['#ff6ea8', '#ffd166', '#7b5cff', '#ffffff', '#ff9d9d'];
  for (let i = 0; i < 24; i += 1) {
    const firework = document.createElement('span');
    firework.className = 'firework';
    firework.style.left = `${Math.random() * 100}%`;
    firework.style.top = `${Math.random() * 100}%`;
    firework.style.color = colors[Math.floor(Math.random() * colors.length)];
    firework.style.setProperty('--x', `${(Math.random() - 0.5) * 220}px`);
    firework.style.setProperty('--y', `${(Math.random() - 0.5) * 220}px`);
    firework.style.animationDelay = `${Math.random() * 0.35}s`;
    fireworksLayer.appendChild(firework);
    setTimeout(() => firework.remove(), 1700);
  }
}

function removeOverlay() {
  overlay.classList.add('hidden');
}

function createConfetti() {
  const colors = ['#ff6ea8', '#ffd166', '#7b5cff', '#ffffff', '#ff9d9d'];
  for (let i = 0; i < 26; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--drift', `${(Math.random() - 0.5) * 220}px`);
    piece.style.animationDuration = `${3.6 + Math.random() * 2.2}s`;
    piece.style.animationDelay = `${Math.random() * 0.2}s`;
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 6200);
  }
}

function createSparkles() {
  sparkleLayer.innerHTML = '';
  for (let i = 0; i < 16; i += 1) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${45 + Math.random() * 10}%`;
    sparkle.style.top = `${35 + Math.random() * 30}%`;
    sparkle.style.setProperty('--dx', `${(Math.random() - 0.5) * 90}px`);
    sparkle.style.setProperty('--dy', `${(Math.random() - 0.5) * 90}px`);
    sparkle.style.animationDelay = `${Math.random() * 0.15}s`;
    sparkleLayer.appendChild(sparkle);
  }
}

function showSurprise() {
  surpriseOverlay.classList.add('show');
  surpriseOverlay.setAttribute('aria-hidden', 'false');
  createConfetti();
  createSparkles();
  setTimeout(() => {
    surpriseOverlay.classList.remove('show');
    surpriseOverlay.setAttribute('aria-hidden', 'true');
  }, 2600);
}

musicToggle.addEventListener('click', () => {
  if (birthdaySong.paused) {
    birthdaySong.play().catch(() => {});
    musicToggle.textContent = '♪';
  } else {
    birthdaySong.pause();
    musicToggle.textContent = '♫';
  }
});

function getNextBirthday() {
  const today = new Date();
  const target = new Date(today.getFullYear(), 6, 5);
  if (target < today) {
    target.setFullYear(target.getFullYear() + 1);
  }
  return target;
}

function updateCountdown() {
  const target = getNextBirthday();
  const diff = target - new Date();

  if (diff <= 0) {
    dayEl.textContent = '00';
    hourEl.textContent = '00';
    minuteEl.textContent = '00';
    secondEl.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  dayEl.textContent = String(days).padStart(2, '0');
  hourEl.textContent = String(hours).padStart(2, '0');
  minuteEl.textContent = String(minutes).padStart(2, '0');
  secondEl.textContent = String(seconds).padStart(2, '0');
}

surpriseBtn.addEventListener('click', (event) => {
  event.preventDefault();
  showSurprise();
});

updateCountdown();
createFireworks();
createConfetti();
setTimeout(removeOverlay, 3600);
setInterval(updateCountdown, 1000);
setInterval(createFireworks, 4000);
setInterval(createConfetti, 2800);
