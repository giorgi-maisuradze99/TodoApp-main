import React, { useState } from "react";
import "./Todo.css";
import bglight from "./bg-purp.jpg";
import bgdark from "./bg-purple.jpg";
function Todo() {
  const doc = document.body;
  const [currentTodo, setCurrentTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [lightTheme, setLightTheme] = useState(true);

  if (lightTheme) {
    doc.style.backgroundColor = "#fffcfc";
  } else {
    doc.style.backgroundColor = "#161722";
  }

  const handleNewTodo = () => {
    const listItem = {
      isTaskCrossed: false,
      currentTodo,
      id: new Date().getTime().toString(),
    };
    if (currentTodo !== "") {
      setTodoList((todoList) => {
        return [...todoList, listItem];
      });
      setCurrentTodo("");
    }
  };
  const handleClearTodo = (id) => {
    let newToDoList = todoList.filter((listItem) => listItem.id !== id);
    setTodoList(newToDoList);
  };

  const handleClearTodos = () => {
    setTodoList([]);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleNewTodo();
    }
  };

  const handleToggleComplete = (id) => {
    const newTodos = todoList.map((todo) => {
      if (todo.id === id) {
        const updatedItem = {
          ...todo,
          isTaskCrossed: !todo.isTaskCrossed,
        };
        return updatedItem;
      }
      return todo;
    });
    setTodoList(newTodos);
  };

  return (
    <>
      <div className="bgcontainer">
        <img src={lightTheme ? bglight : bgdark} className="background"></img>
      </div>
      <div className="TodoContainer">
        <header>
          <h1>T O D O</h1>
          <h4 onClick={() => setLightTheme(!lightTheme)}>
            {lightTheme ? "🌙" : "☀️"}
          </h4>
        </header>
        <div
          className="TodoInput"
          id={lightTheme ? "todoInputLight" : "todoInputDark"}
        >
          <i
            className="fa-regular fa-circle"
            onClick={() => handleNewTodo()}
          ></i>

          <input
            value={currentTodo}
            type="text"
            className="currentTodo"
            name="currentTodo"
            onKeyDown={onKeyDown}
            onChange={(e) => setCurrentTodo(e.target.value)}
            placeholder=" Create a new todo..."
          />
        </div>
        <form className="newTodosContainer" id="newTodosContainer">
          {todoList.map((todo) => {
            return (
              <div
                className={lightTheme ? "todosLight" : "todosDark"}
                key={todo.id}
              >
                <i
                  className={
                    todo.isTaskCrossed
                      ? "fa-solid fa-circle-check"
                      : "fa-regular fa-circle"
                  }
                  onClick={() => handleToggleComplete(todo.id)}
                ></i>
                <p className={todo.isTaskCrossed ? "crossedTodo" : ""}>
                  {todo.currentTodo}
                </p>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleClearTodo(todo.id)}
                ></i>
              </div>
            );
          })}
        </form>
        <div className="managingDiv">
          <p>{todoList.length} Items Left</p>
          <p id="clear-all" onClick={() => handleClearTodos()}>
            Clear All
          </p>
        </div>
      </div>
    </>
  );
}

export default Todo;
