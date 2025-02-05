// services/pocketbaseservice.js
import pb from "../services/pocketbaseservice";

export const fetchOrderItems = async () => {
  try {
    pb.autoCancellation(false);
    const records = await pb.collection("order_items").getFullList(); // Replace with the correct collection name
    return records;
  } catch (err) {
    console.log("Error fetching order items", err);
    throw err;
  }
};
