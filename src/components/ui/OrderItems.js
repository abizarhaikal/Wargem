'use client';
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { useOrderItems } from "../../hooks/useOrderItems";

const Dashboard = () => {
  const { orderItems, loading, error } = useOrderItems();

  // State for date filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (loading) {
    return <div>Loading dashboard, please wait...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Mapping menu_id to human-readable names and types
  const menuMapping = {
    llves35w0f3imq9: { name: "Es Cendol", type: "drink" },
    emgm6h9svm15452: { name: "Ayam Geprek", type: "food" },
    "447a88p6j5qo62d": { name: "Bakso", type: "food" },
    "01u6d1q1za3r4po": { name: "Kerupuk", type: "food" },
    "grm8nq5dz672apk": { name: "Teh", type: "drink" },
    "eyw3nh1w5iwz9pg": { name: "Mie Rebus", type: "food" },
    "blnlb89c7s3s1b4": { name: "Mie Goreng", type: "food" },
  };

  // Enhance order items with name and type
  const enhancedItems = orderItems.map((item) => ({
    ...item,
    name: menuMapping[item.menu_id]?.name || item.menu_id,
    type: menuMapping[item.menu_id]?.type || "unknown",
  }));

  // Apply date filter
  const filteredItems = enhancedItems.filter((item) => {
    const itemDate = new Date(item.created).toISOString().split("T")[0];
    return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
  });

  // Filter and aggregate data
  const aggregateItems = (items, type) => {
    const filteredItems = items.filter((item) => item.type === type);
    const counts = {};
    filteredItems.forEach((item) => {
      counts[item.name] = (counts[item.name] || 0) + item.quantity;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  };

  const topFood = aggregateItems(filteredItems, "food");
  const topDrink = aggregateItems(filteredItems, "drink");

  // Aggregate revenue by date
  const revenueByDate = filteredItems.reduce((acc, item) => {
    const date = new Date(item.created).toLocaleDateString();
    acc[date] = (acc[date] || 0) + item.total_price;
    return acc;
  }, {});

  const lineChartData = Object.entries(revenueByDate).map(([date, revenue]) => ({
    date,
    revenue,
  }));

  // Calculate total gross revenue and number of purchases
  const totalRevenue = filteredItems.reduce((acc, item) => acc + item.total_price, 0);
  const totalFoodPurchases = filteredItems.filter((item) => item.type === "food").reduce((acc, item) => acc + item.quantity, 0);
  const totalDrinkPurchases = filteredItems.filter((item) => item.type === "drink").reduce((acc, item) => acc + item.quantity, 0);

  // Colors for Pie Charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9932CC"];

  return (
    <div>
      <h1>Order Dashboard</h1>

      {/* Date Filters */}
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", display: "flex", gap: "2rem" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            Start Date
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                padding: "8px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            End Date
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                padding: "8px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
      </div>

      {/* Top Cards */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", width: "400px", textAlign: "center", marginRight: "2rem" }}>
          <h2>Total Pendapatan Kotor</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>Rp {totalRevenue.toLocaleString()}</p>
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", width: "400px", textAlign: "center" }}>
          <h2>Jumlah Pembelian</h2>
          <p><strong>Makanan:</strong> {totalFoodPurchases}</p>
          <p><strong>Minuman:</strong> {totalDrinkPurchases}</p>
        </div>
      </div>

      {/* Top Food and Drink Cards */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        {/* Box for Top Food */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            width: "50%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",  // Added to stack elements vertically
            justifyContent: "center", // Center the content vertically
            alignItems: "center",  // Center the content horizontally
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>5 Makanan Terbaik</h2>
          <PieChart width={500} height={500}>
            <Pie
              data={topFood}
              cx="50%"
              cy="50%"
              outerRadius={150}  // Increased outer radius for bigger pie
              fill="#8884d8"
              dataKey="value"
              label
            >
              {topFood.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Box for Top Drink */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            width: "50%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",  // Added to stack elements vertically
            justifyContent: "center", // Center the content vertically
            alignItems: "center",  // Center the content horizontally
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>5 Minuman Terbaik</h2>
          <PieChart width={500} height={500}>
            <Pie
              data={topDrink}
              cx="50%"
              cy="50%"
              outerRadius={150}  // Increased outer radius for bigger pie
              fill="#82ca9d"
              dataKey="value"
              label
            >
              {topDrink.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Line Chart for Revenue */}
      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", marginTop: "20px" }}>
        <h3 style={{ textAlign: "center" }}>Pendapatan Kotor Perwaktu</h3>
        <LineChart width={window.innerWidth - 100} height={400} data={lineChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default Dashboard;
