import React from 'react';

interface ButtonProps {
    type: "button" | "submit" | "reset";
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, className, children, onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`mt-2 mx-auto w-full max-w-[300px] bg-red-800 text-white p-2 rounded-md shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;