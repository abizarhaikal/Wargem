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

export const fetchOrdersItems = async () => {
  try {
    // Fetch data dari "order_items" dengan expand ke "order_id" dan "menu_id"
    const records = await pb.collection("order_items").getList(1, 50, {
      expand: "order_id,menu_id",
    });

    // Group data by order_id
    const groupedOrders = records.items.reduce((acc, item) => {
      const orderId = item.expand.order_id.id;

      // Jika sudah ada orderId, tambahkan item baru ke dalam grup
      if (acc[orderId]) {
        acc[orderId].items.push({
          menuName: item.expand.menu_id.name || "Unknown",
          quantity: item.quantity,
          totalPrice: item.total_price,
        });
      } else {
        // Jika belum ada, buat grup baru untuk orderId tersebut
        acc[orderId] = {
          orderId,
          noTable: item.expand.order_id.no_table,
          statusOrder: item.expand.order_id.status_order,
          totalPrice: item.expand.order_id.total_price,
          items: [
            {
              menuName: item.expand.menu_id.name || "Unknown",
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