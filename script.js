const questions = [
    {
        question: "What is the capital city of Japan?",
        answers: [
            { text: "Osaka", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Kyoto", correct: false },
            { text: "Hiroshima", correct: false }
        ]
    },
    {
        question: "Which symbol represents Japan on the national flag?",
        answers: [
            { text: "A White Chrysanthemum", correct: false },
            { text: "A Red Circle (The Sun)", correct: true },
            { text: "A Red Torii Gate", correct: false },
            { text: "A Cherry Blossom", correct: false }
        ]
    },
    {
        question: "What is the currency used in Japan?",
        answers: [
            { text: "Yuan", correct: false },
            { text: "Won", correct: false },
            { text: "Yen", correct: true },
            { text: "Dollar", correct: false }
        ]
    },
    {
        question: "Mount Fuji is the highest mountain in Japan.",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        question: "Which writing system uses characters derived from Chinese characters?",
        answers: [
            { text: "Hiragana", correct: false },
            { text: "Katakana", correct: false },
            { text: "Kanji", correct: true },
            { text: "Romaji", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question-container");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
// تم التصليح هنا ليكون .quiz-card
const quizCard = document.querySelector(".quiz-card"); 
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const totalScoreElement = document.getElementById("total-score");
const questionNumberElement = document.getElementById("question-number");
const totalQuestionsElement = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next Question";
    if (quizCard) quizCard.classList.remove("hide");
    if (resultContainer) resultContainer.classList.add("hide");
    totalQuestionsElement.innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionNumberElement.innerHTML = currentQuestionIndex + 1;
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") button.classList.add("correct");
        button.disabled = true;
    });
    nextButton.classList.remove("hide");
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    if (quizCard) quizCard.classList.add("hide");
    if (resultContainer) resultContainer.classList.remove("hide");
    scoreElement.innerHTML = score;
    totalScoreElement.innerHTML = questions.length;
    const feedback = document.getElementById("feedback-message");
    if(score === 5) feedback.innerHTML = "Perfect! You are a Japan Expert!";
    else if(score >= 3) feedback.innerHTML = "Good job! Keep learning!";
    else feedback.innerHTML = "Try harder! Learn more about Japan!";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) handleNextButton();
    else startQuiz();
});

restartButton.addEventListener("click", startQuiz);
startQuiz();
