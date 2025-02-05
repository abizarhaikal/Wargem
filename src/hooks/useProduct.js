import PocketBase from "pocketbase";

const pb = new PocketBase("https://exciting-spell.pockethost.io");
pb.authStore.save("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4MDA0NTg2NjEsImlkIjoidGVnNDhzdWxwaTV5dXozIiwidHlwZSI6ImFkbWluIn0.8bz7HqGds90Gvw7fqDTCHmW67kU1sC7q3D7zGoGLkq4");

export async function createProduct(data) {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("status", data.status);

    if (data.image) {
      formData.append("image", data.image);
    }

    const record = await pb.collection("foods").create(formData);
    console.log("Record created successfully:", record);
    return record;
  } catch (error) {
    console.error("Error creating record:", error);
    throw error;
  }
}

export async function checkDuplicateProduct(name) {
  try {
    const normalizedName = name.trim().toLowerCase();
    const products = await pb.collection("foods").getFullList({
      filter: `name ~ "${normalizedName}"`, // Perbaikan sintaks
      $autoCancel: false,
    });

    return products.some(
      (product) => product.name.trim().toLowerCase() === normalizedName
    );
  } catch (error) {
    console.error("Error checking for duplicate product:", error);
    return false;
  }
}
