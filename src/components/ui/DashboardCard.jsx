import React from 'react';

export const DashboardCard = ({ children, className = '' }) => (
    <div className={`bg-slate-800 rounded-2xl p-4 flex flex-col justify-between ${className}`}>
        {children}
    </div>
);