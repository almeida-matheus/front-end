const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("list");
const btnAdd = document.getElementById("btn-add");

//click button
btnAdd.addEventListener('click', function () {
    addTodo();
})

//enter input
form.addEventListener("submit", (e) => {
    //Prevent natural behaviour
    e.preventDefault();

    addTodo();
});

//pega a chave que armazena o objeto do localstorage
const objList = JSON.parse(localStorage.getItem("objList"));

//LOCALSTORAGE
if (objList) {
    //(2) [{…}, {…}]
    //0: {text: "test", completed: false}
    //1: {text: "eae", completed: true}

    //pra cada objeto (0,1,2) executa addTodo passando obj de cada indice
    objList.forEach((obj) => {
        //{text: "test", completed: false}
        addTodo(obj);
    });
}

function addTodo(obj) {
    let text = input.value;

    //se tiver obj, o text vai ser o obj.text
    if (obj) {
        //test
        text = obj.text;
    }

    //valor digitado no input ou obj.text do localstorage
    if (text) {
        const li = document.createElement("li");
        //<li>test</li>

        //se o obj.completed = true, add a classe completed na li
        if (obj && obj.completed) {
            li.classList.add("completed");
        }

        // li.innerText = text;
        li.innerHTML = `<i class='far fa-circle'></i>` + text;
        //<li> ?? </li> = <li> text </li>

        //se clicar com esquerdo na li
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            //<li class="completed">test</li>
            
            

            updateLS();
        });

        //se clicar com direito na li
        li.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            li.remove();

            updateLS();
        });

        //adiciona cada <li> em append no <ul>
        ul.appendChild(li);

        input.value = "";

        updateLS();
    }
}

function updateLS() {
    const objLi = document.querySelectorAll("li");
    //NodeList(2) [li, li.completed]
    //0: li
    //1: li.completed

    const objList = [];

    //pra cada objeto (0,1,2) executa addTodopassando obj cada indice
    objLi.forEach((li) => {
        //<li> test </li>

        //cria um objeto (0)
        objList.push({
            //cria a propriedade text: valor do inner da <li>
            text: li.innerText,
            //cria a propriedade completed: True se <li class=completed></li>
            completed: li.classList.contains("completed"),
        });
    });

    localStorage.setItem("objList", JSON.stringify(objList));
}

//se clicar no botao da li
// const btnLi = document.querySelector("fa-circle")
// btnLi.addEventListener('click', function() {
//     li.remove();

//     updateLS();
// })