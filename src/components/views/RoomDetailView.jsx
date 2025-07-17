import React from 'react';
import { Header } from '../ui/Header';
import { DeviceControlCard } from '../ui/DeviceControlCard';
import { ChevronRightIcon } from '../icons.jsx';

export const RoomDetailView = ({ room, roomId, onBack, onDeviceChange, onFavoriteToggle, onOpenModal }) => {
    // A guard clause makes the component more robust against missing data.
    if (!room) {
        return null; // Or render a loading/error state
    }

    // Using `|| {}` provides a fallback for when `room.devices` is undefined.
    const deviceEntries = Object.entries(room.devices || {});

    return (
        <div>
            <button onClick={onBack} className="text-gray-400 hover:text-white mb-6 flex items-center gap-2">
                <ChevronRightIcon className="w-5 h-5 transform rotate-180" />
                Vissza a szobákhoz
            </button>
            <Header title={room.name} subtitle="Kezeld a szobában található összes eszközt." />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deviceEntries.length > 0 ? (
                    deviceEntries.map(([deviceId, deviceData]) => {
                        const device = {
                            ...deviceData,
                            id: deviceId,
                            roomId,
                        };

                        return (
                            <DeviceControlCard
                                key={deviceId}
                                device={device}
                                onStateChange={(newState) => onDeviceChange(deviceId, newState)}
                                onFavoriteToggle={() => onFavoriteToggle(deviceId, deviceData)}
                                onOpenModal={onOpenModal}
                            />
                        );
                    })
                ) : (
                    <p className="text-gray-400 col-span-full">Ebben a szobában nincsenek eszközök.</p>
                )}
            </div>
        </div>
    );
};
