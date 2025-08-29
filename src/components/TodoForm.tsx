import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";
import type { Todo } from "../types/todo";
import { Palette, Star } from "lucide-react";

interface Props {
  onAdd: (todo: Todo) => void;
}

interface FormData {
  title: string;
  content: string;
  color: string;
  isFavorite?: boolean;
}

export default function TodoForm({ onAdd }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    defaultValues: {
      title: "",
      content: "",
      color: "#ffffff",
      isFavorite: false,
    },
  });

  async function onSubmit(data: FormData) {
    if (!data.title.trim()) return;

    const formData = {
      ...data,
      isFavorite,
    };

    console.log(formData);

    // const { data: newTodo } = await api.post<Todo>("/", {
    //   title: formData.title.trim(),
    //   content: formData.content.trim(),
    //   color: formData.color,
    //   favorite: formData.isFavorite,
    // });

    // onAdd(newTodo);
    reset();
    setExpanded(false);
    setIsFavorite(false);
  }

  function handleCancel() {
    reset();
    setExpanded(false);
    setIsFavorite(false);
  }

  function toggleFavorite() {
    setIsFavorite(!isFavorite);
    setValue("isFavorite", !isFavorite);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {!expanded ? (
        <div
          onClick={() => setExpanded(true)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-text transition-all duration-200"
        >
          <span className="text-gray-400 text-sm">Title</span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 bg-white border px-4 py-3 border-gray-300 rounded-lg overflow-hidden"
        >
          <input
            type="text"
            {...register("title")}
            placeholder="Title"
            className="w-full py-1 md:py-2 bg-white rounded-md focus:shadow-[0px_0px_0px_4px_rgba(0,_0,_0,_0.2)] focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-400 ease-in-out duration-200 text-sm md:text-base"
            autoFocus
          />

          <textarea
            {...register("content")}
            placeholder="Take a note..."
            className="w-full py-1 md:py-2 h-24 bg-white rounded-md focus:shadow-[0px_0px_0px_4px_rgba(0,_0,_0,_0.2)] focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-400 ease-in-out duration-200 text-sm md:text-base"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="relative">
                  <input
                    type="color"
                    id="color-picker"
                    {...register("color")}
                    className="absolute inset-0 w-0 h-0 opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="color-picker"
                    className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100"
                  >
                    <Palette className="w-5 h-5 text-gray-600" />
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleFavorite}
                className={`w-8 h-8 flex items-center justify-center transition-colors ${
                  isFavorite
                    ? "text-yellow-500 hover:text-yellow-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Star
                  className={`w-5 h-5 transition-all ${
                    isFavorite ? "fill-yellow-500" : "fill-none"
                  }`}
                />
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
                type="submit"
                className="px-4 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
