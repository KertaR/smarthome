import React, { useState, useEffect, useCallback } from 'react';
import { initialDeviceState } from './data/appData.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.jsx';

// --- UI & VIEW COMPONENTS ---
import { BottomNav } from './components/ui/BottomNav';
import { DashboardView } from './components/views/DashboardView';
import { Notification } from './components/ui/Notification';
import { RoomDetailView } from './components/views/RoomDetailView';
import { RoomsView } from './components/views/RoomsView';
import { ScenesView } from './components/views/ScenesView';
import { SettingsView } from './components/views/SettingsView';
import { Sidebar } from './components/ui/Sidebar';
import { ThermostatModal } from './components/ui/ThermostatModal';

// --- CONSTANTS ---
const NOTIFICATION_TIMEOUT = 3000;
const GARAGE_DOOR_MOVE_TIME = 3000;
const WEATHER_UPDATE_INTERVAL = 30000;
const MAX_LOG_ENTRIES = 5;

const GARAGE_DOOR_ID = 'ajto';
const SCENE_IDS = {
    MORNING: 'reggel',
    EVENING: 'este',
    MOVIE: 'film',
    AWAY: 'elmentem',
};

// --- MAIN APP COMPONENT ---
export default function App() {
    // --- STATE ---
    // App view state
    const [view, setView] = useState('dashboard');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [modalDevice, setModalDevice] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '' });

    // App data state (persisted)
    const [username, setUsername] = useLocalStorage('smartHomeUsername', 'Felhasználó');
    const [devices, setDevices] = useLocalStorage('smartHomeDevices', initialDeviceState);
    const [security, setSecurity] = useLocalStorage('smartHomeSecurity', { aktiv: true });
    const [theme, setTheme] = useLocalStorage('smartHomeTheme', 'dark');
    const [eventLog, setEventLog] = useLocalStorage('smartHomeLog', []);

    // Simulated external state
    const [weather, setWeather] = useState({ temp: 25, condition: 'Napos' });

    // --- SIDE EFFECTS ---
    // Weather simulation
    useEffect(() => {
        const weatherConditions = ['Napos', 'Felhős', 'Esős'];
        const interval = setInterval(() => {
            setWeather({
                temp: Math.floor(Math.random() * 15) + 15, // 15-29 C
                condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
            });
        }, WEATHER_UPDATE_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    // --- LOGIC & HELPERS ---
    const addLogEntry = useCallback((message) => {
        const newEntry = {
            id: Date.now(),
            time: new Date().toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' }),
            message: message,
        };
        setEventLog(prevLog => [newEntry, ...prevLog].slice(0, MAX_LOG_ENTRIES));
    }, [setEventLog]);

    const showNotification = useCallback((message) => {
        setNotification({ show: true, message });
        setTimeout(() => setNotification({ show: false, message: '' }), NOTIFICATION_TIMEOUT);
    }, []); // setNotification is stable

    // --- EVENT HANDLERS ---
    const handleDeviceChange = useCallback((roomId, deviceId, newState) => {
        // Special logic for the garage door
        if (deviceId === GARAGE_DOOR_ID) {
            setDevices(prevDevices => {
                const currentState = prevDevices[roomId].devices[deviceId];
                if (currentState.isMoving) return prevDevices;

                const isOpening = currentState.status === 'Zárva';
                const startStatus = isOpening ? 'Nyitás...' : 'Zárás...';
                const endStatus = isOpening ? 'Nyitva' : 'Zárva';

                addLogEntry(`Garázsajtó: ${startStatus}`);

                setTimeout(() => {
                    addLogEntry(`Garázsajtó: ${endStatus}`);
                    setDevices(currentDevices => {
                        const updatedDevice = { ...currentDevices[roomId].devices[deviceId], status: endStatus, isMoving: false };
                        return {
                           ...currentDevices,
                            [roomId]: {
                                ...currentDevices[roomId],
                                devices: { ...currentDevices[roomId].devices, [deviceId]: updatedDevice }
                            }
                        };
                    });
                }, GARAGE_DOOR_MOVE_TIME);

                const movingDeviceState = { ...currentState, status: startStatus, isMoving: true };
                return {
                    ...prevDevices,
                    [roomId]: {
                        ...prevDevices[roomId],
                        devices: { ...prevDevices[roomId].devices, [deviceId]: movingDeviceState }
                    }
                };
            });
        } else {
            setDevices(prev => ({
                ...prev,
                [roomId]: {
                    ...prev[roomId],
                    devices: { ...prev[roomId].devices, [deviceId]: newState }
                }
            }));
        }
    }, [addLogEntry, setDevices]);

    const handleRoomDeviceChange = useCallback((deviceId, newState) => {
        if (!selectedRoom) return;
        handleDeviceChange(selectedRoom, deviceId, newState);
    }, [selectedRoom, handleDeviceChange]);

    const handleFavoriteToggle = useCallback((roomId, deviceId, deviceData) => {
        const newFavoriteState = !deviceData.favorite;
        handleDeviceChange(roomId, deviceId, { ...deviceData, favorite: newFavoriteState });
    }, [handleDeviceChange]);
    
    const handleActivateScene = useCallback((sceneId, sceneName) => {
        // Use structuredClone for a safe deep copy of the devices state
        const newDevices = structuredClone(devices);
        
        switch (sceneId) {
            case SCENE_IDS.MORNING:
                newDevices.nappali.devices.vilagitas.on = true;
                newDevices.nappali.devices.redony.open = 100;
                newDevices.konyha.devices.kavefozo.on = true;
                break;
            case SCENE_IDS.EVENING:
                Object.keys(newDevices).forEach(roomId => {
                    Object.values(newDevices[roomId].devices).forEach(device => {
                        if (device.type === 'light') device.on = false;
                        if (device.type === 'blinds') device.open = 0;
                    });
                });
                newDevices.haloszoba.devices.vilagitas.on = true;
                newDevices.haloszoba.devices.vilagitas.brightness = 10;
                break;
            case SCENE_IDS.MOVIE:
                 newDevices.nappali.devices.vilagitas.on = true;
                 newDevices.nappali.devices.vilagitas.brightness = 20;
                 newDevices.nappali.devices.redony.open = 0;
                 newDevices.nappali.devices.zenelejatszo.on = true;
                 newDevices.nappali.devices.zenelejatszo.trackIndex = 2; // Ambient Focus
                break;
            case SCENE_IDS.AWAY:
                 Object.keys(newDevices).forEach(roomId => {
                    Object.values(newDevices[roomId].devices).forEach(device => {
                        if (typeof device.on !== 'undefined') device.on = false;
                    });
                });
                setSecurity({ aktiv: true });
                addLogEntry("Biztonsági rendszer élesítve.");
                break;
            default:
                console.warn(`Unknown scene activated: ${sceneId}`);
        }
        
        setDevices(newDevices);
        addLogEntry(`Jelenet aktiválva: ${sceneName}`);
        showNotification(`${sceneName} jelenet aktiválva.`);
        setView('dashboard');
    }, [devices, setDevices, addLogEntry, showNotification, setView, setSecurity]);

    const handleSecurityToggle = useCallback(() => {
        setSecurity(prevSecurity => {
            const newState = !prevSecurity.aktiv;
            const message = newState ? "Biztonsági rendszer élesítve." : "Biztonsági rendszer kikapcsolva.";
            addLogEntry(message);
            showNotification(message);
            return { aktiv: newState };
        });
    }, [setSecurity, addLogEntry, showNotification]);

    const handleOpenModal = useCallback((device) => setModalDevice(device), []);
    const handleCloseModal = useCallback(() => setModalDevice(null), []);

    const handleModalDeviceChange = useCallback((newState) => {
        const { roomId, id } = newState;
        handleDeviceChange(roomId, id, newState);
        setModalDevice(newState);
    }, [handleDeviceChange]);

    // --- RENDER LOGIC ---
    const renderContent = () => {
        if (selectedRoom) {
            return (
                <RoomDetailView
                    room={devices[selectedRoom]}
                    roomId={selectedRoom}
                    onBack={() => setSelectedRoom(null)}
                    onDeviceChange={handleRoomDeviceChange}
                    onFavoriteToggle={(deviceId, deviceData) => handleFavoriteToggle(selectedRoom, deviceId, deviceData)}
                    onOpenModal={handleOpenModal}
                />
            );
        }

        const dashboardProps = {
            username,
            devices,
            security,
            eventLog,
            weather,
            onSecurityToggle: handleSecurityToggle,
            onDeviceChange: handleDeviceChange,
            onFavoriteToggle: handleFavoriteToggle,
            setView,
            setSelectedRoom,
            onOpenModal: handleOpenModal,
        };

        switch (view) {
            case 'dashboard':
                return <DashboardView {...dashboardProps} />;
            case 'rooms':
                return <RoomsView rooms={devices} setSelectedRoom={setSelectedRoom} />;
            case 'scenes':
                return <ScenesView onActivateScene={handleActivateScene} />;
            case 'settings':
                return <SettingsView username={username} setUsername={setUsername} theme={theme} setTheme={setTheme} />;
            default:
                return <DashboardView {...dashboardProps} />;
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
