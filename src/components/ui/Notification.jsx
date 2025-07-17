import React from 'react';
import { InfoIcon } from '../icons';

const notificationContainerClasses =
    'fixed bottom-5 right-5 bg-slate-700 text-white py-2 px-4 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-fade-in-out';
const iconClasses = 'w-5 h-5 text-cyan-400';

/**
 * Displays a notification message at the bottom-right of the screen.
 * The notification fades in and out based on the `show` prop.
 */
export const Notification = ({ message, show }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={notificationContainerClasses}>
            <InfoIcon className={iconClasses} />
            <span>{message}</span>
        </div>
    );
};
