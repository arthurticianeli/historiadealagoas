import React, { useEffect, useState } from 'react';

interface AlertProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300);
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed top-4 right-4 p-4 rounded shadow-lg transition-transform duration-300 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                } ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
        >
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <button onClick={onClose} className="ml-4 text-lg font-bold">&times;</button>
            </div>
        </div>
    );
};

export default Alert;