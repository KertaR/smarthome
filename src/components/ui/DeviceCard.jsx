import React from 'react';
import { LightbulbIcon, ThermometerIcon, ShieldIcon, LockIcon, HomeIcon } from '../icons.jsx';
import { DashboardCard } from './DashboardCard';
 
// It's good practice to define constants that don't depend on props outside the component.
const ICONS = {
	light: LightbulbIcon,
	thermostat: ThermometerIcon,
	security: ShieldIcon,
	lock: LockIcon,
};
 
// Helper function to determine the subtitle. It makes the render method cleaner.
const getSubtitle = (device, isActive) => {
	const { room, type } = device;
 
	if (room) {
		return room;
	}
	if (type === 'security') {
		return isActive ? 'Rendszer élesítve' : 'Rendszer inaktív';
	}
	// Assumed fallback for other devices like locks.
	return isActive ? 'Zárva' : 'Nyitva';
};
 
export const DeviceCard = ({ device, onToggle }) => {
	// Destructuring device properties for easier access.
	const { type, name, on, aktiv, status } = device;
 
	// The logic to determine if a device is "on" or "active" can be complex
	// and depends on the device type. This centralizes that logic.
	const isActive = on || aktiv || status === 'Zárva';
 
	// Some active devices have a special highlighted state.
	const isHighlighted = isActive && type !== 'lock';
 
	const Icon = ICONS[type] || HomeIcon;
	const subtitle = getSubtitle(device, isActive);
 
	return (
		<DashboardCard className={isHighlighted ? 'bg-cyan-900/50 border border-cyan-700' : ''}>
			<div className="flex justify-between items-start">
				<div className={`p-2 bg-slate-700 rounded-full ${isHighlighted ? 'bg-cyan-500/20' : ''}`}>
					<Icon className={`w-5 h-5 ${isHighlighted ? 'text-cyan-400' : 'text-gray-400'}`} />
				</div>
				<button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isActive ? 'bg-cyan-500' : 'bg-slate-600'}`}>
					<span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
				</button>
			</div>
			<div>
				<h3 className="text-md font-semibold text-white mt-4">{name}</h3>
				<p className="text-gray-400 text-sm">{subtitle}</p>
			</div>
		</DashboardCard>
	);
};
