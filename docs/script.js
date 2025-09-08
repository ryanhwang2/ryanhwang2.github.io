const questions = [
    {
        question: "What is the main purpose of Operations in an organization?", 
        answers: [
            { text: "To develop new markets", correct: false},
            { text: "To maintain and improve daily business processes", correct: true},
            { text: "To innovate new products", correct: false},
            { text: "To manage financial investments", correct: false},
        ]
    },
    {
        question: "Which of the following is a primary function of Support teams?", 
        answers: [
            { text: "Strategic planning", correct: false},
            { text: "Customer issue resolution and service continuity", correct: true},
            { text: "Product development", correct: false},
            { text: "Project Management", correct: false},
        ]
    },
    {
        question: "Which tool is MOST commonly used in IT support operations?", 
        answers: [
            { text: "Kali Linux", correct: false},
            { text: "Power BI", correct: false},
            { text: "Excel", correct: false},
            { text: "Help Desk Ticketing System", correct: true},
        ]
    },
    {
        question: "Which of the following are daily responsibilities and activities of IT Operations and Support?", 
        answers: [
            { text: "Obtaining technology services and products for organization", correct: false},
            { text: "Collecting, cleaning, and organizing data", correct: false},
            { text: "Training employees, vulnerability testing, updating patches", correct: false},
            { text: "Answering support requests, running data backups, setting up employee devices", correct: true},
        ]
    },
    {
        question: "IT support technicians optimize network performance and proactively monitor equipment for failure or insufficiency?", 
        answers: [
            { text: "True", correct: true},
            { text: "False", correct: false},
        ]
    },
    {
        question: "What is the difference between IT support and IT operations??", 
        answers: [
            { text: "IT support handles day-to-day issues, IT operations oversees infrastructure and supports long-term organizational objectives", correct: true},
            { text: "IT support is proactive while IT operations is reactive", correct: false},
            { text: "IT support has higher access privileges than IT operations", correct: false},
            { text: "IT support requires less direct user help than IT operations", correct: false},
        ]
    },
    {
        question: "True or False: Does every business need IT support?", 
        answers: [
            { text: "True", correct: true},
            { text: "False", correct: false},
        ]
    },
    {
        question: "True or False: You only need IT support when things go wrong?", 
        answers: [
            { text: "True", correct: false},
            { text: "False", correct: true},
        ]
    },
    {
        question: "What are some different parts of IT operations?", 
        answers: [
            { text: "Infrastructure management, data management, network monitoring, system administration", correct: true},
            { text: "Designing, coding, testing, maintaining software", correct: false},
            { text: "Collecting, organizing, processing, and analyzing raw data", correct: false},
            { text: "Assessing technologies and services, ensuring compliance with regulations/standards, and obtaining necessary technologies and products", correct: false},
        ]
    },
    {
        question: "What is a helpdesk in regards to IT support? ", 
        answers: [
            { text: "Centralized organizational support service that assists end users by providing solutions, troubleshooting, and technical assistance", correct: true},
            { text: "A location where physical hardware and infrastructure are stored", correct: false},
            { text: "An overarching framework that governs how IT services are coordinated and optimizes IT services delivery", correct: false},
            { text: "None of the above", correct: false},
        ]
    }  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion =questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
