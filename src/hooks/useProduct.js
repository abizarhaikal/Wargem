import PocketBase from 'pocketbase';

const pb = new PocketBase('https://exciting-spell.pockethost.io');

// Authentication (update TOKEN with your actual admin token)
pb.authStore.save('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzY0OTQ4OTAsImlkIjoidGVnNDhzdWxwaTV5dXozIiwidHlwZSI6ImFkbWluIn0.NgbHKuE0HM6WBs8LXlOfYwvgBnS2Yi_n20-aEG7ovOg');

// Function to create a new product record
export async function createProduct(data) {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("stock", data.stock);

    if (data.image) {
      formData.append("image", data.image);
    }

    const record = await pb.collection('foods').create(formData);
    console.log('Record created successfully:', record);
    return record;
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
}

// Function to check for duplicate product name
export async function checkDuplicateProduct(name) {
  try {
    const normalizedName = name.trim().toLowerCase(); // Normalize input
    const products = await pb.collection('foods').getFullList({
      filter: `name ~ "${normalizedName}"`, // Case-insensitive match using ~
    });

    return products.some((product) => product.name.trim().toLowerCase() === normalizedName);
  } catch (error) {
    console.error('Error checking for duplicate product:', error);
    return false;
  }
}
