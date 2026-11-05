document.addEventListener('DOMContentLoaded', function(){
    
    
    
    const tests = [
    {
        name: "Початковий рівень",
        questions: [
            ["Яка зоря найближча до Землі?",
                ["Сонце", "Сіріус", "Вега", "Полярна зоря"], 0],
            ["Скільки планет у Сонячній системі?",
                ["7", "8", "9", "10"], 1],
            ["Який природний супутник має Земля?",
                ["Фобос", "Титан", "Місяць", "Європа"], 2]
        ]
    },
    {
        name: "Середній рівень",
        questions: [
            ["Яка планета найбільша?",
                ["Марс", "Земля", "Сатурн", "Юпітер"], 3],
            ["Яка планета відома своїми кільцями?",
                ["Сатурн", "Меркурій", "Венера", "Марс"], 0],
            ["Як називається наша галактика?",
                ["Андромеда", "Чумацький Шлях", "Трикутник", "Сомбреро"], 1]
        ]
    },
    {
        name: "Достатній рівень",
        questions: [
            ["Що вимірює світловий рік?",
                ["Час", "Масу", "Відстань", "Температуру"], 2],
            ["Що є джерелом енергії Сонця?",
                ["Ядерний синтез", "Горіння вугілля",
                 "Електричний струм", "Відбиття світла"], 0],
            ["Чому на Землі змінюються пори року?",
                ["Через Місяць", "Через сонячні плями",
                 "Через зміну розміру Землі",
                 "Через нахил земної осі та рух навколо Сонця"], 3]
        ]
    },
    {
        name: "Високий рівень",
        questions: [
            ["Який тип галактики — Чумацький Шлях?",
                ["Еліптична", "Спіральна з перемичкою",
                 "Неправильна", "Кулясте скупчення"], 1],
            ["Який процес відбувається в ядрі Сонця?",
                ["Горіння вугілля", "Випаровування",
                 "Термоядерний синтез", "Хімічне окиснення"], 2],
            ["Що таке чорна діра?",
                ["Об'єкт, тяжіння якого не дозволяє світлу вирватися",
                 "Звичайна планета", "Холодна зоря",
                 "Природний супутник"], 0]
        ]
    }
];

let level = 0, index = 0, score = 0;

const menu = document.getElementById("menu");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const next = document.getElementById("next");

function startTest(n) {
    level = n;
    index = 0;
    score = 0;
    menu.hidden = true;
    result.hidden = true;
    quiz.hidden = false;
    showQuestion();
}

const levels_btns = document.querySelectorAll('.level-btn');
levels_btns.forEach((btn, i)=>{
    btn.addEventListener('click', ()=> startTest(i));
});

function showQuestion() {
    const q = tests[level].questions[index];
    question.textContent = q[0];
    answers.innerHTML = "";
    feedback.textContent = "";
    next.hidden = true;

    document.getElementById("progress").textContent =
        tests[level].name + " | Запитання " + (index + 1) + " із 3";

    q[1].forEach((answer, i) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(i);
        answers.appendChild(button);
    });
}

function checkAnswer(choice) {
    const q = tests[level].questions[index];
    const buttons = answers.querySelectorAll("button");

    buttons.forEach((button, i) => {
        button.disabled = true;
        if (i === q[2]) button.classList.add("correct");
        else if (i === choice) button.classList.add("wrong");
    });

    if (choice === q[2]) {
        score++;
        feedback.textContent = "Правильно!";
    } else {
        feedback.textContent = "Правильна відповідь: " + q[1][q[2]];
    }

    next.textContent = index === 2 ? "Результат" : "Наступне запитання";
    next.hidden = false;
}

function nextQuestion() {
    index++;
    if (index < 3) {
        showQuestion();
    } else {
        quiz.hidden = true;
        result.hidden = false;
        document.getElementById("score").textContent =
            "Твій результат: " + score + " із 3 балів.";
        document.getElementById("message").textContent =
            score === 3 ? "Відмінно! Усі відповіді правильні!" :
            score === 2 ? "Добре! Ти багато знаєш про Всесвіт." :
            score === 1 ? "Повтори матеріал і спробуй ще раз." :
            "Спробуй повторити тему та пройти тест знову.";
    }
}



});