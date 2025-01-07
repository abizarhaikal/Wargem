"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useAlertDialogStore from "@/store/alertDialogStore";

export default function AlertDialogCustom() {
  const pathname = usePathname();
  const { isOpen, title, description, onConfirm, hideDialog, setShownInDashboard } =
    useAlertDialogStore();

  const isDashboardPage = pathname === '/admin/dashboard';

  useEffect(() => {
    if (isDashboardPage) {
      const hasShownDialog = localStorage.getItem('dashboardAlertShown');
      if (!hasShownDialog) {
        localStorage.setItem('dashboardAlertShown', 'true');
        setShownInDashboard(true);
      } else {
        setShownInDashboard(false);
      }
    }
  }, [isDashboardPage, setShownInDashboard]);

  const handleConfirm = () => {
    // Tambahkan pengecekan sebelum memanggil onConfirm
    if (typeof onConfirm === 'function') {
      onConfirm();
    }
    hideDialog();
  };

  const shouldShowDialog = isOpen && (!isDashboardPage || 
    (isDashboardPage && useAlertDialogStore.getState().shownInDashboard));

  if (!shouldShowDialog) return null;

  return (
    <AlertDialog open={true} onOpenChange={hideDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || 'Pemberitahuan'}</AlertDialogTitle>
          <AlertDialogDescription>{description || 'Tidak ada deskripsi'}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirm}>
            Mengerti
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}