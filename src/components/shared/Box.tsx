import { ReactElement } from "react";

export default function Box({ children }: { children: ReactElement }) {
  return (
    <div className="flex flex-col border border-gray-400 p-2 mt-2">
      {children}
    </div>
  );
}
