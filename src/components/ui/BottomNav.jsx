import React from 'react';
import { HomeIcon, LayoutGridIcon, FilmIcon, SettingsIcon } from '../icons.jsx';

const navItems = [
    { id: 'dashboard', label: 'Vezérlőpult', icon: HomeIcon },
    { id: 'rooms', label: 'Szobák', icon: LayoutGridIcon },
    { id: 'scenes', label: 'Jelenetek', icon: FilmIcon },
    { id: 'settings', label: 'Beállítások', icon: SettingsIcon },
];

const BottomNavItem = ({ id, label, icon: Icon, isActive, onClick }) => {
    const baseClasses = "flex flex-col items-center p-2 w-full transition-colors duration-200";
    const stateClasses = isActive
        ? "text-cyan-400"
        : "text-gray-400 hover:bg-slate-800 hover:text-white";

    return (
        <button onClick={() => onClick(id)} className={`${baseClasses} ${stateClasses}`}>
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
        </button>
    );
};

export const BottomNav = ({ view, setView }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-10 md:hidden bg-slate-900 border-t border-slate-800 flex justify-around">
            {navItems.map((item) => (
                <BottomNavItem key={item.id} {...item} isActive={view === item.id} onClick={setView} />
            ))}
        </nav>
    );
};
