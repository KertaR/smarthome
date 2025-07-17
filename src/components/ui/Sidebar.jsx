import React from 'react';
import { HomeIcon, LayoutGridIcon, FilmIcon, SettingsIcon, ZapIcon } from '../icons.jsx';

export const Sidebar = ({ view, setView }) => {
    const navItems = [
        { id: 'dashboard', label: 'Vezérlőpult', icon: HomeIcon },
        { id: 'rooms', label: 'Szobák', icon: LayoutGridIcon },
        { id: 'scenes', label: 'Jelenetek', icon: FilmIcon },
        { id: 'settings', label: 'Beállítások', icon: SettingsIcon },
    ];

    return (
        <aside className="fixed inset-y-0 left-0 z-10 w-20 flex-col border-r border-slate-800 bg-slate-900 hidden md:flex">
            <div className="flex flex-col items-center gap-y-6 p-4">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <ZapIcon className="w-6 h-6 text-cyan-400"/>
                </div>
                <nav className="flex flex-col items-center gap-y-4">
                    {navItems.map(item => (
                        <button key={item.id} onClick={() => setView(item.id)} className={`p-3 rounded-lg transition-colors duration-200 ${view === item.id ? 'bg-slate-700 text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`}>
                            <item.icon className="w-6 h-6"/>
                            <span className="sr-only">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
};
