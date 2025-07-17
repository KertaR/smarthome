import React from 'react';
import { LightbulbIcon, ThermometerIcon, BlindsIcon, MusicIcon, CoffeeIcon, SprinklerIcon, GarageIcon, BatteryChargingIcon, HomeIcon, StarIcon, SkipForwardIcon, ChartBarIcon } from '../icons.jsx';
import { playlist } from '../../data/appData.jsx';

const LightControls = ({ device, onStateChange }) => (
    <div className="mt-4">
        <p className="text-sm text-gray-300">Fényerő: {device.brightness}%</p>
        <input type="range" min="0" max="100" value={device.brightness} onChange={(e) => onStateChange({ ...device, brightness: parseInt(e.target.value) })} className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
    </div>
);

const ThermostatControls = ({ device, onStateChange, onOpenModal }) => (
    <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center justify-center space-x-4">
            <button onClick={() => onStateChange({ ...device, temperature: device.temperature - 1 })} className="p-2 rounded-full bg-slate-600 hover:bg-slate-500">-</button>
            <span className="text-2xl font-bold text-white">{device.temperature}°C</span>
            <button onClick={() => onStateChange({ ...device, temperature: device.temperature + 1 })} className="p-2 rounded-full bg-slate-600 hover:bg-slate-500">+</button>
        </div>
        <button onClick={() => onOpenModal(device)} className="p-2 rounded-full bg-slate-600 hover:bg-slate-500">
            <ChartBarIcon className="w-5 h-5" />
        </button>
    </div>
);

const BlindsControls = ({ device, onStateChange }) => (
    <div className="mt-4">
        <p className="text-sm text-gray-300">Nyitottság: {device.open}%</p>
        <input type="range" min="0" max="100" value={device.open} onChange={(e) => onStateChange({ ...device, open: parseInt(e.target.value) })} className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
    </div>
);

const MusicControls = ({ device, onStateChange }) => (
    <div className="mt-4">
        <p className="text-sm text-gray-300 truncate">Lejátszás: {playlist[device.trackIndex]}</p>
        <div className="flex items-center justify-between">
            <div className="flex-grow space-y-2">
                <label className="text-sm text-gray-300">Hangerő: {device.volume}%</label>
                <input type="range" min="0" max="100" value={device.volume} onChange={(e) => onStateChange({ ...device, volume: parseInt(e.target.value) })} className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
            </div>
            <button onClick={() => onStateChange({ ...device, trackIndex: (device.trackIndex + 1) % playlist.length })} className="ml-4 p-2 rounded-full bg-slate-600 hover:bg-slate-500">
                <SkipForwardIcon className="w-5 h-5" />
            </button>
        </div>
    </div>
);

const CoffeeControls = ({ device }) => (
    <div className="mt-4">
        <p className="text-sm text-gray-300">Állapot: <span className="font-semibold text-cyan-300">{device.on ? 'Főzés...' : 'Készenlét'}</span></p>
    </div>
);

const SprinklerControls = ({ device, onStateChange }) => (
    <div className="mt-4">
        <p className="text-sm text-gray-300">Időzítő: {device.duration} perc</p>
        <input type="range" min="5" max="60" step="5" value={device.duration} onChange={(e) => onStateChange({ ...device, duration: parseInt(e.target.value) })} className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
    </div>
);

const DoorControls = ({ device, onStateChange }) => (
    <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-300">Állapot: <span className="font-semibold text-cyan-300">{device.status}</span></p>
        <button onClick={() => onStateChange(device)} disabled={device.isMoving} className="px-3 py-1 rounded-lg text-sm font-semibold bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-500">
            {device.status === 'Zárva' ? 'Nyitás' : 'Zárás'}
        </button>
    </div>
);

const ChargerControls = ({ device }) => (
    <div className="mt-4">
        <p className="text-sm text-gray-300">Állapot: <span className="font-semibold text-cyan-300">{device.on ? `Töltés (${device.power}kW)` : 'Készenlét'}</span></p>
    </div>
);

const DEVICE_ICONS = { light: LightbulbIcon, thermostat: ThermometerIcon, blinds: BlindsIcon, music: MusicIcon, coffee: CoffeeIcon, sprinkler: SprinklerIcon, door: GarageIcon, charger: BatteryChargingIcon };

const DEVICE_CONTROLS = {
    light: LightControls,
    thermostat: ThermostatControls,
    blinds: BlindsControls,
    music: MusicControls,
    coffee: CoffeeControls,
    sprinkler: SprinklerControls,
    door: DoorControls,
    charger: ChargerControls,
};

export const DeviceControlCard = ({ device, onStateChange, onFavoriteToggle, onOpenModal }) => {
    const Icon = DEVICE_ICONS[device.type] || HomeIcon;
    const isOn = device.on || ['Nyitva', 'Nyitás...', 'Zárás...'].includes(device.status);

    const SpecificControlComponent = DEVICE_CONTROLS[device.type];
    const showControls = SpecificControlComponent && (!['light', 'music', 'sprinkler'].includes(device.type) || device.on);

    return (
        <div className={`p-4 rounded-xl transition-colors duration-300 relative ${isOn ? 'bg-cyan-900/50' : 'bg-slate-800'}`}>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3">
                    <Icon className={`w-6 h-6 ${isOn ? 'text-cyan-400' : 'text-gray-400'}`} />
                    <p className="font-semibold text-white">{device.name}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => onFavoriteToggle(device)} className="p-1 text-gray-500 hover:text-yellow-400 transition-colors">
                        <StarIcon className="w-5 h-5" isFilled={device.favorite} />
                    </button>
                    {typeof device.on !== 'undefined' && (
                        <button onClick={() => onStateChange({ ...device, on: !device.on })} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${device.on ? 'bg-cyan-500' : 'bg-slate-600'}`}>
                            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${device.on ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    )}
                </div>
            </div>
            {/* Részletes vezérlők */}
            {showControls && <SpecificControlComponent device={device} onStateChange={onStateChange} onOpenModal={onOpenModal} />}
        </div>
    );
};
