import React, { useState, useContext, useEffect } from "react";
import { CredentialsContext } from "../App";
import { v4 as uuidv4 } from "uuid";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [filterText, setFilterText] = useState("uncompleted");
  const [credentials] = useContext(CredentialsContext);

  useEffect(() => {
    fetch("http://localhost:5000/todos", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())

      .then((todos) => {
        setTodos(todos);
      });
  }, []);

  const persist = (newTodos) => {
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => {
      console.log(credentials);
    });
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { id: uuidv4(), checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText("");
    persist(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo.id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    persist(newTodoList);
    console.log(todos);
  };

  const handleFilter = (newFilter) => {
    setFilterText(newFilter);
  };

  const getTodos = () => {
    return todos.filter((todo) =>
      filterText === "completed" ? todo.checked : !todo.checked
    );
  };

  return (
    <div>
      <select value={filterText} onChange={(e) => handleFilter(e.target.value)}>
        <option value="uncompleted">Uncompleted</option>
        <option value="completed">Completed</option>
      </select>
      {getTodos().map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            name="checkbox"
            id=""
            checked={todo.checked}
            onChange={() => toggleTodo(todo.id)}
          />
          <label>{todo.text}</label>
        </div>
      ))}
      <br />
      <form action="" onSubmit={addTodo}>
        <input
          type="text"
          name="Addtodo"
          value={todoText}
          id=""
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default Todos;
