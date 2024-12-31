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

export const loginUser = async (username, password) => {
  try{
    const authData = await pb
      .collection("users")
      .authWithPassword(username, password);

    console.log("Authentication successful");
    console.log("Auth Token: " + pb.authStore.token);
    console.log("User ID: ",pb.authStore.model.id)

    return authData;
  } catch (err){
    console.error("Error logging in user:", err);
    throw err;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const data = {
      "username": username,
      "email": email,
      "password": password,
      "passwordConfirm": password
    }
    const user = await pb
      .collection("users")
      .create(data);
    console.log("User registered:", user);

    return user;
  } catch (err) {
    console.error("Error registering user:", err);
    throw err;
  }
};