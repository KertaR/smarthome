import React from 'react';

export const DashboardCard = ({ children, className }) => {
    const cardClasses = [
        'bg-slate-800',
        'rounded-2xl',
        'p-4',
        'flex',
        'flex-col',
        'justify-between',
        className, // Appends any passed-in classes
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={cardClasses}>{children}</div>
    );
};