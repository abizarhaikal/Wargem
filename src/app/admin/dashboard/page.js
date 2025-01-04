// pages/index.js
import React from "react";
import OrderItemsTable from "../../../components/ui/OrderItems";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Order Management</h1>
      <OrderItemsTable />
    </div>
  );
};

export default HomePage;
