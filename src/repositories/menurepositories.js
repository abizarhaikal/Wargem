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

export const loginAdmin = async (username, password) => {
  try {
    const authData = await pb
      .collection("admin")
      .authWithPassword(username, password);
    return authData;
  } catch (err) {
    console.error("Error logging in admin:", err);
    throw err;
  }
};
