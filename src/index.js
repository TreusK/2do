//DOM grabbin'
let todosContainer = document.querySelector('#todosContainer');
let containerForm = document.querySelector('#containerForm');
let newTodoBtn = document.querySelector('#newTodoBtn');
let newProjectBtn = document.querySelector('#newProjectBtn');
let form = document.querySelector('#form');

let arrOfTodos = [];


///////ToDo module
const todoMaker = (() => {
    //Function to empty the todos container
    function reset() {
        todosContainer.innerHTML = '';
    }

    //Private function to take an object and return an html todo element
    function objToHtml(obj) {
        let todo = document.createElement('div');
        todo.classList.add('todo');

        todo.innerHTML =   `<div class='todoCheckbox level${obj.priority}'></div>
                            <div class='todoTitle'>${obj.title}</div>`;
        return todo;
    }

    //Function to render the arrOfTodos
    function renderArr() {
        arrOfTodos.map(elem => todosContainer.append(objToHtml(elem)));
    }

    return {reset, renderArr}
})();

///////Form module
const formModule = (() => {
    //Function to take the form and return a todo object
    function formToObj(formElements, checkedRadio) {
        let title = formElements[0].value;
        let description = formElements[1].value;
        let priority = checkedRadio.value;
        return {title, description, priority}
    }

    //Function to hide the form
    function hideForm() {
        containerForm.classList.remove('showMe');
    }

    //Function to show the form 
    function showForm() {
        containerForm.classList.add('showMe')
    }

    return {formToObj, hideForm, showForm}
})();



///////////Events///////////

//Event to add visibility of the form container
newTodoBtn.addEventListener('click', (e) => formModule.showForm());

//Event to stop displaying the form container when clicking outside of it
containerForm.addEventListener('click', (e) => {
    if(e.target.id == 'containerForm') {
        formModule.hideForm();
    }
});

//Event on form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let elements = e.target.elements;
    let checkedRadio = document.querySelector(`input[type='radio']:checked`);;
    let todoObj = formModule.formToObj(elements, checkedRadio);
    arrOfTodos.push(todoObj);
    
    todoMaker.reset();
    todoMaker.renderArr();
    containerForm.classList.remove('showMe');
    form.reset();
})





   








