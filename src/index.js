//DOM grabbin'
let todosContainer = document.querySelector('#todosContainer');
let containerForm = document.querySelector('#containerForm');
let newTodoBtn = document.querySelector('#newTodoBtn');
let newProjectBtn = document.querySelector('#newProjectBtn');
let form = document.querySelector('#form');

let arrOfTodos = [];


//ToDo module
const todoMaker = (() => {
    //Private function to render entire content
    function render(parent, elem) {
        parent.innerHTML = elem;
    }

    //Function to empty the todos container
    function reset() {
        render(todosContainer, '');
    }

    //Private function to take the form and return a todo object
    function formToObj() {

    }

    //Private function to take an object and return an html todo element
    function objToHtml(obj) {
        let todo = document.createElement('div');
        todo.classList.add('todo');
        todo.innerHTML = `<span>${obj.title}</span> <span>${obj.dueDate}</span> <span>${obj.priority}</span>`;
        return todo;
    }

    //Function to render the arrOfTodos
    function renderArr() {
        arrOfTodos.map(elem => todosContainer.append(objToHtml(elem)));
    }

    return {reset, renderArr}
})();

//Form module
const formModule = (() => {
    function hi() {
        console.log('hi');
    }
    return {hi}
})();

/////Events

//Event to add visibility of the form container
newTodoBtn.addEventListener('click', (e) => containerForm.classList.add('showMe'));

//Event to stop displaying the form container
containerForm.addEventListener('click', (e) => {
    if(e.target.id == 'containerForm') {
        containerForm.classList.remove('showMe');
    }
});

//Event on form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.target);
    //I could grab the e.target.childrn elements I guess

    //Also there is a reset method already available
    //form.reset();
})




   








