import React from 'react';

interface ButtonProps {
    type: "button" | "submit" | "reset";
    className?: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, className, children }) => {
    return (
        <button
            type={type}
            className={`mt-2 w-full bg-red-800 text-white p-2 rounded-md shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;