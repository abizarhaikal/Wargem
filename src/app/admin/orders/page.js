"use client";

import OrderTable from "@/components/ui/OrderTableAdmin";
import { Alert } from "@/components/ui/alert";
import AlertDialogCustom from "@/components/ui/alertDialogCustom";
import { SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "@/components/ui/sidebaradmin";
import useAdminOrderStatus from "@/hooks/useAdminOrderStatus";


export default function Orders() {
  const {
    orderItems,
    loading,
    error,
    updateStatus,
    updateLoading,
    updateError,
    updateSuccess,
  } = useAdminOrderStatus();

  const handleStatusUpdate = async (orderId) => {
    try {
      await updateStatus(orderId, "success");
      alert("Order status updated successfully!");
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <SidebarProvider className="flex h-screen">
      <CustomSidebar />
      <AlertDialogCustom />
      <main className="flex-1 p-6 bg-gray-50 ml-12">
        <h1 className="text-xl font-semibold mb-4">Order Items</h1>

        {/* Alert Section */}
        {loading && (
          <div className="flex justify-center">
            <h1>Loading...</h1>
          </div>
        )}
        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}
        {updateError && (
          <Alert variant="destructive" className="mb-4">
            {updateError}
          </Alert>
        )}
        {updateSuccess && (
          <Alert variant="success" className="mb-4">
            Order status updated successfully!
          </Alert>
        )}

        {/* Table Section */}
        {!loading && !error && (
          <OrderTable
            orderItems={orderItems}
            handleStatusUpdate={handleStatusUpdate}
            updateLoading={updateLoading}
          />
        )}
      </main>
    </SidebarProvider>
  );
}
