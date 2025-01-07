import {
  Menubar,
  MenubarMenu,
  MenubarSeparator,
} from "@/components/ui/menubar";

export default function MenubarAdmin({ onMenuClick }) {
  return (
    <Menubar className="inline-flex bg-gray-100 border border-gray-300 rounded-md">
      <MenubarMenu>
        <button
          className="px-4 py-2 hover:bg-gray-200"
          onClick={() => onMenuClick("profile")}
        >
          Profile
        </button>
        <MenubarSeparator />
        <button
          className="px-4 py-2 hover:bg-gray-200"
          onClick={() => onMenuClick("addAdmin")}
        >
          Add Admin
        </button>
      </MenubarMenu>
    </Menubar>
  );
}
