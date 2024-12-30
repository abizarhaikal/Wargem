import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";

export function ImageUpload({ value, onChange }) {
  const [image, setImage] = useState(value);

  useEffect(() => {
    setImage(value);
  }, [value]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/vnd.mozilla.apng"];
      if (!allowedTypes.includes(file.type)) {
        alert("Format file tidak didukung. Harap unggah file .jpg, .jpeg, .png, atau .apng.");
        return;
      }

      setImage(file);
      onChange(file); // Pass file to parent
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onChange(null); // Clear image in parent
  };

  return (
    <div className="border-2 border-dashed border-gray-300 p-10 flex flex-col justify-center items-center rounded-md space-y-4">
      {image ? (
        <>
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full h-40 object-contain"
          />
          <button
            className="bg-red-100 text-red-600 px-4 py-2 rounded-md"
            onClick={handleRemoveImage}
          >
            Hapus Gambar
          </button>
        </>
      ) : (
        <div className="text-gray-400 flex flex-col items-center">
          <label className="cursor-pointer mt-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <span className="bg-green-100 px-4 py-2 rounded-md text-sm text-green-700">
              Pilih Gambar
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
