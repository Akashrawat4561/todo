import React, { useState, useEffect } from "react";
import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import "./App.css";

function App() {
  const getInitialTodos = () => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [
      { 
        id: 1,
        todoName: "Buy Milk", 
        todoDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        completed: false 
      },
      { 
        id: 2,
        todoName: "Attend Meeting", 
        todoDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
        completed: false 
      }
    ];
  };

  const [todos, setTodos] = useState(getInitialTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (nameTodo, dueDate) => {
    if (!nameTodo.trim() || !dueDate) return;
    
    const newTodo = {
      id: Date.now(),
      todoName: nameTodo.trim(),
      todoDate: dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const handleDeleteTodo = (todoId) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };

  const handleToggleComplete = (todoId) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTodo = (todoId, newName, newDate) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId 
          ? { ...todo, todoName: newName, todoDate: newDate }
          : todo
      )
    );
  };

  // Calculate statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  // Clear all completed todos
  const handleClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  // Clear all todos
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all todos?")) {
      setTodos([]);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <AppName />
              
              {totalTodos > 0 && (
                <div className="row text-center mb-3">
                  <div className="col-4">
                    <div className="border rounded p-2 bg-light">
                      <div className="fw-bold text-primary">{totalTodos}</div>
                      <small className="text-muted">Total</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="border rounded p-2 bg-light">
                      <div className="fw-bold text-success">{pendingTodos}</div>
                      <small className="text-muted">Pending</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="border rounded p-2 bg-light">
                      <div className="fw-bold text-warning">{completedTodos}</div>
                      <small className="text-muted">Done</small>
                    </div>
                  </div>
                </div>
              )}

              <AddTodo onAddTodo={handleAddTodo} />
              
              <div className="mt-4">
                <TodoItems 
                  todoList={todos}
                  onDeleteTodo={handleDeleteTodo}
                  onToggleComplete={handleToggleComplete}
                  onEditTodo={handleEditTodo}
                />
              </div>

              {/* Footer*/}
              {todos.length > 0 && (
                <div className="mt-4 border-top pt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">
                      {pendingTodos} item{pendingTodos !== 1 ? 's' : ''} left
                    </span>
                    <div>
                      {completedTodos > 0 && (
                        <button
                          className="btn btn-outline-danger btn-sm me-2"
                          onClick={handleClearCompleted}
                        >
                          Clear Completed ({completedTodos})
                        </button>
                      )}
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={handleClearAll}
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;