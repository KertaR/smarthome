import React, { useState } from 'react';
import { Header } from '../ui/Header';

// Helper component for the user settings section.
// It encapsulates the temporary state for the username input.
const UserSettingsSection = ({ username, setUsername }) => {
    const [tempUsername, setTempUsername] = useState(username);

    return (
        <div className="bg-slate-800 rounded-2xl p-6">
            <h3 className="font-semibold text-lg text-white mb-4">Felhasználói adatok</h3>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Felhasználónév</label>
            <input
                type="text"
                id="username"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                onBlur={() => setUsername(tempUsername)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
        </div>
    );
};

// Helper component for the theme settings section.
// It uses a data-driven approach to render theme buttons, making it easily extensible.
const ThemeSettingsSection = ({ theme, setTheme }) => {
    const availableThemes = [
        { id: 'dark', label: 'Sötét' },
        { id: 'midnight', label: 'Éjfél' },
    ];

    const getButtonClasses = (themeId) => {
        const baseClasses = "w-full p-4 rounded-lg border-2 font-semibold";
        const activeClasses = "border-cyan-500 text-cyan-500";
        const inactiveClasses = "border-slate-600 text-gray-300";

        return `${baseClasses} ${theme === themeId ? activeClasses : inactiveClasses}`;
    };

    return (
        <div className="bg-slate-800 rounded-2xl p-6">
            <h3 className="font-semibold text-lg text-white mb-4">Téma</h3>
            <div className="flex gap-4">
                {availableThemes.map(({ id, label }) => (
                    <button key={id} onClick={() => setTheme(id)} className={getButtonClasses(id)}>
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const SettingsView = ({ username, setUsername, theme, setTheme }) => {
    return (
        <div>
            <Header title="Beállítások" subtitle="Tedd személyessé az alkalmazást." />
            <div className="mt-8 max-w-md space-y-8">
                <UserSettingsSection username={username} setUsername={setUsername} />
                <ThemeSettingsSection theme={theme} setTheme={setTheme} />
            </div>
        </div>
    );
};