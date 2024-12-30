import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  import Image from "next/image";
  
  const buildImageUrl = (product) => {
    if (!product.image) return "/default-image.png";
    return `https://exciting-spell.pockethost.io/api/files/${product.collectionId}/${product.id}/${product.image}`;
  };
  
  export function ProductTable({ products, onUpdate, onDelete }) {
    return (
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader className="bg-green-50">
            <TableRow>
              <TableHead className="px-4 py-2">Product ID</TableHead>
              <TableHead className="px-4 py-2">Image</TableHead>
              <TableHead className="px-4 py-2">Nama</TableHead>
              <TableHead className="px-4 py-2">Harga</TableHead>
              <TableHead className="px-4 py-2">Kategori</TableHead>
              <TableHead className="px-4 py-2">Waktu Dibuat</TableHead>
              <TableHead className="px-4 py-2">Waktu Diperbarui</TableHead>
              <TableHead className="px-4 py-2">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-b">
                <TableCell className="px-4 py-2">{product.id}</TableCell>
                <TableCell className="px-4 py-2">
                  <Image
                    src={buildImageUrl(product)}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded-md"
                    onError={(e) => (e.target.src = "/default-image.png")}
                  />
                </TableCell>
                <TableCell className="px-4 py-2">{product.name}</TableCell>
                <TableCell className="px-4 py-2">{`Rp${product.price}`}</TableCell>
                <TableCell className="px-4 py-2">{product.category}</TableCell>
                <TableCell className="px-4 py-2">{product.created}</TableCell>
                <TableCell className="px-4 py-2">{product.updated}</TableCell>
                <TableCell className="px-4 py-2 flex gap-2">
                  <Button onClick={() => onUpdate(product.id)}>Update</Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }