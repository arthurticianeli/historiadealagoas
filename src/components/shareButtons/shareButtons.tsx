"use client"

import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';

interface ShareButtonsProps {
    postUrl: string;
    postTitle: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ postUrl, postTitle }) => {
    const shareOnFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        window.open(url, '_blank');
    };

    const shareOnTwitter = () => {
        const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
        window.open(url, '_blank');
    };

    const shareOnLinkedIn = () => {
        const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;
        window.open(url, '_blank');
    };

    const shareOnWhatsApp = () => {
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + ' ' + postUrl)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="flex space-x-4">
            <button onClick={shareOnFacebook} className="bg-blue-600 text-white rounded p-2 flex items-center ">
                <FaFacebook />
            </button>
            <button onClick={shareOnTwitter} className="bg-blue-400 text-white rounded p-2 flex items-center ">
                <FaTwitter />
            </button>
            <button onClick={shareOnLinkedIn} className="bg-blue-700 text-white rounded p-2 flex items-center ">
                <FaLinkedin />
            </button>
            <button onClick={shareOnWhatsApp} className="bg-green-500 text-white rounded p-2 flex items-center ">
                <FaWhatsapp />
            </button>
        </div>
    );
};

export default ShareButtons;