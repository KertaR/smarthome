import React, { useState } from 'react';
import { Header } from '../ui/Header';

export const SettingsView = ({ username, setUsername, theme, setTheme }) => {
    const [tempUsername, setTempUsername] = useState(username);
    return (
        <div>
            <Header title="Beállítások" subtitle="Tedd személyessé az alkalmazást." />
            <div className="mt-8 max-w-md space-y-8">
                <div className="bg-slate-800 rounded-2xl p-6">
                    <h3 className="font-semibold text-lg text-white mb-4">Felhasználói adatok</h3>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Felhasználónév</label>
                    <input type="text" id="username" value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} onBlur={() => setUsername(tempUsername)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                </div>
                <div className="bg-slate-800 rounded-2xl p-6">
                    <h3 className="font-semibold text-lg text-white mb-4">Téma</h3>
                    <div className="flex gap-4">
                        <button onClick={() => setTheme('dark')} className={`w-full p-4 rounded-lg border-2 font-semibold ${theme === 'dark' ? 'border-cyan-500 text-cyan-500' : 'border-slate-600 text-gray-300'}`}>Sötét</button>
                        <button onClick={() => setTheme('midnight')} className={`w-full p-4 rounded-lg border-2 font-semibold ${theme === 'midnight' ? 'border-cyan-500 text-cyan-500' : 'border-slate-600 text-gray-300'}`}>Éjfél</button>
                    </div>
                </div>
            </div>
        </div>
    );
};