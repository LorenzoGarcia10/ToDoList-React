import React, { useState, useEffect } from 'react';

import Todo from "./componentes/Todo";
import TodoForm from './componentes/TodoForm';
import Busca from './componentes/Busca';
import Filter from './componentes/Filter';

import "./App.css";

function App() {
  // Verifica se existem dados salvos no sessionStorage
  const storedTodos = JSON.parse(sessionStorage.getItem('todos'));

  const [todos, setTodos] = useState(storedTodos || [
    {
      id: 1,
      text: "Mexer no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Jogar futebol",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar frontend",
      category: "Estudos",
      isCompleted: false,
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  // Atualiza o sessionStorage sempre que a lista de todos mudar
  useEffect(() => {
    sessionStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      },
    ];
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  const completeTodo = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1>TO DO LIST</h1>
      <Busca search={search} setSearch={setSearch}/>
      <Filter filter={filter} setFilter={setFilter} />
      <div className="todo-list">
        {todos
          .filter(todo => filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted)
          .filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()))
          .map(todo => (
            <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo}/>
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
