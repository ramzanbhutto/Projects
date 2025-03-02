document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const newTodoInput = document.getElementById('new-todo');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const todoList = document.getElementById('todo-list');
    const completedTodoList = document.getElementById('completed-todo-list');
    const savePdfButton = document.getElementById('save-pdf');
    const saveJpgButton = document.getElementById('save-jpg');

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = newTodoInput.value.trim();
        const taskDeadline = taskDeadlineInput.value.trim();
        if (taskText !== '' && taskDeadline !== '') {
            addTodoItem(taskText, taskDeadline);
            newTodoInput.value = '';
            taskDeadlineInput.value = '';
            newTodoInput.focus();
        }
    });

    function addTodoItem(taskText, taskDeadline) {
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

    window.removeTodoItem = function(button) {
        const li = button.parentElement;
        li.remove();
    }

    window.markAsComplete = function(button) {
        const li = button.parentElement;
        Swal.fire({
            title: 'Add Remarks',
            input: 'textarea',
            inputLabel: 'Remarks',
            inputPlaceholder: 'Type your remarks here...',
            showCancelButton: true,
            confirmButtonText: 'Save',
            preConfirm: (remarks) => {
                if (remarks) {
                    li.querySelector('span').textContent += ` - Remarks: ${remarks}`;
                }
                li.classList.add('completed');
                completedTodoList.appendChild(li);
                button.remove();
            }
        });
    }

    savePdfButton.addEventListener('click', () => {
        html2canvas(document.querySelector('.lists-container')).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('todo-list.pdf');
        });
    });

    saveJpgButton.addEventListener('click', () => {
        html2canvas(document.querySelector('.lists-container')).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'todo-list.jpg';
            link.click();
        });
    });
});
