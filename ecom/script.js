const questions = [
  { question: "What is the capital of India?", options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"], answer: "New Delhi" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
  { question: "Who wrote 'Harry Potter'?", options: ["J.K. Rowling", "Enid Blyton", "Dan Brown", "George R.R. Martin"], answer: "J.K. Rowling" },
  { question: "What is the largest ocean?", options: ["Atlantic", "Arctic", "Indian", "Pacific"], answer: "Pacific" },
  { question: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Transfer Machine Language", "None"], answer: "Hyper Text Markup Language" },
  { question: "Which gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
  { question: "Which language is used to style web pages?", options: ["HTML", "Python", "CSS", "Java"], answer: "CSS" },
  { question: "Which is the largest mammal?", options: ["Elephant", "Whale", "Giraffe", "Shark"], answer: "Whale" },
  { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
  { question: "Who painted the Mona Lisa?", options: ["Picasso", "Leonardo da Vinci", "Van Gogh", "Michelangelo"], answer: "Leonardo da Vinci" }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("time");
const resultBox = document.getElementById("result");
const scoreEl = document.getElementById("score");
const quizBox = document.getElementById("quiz-box");

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = timeLeft;
  startTimer();

  const current = questions[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${current.question}`;
  optionsEl.innerHTML = "";

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn, option);
    optionsEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
}

function checkAnswer(button, selected) {
  const correct = questions[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else if (btn.textContent === selected) {
      btn.classList.add("wrong");
    }
  });

  if (selected === correct) score++;
  clearInterval(timer);
  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer({ textContent: "" }, ""); // time's up = wrong
    }
  }, 1000);
}

function endQuiz() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

nextBtn.addEventListener("click", nextQuestion);

// Start the game
showQuestion();
