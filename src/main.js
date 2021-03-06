let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("clicked btn");

    formValidation();



});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("error");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";

        accessData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })
    }
}

let data = [];

let accessData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value
    });

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTasks();
}

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += `
        <div id=${y}>
               
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secondary">${x.date}</span>
               
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
        `);
    });

    resetForm();
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove(); //removing it from HTML -> hence still in local storage array it is not diaspearring yet though

    data.splice(e.parentElement.parentElement.id,1); // removing this.object by accessing its id via parenElement.parentElement -> 1

    localStorage.setItem("data", JSON.stringify(data)); //updating the data array in local storage
}

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML; //Zugriff auf Objekt im Array auf erste property!
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
}
//IIFE function expression to retrieve data from local storage
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
  })();