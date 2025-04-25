const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const buttonClick = new Audio();
const submitClick = new Audio();
var icon = document.getElementById("moon-icon");

icon.onclick = function() {
    document.body.classList.toggle("dark-theme");
}

buttonClick.src = "sounds/button-pressed.mp3"
submitClick.src = "sounds/tadaa.mp3"

const questions = [ 
    {
        question: "Which Marvel team is your favourite?",
        answers: [
            { option: "The Avengers", character: "Iron Man" },
            { option: "The Guardians of the Galaxy", character: "Deadpool" },
            { option: "Fantastic 4", character: "Spider-Man" },
            { option: "The X-Men", character: "Wolverine" }
        ],
        gifUrl: "Pictures/shatha-q1.gif"
    },
    {
        question: "What would you do if you suddenly gained superpowers?",
        answers: [
            { option: "Use them to protect the world", character: "Spider-Man" },
            { option: "Keep them a secret", character: "Black Widow" },
            { option: "Profit from them", character: "Iron Man" },
            { option: "Use them only when absolutely necessary", character: "Hulk" }
        ],
        gifUrl: "Pictures/shatha-q2.gif"
    },
    {
        question: "Pick a trait that best describes you",
        answers: [
            { option: "Brave", character: "Wolverine" },
            { option: "Intelligent", character: "Iron Man" },
            { option: "Loyal", character: "Spider-Man" },
            { option: "Sarcastic", character: "Deadpool" }
        ],
        gifUrl: "Pictures/shatha-q3.gif"
    },
    {
        question: "Your ideal way to spend a day off:",
        answers: [
            { option: "Working on a project", character: "Iron Man" },
            { option: "Hanging out with friends", character: "Spider-Man" },
            { option: "Training or staying active", character: "Wolverine" },
            { option: "Reading or being alone", character: "Black Widow" }
        ],
        gifUrl: "Pictures/shatha-q4.gif"
    },
    {
        question: "How do you set goals?",
        answers: [
            { option: "Long-term plans, calculated steps.", character: "Iron Man" },
            { option: "You chase challenges just to prove you can win.", character: "Black Widow" },
            { option: "Based on instinct — if it feels right, go for it.", character: "Spider-Man" },
            { option: "Goals? You're more of a - go with the flow - type.", character: "Deadpool" }
        ],
        gifUrl: "Pictures/shatha-q5.gif"
    },
    {
        question: "How do you usually handle conflict?",
        answers: [
            { option: "Head-on with confidence", character: "Hulk"},
            { option: "Strategically and with a plan", character: "Black Widow"},
            { option: "Avoid it until necessary", character: "Spider-Man"},
            { option: "Diffuse it with humor", character: "Deadpool"}
        ],
        gifUrl: "Pictures/shatha-q6.gif"
    },
    {
        question: "Which of these is most important to you?",
        answers: [
            { option: "Justice", character: "Spider-Man"},
            { option: "Love", character: "Deadpool"},
            { option: "Knowledge", character: "Iron Man"},
            { option: "Loyalty", character: "Black Widow"}
        ],
        gifUrl: "Pictures/shatha-q7.gif"
    },
    {
        question: "Which Marvel gadget would you love to own?",
        answers: [
            { option: "Iron Man’s suit", character: "Iron Man"},
            { option: "Spider-Man’s web shooters", character: "Spider-Man"},
            { option: "Black Panther’s vibranium suit", character: "Black Widow" },
            { option: "Doctor Strange’s sling ring", character: "Deadpool"}
        ],
        gifUrl: "Pictures/shatha-q8.gif"
    },
    {
        question: "What role do you usually take in a group?",
        answers: [
            { option: "The leader", character: "Iron Man"},
            { option: "The planner", character: "Black Widow"},
            { option: "The protector", character: "Hulk"},
            { option: "The joker", character: "Deadpool"}
        ],
        gifUrl: "Pictures/shatha-q9.gif"
    },
    {
        question: "Pick a quote that resonates with you:",
        answers: [
            { option: "“With great power comes great responsibility.”", character: "Spider-Man"},
            { option: "“Genius, billionaire, playboy, philanthropist.”", character: "Iron Man" },
            { option: "“I can do this all day.”", character: "Captain America"},
            { option: "“Wakanda forever!”", character: "Black Panther"}
        ],
        gifUrl: "Pictures/shatha-q10.gif"
    }
];

const selectedCharacters = [];

// a method to build the quiz questions and answers components (via inline html)
function buildQuiz() {
    quizContainer.innerHTML = questions.map((q, index) => `
        <div class="quiz-question-box">
            <h3 class="question-text">${q.question}</h3>
            <img src="${q.gifUrl}" alt="GIF for ${q.question}" class="question-gif">
            <div class="answer-btn-container">
                ${q.answers.map(a =>
                    `<button class="answer-btn" onclick = "buttonClick.play()" data-character="${a.character}" data-index="${index}">
                        ${a.option}
                    </button>`
                ).join('<br>')}
            </div>
        </div>
    `).join('');
}

// a method that handles the answer button clicks and marks the selected answer 
function handleAnswerClick(e) {
    const btn = e.target;
    if (!btn.classList.contains('answer-btn')) return;

    const index = btn.dataset.index;
    const character = btn.dataset.character;

    selectedCharacters[index] = character; // place the pressed character in the array 

    document.querySelectorAll(`.answer-btn[data-index="${index}"]`)
        .forEach(b => b.classList.remove('selected'));

    btn.classList.add('selected');
}

// a method to get the character with highest count based on how many times they were clicked
function getTopCharacter(answers) {
    const counts = {};
    for (let char of answers) {
        counts[char] = (counts[char] || 0) + 1;
    }

    return Object.entries(counts).reduce((top, [char, count]) => {
        return count > top.count ? { char, count } : top;
    }, { char: null, count: 0 }).char;
}

// a method that handle submission of the quiz and directs the user to the results page (after 4 seconds for fun audio purposes)
function handleSubmit() {
    if (selectedCharacters.length !== questions.length || selectedCharacters.includes(undefined)) {
        alert("Please answer all questions before submitting!");
        return;
    }

    const topCharacter = getTopCharacter(selectedCharacters);

    if (!topCharacter) {
        alert("Couldn't determine your Marvel character. Try again!");
        return;
    }

    localStorage.setItem('marvelResult', topCharacter);
    setTimeout(() => {
        window.location.href = 'Shatha-results-page.html';
    }, 4000);}

quizContainer.addEventListener('click', handleAnswerClick);
submitButton.addEventListener('click', handleSubmit);

buildQuiz();

