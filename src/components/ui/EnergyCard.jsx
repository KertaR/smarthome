import React, { useMemo } from 'react';
import { DashboardCard } from './DashboardCard';

export const EnergyCard = ({ devices }) => {
    const totalConsumption = useMemo(() => {
        let consumption = 0;
        Object.values(devices).forEach(room => {
            Object.values(room.devices).forEach(device => {
                if (device.on) {
                    if (device.type === 'light') consumption += 0.05 + (device.brightness / 100) * 0.05;
                    if (device.type === 'music') consumption += 0.1;
                    if (device.type === 'coffee') consumption += 0.8;
                    if (device.type === 'sprinkler') consumption += 1.2;
                    if (device.type === 'charger') consumption += device.power;
                }
                if (device.type === 'thermostat') consumption += 0.5; // Always on
            });
        });
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