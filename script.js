// Get DOM elements
const languageSelect = document.getElementById("language-select");
const difficultySelect = document.getElementById("difficulty-select");
const startBtn = document.getElementById("start-btn");
const quizContent = document.getElementById("quiz-content");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");
const starBadge = document.getElementById("star-badge");

let quizData = [];
let currentQuestion = 0;
let score = 0;

// Quiz Questions for all languages & levels
const allQuizzes = {
  javascript: {
    easy: [
      { question: "What is used to declare a variable in JS?", options: ["let", "val", "int", "variable"], answer: "let" },
      { question: "Which company developed JavaScript?", options: ["Google", "Netscape", "Microsoft", "Apple"], answer: "Netscape" },
      { question: "What symbol is used for comments in JS?", options: ["//", "<!--", "#", "**"], answer: "//" },
      { question: "Which is a JavaScript data type?", options: ["String", "Int", "Decimal", "Char"], answer: "String" },
      { question: "Which is correct?", options: ["if x = 5 then", "if (x == 5)", "if x == 5:", "if x = 5:"], answer: "if (x == 5)" }
    ],
    medium: [
      { question: "Which method converts JSON to object?", options: ["JSON.convert", "JSON.parse", "JSON.stringify", "JSON.object"], answer: "JSON.parse" },
      { question: "typeof null returns?", options: ["'null'", "'object'", "'undefined'", "'number'"], answer: "'object'" },
      { question: "What is closure in JS?", options: ["A data type", "Function inside function", "Block of memory", "Array method"], answer: "Function inside function" },
      { question: "What is the default value of `this` in a method?", options: ["null", "undefined", "window", "Object itself"], answer: "Object itself" },
      { question: "Which array method adds to end?", options: ["push()", "pop()", "shift()", "unshift()"], answer: "push()" }
    ],
    hard: [
      { question: "What does 'use strict' do?", options: ["Enables new JS engine", "Disables variables", "Strict parsing and error handling", "Nothing"], answer: "Strict parsing and error handling" },
      { question: "Which executes first in JS?", options: ["setTimeout", "Promise", "console.log", "setInterval"], answer: "console.log" },
      { question: "Which is NOT a loop in JS?", options: ["for", "foreach", "while", "do...while"], answer: "foreach" },
      { question: "What is event bubbling?", options: ["Order of function call", "Event propagating from child to parent", "Reverse event", "None"], answer: "Event propagating from child to parent" },
      { question: "Which keyword is used to handle exceptions?", options: ["try/catch", "handle", "except", "onerror"], answer: "try/catch" }
    ]
  },
  python: {
    easy: [
      { question: "Python is a ___ language", options: ["compiled", "interpreted", "typed", "low-level"], answer: "interpreted" },
      { question: "What symbol starts a comment?", options: ["//", "#", "/*", "<!--"], answer: "#" },
      { question: "How to print in Python?", options: ["echo()", "print()", "printf()", "console.log()"], answer: "print()" },
      { question: "What is used to define a function?", options: ["function", "define", "def", "func"], answer: "def" },
      { question: "Which is a list in Python?", options: ["[]", "{}", "<>", "()"], answer: "[]" }
    ],
    medium: [
      { question: "How to import a module?", options: ["include", "require", "import", "attach"], answer: "import" },
      { question: "Which is a valid loop?", options: ["for in", "loop", "each", "forof"], answer: "for in" },
      { question: "What is `len()`?", options: ["Length of list", "Length of string", "Both", "None"], answer: "Both" },
      { question: "Which is used to catch exceptions?", options: ["try/except", "catch/try", "try/catch", "throw/except"], answer: "try/except" },
      { question: "How to start a class?", options: ["class A", "Class A", "object A", "new A"], answer: "class A" }
    ],
    hard: [
      { question: "What is a lambda?", options: ["Keyword", "Anonymous function", "Loop", "Operator"], answer: "Anonymous function" },
      { question: "What is a decorator?", options: ["Style tool", "A list", "Function modifier", "Loop function"], answer: "Function modifier" },
      { question: "What is `__init__`?", options: ["Constructor", "Loop", "Getter", "Class"], answer: "Constructor" },
      { question: "Which module handles dates?", options: ["datetime", "calendar", "time", "dateutil"], answer: "datetime" },
      { question: "Which keyword for generator?", options: ["yield", "return", "gen", "async"], answer: "yield" }
    ]
  },
  cpp: {
    easy: [
      { question: "C++ is extension of?", options: ["Java", "C", "Python", "Assembly"], answer: "C" },
      { question: "Main function returns?", options: ["float", "void", "int", "bool"], answer: "int" },
      { question: "What ends a C++ statement?", options: ["Colon", "Comma", "Period", "Semicolon"], answer: "Semicolon" },
      { question: "Header for input/output?", options: ["iostream", "stdio", "conio", "bits"], answer: "iostream" },
      { question: "Which symbol is for pointer?", options: ["&", "*", "#", "@@"], answer: "*" }
    ],
    medium: [
      { question: "What is function overloading?", options: ["Multiple functions same name", "Nested functions", "Private functions", "Templates"], answer: "Multiple functions same name" },
      { question: "What is used for memory allocation?", options: ["malloc", "alloc", "new", "make"], answer: "new" },
      { question: "Destructor symbol?", options: ["!", "#", "~", "$"], answer: "~" },
      { question: "Default access specifier in class?", options: ["public", "private", "protected", "internal"], answer: "private" },
      { question: "STL stands for?", options: ["Standard Template Library", "Simple Type Link", "Standard Type List", "Simple Template Link"], answer: "Standard Template Library" }
    ],
    hard: [
      { question: "What is a virtual function?", options: ["Overridden in derived class", "Global function", "Static function", "Hidden function"], answer: "Overridden in derived class" },
      { question: "What is a template?", options: ["Generic class/function", "Pointer", "Memory", "Structure"], answer: "Generic class/function" },
      { question: "Which loop runs at least once?", options: ["for", "while", "do...while", "repeat"], answer: "do...while" },
      { question: "How to refer to current object?", options: ["this", "self", "current", "object"], answer: "this" },
      { question: "Which is dynamic array in C++?", options: ["vector", "array", "list", "map"], answer: "vector" }
    ]
  }
};

// Start Quiz
startBtn.addEventListener("click", () => {
  const language = languageSelect.value;
  const difficulty = difficultySelect.value;

  if (!language || !difficulty) {
    alert("Please select both language and difficulty!");
    return;
  }

  quizData = allQuizzes[language][difficulty];
  currentQuestion = 0;
  score = 0;

  languageSelect.style.display = "none";
  difficultySelect.style.display = "none";
  startBtn.style.display = "none";
  quizContent.style.display = "block";
  nextBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
  starBadge.style.display = "none";
  progressBar.style.width = "0%";

  loadQuestion();
});

// Load Question
function loadQuestion() {
  const current = quizData[currentQuestion];
  questionEl.textContent = `Q${currentQuestion + 1} of ${quizData.length}: ${current.question}`;
  optionsEl.innerHTML = "";
  nextBtn.disabled = true;

  current.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => selectAnswer(button, current.answer);
    optionsEl.appendChild(button);
  });

  const progressPercent = (currentQuestion / quizData.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

// Select Answer
function selectAnswer(button, correctAnswer) {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === button) {
      btn.classList.add("incorrect");
    }
  });

  if (button.textContent === correctAnswer) {
    score++;
  }

  nextBtn.disabled = false;
}

// Next Question
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// Show Result
function showResult() {
  questionEl.textContent = `Your Score: ${score} / ${quizData.length}`;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
  progressBar.style.width = `100%`;

  if (score === quizData.length) {
    starBadge.style.display = "block";
  } else {
    starBadge.style.display = "none";
  }
}

// Restart Quiz
restartBtn.addEventListener("click", () => {
  languageSelect.style.display = "block";
  difficultySelect.style.display = "block";
  startBtn.style.display = "inline-block";
  quizContent.style.display = "none";
  questionEl.textContent = "";
  optionsEl.innerHTML = "";
  starBadge.style.display = "none";
  progressBar.style.width = `0%`;
});