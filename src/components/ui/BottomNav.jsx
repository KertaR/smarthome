import React from 'react';
import { HomeIcon, LayoutGridIcon, FilmIcon, SettingsIcon } from '../icons.jsx';

export const BottomNav = ({ view, setView }) => {
    const navItems = [
        { id: 'dashboard', label: 'Vezérlőpult', icon: HomeIcon },
        { id: 'rooms', label: 'Szobák', icon: LayoutGridIcon },
        { id: 'scenes', label: 'Jelenetek', icon: FilmIcon },
        { id: 'settings', label: 'Beállítások', icon: SettingsIcon },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-10 md:hidden bg-slate-900 border-t border-slate-800 flex justify-around">
            {navItems.map(item => (
                <button key={item.id} onClick={() => setView(item.id)} className={`flex flex-col items-center p-2 w-full transition-colors duration-200 ${view === item.id ? 'text-cyan-400' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`}>
                    <item.icon className="w-6 h-6"/>
                    <span className="text-xs mt-1">{item.label}</span>
                </button>
            ))}
        </nav>
    );
};
