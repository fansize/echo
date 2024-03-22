import React from 'react';

interface KbdProps {
    children: React.ReactNode;
}

const Kbd: React.FC<KbdProps> = ({ children }) => (
    <kbd className="flex items-center justify-center px-2 py-1.5 w-20 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
        {children}
    </kbd>
);

export default Kbd;