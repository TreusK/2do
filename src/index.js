let todosList = document.querySelector('#todosList');

function todoFactory(name, description, date) {

    return {name, description, date}
}

function render(parent, arr) {
    parent.innerHTML = arr;
}

let todoObj = {
    title: 'Study french',
    description: 'Open the french book and read page 287 for 1 hour, then consoom french content for 30m',
    dueDate: '13/07/21',
    priority: 0,
}

//Quiero renderear 1 obj/todo en la pag, que hago
//Necesito una funcion q haga obj -> html notations so innerhtml
function objToTodo(obj) {
    let todo = `<div><span>${obj.title}</span> <span>${obj.dueDate}</span> <span>${obj.priority}</span></div>`;
    render(todosList, todo)
}

objToTodo(todoObj)


   








