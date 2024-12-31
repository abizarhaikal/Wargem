import MySidebar from "@/components/ui/mysidebar";
import CardMenu from "@/components/ui/cardmenu";


export default function Cemilan() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <MySidebar />
      <CardMenu />
    </div>
  );
}