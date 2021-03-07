/*===== CHANGE DIV VISIBILITY =====*/
const btnQuestion = document.querySelector('.btn-question');
const btnResult = document.querySelector('.btn-result');
const divQuestion = document.querySelector('.div-question');
const divResult = document.querySelector('.div-result');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const img = document.querySelector(".img-fluid");
const textResult = document.querySelector(".text-result");

btnQuestion.addEventListener('click', function () {

    if (input1.value != "" && input2.value != "") {
        divQuestion.classList.toggle('show-result');
        divResult.classList.toggle('show-result');
        img.setAttribute('src', "assets/shaman.png");

        generateResults();
    }

})

btnResult.addEventListener('click', function () {
    divQuestion.classList.toggle('show-result');
    divResult.classList.toggle('show-result');
    img.setAttribute('src', "assets/mouse-reading.png");
    //clear text
    input1.value = "";
    input2.value = "";
    input1.focus();
})

/*===== GENERATE RESULTS =====*/

function generateResults() {
    let textInput1 = input1.value;
    let textInput2 = input2.value;

    arrayText = [];
    arrayText.push(textInput1);
    arrayText.push(textInput2);

    //Math.random()*1 = 0.1 ate 0.9
    //Math.round = 0 > 0.5 >= 1
    randomResult = arrayText[Math.round(Math.random() * 1)];

    showResults(randomResult, textInput1, textInput2)
}

function showResults(randomResult, textInput1, textInput2) {

    textResult.innerText = randomResult;

    let strong1 = document.getElementById('strong1');
    let strong2 = document.getElementById('strong2');

    strong1.innerText = textInput1;
    strong2.innerText = textInput2;
}