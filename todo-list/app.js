document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const newTodoInput = document.getElementById('new-todo');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const todoList = document.getElementById('todo-list');
    const completedTodoList = document.getElementById('completed-todo-list');
    const saveJpgButton = document.getElementById('save-jpg');

    // Set minimum datetime to current time
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    taskDeadlineInput.min = now.toISOString().slice(0, 16);

    todoForm.addEventListener('submit', function(event){
        event.preventDefault();
        const taskText = newTodoInput.value.trim();
        const taskDeadline = taskDeadlineInput.value.trim();
        if(taskText !== '' && taskDeadline !== ''){
            addTodoItem(taskText, taskDeadline);
            newTodoInput.value = '';
            taskDeadlineInput.value = '';
            newTodoInput.focus();
        }
    });

    function addTodoItem(taskText, taskDeadline){
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span>${taskText}</span>
            <span>Deadline: ${new Date(taskDeadline).toLocaleString()}</span>
            <button onclick="removeTodoItem(this)">Delete</button>
            <button onclick="markAsComplete(this)">Complete</button>
        `;
        todoList.appendChild(li);
    }

    window.removeTodoItem = function(button){
        const li = button.parentElement;
        li.remove();
    }

    window.markAsComplete = function(button){
        const li = button.parentElement;
        Swal.fire({
            title: 'Add Remarks',
            input: 'textarea',
            inputLabel: 'Remarks',
            inputPlaceholder: 'Type your remarks here...',
            showCancelButton: true,
            confirmButtonText: 'Save',
            preConfirm: (remarks) => {
                if(remarks){
                    li.querySelector('span').textContent += ` - Remarks: ${remarks}`;
                }
                li.classList.add('completed');
                completedTodoList.appendChild(li);
                button.remove();
            }
        });
    }

    saveJpgButton.addEventListener('click', () => {
        html2canvas(document.querySelector('.lists-container'), {
            backgroundColor: '#ffffff',
            scale: 2
        }).then(canvas => {
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'todo-list.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 'image/jpeg', 0.95);
        });
    });
});
