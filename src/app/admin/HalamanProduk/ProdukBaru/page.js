"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Untuk navigasi halaman
import { ArrowLeft } from "lucide-react"; // Import ikon dari lucide-react
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/admin/ProdukBaru/DateInput";
import { ImageUpload } from "@/components/ui/admin/ProdukBaru/ImageUpload";
import { ProductForm } from "@/components/ui/admin/ProdukBaru/ProductForm";
import { CategorySelector } from "@/components/ui/admin/ProdukBaru/CategorySelector";
import { createProduct, checkDuplicateProduct } from "@/hooks/useProduct";

export default function ProdukPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    image: null,
  });
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const [validationMessage, setValidationMessage] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    const { name, category, price, stock, image } = formData;

    if (!name || !category || price <= 0 || stock <= 0 || !image) {
      setValidationMessage("Semua field wajib diisi dan tidak boleh bernilai 0.");
      setTimeout(() => setValidationMessage(""), 3000); // Hapus pesan setelah 3 detik
      return;
    }

    try {
      setValidationMessage("");

      const isDuplicate = await checkDuplicateProduct(name);
      if (isDuplicate) {
        setStatusMessage({ type: "error", text: "Produk dengan nama yang sama sudah ada." });
        setTimeout(() => setStatusMessage({ type: "", text: "" }), 3000);
        return;
      }

      await createProduct({ name, category, price, stock, image });
      setStatusMessage({ type: "success", text: "Data berhasil disimpan!" });
      setFormData({ name: "", category: "", price: 0, stock: 0, image: null });
    } catch (error) {
      setStatusMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan data." });
      console.error(error);
    }

    setTimeout(() => setStatusMessage({ type: "", text: "" }), 3000);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen ml-12">
      <div className="flex items-center space-x-4 mb-6">
        <button
          className="p-2 rounded-full bg-green-400 text-white hover:bg-green-500"
          onClick={() => router.push("/admin/HalamanProduk")}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Produk Baru</h1>
      </div>
      <div className="space-y-6">
        <DateInput />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUpload
            value={formData.image}
            onChange={(image) => setFormData({ ...formData, image })}
          />
          <ProductForm
            value={{
              name: formData.name,
              price: formData.price,
              stock: formData.stock,
            }}
            onChange={(updatedFields) =>
              setFormData({ ...formData, ...updatedFields })
            }
          />
        </div>
        <CategorySelector
          value={formData.category}
          onChange={(category) => setFormData({ ...formData, category })}
        />

        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <Button onClick={handleSave}>Simpan Data</Button>

          {validationMessage && (
            <p className="text-red-500 text-sm font-semibold">
              {validationMessage}
            </p>
          )}

          {statusMessage.text && (
            <p
              className={`text-sm font-semibold ${
                statusMessage.type === "success"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {statusMessage.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
