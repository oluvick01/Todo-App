document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('.todo-input');
    const todoBtn = document.querySelector('.todo-btn');
    const todoList = document.querySelector('.todo-lists');
    const condition = document.querySelector('.condition');
    const todoListContainer = document.querySelector('.todolist-container');
    const deleteBtn = document.querySelector('.delete-btn'); // This is the CONFIRM delete button
    const noBtn = document.querySelector('.no-btn');

    condition.classList.add('hidden');

    const task = [];

    //ADD BUTTON
    todoBtn.addEventListener('click', () => {
        let todoText = todoInput.value.trim();
        if (todoText === '') return;
        let newTask = {
            id: Date.now(),
            text: todoText
        };
        task.push(newTask);
        console.log(task);
        todoInput.value = "";
        renderList(newTask);
    });

    function renderList(taskItem) {
        let listItem = document.createElement('li');
        listItem.setAttribute('data-id', `${taskItem.id}`);

        let taskSpan = document.createElement('span');
        taskSpan.textContent = taskItem.text;

        let delButton = document.createElement('button');
        delButton.setAttribute('data-id', `${taskItem.id}`);
        delButton.textContent = 'Delete';

        listItem.appendChild(taskSpan);
        listItem.appendChild(delButton);
        todoList.appendChild(listItem);

        // Add event listener to the delete button of THIS specific list item
        delButton.addEventListener('click', () => {
            todoListContainer.classList.add('hidden-2');
            condition.classList.remove('hidden');

            // Store the ID of the item to be deleted in a data attribute of the condition element
            condition.dataset.deleteId = taskItem.id;
        });
    }

    // Event listener for the CONFIRM delete button
    deleteBtn.addEventListener('click', () => {
        const idToDelete = condition.dataset.deleteId;
        if (idToDelete) {
            // Find the list item with the matching data-id and remove it
            const itemToRemove = todoList.querySelector(`li[data-id="${idToDelete}"]`);
            if (itemToRemove) {
                todoList.removeChild(itemToRemove);
                // Update the 'task' array as well
                const indexToRemove = task.findIndex(task => task.id === parseInt(idToDelete));
                if (indexToRemove > -1) {
                    task.splice(indexToRemove, 1);
                }
            }
            condition.classList.add('hidden');
            todoListContainer.classList.remove('hidden-2');
            // Clear the stored ID
            delete condition.dataset.deleteId;
        }
    });

    noBtn.addEventListener('click', () => {
        condition.classList.add('hidden');
        todoListContainer.classList.remove('hidden-2');
        // Clear the stored ID if the user cancels
        delete condition.dataset.deleteId;
    });
});