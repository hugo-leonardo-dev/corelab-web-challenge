import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import api from "../services/api";
import type { Todo } from "../types/todo";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    api.get<Todo[]>("/").then((res) => setTodos(res.data));
  }, []);

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
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Todos</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
    </div>
  );
}
