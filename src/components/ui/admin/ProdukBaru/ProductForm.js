import { Input } from "@/components/ui/Input";

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
        <label className="text-sm font-semibold text-gray-700">Stock</label>
        <Input
          type="number"
          name="stock"
          placeholder="Stock"
          value={value.stock}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
