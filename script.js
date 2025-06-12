const questions=[
    {
        question:"Choose the correct option 10+20=",
        answer:[
           {text:5,correct:false},
           {text:30,correct:true},
           {text:50,correct:false},
           {text:40,correct:false},
        ]
    },
    {
        question:"Choose the correct option 10*20=",
        answer:[
           {text:200,correct:true},
           {text:100,correct:false},
           {text:50,correct:false},
           {text:40,correct:false},
        ]
    },
    {
        question:"Choose the correct option 20/10=",
        answer:[
           {text:20,correct:false},
           {text:15,correct:false},
           {text:2,correct:true},
           {text:4,correct:false},
        ]
    },
     {
        question:"Choose the correct option 200-10=",
        answer:[
           {text:20,correct:false},
           {text:105,correct:false},
           {text:22,correct:false},
           {text:190,correct:true},
        ]
    },
];

const questionElement=document.getElementById("Question");
const answerButton=document.getElementById("answer-btn");
const nextButtton=document.getElementById("next-btn");


let currentQuestionIdx=0;
let score=0;

function startQuiz(){
    currentQuestionIdx=0;
    score=0;
    nextButtton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    // reset previous state
    resetState();

    // display the question 
    let currQustion=questions[currentQuestionIdx];
    let questionNo=currentQuestionIdx+1;
    questionElement.innerHTML=questionNo+". "+currQustion.question;

    // now display the answer
    currQustion.answer.forEach((answer)=>{
        let button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
};

function resetState(){
    nextButtton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    let selectBtn=e.target;
    let isCorrect=selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButtton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`Your Score is ${score} out of ${questions.length}!`;
    nextButtton.innerHTML="Play again!";
    nextButtton.style.display="block";
}

function handleNextBtn(){
    currentQuestionIdx++;
    if(currentQuestionIdx<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButtton.addEventListener("click",()=>{
    if(currentQuestionIdx<questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})



startQuiz();