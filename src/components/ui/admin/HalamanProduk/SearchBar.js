import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar({ value, onChange, onAddNew }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <Input
        placeholder="Cari data produk"
        value={value}
        onChange={(e) => onChange(e.target.value.trimStart())}
        className="w-1/2"
      />
      <Button className="bg-green-400 text-white hover:bg-green-500" onClick={onAddNew}>+ Tambahkan Produk Baru</Button>
    </div>
  );
}
