import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function CategorySelector({ value, onChange }) {
  const [selectedCategory, setSelectedCategory] = useState(value);

  useEffect(() => {
    setSelectedCategory(value);
  }, [value]);

  const handleChange = (value) => {
    setSelectedCategory(value);
    onChange(value);
  };

  return (
    <div className="space-y-2">
      <p className="text-gray-600 font-semibold">Kategori</p>
      <RadioGroup value={selectedCategory} onValueChange={handleChange}>
        <div className="flex items-center space-x-4">
          <RadioGroupItem value="makanan" id="makanan" />
          <label htmlFor="makanan" className="flex items-center space-x-2">
            <span className="bg-green-100 p-2 rounded-md">[Icon Makanan]</span>
            <span>Makanan</span>
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <RadioGroupItem value="minuman" id="minuman" />
          <label htmlFor="minuman" className="flex items-center space-x-2">
            <span className="bg-blue-100 p-2 rounded-md">[Icon Minuman]</span>
            <span>Minuman</span>
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <RadioGroupItem value="snack" id="snack" />
          <label htmlFor="snack" className="flex items-center space-x-2">
            <span className="bg-pink-100 p-2 rounded-md">[Icon Snack]</span>
            <span>Snack</span>
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
