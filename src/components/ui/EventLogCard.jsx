import React from 'react';
import { DashboardCard } from './DashboardCard';
import { ListIcon } from '../icons.jsx';

export const EventLogCard = ({ log }) => (
    <DashboardCard className="col-span-2">
        <div className="flex items-center space-x-3 mb-2">
            <ListIcon className="w-5 h-5 text-gray-400" />
            <h3 className="text-md font-semibold text-white">Eseménynapló</h3>
        </div>
        <div className="space-y-2 overflow-y-auto max-h-24 pr-2">
            {log.length === 0 && <p className="text-gray-500 text-sm">Nincsenek események.</p>}
            {log.map(entry => (
                <div key={entry.id} className="flex justify-between items-center text-sm">
                    <p className="text-gray-300">{entry.message}</p>
                    <p className="text-gray-500 flex-shrink-0 ml-2">{entry.time}</p>
                </div>
            ))}
        </div>
    </DashboardCard>
);
