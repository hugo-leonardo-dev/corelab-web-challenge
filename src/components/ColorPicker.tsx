import { useState } from "react";
import { Palette } from "lucide-react";
import type { FormColor } from "../types/formColor";

const COLORS: FormColor = {
  blue: "e6f3ff",
  yellow: "fffacd",
  orange: "fff4e6",
  green: "f0fff4",
};

interface Props {
  setValue: (field: string, value: string) => void;
}

export default function ColorPicker({ setValue }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(color: string) {
    setValue("color", color);
    setSelected(color);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
      >
        <Palette className="w-5 h-5 text-gray-600" />
      </button>

      {open && (
        <div className="absolute left-0 bottom-full mb-2 flex gap-2 border border-gray-300 rounded-lg shadow  p-2 z-10">
          {Object.entries(COLORS).map(([name, hex]) => (
            <button
              key={name}
              type="button"
              onClick={() => handleSelect(hex)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                selected === hex ? "border-black" : "border-transparent"
              }`}
              style={{ backgroundColor: `#${hex}` }}
              title={name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
