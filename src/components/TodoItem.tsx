import api from "../services/api";
import type { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: Props) {
  async function toggleFavorite() {
    const { data } = await api.patch<Todo>(`/${todo.id}`, {
      favorite: !todo.favorite,
    });
    onUpdate(data);
  }

  async function handleDelete() {
    await api.delete(`/${todo.id}`);
    onDelete(todo.id);
  }

  return (
    <div
      className="flex items-center justify-between p-3 rounded shadow"
      style={{ background: todo.color }}
    >
      <span>{todo.title}</span>
      <div className="flex gap-2">
        <button onClick={toggleFavorite}>{todo.favorite ? "★" : "☆"}</button>
        <button onClick={handleDelete} className="text-red-600">
          X
        </button>
      </div>
    </div>
  );
}
