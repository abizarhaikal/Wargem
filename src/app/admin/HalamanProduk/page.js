"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import { useProductData } from "@/hooks/useProductData";
import { ProductLayout } from "@/components/ui/admin/HalamanProduk/ProductLayout";
import { SearchBar } from "@/components/ui/admin/HalamanProduk/SearchBar";
import { ProductTable } from "@/components/ui/admin/HalamanProduk/ProductTable";
import CustomSidebar from "@/components/ui/sidebaradmin";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import AlertDialogCustom from "@/components/ui/alertDialogCustom";

const pb = new PocketBase("https://exciting-spell.pockethost.io");

export default function ProductListPage() {
  const { products, loading, error, refetchProducts } = useProductData();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?"))
      return;
    try {
      await pb.collection("foods").delete(id);
      await refetchProducts();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleUpdate = (id) => {
    router.push(`/admin/HalamanProduk/UpdateProduk/${id}`);
  };

  const handleAddNew = () => {
    router.push("/admin/HalamanProduk/ProdukBaru");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return <div className="p-6">Error loading products: {error.message}</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <CustomSidebar />
        <main className="flex-1 p-6 bg-gray-50 ml-12">
          {" "}
          {/* Added ml-12 for left margin */}
          <ProductLayout>
            <SearchBar
              value={search}
              onChange={setSearch}
              onAddNew={handleAddNew}
            />
            {loading ? (
              <div className="text-center">Memuat data...</div>
            ) : (
              <ProductTable
                products={filteredProducts}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            )}
          </ProductLayout>
          <AlertDialogCustom />
        </main>
      </div>
    </SidebarProvider>
  );
}
