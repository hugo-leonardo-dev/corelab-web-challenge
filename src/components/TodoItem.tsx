import { useState } from "react";
import type { Todo } from "../types/todo";
import { Star, Trash2 } from "lucide-react";
import ColorPicker from "./ColorPicker";

interface Props {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: Props) {
  const [isFavorite, setIsFavorite] = useState(todo.isFavorite ?? false);
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [selectedColor, setSelectedColor] = useState(todo.color);

  function updateTodo(changes: Partial<Todo>) {
    onUpdate({ ...todo, ...changes });
  }

  function toggleFavorite(e?: React.MouseEvent) {
    e?.stopPropagation?.();
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite);
    updateTodo({ isFavorite: newFavorite });
  }

  function handleCancel() {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setIsFavorite(todo.isFavorite ?? false);
    setSelectedColor(todo.color);
    setExpanded(false);
  }

  function handleSave() {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    updateTodo({
      title: title.trim(),
      description: description.trim(),
      color: selectedColor,
      isFavorite,
    });
    setExpanded(false);
  }

  function handleDeleteClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      onDelete(todo.id);
    }
  }

  return (
    <div
      onClick={() => !expanded && setExpanded(true)}
      className={`flex flex-col w-[392px] rounded-2xl border border-gray-300 transition-all duration-200 ${
        expanded ? "bg-white" : "hover:shadow-md cursor-pointer"
      }`}
      style={{ backgroundColor: `#${todo.color}` }}
    >
      <div className="flex justify-between items-start px-6 py-4">
        {expanded ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full mr-4 py-1 md:py-2 bg-transparent rounded-md text-gray-700 placeholder-gray-400 text-sm md:text-base focus:outline-none"
            autoFocus
          />
        ) : (
          <h1 className="text-gray-900">{todo.title}</h1>
        )}

        {/* Estrela sempre no mesmo lugar */}
        <button
          type="button"
          onClick={toggleFavorite}
          className={`w-6 h-6 flex items-center justify-center transition-colors ${
            isFavorite ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          <Star
            className={`w-4 h-4 transition-all ${
              isFavorite ? "fill-yellow-500" : "fill-none"
            }`}
          />
        </button>
      </div>

      {/* Conteúdo diferente para expandido */}
      {expanded ? (
        <div className="flex flex-col gap-2 px-6 pb-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Take a note..."
            className="w-full py-1 md:py-2 bg-transparent rounded-md text-gray-700 placeholder-gray-400 text-sm md:text-base focus:outline-none"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ColorPicker setValue={setSelectedColor} />

              <button
                type="button"
                onClick={handleDeleteClick}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
              >
                <Trash2 className="w-5 h-5 text-red-500 hover:text-gray-800" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-1.5 text-sm font-semibold text-black hover:bg-gray-100 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        todo.description && (
          <ul className="list-disc list-inside mt-3 space-y-1 text-gray-800 px-6 pb-4">
            {todo.description.split("\n").map((item, i) => (
              <li key={i} className="text-sm">
                {item}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
