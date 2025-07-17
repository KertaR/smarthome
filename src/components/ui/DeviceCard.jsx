import React from 'react';
import { LightbulbIcon, ThermometerIcon, ShieldIcon, LockIcon, HomeIcon } from '../icons.jsx';
import { DashboardCard } from './DashboardCard';

export const DeviceCard = ({ device, onToggle }) => {
    const icons = { light: LightbulbIcon, thermostat: ThermometerIcon, security: ShieldIcon, lock: LockIcon };
    const Icon = icons[device.type] || HomeIcon;
    const isActive = device.on || device.aktiv || device.status === 'Zárva';

    return (
        <DashboardCard className={isActive && device.type !== 'lock' ? 'bg-cyan-900/50 border border-cyan-700' : ''}>
            <div className="flex justify-between items-start">
                <div className={`p-2 bg-slate-700 rounded-full ${isActive && device.type !== 'lock' ? 'bg-cyan-500/20' : ''}`}>
                    <Icon className={`w-5 h-5 ${isActive && device.type !== 'lock' ? 'text-cyan-400' : 'text-gray-400'}`}/>
                </div>
                <button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isActive ? 'bg-cyan-500' : 'bg-slate-600'}`}>
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>
            <div>
                <h3 className="text-md font-semibold text-white mt-4">{device.name}</h3>
                <p className="text-gray-400 text-sm">{device.room || (device.type === 'security' ? (isActive ? 'Rendszer élesítve' : 'Rendszer inaktív') : (isActive ? 'Zárva' : 'Nyitva'))}</p>
            </div>
        </DashboardCard>
    );
};
