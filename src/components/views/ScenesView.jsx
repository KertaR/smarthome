import React from 'react';
import { Header } from '../ui/Header';
import { iconMap } from '../icons.jsx';

export const ScenesView = ({ onActivateScene }) => {
    const scenes = [
        { id: 'reggel', name: 'Jó reggelt!', icon: 'SunIcon', color: 'text-yellow-400' },
        { id: 'este', name: 'Jó éjt!', icon: 'MoonIcon', color: 'text-indigo-400' },
        { id: 'film', name: 'Filmest', icon: 'FilmIcon', color: 'text-rose-400' },
        { id: 'elmentem', name: 'Elmentem', icon: 'HomeIcon', color: 'text-gray-400' },
    ];
    return (
        <div>
            <Header title="Jelenetek" subtitle="Aktiválj egyet a gyors beállításokhoz." />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {scenes.map(scene => {
                    const Icon = iconMap[scene.icon];
                    return (
                        <div key={scene.id} className="bg-slate-800 rounded-2xl p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {Icon && <Icon className={`w-8 h-8 ${scene.color}`} />}
                                <span className="text-lg font-semibold text-white">{scene.name}</span>
                            </div>
                            <button onClick={() => onActivateScene(scene.id, scene.name)} className="px-4 py-2 rounded-lg font-semibold bg-cyan-600 hover:bg-cyan-700 transition-colors">Aktiválás</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
