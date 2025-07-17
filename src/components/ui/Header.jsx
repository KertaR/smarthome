import React from 'react';
import { UserIcon } from '../icons.jsx';

export const Header = ({ title, subtitle }) => (
    <header className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-gray-400">{subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-gray-300"/>
            </div>
        </div>
    </header>
);
