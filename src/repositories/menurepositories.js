import pb from "../services/pocketbaseservice";

export const fetchMenuItems = async () => {
  try {
    const records = await pb.collection("foods").getFullList();
    pb.autoCancellation(false);
    return records;
  } catch (err) {
    console.log("Error fetching menu items", err);
    throw err;
  }
};
