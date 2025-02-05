import { Input } from "@/components/ui/Input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductForm({ value, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        name="name"
        placeholder="Nama Produk"
        value={value.name}
        onChange={handleChange}
      />
      <div>
        <label className="text-sm font-semibold text-gray-700">Harga</label>
        <Input
          type="number"
          name="price"
          placeholder="Harga"
          value={value.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-gray-700">Status</label>
        <Select
          onValueChange={(status) => onChange({ status })}
          value={value.status}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tersedia">Tersedia</SelectItem>
            <SelectItem value="Habis">Habis</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}