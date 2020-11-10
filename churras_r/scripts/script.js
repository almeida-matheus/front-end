// carne - 400 gr por pessoa   + de 6 horas - 650
// cerveja - 1200 ml por pessoa + 6 horas - 2000 ml
// refrigerante/agua - 1000 ml por pessoa + 6 horas 1500ml

// crianças valem por 0,5

const inputAdultos = document.getElementById("adultos");
const inputCriancas = document.getElementById("criancas");
const inputDuracao = document.getElementById("duracao");

const resultado = document.getElementById("resultado");

function calcular() {
    console.log("Calculando...");

    let adultos = inputAdultos.value;
    let criancas = inputCriancas.value;
    let duracao = inputDuracao.value;


    let qdtTotalCarne = carnePP(duracao) * adultos + (carnePP(duracao) / 2 * criancas);
    let qdtTotalCerveja = cervejaPP(duracao) * adultos;
    let qdtTotalRefrigetante = refrigetantePP(duracao) * adultos + (refrigetantePP(duracao) / 2 * criancas);

    //ceil: arredondar pra cima
    // resultado.innerHTML = `<h5 class="pt-3">Você irá precisar de:</h5>`

    resultado.innerHTML = `
    <div class="result-block">
        <img class="p-1" src="./assets/carne.svg" />
        <p class="pt-3">${qdtTotalCarne/1000} kg de carne e linguiça</p>
    </div>

    `

    resultado.innerHTML += `
    <div class="result-block">
        <img class="p-1" src="./assets/cerveja.svg" />
        <p class="pt-3">${Math.ceil(qdtTotalCerveja / 355)} latas de cerveja</p>
    </div>
    `

    resultado.innerHTML += `
    <div class="result-block">
        <img class="pr-1" src="./assets/refri.svg" />
        <p class="pt-3">${Math.ceil(qdtTotalRefrigetante / 2000)} garrafas de refrigerante</p>
    </div>
    `
    // <div class="media py-2">
    //     <img src="./assets/refri.svg" class="align-self-center mr-2" style="max-width: 30px;">
    //         <div class="media-body lead">
    //             <p class="pb-0 mb-0">${Math.ceil(qdtTotalRefrigetante / 2000)} Garrafas de refrigerante</p>
    //         </div>
    // </div>

    // resultado.innerHTML += `<p>${Math.ceil(qdtTotalCerveja / 355)} Latas de cerveja</p>`
    // resultado.innerHTML += `<p>${Math.ceil(qdtTotalRefrigetante / 2000)} Garrafas 2l de refrigetante</p>`


}

function carnePP(duracao) {
    if (duracao >= 6) {
        return 650;
    } else {
        return 400;
    }
}

function cervejaPP(duracao) {
    if (duracao >= 6) {
        return 2000;
    } else {
        return 1200;
    }
}
function refrigetantePP(duracao) {
    if (duracao >= 6) {
        return 1500;
    } else {
        return 1000;
    }
}