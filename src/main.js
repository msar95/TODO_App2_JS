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
    } 
}

let data = [];

let accessData = () => {
    data.push({
        text : textInput.value,
        date : dateInput.value,
        description : textarea.value
    })
};