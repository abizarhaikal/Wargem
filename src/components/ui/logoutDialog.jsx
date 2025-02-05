// components/LogoutDialog.js
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export const LogoutDialog = ({ onConfirm }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="btn">Logout</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg">
          <AlertDialog.Title className="text-lg font-bold">
            Confirm Logout
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-gray-600">
            Are you sure you want to logout? This action cannot be undone.
          </AlertDialog.Description>
          <div className="mt-4 flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <button className="btn-secondary">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="btn-primary" onClick={onConfirm}>
                Confirm
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
