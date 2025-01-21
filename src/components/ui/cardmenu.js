"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; // Mengimpor useRouter
import { useMenuItems } from "@/hooks/useMenuItems";
import { useMenuCategories } from "@/hooks/use-menu-category";
import { Button } from "./button";
import { useCart } from "@/context/CardContext"; // Pastikan menggunakan useCart dengan benar

export default function CardMenu() {
  // Mendapatkan path dari URL
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const isRoot = pathname === "/" || pathname === "/menu"; // Menentukan apakah halaman root
  const category = pathSegments.length > 2 ? pathSegments[2] : null; // Menentukan kategori berdasarkan URL

  // Mengambil menu items berdasarkan kategori atau semua item
  const { menuItems: allMenuItems, loading: allLoading, error: allError } = useMenuItems();
  const { menuItems: categoryItems, loading: categoryLoading, error: categoryError } = useMenuCategories(category);

  const menuItems = isRoot ? allMenuItems : categoryItems;
  const loading = isRoot ? allLoading : categoryLoading;
  const error = isRoot ? allError : categoryError;

  // Mengambil cart context dengan menggunakan hook useCart
  const { cartItems, addToCart, removeFromCart } = useCart();

  const [counters, setCounters] = useState([]); // Menghitung jumlah item yang ditambahkan
  const [totalItems, setTotalItems] = useState(0); // Menghitung total item
  const [totalPrice, setTotalPrice] = useState(0); // Menghitung total harga

  const router = useRouter(); // Inisialisasi useRouter untuk navigasi

  // Menangani perubahan jumlah item dan harga total saat menuItems atau counters berubah
  useEffect(() => {
    if (menuItems && menuItems.length > 0 && counters.length === 0) {
      setCounters(new Array(menuItems.length).fill(0)); // Set initial counter untuk setiap item
    }
  }, [menuItems]);

  // Menghitung total item dan total harga setiap kali counters atau menuItems berubah
  useEffect(() => {
    const newTotalItems = counters.reduce((acc, count) => acc + count, 0);
    setTotalItems(newTotalItems);

    const newTotalPrice = counters.reduce(
      (acc, count, index) => acc + (menuItems[index]?.price || 0) * count,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [counters, menuItems]);

  // Menampilkan loading atau error jika terjadi masalah dengan data menu
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500">Loading menu items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500">Error loading menu items: {error}</p>
      </div>
    );
  }

  // Menampilkan pesan jika tidak ada item di menu
  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500">
          {isRoot
            ? "No menu items available."
            : `No items available in ${category} category.`}
        </p>
      </div>
    );
  }

  // Fungsi untuk menambah item ke keranjang
  const increment = (index) => {
    const newCounters = [...counters];
    newCounters[index] += 1;
    setCounters(newCounters);
    addToCart(menuItems[index]); // Menambahkan ke keranjang

    // Mengupdate total harga dan total item
    setTotalPrice(totalPrice + (menuItems[index]?.price || 0));
    setTotalItems(totalItems + 1);
  };

  // Fungsi untuk mengurangi item dari keranjang
  const decrement = (index) => {
    const newCounters = [...counters];
    if (newCounters[index] > 0) {
      newCounters[index] -= 1;
      setCounters(newCounters);
      removeFromCart(menuItems[index].id); // Menghapus dari keranjang

      // Mengupdate total harga dan total item
      setTotalPrice(totalPrice - (menuItems[index]?.price || 0));
      setTotalItems(totalItems - 1);
    }
  };

  // Fungsi untuk menangani checkout
  const handleCheckout = () => {
    if (totalItems > 0) {
      // Navigasi ke halaman checkout jika ada item di keranjang
      router.push("/checkout");
    } else {
      alert("Your cart is empty!");
    }
  };

  return (
    <div className="relative">
      {/* Daftar item menu */}
      <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4 p-4 pb-32 mt-20 md:mt-0">
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md p-4 bg-pink-50 flex flex-col items-center hover:shadow-lg transition-shadow"
          >
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={`https://exciting-spell.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.image}`}
                alt={item.name}
                fill
                className="object-contain rounded-md"
                sizes="(max-width: 128px) 100vw, 128px"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 text-center mb-1">
              {item.name}
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Rp {parseInt(item.price).toLocaleString("id-ID")}
            </p>

            <div className="flex items-center space-x-4 mt-auto">
              <Button
                onClick={() => decrement(index)}
                className="bg-pink-200 text-pink-600 hover:bg-pink-300 w-10 h-10"
              >
                -
              </Button>
              <span className="text-lg font-semibold min-w-[2ch] text-center">
                {counters[index] || 0}
              </span>
              <Button
                onClick={() => increment(index)}
                className="bg-pink-200 text-pink-600 hover:bg-pink-300 w-10 h-10"
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Menampilkan total harga dan tombol checkout jika ada item dalam keranjang */}
      {totalItems > 0 && (
        <div
          className="fixed bottom-4 left-4 right-4 md:left-1/4 md:right-1/4 flex justify-between items-center bg-secondary py-3 px-5 rounded-lg shadow-lg"
          style={{
            backgroundColor: "#FDF2F8", // Secondary warna latar belakang
            color: "black", // Teks tetap hitam
          }}
        >
          <div>
            <p
              className="text-lg font-semibold"
              style={{
                color: "#EF4444", // Primary untuk heading total
              }}
            >
              Total
            </p>
            <p className="text-sm">
              {totalItems} item{totalItems > 1 && "s"} - Rp{" "}
              {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <Button
            className="bg-primary py-2 px-4 rounded-lg hover:opacity-90"
            style={{
              backgroundColor: "#EF4444", // Primary warna tombol
              color: "white",
            }}
            onClick={handleCheckout} // Mengarahkan ke halaman checkout
          >
            CHECK OUT
          </Button>
        </div>
      )}
    </div>
  );
}
