import React from "react";

interface KbdProps {
  children: React.ReactNode;
}

const Kbd: React.FC<KbdProps> = ({ children }) => (
  <kbd className="hidden md:flex items-center justify-center mr-4 px-2 py-1.5 w-20 text-xs font-semibold text-gray-800 bg-gray-100/20 border border-gray-200 rounded-lg dark:bg-slate-500/20 dark:text-gray-100 dark:border-slate-500">
    {children}
  </kbd>
);

export default Kbd;
