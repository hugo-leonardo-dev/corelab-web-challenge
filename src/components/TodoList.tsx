import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onUpdate, onDelete }: Props) {
  const sorted = [...todos].sort((a, b) =>
    a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1
  );

  return (
    <div className="flex flex-col gap-2">
      {sorted.map((t) => (
        <TodoItem key={t.id} todo={t} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
