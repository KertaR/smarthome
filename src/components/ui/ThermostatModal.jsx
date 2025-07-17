import React from 'react';
import { ZapIcon, SunIcon, ThermometerIcon, XIcon } from '../icons.jsx';

export const ThermostatModal = ({ device, onClose, onStateChange }) => {
    if (!device) return null;

    const modes = ['off', 'heat', 'cool'];
    const modeIcons = { off: <ZapIcon className="w-5 h-5" />, heat: <SunIcon className="w-5 h-5" />, cool: <ThermometerIcon className="w-5 h-5" /> };
    const modeColors = { off: 'bg-slate-600', heat: 'bg-orange-500', cool: 'bg-blue-500' };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full max-w-lg m-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">{device.name} - Részletek</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700">
                        <XIcon className="w-6 h-6 text-gray-400"/>
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Hőmérséklet</h3>
                            <div className="flex items-center justify-center space-x-4 bg-slate-700/50 p-4 rounded-lg">
                                <button onClick={() => onStateChange({...device, temperature: device.temperature - 1})} className="p-3 rounded-full bg-slate-600 hover:bg-slate-500">-</button>
                                <span className="text-4xl font-bold text-white w-24 text-center">{device.temperature}°C</span>
                                <button onClick={() => onStateChange({...device, temperature: device.temperature + 1})} className="p-3 rounded-full bg-slate-600 hover:bg-slate-500">+</button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Mód</h3>
                            <div className="flex justify-center gap-2 bg-slate-700/50 p-2 rounded-lg">
                                {modes.map(mode => (
                                    <button 
                                        key={mode} 
                                        onClick={() => onStateChange({...device, mode: mode})}
                                        className={`w-full p-2 rounded-md font-semibold text-sm capitalize flex items-center justify-center gap-2 transition-colors ${device.mode === mode ? modeColors[mode] + ' text-white' : 'bg-slate-600 hover:bg-slate-500'}`}
                                    >
                                        {modeIcons[mode]} {mode}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Előzmények (24h)</h3>
                        <div className="bg-slate-700/50 p-4 rounded-lg h-48 flex items-end justify-around">
                            {device.history.map((data, index) => (
                                <div key={index} className="flex flex-col items-center justify-end h-full">
                                    <div 
                                        className="w-4 bg-cyan-500 rounded-t-sm"
                                        style={{ height: `${((data.temp - 18) / 8) * 100}%` }}
                                    ></div>
                                    <span className="text-xs text-gray-400 mt-1">{data.time.split(':')[0]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
