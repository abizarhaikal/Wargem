import pb from "../services/pocketbaseservice";

export const fetchMenuItems = async () => {
  try {
    const records = await pb.collection("foods").getFullList();
    return records;
  } catch (err) {
    console.log("Error fetching menu items", err);
    throw err;
  }
};

export const fetchHistoryOrder = async () => {
  try {
    pb.autoCancellation(true);
    const records = await pb.collection('orders').getFullList({
      expand: 'customer,menu,items', // Expand field relasi
    });

    console.log("All Orders:", records); // Data langsung di records
    return records;
  } catch (err) {
    console.error("Error fetching all orders:", err.message || err);
    throw err;
  }
};