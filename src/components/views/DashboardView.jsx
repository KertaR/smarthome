import React, { useMemo } from 'react';
import { Header } from '../ui/Header';
import { WeatherCard } from '../ui/WeatherCard';
import { DeviceCard } from '../ui/DeviceCard';
import { EnergyCard } from '../ui/EnergyCard';
import { EventLogCard } from '../ui/EventLogCard';
import { DeviceControlCard } from '../ui/DeviceControlCard';

// Helper component to display the main dashboard cards (Weather, Security, etc.)
// This improves readability by abstracting the complex grid layout.
const DashboardSummary = ({ weather, security, onSecurityToggle, devices, eventLog }) => {
    // A synthetic device object for the security system to be used with DeviceCard
    const securityDevice = { ...security, name: 'Biztonság', type: 'security' };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Weather Card - spans 2 columns on larger screens for better layout */}
            <div className="lg:col-span-2">
                <WeatherCard weather={weather} />
            </div>

            {/* Container for other summary cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DeviceCard device={securityDevice} onToggle={onSecurityToggle} />
                <EnergyCard devices={devices} />

                {/* Event Log - spans full width of its container for better visibility */}
                <div className="sm:col-span-2">
                    <EventLogCard log={eventLog} />
                </div>
            </div>
        </div>
    );
};

// Helper component to display the grid of favorite devices or a message if none exist.
const FavoritesGrid = ({ devices, onDeviceChange, onFavoriteToggle, onOpenModal }) => {
    if (devices.length === 0) {
        return (
            <div className="bg-slate-800 rounded-2xl p-6 text-center text-gray-500">
                <p>Nincsenek kedvencnek jelölt eszközeid.</p>
                <p className="text-sm mt-1">Kattints egy eszközön a csillag ikonra a hozzáadáshoz.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {devices.map(device => (
                <DeviceControlCard
                    key={`${device.roomId}-${device.id}`}
                    device={device}
                    onStateChange={(newState) => onDeviceChange(device.roomId, device.id, newState)}
                    onFavoriteToggle={() => onFavoriteToggle(device.roomId, device.id, device)}
                    onOpenModal={onOpenModal}
                />
            ))}
        </div>
    );
};

export const DashboardView = ({ username, devices, security, onSecurityToggle, onDeviceChange, onFavoriteToggle, eventLog, weather, onOpenModal }) => {
    // Memoized calculation to get a flat list of favorite devices from the nested structure.
    // This is more efficient and readable than the previous nested loop approach.
    const favoriteDevices = useMemo(() => (
        Object.entries(devices).flatMap(([roomId, roomData]) =>
            Object.entries(roomData.devices)
                .filter(([, deviceData]) => deviceData.favorite)
                .map(([deviceId, deviceData]) => ({
                    ...deviceData,
                    id: deviceId,
                    roomId: roomId,
                    roomName: roomData.name,
                }))
        )
    ), [devices]);

    return (
        <div>
            <Header title={`Üdv, ${username}!`} subtitle="Itt az otthonod mai állapota." />
            <div className="mt-8">
                <DashboardSummary weather={weather} security={security} onSecurityToggle={onSecurityToggle} devices={devices} eventLog={eventLog} />
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold text-white mb-4">Kedvencek</h2>
                <FavoritesGrid devices={favoriteDevices} onDeviceChange={onDeviceChange} onFavoriteToggle={onFavoriteToggle} onOpenModal={onOpenModal} />
            </div>
        </div>
    );
};
