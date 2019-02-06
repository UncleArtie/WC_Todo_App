$(document).ready(function () {
  var todoList = {
    todos: [],
    addTodo: function (todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false
      });
    },
    changeTodo: function (position, todoText) {
      this.todos[position].todoText = todoText;
    },
    toggleCompleted: function (position) {
      var todo = this.todos[position];
      todo.completed = !todo.completed;
    },
    deleteTodo: function (position) {
      this.todos.splice(position, 1);
    },
    toggleAll: function () {
      var totalTodos = this.todos.length;
      var completedTodos = 0;
      //get number of completed todos
      this.todos.forEach(function (todo) {
        if (todo.completed === true) {
          completedTodos++;
        }
      });
      this.todos.forEach(function (todo) {
        if (completedTodos === totalTodos) {
          todo.completed = false;
        } else {
          todo.completed = true;
        }
      });
    }
  };
  var handler = {
    deleteTodo: function (position) {
      todoList.deleteTodo(position);
      view.displayTodos();
    }
  };
  $("#displayBtn").click(function () {
    view.displayTodos();
  });
  $("#toggleAllBtn").click(function () {
    todoList.toggleAll();
    view.displayTodos();
  });
  $("#addBtn").click(function () {
    todoList.addTodo($("#addTodoText").val());
    $("#addTodoText").empty();
    view.displayTodos();
  });
  $("#changeBtn").click(function () {
    var changeTodoPosition = $("#changeTodoPosition").val();
    var changeTodoText = $("#changeTodoText").val();
    todoList.changeTodo(changeTodoPosition, changeTodoText);
    view.displayTodos();
  });
  $("#toggleATodoBtn").click(function () {
    var toggleTodoPosition = $("#toggleATodoPosition").val();
    todoList.toggleCompleted(toggleTodoPosition);
    view.displayTodos();
  });
  view = {
    displayTodos: function () {
      var todosUl = document.querySelector('ul');
      todosUl.innerHTML = '';
      todoList.todos.forEach(function (todo, position) {
        var todoLi = document.createElement('li');
        var todoTextWithCompletion = '';
        if (todo.completed === true) {
          todoTextWithCompletion = '(x)' + ' ' + todo.todoText;
        } else {
          todoTextWithCompletion = '( )' + ' ' + todo.todoText;
        }
        todoLi.id = position;
        todoLi.textContent = todoTextWithCompletion;
        todoLi.appendChild(this.createDeleteButton());
        todosUl.appendChild(todoLi);
      }, this);
    },
    createDeleteButton: function () {
      var deleteBtn = document.createElement("button");
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'deleteBtn';
      return deleteBtn;
    },
    setupEventListeners: function () {
      var todosUl = $('ul');
      todosUl.on('click', function (evt) {
        var elementClicked = evt.target;
        if (elementClicked.className === 'deleteBtn') {
          handler.deleteTodo(parseInt(elementClicked.parentNode.id));
        }
      });
    }
  };
  view.setupEventListeners();
});