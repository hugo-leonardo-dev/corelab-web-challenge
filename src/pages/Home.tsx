import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import api from "../services/api";
import type { Todo } from "../types/todo";
import Header from "../components/Header";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    api.get(`${userId}`).then((response) => setTodos(response.data));
  }, []);

  console.log(todos);

  function addTodo(todo: Todo) {
    setTodos((prev) => [...prev, todo]);
  }

  function updateTodo(updated: Todo) {
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="flex items-start justify-center min-h-screen p-4">
      <div className="w-full max-w-screen-md">
        <Header />
        <TodoForm onAdd={addTodo} />
        <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
      </div>
    </div>
  );
}
