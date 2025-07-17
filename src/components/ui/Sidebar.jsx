import React from 'react';
import { HomeIcon, LayoutGridIcon, FilmIcon, SettingsIcon, ZapIcon } from '../icons.jsx';

// By defining static data outside the component, we prevent it from being
// re-created on every render and clearly separate data from presentation.
const NAV_ITEMS = [
    { id: 'dashboard', label: 'Vezérlőpult', icon: HomeIcon },
    { id: 'rooms', label: 'Szobák', icon: LayoutGridIcon },
    { id: 'scenes', label: 'Jelenetek', icon: FilmIcon },
    { id: 'settings', label: 'Beállítások', icon: SettingsIcon },
];

// A dedicated component for each navigation item improves readability and separation of concerns.
const SidebarItem = ({ item, isActive, onClick }) => {
    // Destructure for easier access. Renaming 'icon' to 'Icon' is a convention for components.
    const { label, icon: Icon } = item;

    // Programmatically building the className string is easier to read and manage.
    const baseClasses = 'p-3 rounded-lg transition-colors duration-200';
    const activeClasses = 'bg-slate-700 text-white';
    const inactiveClasses = 'text-gray-400 hover:bg-slate-800 hover:text-white';

    const buttonClasses = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;

    return (
        <button onClick={onClick} className={buttonClasses}>
            <Icon className="w-6 h-6" />
            <span className="sr-only">{label}</span>
        </button>
    );
};

export const Sidebar = ({ view, setView }) => {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r border-slate-800 bg-slate-900 md:flex">
            <div className="flex flex-col items-center gap-y-6 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20">
                    <ZapIcon className="h-6 w-6 text-cyan-400" />
                </div>
                <nav className="flex flex-col items-center gap-y-4">
                    {NAV_ITEMS.map((item) => (
                        <SidebarItem key={item.id} item={item} isActive={view === item.id} onClick={() => setView(item.id)} />
                    ))}
                </nav>
            </div>
        </aside>
    );
};
