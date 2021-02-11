const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%&*()+=";

//RETORNA UM ELEMENTO DO ARRAY A PARTIR DA POSICAO ALEATORIA
//Math.random(): numero aleatorio entre 0.1 e 0.99 [0, 1[
//upperLetters.lenght: quantidade de caracteres = 26
// na multiplicação irá retornar entre 1 e 26 (posição)
function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

generateEl.addEventListener("click", generatePassword);

function generatePassword() {
    var len = lenEl.value;

    if (len > 20 || len < 1) {
        len = 20;
    } else {
        len = lenEl.value;
    }

    let password = "";

    if (upperEl.checked) {
        password += getUppercase();
    }

    if (lowerEl.checked) {
        password += getLowercase();
    }

    if (numberEl.checked) {
        password += getNumber();
    }

    if (symbolEl.checked) {
        password += getSymbol();
    }

    //irá acrescentar um valor no password a cada if
    //se tiver os 4 checked = Aa1!

    //i = 4; i < valor digitado (8); i++
    for (let i = password.length; i < len; i++) {
        const x = generateX();
        password += x;
    }
    // console.log(password)

    pwEl.innerText = password;
}

function generateX() {
    const xs = [];
    //vai passar pelas 4 funcoes
    if (upperEl.checked) {
        xs.push(getUppercase());
        console.log(xs)
    }

    if (lowerEl.checked) {
        xs.push(getLowercase());
        console.log(xs)
    }

    if (numberEl.checked) {
        xs.push(getNumber());
        console.log(xs)
    }

    if (symbolEl.checked) {
        xs.push(getSymbol());
        console.log(xs)
    }

    if (xs.length === 0) return "";
    //(4) ["I", "p", "7", "*"]

    //RETORNA UM ELEMENTO DO ARRAY A PARTIR DA POSICAO ALEATORIA
    //Math.random(): numero aleatorio entre 0.1 e 0.99 [0, 1[
    //xs.lenght: quantidade de caracteres = 4
    // na multiplicação irá retornar entre 1 e 4 (posição)
    // xs[3]
    // 7

    return xs[Math.floor(Math.random() * xs.length)];
}


copyEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = pwEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Senha copiada com sucesso");
});