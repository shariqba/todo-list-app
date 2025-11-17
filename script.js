      let todos = [];

        const todoInput = document.getElementById('todoInput');
        const addBtn = document.getElementById('addBtn');
        const todoList = document.getElementById('todoList');
        const stats = document.getElementById('stats');

        function addTodo() {
            const text = todoInput.value.trim();
            if (text === '') return;

            const todo = {
                id: Date.now(),
                text: text,
                completed: false
            };

            todos.push(todo);
            todoInput.value = '';
            renderTodos();
        }

        function toggleTodo(id) {
            todos = todos.map(function(todo) {
                if (todo.id === id) {
                    return {
                        id: todo.id,
                        text: todo.text,
                        completed: !todo.completed
                    };
                }
                return todo;
            });
            renderTodos();
        }

        function deleteTodo(id) {
            todos = todos.filter(function(todo) {
                return todo.id !== id;
            });
            renderTodos();
        }

        function renderTodos() {
            if (todos.length === 0) {
                todoList.innerHTML = '<div class="empty-state">add your task </div>';
                stats.innerHTML = '';
                return;
            }

            let html = '';
            for (let i = 0; i < todos.length; i++) {
                const todo = todos[i];
                html += '<li class="todo-item ' + (todo.completed ? 'completed' : '') + '">';
                html += '<input type="checkbox" ' + (todo.completed ? 'checked' : '') + ' onchange="toggleTodo(' + todo.id + ')">';
                html += '<span class="todo-text">' + todo.text + '</span>';
                html += '<button class="delete-btn" onclick="deleteTodo(' + todo.id + ')">Delete</button>';
                html += '</li>';
            }
            todoList.innerHTML = html;

            let completed = 0;
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].completed) completed++;
            }
            stats.innerHTML = 'Total: ' + todos.length + ' tasks | Completed: ' + completed;
        }

        addBtn.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addTodo();
        });

        renderTodos();