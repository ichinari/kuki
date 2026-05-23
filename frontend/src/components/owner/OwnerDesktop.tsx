import { ReactNode } from "react";
import Sidebar from "./Sidebar";

export default function OwnerDesktop({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-kuki-dark text-white">
      <Sidebar active="dashboard" />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
