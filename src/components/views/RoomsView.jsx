import React from 'react';
import { Header } from '../ui/Header';
import { RoomGridCard } from '../ui/RoomGridCard';


export const RoomsView = ({ allDevices, setSelectedRoom }) => (
    <div>
        <Header title="Szobák" subtitle="Válassz egy helyiséget a részletes vezérléshez." />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(allDevices).map(([roomId, roomData]) => (
                <RoomGridCard key={roomId} room={roomData} onClick={() => setSelectedRoom(roomId)} />
            ))}
        </div>
    </div>
);