import React from 'react';
import { Header } from '../ui/Header';
import { DeviceControlCard } from '../ui/DeviceControlCard';
import { ChevronRightIcon } from '../icons.jsx';

export const RoomDetailView = ({ room, roomId, onBack, onDeviceChange, onFavoriteToggle, onOpenModal }) => (
    <div>
        <button onClick={onBack} className="text-gray-400 hover:text-white mb-6 flex items-center gap-2">
            <ChevronRightIcon className="w-5 h-5 transform rotate-180"/>
            Vissza a szobákhoz
        </button>
        <Header title={room.name} subtitle="Kezeld a szobában található összes eszközt." />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(room.devices).map(([deviceId, deviceData]) => (
                <DeviceControlCard key={deviceId} device={{ ...deviceData, id: deviceId, roomId: roomId }} onStateChange={(newState) => onDeviceChange(deviceId, newState)} onFavoriteToggle={() => onFavoriteToggle(deviceId, deviceData)} onOpenModal={onOpenModal} />
            ))}
        </div>
    </div>
);
