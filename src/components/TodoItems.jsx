import React, { useState } from "react";
import PropTypes from "prop-types";

function TodoItems({ todoList, onDeleteTodo, onToggleComplete, onEditTodo }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDate, setEditDate] = useState("");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditName(todo.todoName);
    setEditDate(todo.todoDate);
  };

  const handleSaveEdit = (todoId) => {
    if (editName.trim() && editDate) {
      onEditTodo(todoId, editName.trim(), editDate);
    }
    setEditingId(null);
    setEditName("");
    setEditDate("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDate("");
  };

  if (todoList.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted">No todos yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="todo-items-container">
      {todoList.map((todo) => (
        <div
          key={todo.id}
          className={`todo-item d-flex justify-content-between align-items-center p-3 border-bottom ${
            todo.completed ? "completed bg-light" : ""
          }`}
        >
          <div className="d-flex align-items-center flex-grow-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
              className="form-check-input me-3"
            />
            
            <div className="flex-grow-1">
              {editingId === todo.id ? (
                <div className="row g-2">
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="col-5">
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <span className={todo.completed ? "text-decoration-line-through text-muted" : ""}>
                    {todo.todoName}
                  </span>
                  <br />
                  <small className="text-muted">
                    <i className="bi bi-calendar-event me-1"></i>
                    {formatDate(todo.todoDate)}
                  </small>
                </>
              )}
            </div>
          </div>

          <div className="btn-group">
            {editingId === todo.id ? (
              <>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={() => handleSaveEdit(todo.id)}
                >
                  <i className="bi bi-check"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleCancelEdit}
                >
                  <i className="bi bi-x"></i>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleEditClick(todo)}
                  disabled={todo.completed}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDeleteTodo(todo.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

TodoItems.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      todoName: PropTypes.string.isRequired,
      todoDate: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    })
  ).isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
};

export default TodoItems;