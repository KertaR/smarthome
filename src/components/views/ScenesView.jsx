import React from 'react';
import { Header } from '../ui/Header';
import { iconMap } from '../icons.jsx';

// Data for scenes, moved outside the component to avoid re-creation on each render.
const scenes = [
    { id: 'reggel', name: 'Jó reggelt!', icon: 'SunIcon', color: 'text-yellow-400' },
    { id: 'este', name: 'Jó éjt!', icon: 'MoonIcon', color: 'text-indigo-400' },
    { id: 'film', name: 'Filmest', icon: 'FilmIcon', color: 'text-rose-400' },
    { id: 'elmentem', name: 'Elmentem', icon: 'HomeIcon', color: 'text-gray-400' },
];

const SceneItem = ({ scene, onActivateScene }) => {
    const { id, name, icon, color } = scene;
    const Icon = iconMap[icon];

    return (
        <div className="bg-slate-800 rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                {Icon && <Icon className={`w-8 h-8 ${color}`} />}
                <span className="text-lg font-semibold text-white">{name}</span>
            </div>
            <button onClick={() => onActivateScene(id, name)} className="px-4 py-2 rounded-lg font-semibold bg-cyan-600 hover:bg-cyan-700 transition-colors">Aktiválás</button>
        </div>
    );
};

export const ScenesView = ({ onActivateScene }) => {
    return (
        <div>
            <Header title="Jelenetek" subtitle="Aktiválj egyet a gyors beállításokhoz." />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {scenes.map(scene => (
                    <SceneItem key={scene.id} scene={scene} onActivateScene={onActivateScene} />
                ))}
            </div>
        </div>
    );
};
