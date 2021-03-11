//== MODAL ==//
const Modal = {
    open(){
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },
    close(){
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

//== LOCAL STORAGE ==//
const Storage = {
    //pegar as informações
    get() {
        //vai pegar o objeto salvo ou array vazio
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    //salvar as informações do const Transaction como string
    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(),
    
    //atalho: refatoração pra expandir
    //all: transactions,
    
    // ? recebe um objeto {.amount .date .description}
    add(transaction){
        // * Transaction.all: uma lista com vários objetos
        // ? 0: {description: "testzola", amount: -33300, date: "09/03/2021"}
        // ? 1: {description: "to certo", amount: 40000, date: "09/02/2020"}
        Transaction.all.push(transaction)
        // * adiciona mais um objeto 2: {}... com o push

        App.reload()
    },
    
    remove(index) {
        // * splice: remove 1 elemento do indice index (0, 1, 2, 3, etc)
        Transaction.all.splice(index, 1)
        App.reload()
    },

    incomes() {
        //pegar todas as transacoes de cada linha da tabela e pra cada uma delas
        let income = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount > 0 ) {
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount < 0 ) {
                expense += transaction.amount;
            }
        })
        return expense;
    },

    total() {
        let resultSoma = Transaction.incomes() + Transaction.expenses();
        //mudar o cor do card total
        if (resultSoma < 0) {
            document.querySelector('.card.total').classList.remove('green')
            document.querySelector('.card.total').classList.add('red')
        } else {
            document.querySelector('.card.total').classList.remove('red')
            document.querySelector('.card.total').classList.add('green')
        }

        return resultSoma;
    }
}

//adicionar elementos no html
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    //cria o tr (linha)
    // * index é a posição do array, da transação q adicionou
    addTransaction(transaction, index) {
        // ? transaction: {description: "testzola", amount: -33300, date: "09/03/2021"}
        // ? index: 0 //posicao

        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        // a linha recebe o index
        tr.dataset.index = index

        // ? <tr data-index="0">
        // ? <td class="description">testzola</td>
        // ? <td class="expense">-R$&nbsp;333,00</td>
        // ? <td class="date">09/03/2021</td>
        // ? <td>
        // ?   <img onclick="Transaction.remove(0)" src="./assets/minus.svg" alt="Remover transação">
        // ? </td>
        // ? </tr>

        //adicionar o tr (linha) no container tbody
        DOM.transactionsContainer.appendChild(tr)
    },

    //cria o conteudo da linha
    innerHTMLTransaction(transaction, index) {
        //se o valor for > 0 o valor de cssclass é income, caso contrario expense
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        //formata o valor para real 
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="DOM.edit(${index})" src="./assets/edit.png" alt="Editar transação">
        </td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
        </td>
        `

        return html
    },

    //mostrar os valores 
    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    edit(index) {
        Form.description.value = Transaction.all[index].description;
        Form.amount.value = Transaction.all[index].amount * 1/100;

        Transaction.all.splice(index, 1)

        Modal.open()

        App.reload()
    },

    //função que exclui todos os dados da tabela
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

// === FERRAMENTAS (formatar decimal, data, dinheiro total) ===
const Utils = {
    formatAmount(value){
        //g = trocar todas virgulas por ponto
        //? digita 8,00 ou 8.00 vira 800
        value = Number(value.replace(/\,\./g, "")) * 100
        //value = Number(value) * 100
        
        return value
    },

    formatDate(date) {
        // ? recebe 2021-01-26 transforma em ["2021", "01". "26"]
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    //valor que vai ser impresso na tabela
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        //D = ache td q nao é numero e apague
        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        //formatar numero pra real
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

       return signal + value
    }
}// === adicionar os elementos do modal após clicar no botão submit ===
const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        // const description = Form.getValues().description
        const { description, amount, date } = Form.getValues()
        
        if( description.trim() === "" || 
            amount.trim() === "" || 
            date.trim() === "" ) {
                // * joga o erro no catch do submit(event)
                throw new Error("Por favor, preencha todos os campos")
        }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues()
        
        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        // nao vai fazer o comportamento padrão q é enviar pelo get na url
        event.preventDefault()
        try {
            //validar campos
            Form.validateFields()
            //formatar dados e retorna um objeto .amount .date .description
            const transaction = Form.formatValues()
            //salvar e adicionar a transação
            Transaction.add(transaction)
            //apagar os dados do formulario
            Form.clearFields()
            Modal.close()
        } catch (error) {
            alert(error.message)
        }
    }
}
// === INICIO ===
const App = {
    init() {
        // * para cada transacao rode a funcao dom.addtransaction
        // ? 0: {description: "testzola", amount: -33300, date: "09/03/2021"}
        // ? 1: {description: "test", amount: -33300, date: "09/03/2021"}
        console.log(Transaction.all)
        Transaction.all.forEach((value, key) => {
            console.log(value, key);
        });
        Transaction.all.forEach(DOM.addTransaction)
        // Transaction.all.forEach((transaction, index ) => {
        //     DOM.addTransaction(transaction, index)
        // })
        //chama uma funcao q chama a funcao passando os mesmo valores
        // Transaction.all.forEach( function(transaction, index ) {
        //     DOM.addTransaction(transaction, index)
        // })
        
        //* atualizando os 3 cartões
        DOM.updateBalance()


        // * atualizando na memoria todos os objetos
        Storage.set(Transaction.all)
        // ? 0: {description: "testzola", amount: -33300, date: "09/03/2021"}
        // ? 1: {description: "to certo", amount: 40000, date: "09/02/2020"}
    },
    reload() {
        //exclui todos os dados fisicos pra depois popular oq estao na memoria com app.init
        DOM.clearTransactions()
        App.init()
    },
}

App.init()