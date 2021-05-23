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

    if (len > 20) {
        len = 20;
    } else if (len < 1) {
        len = 1;
    } else {
        len = lenEl.value;
    }

    pwEl.innerText = "no way dude";

    //se pelo menos 1 checkbox estiver marcada
    if (upperEl.checked || lowerEl.checked || numberEl.checked || symbolEl.checked) {

        let password = "";

        //i = 0; i < tamanho valor digitado (8); i++
        for (let i = 0; i < len; i++) {
            const character = generateCharacter();
            password += character;
        }

        pwEl.innerText = password;
    }

}

function generateCharacter() {
    const arrayCharacter = [];
    //vai passar pelas 4 funcoes
    if (upperEl.checked) {
        arrayCharacter.push(getUppercase());
    }

    if (lowerEl.checked) {
        arrayCharacter.push(getLowercase());
    }

    if (numberEl.checked) {
        arrayCharacter.push(getNumber());
    }

    if (symbolEl.checked) {
        arrayCharacter.push(getSymbol());
    }

    // if (arrayCharacter.length === 0) {
    //     printPassword()
    //     return i = len;
    // }

    //(4) ["I", "p", "7", "*"]

    //RETORNA UM ELEMENTO DO ARRAY A PARTIR DA POSICAO ALEATORIA
    //Math.random(): numero aleatorio entre 0.1 e 0.99 [0, 1[
    //arrayCharacter.lenght: quantidade de caracteres = 4
    // na multiplicação irá retornar entre 1 e 4 (posição)
    // arrayCharacter[3]
    // 7

    return arrayCharacter[Math.floor(Math.random() * arrayCharacter.length)];
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