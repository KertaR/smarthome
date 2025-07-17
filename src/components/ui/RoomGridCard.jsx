import React from 'react';
import { iconMap } from '../icons.jsx';

/**
 * A device is considered "active" if it's on or if its status is 'Nyitva' (Open).
 * @param {object} device - The device object to check.
 * @returns {boolean}
 */
const isDeviceActive = (device) => device.on || device.status === 'Nyitva';

export const RoomGridCard = ({ room, onClick }) => {
    const { name, icon, devices } = room;

    const deviceCount = Object.keys(devices).length;
    const onDeviceCount = Object.values(devices).filter(isDeviceActive).length;
    const IconComponent = iconMap[icon];

    return (
        <button onClick={onClick} className="bg-slate-800 rounded-2xl p-4 text-left hover:bg-slate-700 transition-colors">
            {IconComponent && <IconComponent className="w-7 h-7 text-cyan-400 mb-3"/>}
            <h3 className="text-lg font-bold text-white">{name}</h3>
            <p className="text-gray-400 text-sm">{onDeviceCount} / {deviceCount} eszköz aktív</p>
        </button>
    );
};
