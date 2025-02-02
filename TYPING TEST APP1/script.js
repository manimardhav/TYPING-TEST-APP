const sampleTexts = [
  "In a world where time moves relentlessly forward, and each passing moment brings with it a cascade of possibilities, emotions, and unforeseen challenges, it becomes increasingly evident that life is not merely a sequence of events unfolding in isolation, but rather a complex interplay of experiences, memories, and decisions that shape our destinies in ways we often fail to comprehend until we look back with the clarity that only hindsight can provide, allowing us to piece together the intricate puzzle of our existence, recognizing that every small choice, every fleeting encounter, and every moment of doubt or confidence contributes to the grand narrative of who we ultimately become, reminding us that while the future may remain uncertain and the past unchangeable, the present moment, with all its imperfections and infinite potential, remains the only realm in which we have the power to act, to dream, to learn, to grow, and to embrace the boundless possibilities that lie ahead.",
  
  "Amidst the ever-expanding realm of human knowledge and the relentless pursuit of understanding the vast and intricate mysteries of the universe, it becomes apparent that our collective thirst for discovery, innovation, and progress serves as the driving force behind the remarkable advancements in science, technology, and philosophy, allowing us to transcend the boundaries of what was once deemed impossible and venture into uncharted territories, from unraveling the deepest secrets of the cosmos to harnessing the power of the smallest particles known to exist, while simultaneously confronting the ethical dilemmas, moral questions, and unforeseen consequences that accompany our insatiable quest for enlightenment, compelling us to reflect on the responsibilities we bear as stewards of this planet, as creators of new realities, and as architects of a future that will be shaped by the choices we make today, underscoring the profound truth that knowledge, in its purest form, is not merely about information, but about wisdom, perspective, and the relentless pursuit of a better tomorrow.",
  
  "As the sun rises over the horizon, casting its golden glow upon the world and illuminating the landscapes that have witnessed countless generations of human triumphs, tragedies, and transformations, it serves as a silent yet unwavering reminder of the cyclical nature of existence, where each dawn brings with it the promise of renewal, the opportunity to begin anew, and the chance to rewrite the story of our lives in ways that align more closely with our aspirations, our dreams, and our deepest yearnings, encouraging us to break free from the constraints of fear, doubt, and hesitation, and instead embrace the beauty of uncertainty, the power of resilience, and the infinite potential that resides within every fleeting moment, urging us to recognize that, despite the inevitable setbacks and struggles that punctuate our journeys, the essence of life lies not in the destination, but in the richness of the experiences we gather along the way, the lessons we learn, and the love we share.",
  
  "The human mind, with all its intricate complexities, boundless creativity, and profound capacity for both logic and emotion, stands as one of the greatest marvels of the natural world, serving as the vessel through which we interpret reality, construct meaning, and navigate the ever-changing landscapes of our existence, allowing us to dream beyond the confines of what is known, to imagine possibilities that defy conventional understanding, and to question, analyze, and reshape the very fabric of the reality in which we dwell, all while grappling with the paradox of being both immensely powerful and deeply vulnerable, as we struggle to reconcile our boundless ambitions with the limitations of mortality, our desire for certainty with the inescapable ambiguity of the unknown, and our yearning for connection with the inherent solitude of individual consciousness, ultimately revealing that the true essence of human experience is not in the answers we find, but in the questions we continue to ask, the mysteries we seek to unravel, and the stories we choose to tell.",
  
  "As the pages of history unfold, revealing the triumphs and tribulations of civilizations past, present, and future, it becomes increasingly evident that the course of humanity is shaped not only by the great leaders, inventors, and visionaries whose names are immortalized in books and monuments, but also by the countless unsung individuals whose quiet contributions, acts of kindness, and unwavering determination form the very foundation upon which progress is built, reminding us that the true measure of a society is not found in its wealth, power, or technological advancements alone, but in the way it treats its most vulnerable, in the values it upholds, and in the legacy it leaves for generations yet to come, compelling us to consider that, in the grand tapestry of existence, no single thread is insignificant, no effort goes unnoticed, and no act of love, kindness, or courage is ever truly in vain, for it is through these small, unseen moments that the world is changed forever."
];


// DOM Elements
const timeLeftElement = document.getElementById('timeLeft');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const resetButton = document.getElementById('resetButton');
const sampleTextElement = document.getElementById('sampleText');
const inputArea = document.getElementById('input');
const resultsElement = document.getElementById('results');
const finalWpmElement = document.getElementById('finalWpm');
const finalAccuracyElement = document.getElementById('finalAccuracy');
const finalMistakesElement = document.getElementById('finalMistakes');
const tryAgainButton = document.getElementById('tryAgainBtn');
const testButton = document.querySelector('.stat-card:last-child');

// State
let timeLeft = 60;
let isActive = false;
let timer = null;
let mistakes = 0;
let currentText = '';
let totalCharactersTyped = 0;
let totalMistakes = 0;
let correctCharacters = 0;

// Functions
function getRandomText() {
  let newText;
  do {
    newText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  } while (newText === currentText && sampleTexts.length > 1);
  return newText;
}

function updateSampleText() {
  sampleTextElement.innerHTML = currentText.split('').map((char, index) => {
    let className = 'pending';
    if (index < inputArea.value.length) {
      className = inputArea.value[index] === char ? 'correct' : 'incorrect';
    }
    return `<span class="${className}">${char}</span>`;
  }).join('');
}

function calculateWPM() {
  const minutes = (60 - timeLeft) / 60;
  return minutes > 0 ? Math.floor((correctCharacters / 5) / minutes) : 0;
}

function calculateAccuracy() {
  if (totalCharactersTyped === 0) return 100;
  return Math.max(0, Math.floor((correctCharacters / totalCharactersTyped) * 100));
}

function updateStats() {
  const wpm = calculateWPM();
  const accuracy = calculateAccuracy();
  
  wpmElement.textContent = wpm;
  accuracyElement.textContent = `${accuracy}%`;
  timeLeftElement.textContent = `${timeLeft}s`;
}

function showResults() {
  const wpm = calculateWPM();
  const accuracy = calculateAccuracy();
  
  finalWpmElement.textContent = wpm;
  finalAccuracyElement.textContent = `${accuracy}%`;
  finalMistakesElement.textContent = totalMistakes;
  
  resultsElement.classList.add('show');
}

function startTimer() {
  if (!isActive) {
    isActive = true;
    timer = setInterval(() => {
      timeLeft--;
      timeLeftElement.textContent = `${timeLeft}s`;
      
      if (timeLeft === 0) {
        clearInterval(timer);
        inputArea.disabled = true;
        showResults();
      }
    }, 1000);
  }
}

function resetTest() {
  // Reset state
  timeLeft = 60;
  isActive = false;
  mistakes = 0;
  totalMistakes = 0;
  totalCharactersTyped = 0;
  correctCharacters = 0;
  clearInterval(timer);
  
  // Reset UI
  currentText = getRandomText();
  inputArea.value = '';
  inputArea.disabled = false;
  resultsElement.classList.remove('show');
  
  // Update display
  updateSampleText();
  updateStats();
}

function changeToNewSentence() {
  // Get new text and update
  currentText = getRandomText();
  inputArea.value = '';
  mistakes = 0;
  
  // Update display
  updateSampleText();
  updateStats();
}

// Event Listeners
inputArea.addEventListener('input', (e) => {
  if (e.target.value.length === 1) {
    startTimer();
  }

  const inputText = e.target.value;
  mistakes = 0;
  correctCharacters = 0;
  totalCharactersTyped = inputText.length;

  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === currentText[i]) {
      correctCharacters++;
    } else {
      mistakes++;
    }
  }

  // Total mistakes should only count actual errors, not previous ones
  totalMistakes = mistakes;

  // Check if the sentence is completed
  if (inputText === currentText.trim() && timeLeft > 0) {
    changeToNewSentence();
  }

  updateSampleText();
  updateStats();
});

// Initialize Lucide icons and add event listeners after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Add event listeners
  resetButton.addEventListener('click', resetTest);
  tryAgainButton.addEventListener('click', resetTest);
  testButton.addEventListener('click', resetTest);
  
  // Initialize the test
  resetTest();
});
