import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage.jsx';
import { initialDeviceState } from './data/appData.jsx';

// --- UI & VIEW COMPONENTS ---
import { Sidebar } from './components/ui/Sidebar';
import { BottomNav } from './components/ui/BottomNav';
import { Notification } from './components/ui/Notification';
import { ThermostatModal } from './components/ui/ThermostatModal';
import { DashboardView } from './components/views/DashboardView';
import { RoomsView } from './components/views/RoomsView';
import { RoomDetailView } from './components/views/RoomDetailView';
import { ScenesView } from './components/views/ScenesView';
import { SettingsView } from './components/views/SettingsView';

// --- MAIN APP COMPONENT ---
export default function App() {
    const [view, setView] = useState('dashboard');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [username, setUsername] = useLocalStorage('smartHomeUsername', 'Felhasználó');
    const [devices, setDevices] = useLocalStorage('smartHomeDevices', initialDeviceState);
    const [security, setSecurity] = useLocalStorage('smartHomeSecurity', { aktiv: true });
    const [theme, setTheme] = useLocalStorage('smartHomeTheme', 'dark');
    const [eventLog, setEventLog] = useLocalStorage('smartHomeLog', []);
    const [notification, setNotification] = useState({ show: false, message: '' });
    const [weather, setWeather] = useState({ temp: 25, condition: 'Napos' });
    const [modalDevice, setModalDevice] = useState(null);

    // Időjárás szimuláció
    useEffect(() => {
        const weatherConditions = ['Napos', 'Felhős', 'Esős'];
        const interval = setInterval(() => {
            setWeather({
                temp: Math.floor(Math.random() * 15) + 15, // 15-29 C
                condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
            });
        }, 30000); // 30 másodpercenként
        return () => clearInterval(interval);
    }, []);

    const addLogEntry = (message) => {
        const newEntry = {
            id: Date.now(),
            time: new Date().toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' }),
            message: message,
        };
        setEventLog(prevLog => [newEntry, ...prevLog].slice(0, 5));
    };

    const showNotification = (message) => {
        setNotification({ show: true, message });
        setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    };

    const handleDeviceChange = (roomId, deviceId, newState) => {
        // Speciális logika a garázsajtóhoz
        if (deviceId === 'ajto') {
            const currentState = devices[roomId].devices[deviceId];
            if (currentState.isMoving) return;

            const isOpening = currentState.status === 'Zárva';
            const startStatus = isOpening ? 'Nyitás...' : 'Zárás...';
            const endStatus = isOpening ? 'Nyitva' : 'Zárva';
            
            addLogEntry(`Garázsajtó: ${startStatus}`);
            setDevices(prev => ({ ...prev, [roomId]: { ...prev[roomId], devices: { ...prev[roomId].devices, [deviceId]: { ...currentState, favorite: currentState.favorite, status: startStatus, isMoving: true } } } }));

            setTimeout(() => {
                addLogEntry(`Garázsajtó: ${endStatus}`);
                setDevices(prev => {
                    const latestState = { ...prev };
                    latestState[roomId].devices[deviceId].status = endStatus;
                    latestState[roomId].devices[deviceId].isMoving = false;
                    return latestState;
                });
            }, 3000);

        } else {
            setDevices(prev => ({ ...prev, [roomId]: { ...prev[roomId], devices: { ...prev[roomId].devices, [deviceId]: newState }}}));
        }
    };

    const handleRoomDeviceChange = (deviceId, newState) => {
        if (!selectedRoom) return;
        handleDeviceChange(selectedRoom, deviceId, newState);
    };

    const handleFavoriteToggle = (roomId, deviceId, deviceData) => {
        const newFavoriteState = !deviceData.favorite;
        handleDeviceChange(roomId, deviceId, { ...deviceData, favorite: newFavoriteState });
    };
    
    const handleActivateScene = (sceneId, sceneName) => {
        const newDevices = JSON.parse(JSON.stringify(devices));
        if (sceneId === 'reggel') {
            newDevices.nappali.devices.vilagitas.on = true;
            newDevices.nappali.devices.redony.open = 100;
            newDevices.konyha.devices.kavefozo.on = true;
        } else if (sceneId === 'este') {
            Object.keys(newDevices).forEach(roomId => {
                Object.values(newDevices[roomId].devices).forEach(device => {
                    if (device.type === 'light') {
                        device.on = false;
                    }
                    if (device.type === 'blinds') {
                        device.open = 0;
                    }
                });
            });
            newDevices.haloszoba.devices.vilagitas.on = true;
            newDevices.haloszoba.devices.vilagitas.brightness = 10;
        } else if (sceneId === 'film') {
             newDevices.nappali.devices.vilagitas.on = true;
             newDevices.nappali.devices.vilagitas.brightness = 20;
             newDevices.nappali.devices.redony.open = 0;
             newDevices.nappali.devices.zenelejatszo.on = true;
             newDevices.nappali.devices.zenelejatszo.trackIndex = 2; // Ambient Focus
        } else if (sceneId === 'elmentem') {
             Object.keys(newDevices).forEach(roomId => {
                Object.values(newDevices[roomId].devices).forEach(device => {
                    if (typeof device.on !== 'undefined') {
                        device.on = false;
                    }
                });
            });
            setSecurity({ aktiv: true });
            addLogEntry("Biztonsági rendszer élesítve.");
        }
        setDevices(newDevices);
        addLogEntry(`Jelenet aktiválva: ${sceneName}`);
        showNotification(`${sceneName} jelenet aktiválva.`);
        setView('dashboard');
    };

    const handleSecurityToggle = () => {
        const newState = !security.aktiv;
        setSecurity({ aktiv: newState });
        const message = newState ? "Biztonsági rendszer élesítve." : "Biztonsági rendszer kikapcsolva.";
        addLogEntry(message);
        showNotification(message);
    };

    const handleOpenModal = (device) => {
        setModalDevice(device);
    };

    const handleCloseModal = () => {
        setModalDevice(null);
    };

    const handleModalDeviceChange = (newState) => {
        const { roomId, id } = newState;
        handleDeviceChange(roomId, id, newState);
        setModalDevice(newState);
    };

    const renderContent = () => {
        if (selectedRoom) {
            return <RoomDetailView room={devices[selectedRoom]} roomId={selectedRoom} onBack={() => setSelectedRoom(null)} onDeviceChange={handleRoomDeviceChange} onFavoriteToggle={(deviceId, deviceData) => handleFavoriteToggle(selectedRoom, deviceId, deviceData)} onOpenModal={handleOpenModal} />;
        }
        switch (view) {
            case 'dashboard': return <DashboardView username={username} devices={devices} security={security} onSecurityToggle={handleSecurityToggle} onDeviceChange={handleDeviceChange} onFavoriteToggle={handleFavoriteToggle} setView={setView} setSelectedRoom={setSelectedRoom} eventLog={eventLog} weather={weather} onOpenModal={handleOpenModal} />;
            case 'rooms': return <RoomsView allDevices={devices} setSelectedRoom={setSelectedRoom} />;
            case 'scenes': return <ScenesView onActivateScene={handleActivateScene} />;
            case 'settings': return <SettingsView username={username} setUsername={setUsername} theme={theme} setTheme={setTheme} />;
            default: return <DashboardView username={username} devices={devices} security={security} onSecurityToggle={handleSecurityToggle} onDeviceChange={handleDeviceChange} onFavoriteToggle={handleFavoriteToggle} setView={setView} setSelectedRoom={setSelectedRoom} eventLog={eventLog} weather={weather} onOpenModal={handleOpenModal} />;
        }
    };

    return (
        <div className={`theme-${theme}`}>
            <div className="bg-background min-h-screen text-white font-sans">
                <Sidebar view={view} setView={setView} />
                <main className="md:ml-20 p-4 sm:p-6 lg:p-8 relative z-0 pb-24 md:pb-8">
                    {renderContent()}
                </main>
                <BottomNav view={view} setView={setView} />
                <Notification message={notification.message} show={notification.show} />
                <ThermostatModal 
                    device={modalDevice} 
                    onClose={handleCloseModal} 
                    onStateChange={handleModalDeviceChange} 
                />
            </div>
        </div>
    );
}
