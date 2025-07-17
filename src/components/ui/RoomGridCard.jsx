import React from 'react';
import { iconMap } from '../icons.jsx';

export const RoomGridCard = ({ room, onClick }) => {
    const deviceCount = Object.keys(room.devices).length;
    const onDeviceCount = Object.values(room.devices).filter(d => d.on || d.status === 'Nyitva').length;
    const Icon = iconMap[room.icon];

    return (
        <button onClick={onClick} className="bg-slate-800 rounded-2xl p-4 text-left hover:bg-slate-700 transition-colors">
            {Icon && <Icon className="w-7 h-7 text-cyan-400 mb-3"/>}
            <h3 className="text-lg font-bold text-white">{room.name}</h3>
            <p className="text-gray-400 text-sm">{onDeviceCount} / {deviceCount} eszköz aktív</p>
        </button>
    );
};
