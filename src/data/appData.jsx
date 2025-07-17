export const playlist = ["Lo-Fi Dreams", "Morning Coffee Jazz", "Ambient Focus", "Synthwave Rider", "Acoustic Chill"];

// --- ESZKÖZ ADATOK ---
export const initialDeviceState = {
    nappali: { name: "Nappali", icon: 'HomeIcon', devices: { vilagitas: { name: "Világítás", type: 'light', on: true, brightness: 80, favorite: true }, termosztat: { name: "Termosztát", type: 'thermostat', on: false, temperature: 22, mode: 'off', history: Array.from({length: 12}, (_, i) => ({time: `${i*2}:00`, temp: 20 + Math.random()*4})), favorite: true }, redony: { name: "Redőny", type: 'blinds', open: 70, favorite: false }, zenelejatszo: { name: "Zene", type: 'music', on: false, volume: 40, trackIndex: 0, favorite: false }}},
    haloszoba: { name: "Hálószoba", icon: 'MoonIcon', devices: { vilagitas: { name: "Világítás", type: 'light', on: false, brightness: 60, favorite: false }, redony: { name: "Redőny", type: 'blinds', open: 0, favorite: false }}},
    konyha: { name: "Konyha", icon: 'CoffeeIcon', devices: { vilagitas: { name: "Világítás", type: 'light', on: true, brightness: 90, favorite: false }, kavefozo: { name: "Kávéfőző", type: 'coffee', on: false, status: 'Készenlét', favorite: true }}},
    kert: { name: "Kert", icon: 'SprinklerIcon', devices: { ontozo: { name: "Öntöző", type: 'sprinkler', on: false, duration: 15, favorite: false }}},
    garazs: { name: "Garázs", icon: 'GarageIcon', devices: { ajto: { name: "Garázskapu", type: 'door', status: 'Zárva', isMoving: false, favorite: true }, etolto: { name: "Autótöltő", type: 'charger', on: false, power: 7, favorite: false }}},
};
