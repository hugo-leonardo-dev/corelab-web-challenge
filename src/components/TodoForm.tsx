import { useState } from "react";
import api from "../services/api";
import type { Todo } from "../types/todo";

interface Props {
  onAdd: (todo: Todo) => void;
}

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#ffffff");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { data } = await api.post<Todo>("/", {
      title,
      color,
      favorite: false,
    });
    onAdd(data);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo..."
        className="border p-2 flex-1"
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded">
        Add
      </button>
    </form>
  );
}
