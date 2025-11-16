import React, { useState } from "react";
import PropTypes from "prop-types";

function AddTodo({ onAddTodo }) {
  const [todoInput, setTodoInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  const handleInputChange = (event) => {
    setTodoInput(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateInput(event.target.value);
  };

  const handleAddClick = () => {
    const trimmedTodo = todoInput.trim();
    
    if (trimmedTodo === "") {
      alert("Please enter a todo item");
      return;
    }

    if (dateInput === "") {
      alert("Please select a due date");
      return;
    }

    onAddTodo(trimmedTodo, dateInput);
    setTodoInput("");
    setDateInput("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddClick();
    }
  };

  const isFormValid = todoInput.trim() !== "" && dateInput !== "";

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container text-center">
      <div className="row kg-row align-items-center">
        <div className="col-12 col-md-6 mb-2">
          <input
            type="text"
            placeholder="What needs to be done?"
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            value={todoInput}
            className="form-control"
          />
        </div>
        <div className="col-8 col-md-4 mb-2">
          <input
            type="date"
            onChange={handleDateChange}
            value={dateInput}
            className="form-control"
            min={today}
          />
        </div>
        <div className="col-4 col-md-2 mb-2">
          <button
            type="button"
            className={`btn w-100 ${isFormValid ? "btn-success" : "btn-secondary"}`}
            onClick={handleAddClick}
            disabled={!isFormValid}
          >
            <i className="bi bi-plus-circle me-1"></i>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

AddTodo.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodo;