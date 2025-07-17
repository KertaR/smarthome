import React from 'react';
import { ZapIcon, SunIcon, ThermometerIcon, XIcon } from '../icons.jsx';

// --- Constants ---
// Placed outside the component to prevent re-creation on every render.
const MODES = ['off', 'heat', 'cool'];
const MODE_ICONS = {
    off: <ZapIcon className="w-5 h-5" />,
    heat: <SunIcon className="w-5 h-5" />,
    cool: <ThermometerIcon className="w-5 h-5" />
};
const MODE_COLORS = {
    off: 'bg-slate-600',
    heat: 'bg-orange-500',
    cool: 'bg-blue-500'
};
const HISTORY_CHART_MIN_TEMP = 18;
const HISTORY_CHART_TEMP_RANGE = 8; // Visual range from 18°C to 26°C

// --- Helper Functions ---
/**
 * Generates the appropriate CSS classes for a mode button based on its state.
 * @param {string} currentMode - The currently active mode.
 * @param {string} mode - The mode for this button.
 * @returns {string} A string of Tailwind CSS classes.
 */
const getModeButtonClasses = (currentMode, mode) => {
    const baseClasses = 'w-full p-2 rounded-md font-semibold text-sm capitalize flex items-center justify-center gap-2 transition-colors';
    const activeClasses = `${MODE_COLORS[mode]} text-white`;
    const inactiveClasses = 'bg-slate-600 hover:bg-slate-500';
    
    return `${baseClasses} ${currentMode === mode ? activeClasses : inactiveClasses}`;
};

// --- Child Components ---
// Breaking the UI into smaller components improves readability and reusability.

const ModalHeader = ({ id, title, onClose }) => (
    <div className="flex justify-between items-center mb-6">
        <h2 id={id} className="text-2xl font-bold text-white">{title}</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700" aria-label="Close modal">
            <XIcon className="w-6 h-6 text-gray-400"/>
        </button>
    </div>
);

const TemperatureControl = ({ temperature, onTemperatureChange }) => (
    <div>
        <h3 className="text-lg font-semibold text-white mb-2">Hőmérséklet</h3>
        <div className="flex items-center justify-center space-x-4 bg-slate-700/50 p-4 rounded-lg">
            <button onClick={() => onTemperatureChange(temperature - 1)} className="p-3 rounded-full bg-slate-600 hover:bg-slate-500" aria-label="Decrease temperature">-</button>
            <span className="text-4xl font-bold text-white w-24 text-center">{temperature}°C</span>
            <button onClick={() => onTemperatureChange(temperature + 1)} className="p-3 rounded-full bg-slate-600 hover:bg-slate-500" aria-label="Increase temperature">+</button>
        </div>
    </div>
);

const ModeSelector = ({ currentMode, onModeChange }) => (
    <div>
        <h3 className="text-lg font-semibold text-white mb-2">Mód</h3>
        <div className="flex justify-center gap-2 bg-slate-700/50 p-2 rounded-lg">
            {MODES.map(mode => (
                <button 
                    key={mode} 
                    onClick={() => onModeChange(mode)}
                    className={getModeButtonClasses(currentMode, mode)}
                    aria-pressed={currentMode === mode}
                >
                    {MODE_ICONS[mode]} {mode}
                </button>
            ))}
        </div>
    </div>
);

const HistoryChart = ({ history }) => {
    const calculateBarHeight = (temp) => {
        // Normalize temperature to a 0-100 scale for the bar height
        const percentage = ((temp - HISTORY_CHART_MIN_TEMP) / HISTORY_CHART_TEMP_RANGE) * 100;
        // Clamp between 0 and 100 to prevent visual bugs from unexpected data
        return Math.max(0, Math.min(percentage, 100));
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-white mb-2">Előzmények (24h)</h3>
            <div className="bg-slate-700/50 p-4 rounded-lg h-48 flex items-end justify-around" aria-label="Temperature history over the last 24 hours">
                {history.map((data) => (
                    <div key={data.time} className="flex flex-col items-center justify-end h-full">
                        <div 
                            className="w-4 bg-cyan-500 rounded-t-sm"
                            style={{ height: `${calculateBarHeight(data.temp)}%` }}
                            title={`${data.temp}°C at ${data.time}`}
                            aria-label={`Temperature was ${data.temp}°C at ${data.time}`}
                        ></div>
                        <span className="text-xs text-gray-400 mt-1" aria-hidden="true">{data.time.split(':')[0]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Main Component ---

export const ThermostatModal = ({ device, onClose, onStateChange }) => {
    if (!device) return null;

    // Handlers are defined once and passed down, making the JSX cleaner.
    const handleTemperatureChange = (newTemperature) => {
        onStateChange({ ...device, temperature: newTemperature });
    };

    const handleModeChange = (newMode) => {
        onStateChange({ ...device, mode: newMode });
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="thermostat-modal-title">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full max-w-lg m-4">
                <ModalHeader id="thermostat-modal-title" title={`${device.name} - Részletek`} onClose={onClose} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <TemperatureControl 
                            temperature={device.temperature} 
                            onTemperatureChange={handleTemperatureChange} 
                        />
                        <ModeSelector 
                            currentMode={device.mode}
                            onModeChange={handleModeChange}
                        />
                    </div>
                    
                    <HistoryChart history={device.history} />
                </div>
            </div>
        </div>
    );
};
