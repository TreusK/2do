//DOM grabbin'
let todosContainer = document.querySelector('#todosContainer');
let containerForm = document.querySelector('#containerForm');
let newTodoBtn = document.querySelector('#newTodoBtn');
let newProjectBtn = document.querySelector('#newProjectBtn');
let form = document.querySelector('#form');

//Import icons
import deleteIcon from './modules/delete.png';
import editIcon from './modules/edit.png';



//Test default object for now
let defObj = {
    description: "Anki and shit",
    priority: "normal",
    title: "Study Japanese",
}
let defObj2 = {
    description: "Tomato egg salad, 10/10",
    priority: "low",
    title: "Eat veggies",
}
let defObj3 = {
    description: "Get the axe, sharpen it and let Bibi know I'll be back tomorrow",
    priority: "urgent",
    title: "Kill that bear",
}


let arrOfTodos = [defObj, defObj2, defObj3];

//General function to create html elements
function elemMaker(elemToCreate, attribute, eventFunc, extraObj) {
    let elem = document.createElement(elemToCreate);
    (elemToCreate == 'div') 
        ? elem.classList.add(attribute)
        : elem.src = attribute;
    if(attribute == 'todoCheckbox') {
        let lvl = extraObj.priority;
        elem.classList.add('level'+lvl);
    }
    if(attribute == 'todoTitle') {
        elem.textContent = extraObj.title;
    }
    //Return early for the todo since it doesn't need an event
    if(attribute == 'todo') {
        return elem;
    }
    elem.addEventListener('click', eventFunc);
    return elem;
}

///////ToDo module
const todoMaker = (() => {
    //Function to empty the todos container
    function reset() {
        todosContainer.innerHTML = '';
    }

    //Private event function to Edit a todo
    function editFunc(e) {
        console.log('editin');
    }

    //Private event function to Delete a todo
    function deleteFunc(e) {
        console.log('deletin')
    }

    //Private event function to show the description/extra info of a todo on click
    function showInfoFunc() {
        console.log('showin info');
    }

    //Private event function for the checkbox
    function checkboxFunc() {
        console.log('checkbox shit')
    }

    //Private function to take an object and return a complete html todo element
    function objToHtml(obj) {
        let todo = elemMaker('div', 'todo');

        let todoCheckbox = elemMaker('div', 'todoCheckbox', checkboxFunc, obj);
        let todoTitle = elemMaker('div', 'todoTitle', showInfoFunc, obj);
        let deleteImage = elemMaker('img', deleteIcon, deleteFunc);
        let editImage = elemMaker('img', editIcon, editFunc);

        todo.append(todoCheckbox);
        todo.append(todoTitle);
        todo.append(editImage);
        todo.append(deleteImage);
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
    console.log(arrOfTodos);
    
    todoMaker.reset();
    todoMaker.renderArr();
    containerForm.classList.remove('showMe');
    form.reset();
})

todoMaker.renderArr();






   








