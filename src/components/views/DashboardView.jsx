import React, { useMemo } from 'react';
import { Header } from '../ui/Header';
import { WeatherCard } from '../ui/WeatherCard';
import { DeviceCard } from '../ui/DeviceCard';
import { EnergyCard } from '../ui/EnergyCard';
import { EventLogCard } from '../ui/EventLogCard';
import { DeviceControlCard } from '../ui/DeviceControlCard';

export const DashboardView = ({ username, devices, security, onSecurityToggle, onDeviceChange, onFavoriteToggle, setView, setSelectedRoom, eventLog, weather, onOpenModal }) => {
    const favoriteDevices = useMemo(() => {
        const favs = [];
        Object.entries(devices).forEach(([roomId, roomData]) => {
            Object.entries(roomData.devices).forEach(([deviceId, deviceData]) => {
                if (deviceData.favorite) {
                    favs.push({ ...deviceData, id: deviceId, roomId: roomId, roomName: roomData.name });
                }
            });
        });
        return favs;
    }, [devices]);

    return (
        <div>
            <Header title={`Üdv, ${username}!`} subtitle="Itt az otthonod mai állapota." />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                    <WeatherCard weather={weather} />
                </div>
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                    <DeviceCard device={{ ...security, name: 'Biztonság', type: 'security' }} onToggle={onSecurityToggle} />
                    <EnergyCard devices={devices} />
                    <EventLogCard log={eventLog} />
                </div>
            </div>
             <div className="mt-8">
                 <h2 className="text-xl font-bold text-white mb-4">Kedvencek</h2>
                 {favoriteDevices.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {favoriteDevices.map(device => (
                            <DeviceControlCard key={`${device.roomId}-${device.id}`} device={device} onStateChange={(newState) => onDeviceChange(device.roomId, device.id, newState)} onFavoriteToggle={() => onFavoriteToggle(device.roomId, device.id, device)} onOpenModal={onOpenModal} />
                        ))}
                    </div>
                 ) : (
                    <div className="bg-slate-800 rounded-2xl p-6 text-center text-gray-500">
                        <p>Nincsenek kedvencnek jelölt eszközeid.</p>
                        <p className="text-sm mt-1">Kattints egy eszközön a csillag ikonra a hozzáadáshoz.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};