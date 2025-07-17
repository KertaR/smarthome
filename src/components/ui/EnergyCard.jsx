import React, { useMemo } from 'react';
import { DashboardCard } from './DashboardCard';

const ENERGY_CONSUMPTION_RATES_KW = {
    LIGHT_BASE: 0.05,
    LIGHT_BRIGHTNESS_FACTOR: 0.05,
    MUSIC: 0.1,
    COFFEE: 0.8,
    SPRINKLER: 1.2,
    THERMOSTAT: 0.5, // Always on
};

/**
 * Calculates the current energy consumption for a single device.
 * @param {object} device - The device object.
 * @returns {number} The energy consumption in kWh.
 */
const getDeviceConsumption = (device) => {
    // Thermostat is always on and has a constant consumption.
    if (device.type === 'thermostat') {
        return ENERGY_CONSUMPTION_RATES_KW.THERMOSTAT;
    }

    // If the device is off, it consumes no power.
    if (!device.on) {
        return 0;
    }

    // Calculate consumption for "on" devices based on their type.
    switch (device.type) {
        case 'light': {
            // Consumption depends on a base value and its brightness.
            const brightnessConsumption = (device.brightness / 100) * ENERGY_CONSUMPTION_RATES_KW.LIGHT_BRIGHTNESS_FACTOR;
            return ENERGY_CONSUMPTION_RATES_KW.LIGHT_BASE + brightnessConsumption;
        }
        case 'music':
            return ENERGY_CONSUMPTION_RATES_KW.MUSIC;
        case 'coffee':
            return ENERGY_CONSUMPTION_RATES_KW.COFFEE;
        case 'sprinkler':
            return ENERGY_CONSUMPTION_RATES_KW.SPRINKLER;
        case 'charger':
            // Charger consumption is dynamic based on its power property.
            return device.power;
        default:
            // Unknown devices consume no power.
            return 0;
    }
};

export const EnergyCard = ({ devices }) => {
    const totalConsumption = useMemo(() => {
        // Flatten the devices from all rooms into a single array and sum up their consumption.
        const consumption = Object.values(devices)
            .flatMap(room => Object.values(room.devices))
            .reduce((total, device) => total + getDeviceConsumption(device), 0);

        return consumption.toFixed(2);
    }, [devices]);

    return (
        <DashboardCard className="col-span-2">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-md font-semibold text-white">Energiafogyasztás</h3>
                    <p className="text-gray-400 text-sm">Pillanatnyi</p>
                </div>
                <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-cyan-400">{totalConsumption}</p>
                    <p className="text-sm text-gray-400 ml-1">kWh</p>
                </div>
            </div>
        </DashboardCard>
    );
};