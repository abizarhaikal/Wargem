import { Input } from "@/components/ui/Input";
import { useEffect, useState } from "react";

export function DateInput() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-CA"); // Format YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-600">Create Date:</span>
      <Input type="text" value={currentDate} disabled className="w-40" />
    </div>
  );
}