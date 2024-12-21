import CardMenu from "./cardmenu";
import { Sidebar } from "./sidebar";


export default function App() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <CardMenu />
    </div>
  );
}