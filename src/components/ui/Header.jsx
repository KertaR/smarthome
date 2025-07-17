import React from 'react';
import { UserIcon } from '../icons.jsx';

const UserAvatar = () => (
    <div className="flex items-center justify-center w-10 h-10 bg-slate-700 rounded-full">
        <UserIcon className="w-6 h-6 text-gray-300" />
    </div>
);

export const Header = ({ title, subtitle }) => (
    <header className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-4">
            <UserAvatar />
        </div>
    </header>
);
