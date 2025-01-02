"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // Import ikon dari lucide-react
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/admin/ProdukBaru/DateInput";
import { ImageUpload } from "@/components/ui/admin/UpdateProduk/ImageUpload";
import { ProductForm } from "@/components/ui/admin/ProdukBaru/ProductForm";
import { CategorySelector } from "@/components/ui/admin/ProdukBaru/CategorySelector";
import PocketBase from "pocketbase";
import { checkDuplicateProduct } from "@/hooks/useProduct";

const pb = new PocketBase("https://exciting-spell.pockethost.io");

export default function UpdateProdukPage({ params }) {
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
  const [id, setId] = useState(null);
  const [originalName, setOriginalName] = useState("");
  const collectionId = "foods";

  useEffect(() => {
    let isSubscribed = true;

    async function fetchParams() {
      const resolvedParams = await params;
      if (isSubscribed) {
        setId(resolvedParams.id);
      }
    }

    fetchParams();
    return () => {
      isSubscribed = false;
    };
  }, [params]);

  useEffect(() => {
    let isSubscribed = true;

    async function fetchProduct() {
      if (!id) return;

      try {
        const product = await pb.collection(collectionId).getOne(id, {
          $autoCancel: false,
        });
        
        if (isSubscribed) {
          setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            image: product.image ? product.image : null,
          });
          setOriginalName(product.name);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        if (isSubscribed) {
          setStatusMessage({ 
            type: "error", 
            text: "Terjadi kesalahan saat memuat data." 
          });
        }
      }
    }

    fetchProduct();
    return () => {
      isSubscribed = false;
    };
  }, [id]);

  const handleUpdate = async () => {
    const { name, category, price, stock, image } = formData;

    if (!name || !category || price <= 0 || stock <= 0 || !image) {
      setValidationMessage("Semua field wajib diisi dan tidak boleh bernilai 0.");
      setTimeout(() => setValidationMessage(""), 3000);
      return;
    }

    try {
      setValidationMessage("");

      if (name.toLowerCase() !== originalName.toLowerCase()) {
        const isDuplicate = await checkDuplicateProduct(name);
        if (isDuplicate) {
          setStatusMessage({ 
            type: "error", 
            text: "Produk dengan nama yang sama sudah ada." 
          });
          setTimeout(() => setStatusMessage({ type: "", text: "" }), 3000);
          return;
        }
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("category", category);
      formDataToSend.append("price", price);
      formDataToSend.append("stock", stock);
      if (image instanceof File) {
        formDataToSend.append("image", image);
      }

      await pb.collection(collectionId).update(id, formDataToSend);

      setStatusMessage({ type: "success", text: "Data berhasil diperbarui!" });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push("/admin/HalamanProduk");
    } catch (error) {
      console.error("Error updating product:", error);
      setStatusMessage({ 
        type: "error", 
        text: "Terjadi kesalahan saat menyimpan data." 
      });
      setTimeout(() => setStatusMessage({ type: "", text: "" }), 3000);
    }
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
        <h1 className="text-2xl font-bold">Update Produk</h1>
      </div>
      <div className="space-y-6">
        <DateInput />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUpload
            value={formData.image}
            onChange={(image) => setFormData({ ...formData, image })}
            collectionId={collectionId}
            recordId={id}
          />
          <ProductForm
            value={{
              name: formData.name,
              price: formData.price,
              stock: formData.stock,
            }}
            onChange={(updatedFields) =>
              setFormData({ ...formData, ...updatedFields })}
          />
        </div>
        <CategorySelector
          value={formData.category}
          onChange={(category) => setFormData({ ...formData, category })}
        />

        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <Button onClick={handleUpdate}>Update Data</Button>

          {validationMessage && (
            <p className="text-red-500 text-sm font-semibold transition-opacity duration-700 ease-in-out opacity-100">
              {validationMessage}
            </p>
          )}

          {statusMessage.text && (
            <p
              className={`text-sm font-semibold transition-all duration-300 ease-in-out ${
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
