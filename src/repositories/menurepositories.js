import pb from "../services/pocketbaseservice";
import { setCookie } from "cookies-next";

export const fetchMenuItems = async () => {
  try {
    pb.autoCancellation(false);
    const records = await pb.collection("foods").getFullList();
    return records;
  } catch (err) {
    console.log("Error fetching menu items", err);
    throw err;
  }
};

export const fetchOrdersItems = async () => {
  try {
    // Fetch data dari "order_items" dengan expand ke "order_id" dan "menu_id"
    pb.autoCancellation(false);
    const records = await pb.collection("order_items").getList(1, 50, {
      expand: "order_id,menu_id",
    });

    // Group data by order_id
    const groupedOrders = records.items.reduce((acc, item) => {
      const orderId = item.expand?.order_id?.id;
    
      if (!orderId) {
        console.warn("Missing order_id for item:", item);
        return acc; // Abaikan item jika tidak ada order_id
      }
    
      if (acc[orderId]) {
        acc[orderId].items.push({
          menuName: item.expand?.menu_id?.name || "Unknown",
          quantity: item.quantity,
          totalPrice: item.total_price,
        });
      } else {
        acc[orderId] = {
          orderId,
          noTable: item.expand?.order_id?.no_table || "Unknown",
          statusOrder: item.expand?.order_id?.status_order || "Unknown",
          totalPrice: item.expand?.order_id?.total_price || 0,
          items: [
            {
              menuName: item.expand?.menu_id?.name || "Unknown",
              quantity: item.quantity,
              totalPrice: item.total_price,
            },
          ],
        };
      }
      return acc;
    }, {});
    

    // Ubah hasil ke dalam bentuk array agar lebih mudah digunakan di frontend
    return Object.values(groupedOrders);
  } catch (err) {
    console.error("Error fetching order items:", err);
    throw new Error("Failed to fetch grouped order items. Please try again.");
  }
};

export const fetchDataAdmin = async (adminId) => {
  try {
    pb.autoCancellation(false);
    const record = await pb.collection("admin").getOne(adminId);
    return record;
  } catch (err) {
    console.error("Error fetching admin data:", err);
    throw new Error("Failed to fetch admin data. Please try again.");
  }
};

export const addAdmin = async (username, email, password) => {
  try {
    const data = {
      username: username,
      email: email,
      emailVisibility: true,
      password: password,
      passwordConfirm: password,
    };
    console.log("Add Admin", data);
    const admin = await pb.collection("admin").create(data);
    console.log("User registered:", admin);

    return admin;
  } catch (err) {
    console.error("Error registering user:", err?.response);
    throw err;
  }
};

export const updateAdminProfile = async (adminId, data) => {
  try {
    pb.autoCancellation(false);
    const response = await pb.collection("admin").update(adminId, data);
    return response;
  } catch (err) {
    console.error("Error updating admin profile:", err);
    throw new Error("Failed to update admin profile. Please try again.");
  }
};
export const menuCategories = async (menuCategory) => {
  try {
    // Ambil semua data dari koleksi 'foods' dengan filter kategori tertentu
    const records = await pb.collection("foods").getFullList({
      filter: `category = "${menuCategory}"`, // Perbaikan filter
    });
    pb.autoCancellation(false);
    return records; // Mengembalikan data yang telah difilter
  } catch (err) {
    console.error("Error fetching menu items", err);
    throw err; // Lempar error untuk ditangani di UI/hook
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    pb.autoCancellation(false);
    const response = await pb.collection("orders").update(orderId, {
      status_order: status,
    });
    return response;
  } catch (err) {
    console.error("Error updating order status:", err);
    throw new Error("Failed to update order status. Please try again.");
  }
};

export const loginAdmin = async (username, password) => {
  try {
    const authData = await pb
      .collection("admin")
      .authWithPassword(username, password);

    setCookie("adminAuthToken", authData.token, {
      maxAge: 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    localStorage.setItem("adminUserId", authData.record.id);

    return authData;
  } catch (err) {
    console.error("Error logging in admin:", err);
    throw err;
  }
};

export const loginUser = async (username, password) => {
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(username, password);

    // Set the user authentication token as a cookie
    setCookie("userAuthToken", authData.token, {
      maxAge: 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    localStorage.setItem("userId", authData.record.id);
    return authData;
  } catch (err) {
    console.error("Error logging in user:", err);
    throw err;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const data = {
      username: username,
      email: email,
      password: password,
      passwordConfirm: password,
    };
    const user = await pb.collection("users").create(data);
    console.log("User registered:", user);

    return user;
  } catch (err) {
    console.error("Error registering user:", err);
    throw err;
  }
};

export const fetchHistoryOrder = async () => {
  try {
    pb.autoCancellation(true);
    const records = await pb.collection("orders").getFullList({
      expand: "customer,menu,items", // Expand field relasi
    });

    console.log("All Orders:", records); // Data langsung di records
    return records;
  } catch (err) {
    console.error("Error fetching all orders:", err.message || err);
    throw err;
  }
};
