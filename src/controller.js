import { state } from "./model";
//verifica o state onde as informações da lista ficam salvas no session manager
//e a converte para texto
if (!sessionStorage.getItem('state'))
    sessionStorage.setItem('state', JSON.stringify(state));

    function addEventListeners() {
        const taskInputField = document.querySelector("#taskInput");
        const buttonInputField = document.querySelector("#taskButton");
      
        taskInputField.addEventListener("blur", addTaskOnBlur);
        buttonInputField.addEventListener("click", addTaskOnButtonClick);
      
        const radioInput = document.querySelectorAll(".radioinput");
        radioInput.forEach((el) =>
          el.addEventListener("change", (e) => {
            const actualState = JSON.parse(sessionStorage.getItem("state"));
            const id = e.target.attributes[0].textContent;
            const toChange = actualState.task.find((el) => el.id == id);
      
            toChange.isCompleted = !toChange.isCompleted;
      
            actualState.completedTasks += 1;
            document.querySelector(
              "#completeTasks"
            ).textContent = `${actualState.completedTasks} de ${actualState.task.length}`;
            sessionStorage.setItem("state", JSON.stringify(actualState));
      
            renderTasks();
          })
        );
        if (JSON.parse(sessionStorage.getItem("state")).task.length) {
          const trashCan = document.querySelector(".trashCan");
          trashCan.addEventListener("click", (e) => {
            const actualState = JSON.parse(sessionStorage.getItem("state"));
            const id = e.srcElement.id;
            actualState.task.splice(
              actualState.task.findIndex((e) => e.id == id),
              1
            );
      
            if (actualState.completedTasks) actualState.completedTasks -= 1;
      
            document.querySelector("#createdTasks").textContent =
              actualState.task.length;
            document.querySelector(
              "#completeTasks"
            ).textContent = `${actualState.completedTasks} de ${actualState.task.length}`;
      
            sessionStorage.setItem("state", JSON.stringify(actualState));
            renderTasks();
          });
        }
      }
    if (JSON.parse(sessionStorage.getItem('state'))
        .task.length) {
//cria as lixeiras com evento para deletar as tarefas
        const trashCan = document.querySelector('.trashCan');
        trashCan.addEventListener('click', (e) => {            

            const actualState = JSON.parse(sessionStorage.getItem('state'));
            const id = e.srcElement.id;
            const toChange = new Object(actualState.task.find((el) => el.id == id));
            const newArray = actualState.task.filter((el) => el.id !== id);
            actualState.task.splice(actualState.task.findIndex(e=>e.id==id),1)

//atualiza os contadores conforme a deleção dos eventos
            document.querySelector("#createdTasks").textContent = actualState.task.length && actualState.task.length - 1 ||0;
            document.querySelector('#completeTasks').textContent = `${toChange.isCompleted && actualState.completedTasks -1 ||  actualState.completedTasks} de ${!actualState.task.length?0:actualState.task.length - 1}`


//atualiza as tarefas deletadas para o session manager
            sessionStorage.setItem('state', JSON.stringify(actualState));
            renderTasks();
        })
    }

function addTaskOnBlur(e) {
    const actualState = JSON.parse(sessionStorage.getItem('state'));
    actualState.inputActualValue = e.target.value;
    sessionStorage.setItem('state', JSON.stringify(actualState));

}
function addTaskOnButtonClick(e) {
    const actualState = JSON.parse(sessionStorage.getItem('state'));
    if (!actualState.inputActualValue) return;
//cria o formato da tarefa usando a data atual como id unico
//(vanilla js não tem gerador de ID nativo)
    actualState.task.push({ id: Date.now(), task: actualState.inputActualValue, isCompleted: false });
    sessionStorage.setItem('state', JSON.stringify(actualState));
//atualiza os contadores conforme a adição dos eventos
    document.querySelector("#createdTasks").textContent = actualState.task.length;
    document.querySelector('#completeTasks').textContent = `${actualState.completedTasks} de ${actualState.task.length}`


    renderTasks();

}



//cria função para renderizar as tarefas que vão sobrescrever o placeHolder
function renderTasks() {

    const actualState = JSON.parse(sessionStorage.getItem('state'));
    const taskHtmlArray = actualState.task.map(({ id, task, isCompleted }) => {

        if (!isCompleted) return `
        <div class="taskWrapper">
            <input id='${id}' class="radioinput" type="radio"/>
            <section>
                <span >${task}</span>
                <div class="trashCan" >
                    <span id='${id}' class="material-symbols-outlined">
                    delete
                    </span>
                </div>
            </section>            
        </div>`
        else
            return `
        <div class="taskWrapper">
            <input id='${id}' class="radioinput"checked type="radio"/>
            <section>
                <span class="TaskCompleted">${task}</span>
                <div class="trashCan">
                    <span id='${id}' class="material-symbols-outlined">
                    delete
                    </span>
                </div>
            </section>
        </div>`
    })
//cria a mensagem que deve aparecer caso nenhuma tarefa tenha sido criada
    const taskManagerPlaceHolder = `<div class="taskManagerPlaceHolderEmpty">
    <p><strong>Voce ainda nao tem tarefas cadastradas</strong></p>
    <p>Crie tarefas e organize seus items a fazer</p>
    </div>`
//sobrescreve o placeHolder caso exista ao menos uma tarefa
    if (taskHtmlArray.length > 0) {
        let concatString = ''
        taskHtmlArray.forEach(el => concatString = concatString + el)
        document.querySelector('.taskManagerContainer').innerHTML = concatString;
    }
    else
        document.querySelector('.taskManagerContainer').innerHTML = taskManagerPlaceHolder;

    addEventListeners();
}
renderTasks();




