const overlay = document.getElementById('openingOverlay');
const fireworksLayer = document.getElementById('fireworksLayer');
const confettiLayer = document.getElementById('confettiLayer');
const musicToggle = document.getElementById('musicToggle');
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseOverlay = document.getElementById('surpriseOverlay');
const sparkleLayer = document.getElementById('sparkleLayer');
const skipIntro = document.getElementById('skipIntro');
const themeToggle = document.getElementById('themeToggle');
const shareBtn = document.getElementById('shareBtn');
const copyStatus = document.getElementById('copyStatus');
const moodBtn = document.getElementById('moodBtn');
const moodOutput = document.getElementById('moodOutput');
const cakeButton = document.getElementById('cakeButton');
const cakeStatus = document.getElementById('cakeStatus');
let birthdayAudioContext;
let birthdayMasterGain;
let melodyTimer;
let melodyOscillators = [];

const birthdayEnergies = [
  'Soft smiles, loud laughter, and a little extra sparkle.',
  'Main-character energy with a side of delicious cake.',
  'Golden sunlight, kind words, and your favorite people close by.',
  'A heart full of gratitude and a day worth remembering.'
];

const birthdayMelody = [
  [523.25, 0.55], [659.25, 0.55], [783.99, 0.7], [659.25, 0.55],
  [587.33, 0.55], [698.46, 0.55], [880, 0.8], [698.46, 0.55],
  [523.25, 0.55], [659.25, 0.55], [783.99, 0.7], [1046.5, 1]
];

function playMelody() {
  let noteStart = birthdayAudioContext.currentTime + 0.05;
  birthdayMelody.forEach(([frequency, duration]) => {
    const oscillator = birthdayAudioContext.createOscillator();
    const noteGain = birthdayAudioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    noteGain.gain.setValueAtTime(0.001, noteStart);
    noteGain.gain.linearRampToValueAtTime(0.12, noteStart + 0.06);
    noteGain.gain.exponentialRampToValueAtTime(0.001, noteStart + duration);
    oscillator.connect(noteGain);
    noteGain.connect(birthdayMasterGain);
    oscillator.start(noteStart);
    oscillator.stop(noteStart + duration + 0.05);
    melodyOscillators.push(oscillator);
    noteStart += duration + 0.08;
  });
}

function startBirthdayTone() {
  birthdayAudioContext = new (window.AudioContext || window.webkitAudioContext)();
  birthdayMasterGain = birthdayAudioContext.createGain();
  birthdayMasterGain.gain.value = 0.55;
  birthdayMasterGain.connect(birthdayAudioContext.destination);
  playMelody();
  melodyTimer = setInterval(playMelody, 7200);
}

function stopBirthdayTone() {
  clearInterval(melodyTimer);
  melodyOscillators.forEach((oscillator) => {
    try {
      oscillator.stop();
    } catch {
    }
  });
  melodyOscillators = [];
  birthdayAudioContext.close();
  birthdayAudioContext = null;
}

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

function celebrate() {
  createConfetti();
  createFireworks();
  showSurprise();
}

musicToggle.addEventListener('click', () => {
  if (!birthdayAudioContext) {
    startBirthdayTone();
    musicToggle.textContent = '♪';
    musicToggle.setAttribute('aria-label', 'Pause the birthday tone');
  } else {
    stopBirthdayTone();
    musicToggle.textContent = '♫';
    musicToggle.setAttribute('aria-label', 'Play the birthday tone');
  }
});

surpriseBtn.addEventListener('click', (event) => {
  event.preventDefault();
  celebrate();
});

skipIntro.addEventListener('click', removeOverlay);

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');
  themeToggle.textContent = isLight ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to the dark theme' : 'Switch to the light theme');
});

shareBtn.addEventListener('click', async () => {
  const message = 'Happy Birthday, Dr Komal! May your day be full of roses, sparkle, and sweet surprises.';
  try {
    await navigator.clipboard.writeText(message);
    copyStatus.textContent = 'Birthday message copied.';
  } catch {
    copyStatus.textContent = message;
  }
  setTimeout(() => {
    copyStatus.textContent = '';
  }, 3200);
});

moodBtn.addEventListener('click', () => {
  const currentMood = birthdayEnergies.indexOf(moodOutput.textContent);
  const nextMood = birthdayEnergies[(currentMood + 1) % birthdayEnergies.length];
  moodOutput.classList.remove('mood-refresh');
  void moodOutput.offsetWidth;
  moodOutput.textContent = nextMood;
  moodOutput.classList.add('mood-refresh');
});

cakeButton.addEventListener('click', () => {
  const candlesOut = cakeButton.classList.toggle('candles-out');
  cakeButton.setAttribute('aria-label', candlesOut ? 'Relight the birthday candles' : 'Blow out the birthday candles');
  cakeStatus.textContent = candlesOut ? 'Wish made! May it come true.' : 'Tap the cake to make a wish';
  if (candlesOut) {
    createConfetti();
  }
});

createFireworks();
createConfetti();
setTimeout(removeOverlay, 3600);
setInterval(createFireworks, 4000);
setInterval(createConfetti, 2800);
