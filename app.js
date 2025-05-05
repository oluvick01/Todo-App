document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('.todo-input');
    const todoBtn = document.querySelector('.todo-btn');
    const todoList = document.querySelector('.todo-lists')
    const condition = document.querySelector('.condition')
    const todoListContainer = document.querySelector('.todolist-container')
    const deleteBtn = document.querySelector('.delete-btn');
    const noBtn = document.querySelector('.no-btn')

    condition.classList.add('hidden');

const task = [];

//ADD BUTTON
todoBtn.addEventListener('click', () => {
    let todoText = todoInput.value.trim();
     if (todoText === '')return; 
     let newTask = {
         id : Date.now(),
         text: todoText
     };
      task.push(newTask)
    console.log(task);
    todoInput.value = " ";
    renderList(newTask)
});

function renderList(tasks) {
    let list = document.createElement('li');
    list.setAttribute('data-id', `${tasks.id}` )
    let delBtn = document.createElement('button');
    delBtn.setAttribute('data-id', `${tasks.id}` )
    delBtn.innerHTML = `Delete`
    list.innerHTML = `
   <span> ${tasks.text}</span>
   `;
   list.appendChild(delBtn)
   deleteFun(list, tasks);
    todoList.appendChild(list);

    //addeventlistener to delbtn to trigger condition
    delBtn.addEventListener('click', (e) => {
       console.log(list);
       todoListContainer.classList.add('hidden-2')
       condition.classList.remove('hidden') 
    });
};
 
function deleteFun(list, items) {
deleteBtn.addEventListener('click', (e) => {
    if (e.target.id !== items.id) {
        list.removeChild()
        condition.classList.add('hidden') 
        todoListContainer.classList.remove('hidden-2')
    };

   });     
}
noBtn.addEventListener('click', () => {
    condition.classList.add('hidden')
    todoListContainer.classList.remove('hidden-2')
})
})