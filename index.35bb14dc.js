if(sessionStorage.getItem("state")||sessionStorage.setItem("state",JSON.stringify({task:[],inputActualValue:"",completedTasks:0})),JSON.parse(sessionStorage.getItem("state")).task.length){document.querySelector(".trashCan").addEventListener("click",(e=>{const t=JSON.parse(sessionStorage.getItem("state")),a=e.srcElement.id,n=new Object(t.task.find((e=>e.id==a)));t.task.filter((e=>e.id!==a));t.task.splice(t.task.findIndex((e=>e.id==a)),1),document.querySelector("#createdTasks").textContent=t.task.length&&t.task.length-1||0,document.querySelector("#completeTasks").textContent=`${n.isCompleted&&t.completedTasks-1||t.completedTasks} de ${t.task.length?t.task.length-1:0}`,sessionStorage.setItem("state",JSON.stringify(t)),s()}))}function e(e){const t=JSON.parse(sessionStorage.getItem("state"));t.inputActualValue=e.target.value,sessionStorage.setItem("state",JSON.stringify(t))}function t(e){const t=JSON.parse(sessionStorage.getItem("state"));t.inputActualValue&&(t.task.push({id:Date.now(),task:t.inputActualValue,isCompleted:!1}),sessionStorage.setItem("state",JSON.stringify(t)),document.querySelector("#createdTasks").textContent=t.task.length,document.querySelector("#completeTasks").textContent=`${t.completedTasks} de ${t.task.length}`,s())}function s(){const a=JSON.parse(sessionStorage.getItem("state")).task.map((({id:e,task:t,isCompleted:s})=>s?`\n        <div class="taskWrapper">\n            <input id='${e}' class="radioinput"checked type="radio"/>\n            <section>\n                <span class="TaskCompleted">${t}</span>\n                <div class="trashCan">\n                    <span id='${e}' class="material-symbols-outlined">\n                    delete\n                    </span>\n                </div>\n            </section>\n        </div>`:`\n        <div class="taskWrapper">\n            <input id='${e}' class="radioinput" type="radio"/>\n            <section>\n                <span >${t}</span>\n                <div class="trashCan" >\n                    <span id='${e}' class="material-symbols-outlined">\n                    delete\n                    </span>\n                </div>\n            </section>            \n        </div>`));if(a.length>0){let e="";a.forEach((t=>e+=t)),document.querySelector(".taskManagerContainer").innerHTML=e}else document.querySelector(".taskManagerContainer").innerHTML='<div class="taskManagerPlaceHolderEmpty">\n    <p><strong>Voce ainda nao tem tarefas cadastradas</strong></p>\n    <p>Crie tarefas e organize seus items a fazer</p>\n    </div>';!function(){const a=document.querySelector("#taskInput"),n=document.querySelector("#taskButton");a.addEventListener("blur",e),n.addEventListener("click",t),document.querySelectorAll(".radioinput").forEach((e=>e.addEventListener("change",(e=>{const t=JSON.parse(sessionStorage.getItem("state")),a=e.target.attributes[0].textContent,n=t.task.find((e=>e.id==a));n.isCompleted=!n.isCompleted,t.completedTasks+=1,document.querySelector("#completeTasks").textContent=`${t.completedTasks} de ${t.task.length}`,sessionStorage.setItem("state",JSON.stringify(t)),s()})))),JSON.parse(sessionStorage.getItem("state")).task.length&&document.querySelector(".trashCan").addEventListener("click",(e=>{const t=JSON.parse(sessionStorage.getItem("state")),a=e.srcElement.id;t.task.splice(t.task.findIndex((e=>e.id==a)),1),t.completedTasks&&(t.completedTasks-=1),document.querySelector("#createdTasks").textContent=t.task.length,document.querySelector("#completeTasks").textContent=`${t.completedTasks} de ${t.task.length}`,sessionStorage.setItem("state",JSON.stringify(t)),s()}))}()}s();
//# sourceMappingURL=index.35bb14dc.js.map