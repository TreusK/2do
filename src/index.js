//DOM grabbin'
let todosContainer = document.querySelector('#todosContainer');
let containerForm = document.querySelector('#containerForm');
let newTodoBtn = document.querySelector('#newTodoBtn');

let newProjectBtn = document.querySelector('#newProjectBtn');
let newProjectInput = document.querySelector('#newProjectInput');
let deleteCurrentProject = document.querySelector('#deleteCurrentProject');
let projectsContainer = document.querySelector('#projectsContainer');

let form = document.querySelector('#form');
let titleInput = document.querySelector('#titleInput');
let descriptionInput = document.querySelector('#descriptionInput');
let lowRadio = document.querySelector('#lowRadio');
let normalRadio = document.querySelector('#normalRadio');
let urgentRadio = document.querySelector('#urgentRadio');

//Import icons
import deleteIcon from './modules/delete.png';
import editIcon from './modules/edit.png';


//Test default object for now
let defObj = {
    description: "Anki, web novels and 2 ep of anime",
    priority: "normal",
    title: "Study Japanese",
    checked: false,
    project: 'Today',
}
let defObj2 = {
    description: "Tomato egg salad, 10/10",
    priority: "low",
    title: "Eat veggies",
    checked: true,
    project: 'Today',
}
let defObj3 = {
    description: "Get the axe, sharpen it and let Bibi know I'll be back tomorrow",
    priority: "urgent",
    title: "Kill that bear",
    checked: false,
    project: 'Today',
}

//Global variables
let arrOfTodos = JSON.parse(localStorage.getItem('todosArr')) || [defObj, defObj2, defObj3];
let arrOfProjects = JSON.parse(localStorage.getItem('projectsArr')) || ['Today', 'Personal', 'Family'];
let currentProject = 'Today';
let editIndex = -1;
let checkedValue = true;

//General function to create html elements
function elemMaker(elemToCreate, attribute, eventFunc, extraObj) {
    let elem = document.createElement(elemToCreate);
    //Elem type being div or img or p
    if(elemToCreate == 'div') {
        elem.classList.add(attribute);
    } else if(elemToCreate == 'img') {
        elem.src = attribute;
    } else if(elemToCreate == 'p') {
        elem.textContent = attribute;
    }
    //Attribute being the checkbox or title
    if(attribute == 'todoCheckbox') {
        let lvl = extraObj.priority;
        elem.classList.add('level'+lvl);
    }
    if(attribute == 'todoTitle') {
        elem.textContent = extraObj.title;
    }
    if(attribute == 'projectBtn') {
        elem.textContent = '.' + extraObj;
    }
    //Return early for these since they don't need an event
    if(attribute == 'todo' || attribute == 'todoTop' || attribute == 'todoBottom') {
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
        form.classList.add('editing');
        formModule.showForm();
        let indexAsString = e.target.parentElement.parentElement.id;
        let indexAsNumber = indexAsString.slice(5);
        //Take the index out to be used in the submit event form when editing
        editIndex = indexAsNumber;
        //And also the checked for the checkBox value
        checkedValue = arrOfTodos[indexAsNumber].checked;
        titleInput.value = arrOfTodos[indexAsNumber].title;
        descriptionInput.value = arrOfTodos[indexAsNumber].description;
        switch(arrOfTodos[indexAsNumber].priority) {
            case 'normal': normalRadio.checked = true;
            break;
            case 'urgent': urgentRadio.checked = true;
            break;
            default: lowRadio.checked = true;
            break;
        };
    }

    //Private event function to Delete a todo
    function deleteFunc(e) {
        let indexAsString = e.target.parentElement.parentElement.id;
        let indexAsNumber = indexAsString.slice(5);
        arrOfTodos.splice(indexAsNumber, 1);
        reset();
        localStorage.setItem('todosArr', JSON.stringify(arrOfTodos));
        renderArr();
    }

    //Private event function to show the description/extra info of a todo on click
    function showInfoFunc(e) {
        let todoTop = e.target.parentElement;
        let todoBottom = todoTop.nextElementSibling;
        todoBottom.classList.toggle('todoBottomShow');
    }

    //Private event function to hide the description/extra info of a todo on click
    function hideInfoFunc(e) {
        let todoBottom = e.target.parentElement;
        todoBottom.classList.toggle('todoBottomShow');
    }

    //Private event function for the checkbox
    function checkboxFunc(e) {
        let indexAsString = e.target.parentElement.parentElement.id;
        let indexAsNumber = +indexAsString.slice(5);
        (arrOfTodos[indexAsNumber].checked)
            ? arrOfTodos[indexAsNumber].checked = false
            : arrOfTodos[indexAsNumber].checked = true;
        reset()
        localStorage.setItem('todosArr', JSON.stringify(arrOfTodos));
        renderArr();
    }

    //Private function to take an object and return a complete html todo element
    function objToHtml(obj, index) {
        let todo = elemMaker('div', 'todo');

        let todoTop = elemMaker('div', 'todoTop');
        let todoBottom = elemMaker('div', 'todoBottom');

        let todoCheckbox = elemMaker('div', 'todoCheckbox', checkboxFunc, obj);
        let todoTitle = elemMaker('div', 'todoTitle', showInfoFunc, obj);
        let deleteImage = elemMaker('img', deleteIcon, deleteFunc);
        let editImage = elemMaker('img', editIcon, editFunc);
        let description = elemMaker('p', obj.description, hideInfoFunc);

        if(obj.checked) {
            todoCheckbox.textContent = 'X';
            todoTitle.style.textDecoration = 'line-through';
        }

        todoTop.append(todoCheckbox);
        todoTop.append(todoTitle);
        todoTop.append(editImage);
        todoTop.append(deleteImage);
        todoBottom.append(description);

        todo.append(todoTop);
        todo.append(todoBottom);

        todo.classList.add(obj.project);
        todo.id = 'index' + index;

        return todo;
    }

    //Function to render the arrOfTodos
    function renderArr() {
        let arrOfTodosHtml = [];
        arrOfTodos.map((elem, index) => arrOfTodosHtml.push(objToHtml(elem, index)));

        let filteredArr = arrOfTodosHtml.filter(elem => elem.classList[1] == currentProject);
        filteredArr.map(elem => todosContainer.append(elem));
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
        let checked = false;
        let project = currentProject;
        return {title, description, priority, checked, project}
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

///////Project module
const projectMaker = (() =>{
    //Event function for the new project button on click
    function newProjectBtnClick() {
        newProjectInput.classList.toggle('hideMe');
        newProjectInput.focus();
    }

    //Event function for the project button on click
    function projectBtnClick(e) {
        let parent = e.target;
        let name = e.target.textContent.slice(1);
        currentProject = name;
        reset();
        localStorage.setItem('projectsArr', JSON.stringify(arrOfProjects));
        renderArr();
        todoMaker.reset()
        localStorage.setItem('todosArr', JSON.stringify(arrOfTodos));
        todoMaker.renderArr();
    }

    //Event function for the new project input on enter
    function newProjectInputEnter(e) {
        let key = e.key;
        if(key == 'Enter') {
            let name = newProjectInput.value;
            if(arrOfProjects.includes(name)) {
                alert('That name is already in use')
            } else {
                arrOfProjects.push(name);
                reset();
                localStorage.setItem('projectsArr', JSON.stringify(arrOfProjects));
                renderArr();
                newProjectInput.classList.toggle('hideMe');
                newProjectInput.value = ''; 
            }
        }
    }

    //Function to take a string and return a project element
    function strToHtml(str) {
        let projectBtn = elemMaker('div', 'projectBtn', projectBtnClick, str);
        if(str == currentProject) {
            projectBtn.classList.add('projectBtnSelected');
        };
        return projectBtn;
    }

    function deleteProject() {
        if(currentProject == 'Today') {
            alert("Sorry, you can't delete the Today project");
        } else if(confirm('This will delete the ' + currentProject + ' project and ALL ITS TODOS, are you sure?')){
            let index = arrOfProjects.indexOf(currentProject);
            arrOfProjects.splice(index, 1);
            arrOfTodos = arrOfTodos.filter(elem => elem.project !== currentProject);

            currentProject = 'Today';
            reset();
            localStorage.setItem('projectsArr', JSON.stringify(arrOfProjects));
            renderArr();
            todoMaker.reset();
            localStorage.setItem('todosArr', JSON.stringify(arrOfTodos));
            todoMaker.renderArr();
        }
    }

    //Function to empty the projects container
    function reset() {
        projectsContainer.innerHTML = '';
    }

    //Function to render the arrOfProjects
    function renderArr() {
        arrOfProjects.map(elem => projectsContainer.append(strToHtml(elem)));
    }

    return {newProjectBtnClick, newProjectInputEnter,deleteProject, renderArr, reset}
})();



///////////Events///////////

//Event to add visibility of the form container
newTodoBtn.addEventListener('click', (e) => formModule.showForm());

//Event to stop displaying the form container when clicking outside of the form
containerForm.addEventListener('click', (e) => {
    if(e.target.id == 'containerForm') {
        formModule.hideForm();
    }
});

//Event on form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let elements = e.target.elements;
    let checkedRadio = document.querySelector(`input[type='radio']:checked`);
    let todoObj = formModule.formToObj(elements, checkedRadio);
    if(e.target.classList[0] == 'editing') {
        todoObj.checked = checkedValue;
        arrOfTodos.splice(editIndex, 1, todoObj);
        e.target.classList.remove('editing'); 
    } else {
        arrOfTodos.push(todoObj);
    }
    todoMaker.reset();
    localStorage.setItem('todosArr', JSON.stringify(arrOfTodos));
    todoMaker.renderArr();
    formModule.hideForm();
    form.reset();
})

//Event for the new project button
newProjectBtn.addEventListener('click', projectMaker.newProjectBtnClick);

//Event for the new project input
newProjectInput.addEventListener('keydown', projectMaker.newProjectInputEnter);

//Event for the delete project button
deleteCurrentProject.addEventListener('click', projectMaker.deleteProject);


//Run on startup
todoMaker.renderArr();
projectMaker.renderArr();






   








