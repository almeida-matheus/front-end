const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("list");
const btnAdd = document.getElementById("btn-add");

//click plus button
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
        li.classList.add("li")
        //<li class="li" >test</li>

        //ADICIONAR CLASSE NOS LI VINDO DO LOCALSTORAGE
        //se o obj.completed = true, add a classe completed na li
        if (obj && obj.completed) {
            li.classList.add("completed");
        }
        if (obj && obj.important) {
            li.classList.add("important");
        }

        //ADICIONAR CONTEUDO DENTRO DOS LI
        li.innerHTML = `<i class='far fa-circle'></i>` + text;
        //<li> ?? </li> = <li> text </li>

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

            important: li.classList.contains("important"),
        });
    });

    localStorage.setItem("objList", JSON.stringify(objList));
}

//LEFT CLICK INSIDE LIST (ul)
ul.addEventListener("click", leftClick);

function leftClick(e) {
    const itemClicked = e.target;
    //<li class></li>
    //<i class></i>

    //itemClicked.classList[0]
    //li
    //far

    //CLICK LI
    if (itemClicked.classList[0] === "li") {
        itemClicked.classList.toggle("completed");
        //<li class="li completed">test</li>

        updateLS();
    }

    //CLICK LI BUTTON
    if (itemClicked.classList[0] === "far") {
        // e.target.parentElement.remove();

        const li = itemClicked.parentElement;
        //<li class></li>

        li.classList.add("fall");

        li.addEventListener("transitionend", e => {
            li.remove();
            updateLS();
        });
    }
}
//RIGHT CLICK INSIDE LIST (ul)
ul.addEventListener("contextmenu", (e) => {
    //retirar a janela q abre clicando com o botao direito
    e.preventDefault();

    const itemClicked = e.target;

    if (itemClicked.classList[0] === "li") {

        itemClicked.classList.toggle("important");
        updateLS();
    }
});