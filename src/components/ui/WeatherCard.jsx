import React from 'react';
import { SunIcon, CloudIcon, CloudRainIcon } from '../icons.jsx';
import { DashboardCard } from './DashboardCard';

export const WeatherCard = ({ weather }) => {
    const weatherIcons = {
        'Napos': <SunIcon className="w-16 h-16 sm:w-24 sm:h-24 text-yellow-400"/>,
        'Felhős': <CloudIcon className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400"/>,
        'Esős': <CloudRainIcon className="w-16 h-16 sm:w-24 sm:h-24 text-blue-400"/>,
    };
    return (
        <DashboardCard className="col-span-2 row-span-2">
            <p className="text-gray-400">Budapest</p>
            <div className="flex items-center justify-center my-auto">
                <p className="text-5xl sm:text-7xl font-bold text-white mr-4">{weather.temp}°</p>
                {weatherIcons[weather.condition]}
            </div>
            <p className="text-center text-gray-300">{weather.condition}</p>
        </DashboardCard>
    );
};
