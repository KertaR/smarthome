import React from 'react';
import { SunIcon, CloudIcon, CloudRainIcon } from '../icons.jsx';
import { DashboardCard } from './DashboardCard';

const iconClasses = "w-16 h-16 sm:w-24 sm:h-24";

const weatherIcons = {
    'Napos': <SunIcon className={`${iconClasses} text-yellow-400`}/>,
    'Felhős': <CloudIcon className={`${iconClasses} text-gray-400`}/>,
    'Esős': <CloudRainIcon className={`${iconClasses} text-blue-400`}/>,
};

export const WeatherCard = ({ weather }) => {
    const { temp, condition } = weather;

    return (
        <DashboardCard className="col-span-2 row-span-2">
            <p className="text-gray-400">Budapest</p>
            <div className="flex items-center justify-center my-auto">
                <p className="text-5xl sm:text-7xl font-bold text-white mr-4">{temp}°</p>
                {weatherIcons[condition]}
            </div>
            <p className="text-center text-gray-300">{condition}</p>
        </DashboardCard>
    );
};
