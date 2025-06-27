import React from 'react';
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaSnapchatGhost,
  FaGithub,
  // FaTelegramPlane,
} from 'react-icons/fa';

const socialLinks = [
  { icon: <FaInstagram size={28} />, url: 'https://www.instagram.com/3zzoezzo/', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
  { icon: <FaYoutube size={28} />, url: 'https://www.youtube.com/@Ezzo3zzo', color: 'bg-gradient-to-r from-red-600 to-orange-500' },
  { icon: <FaTiktok size={28} />, url: 'https://www.tiktok.com/@3zzo.com', color: 'bg-gradient-to-r from-gray-900 to-gray-700' },
  { icon: <FaSnapchatGhost size={28} />, url: 'https://www.snapchat.com/add/ezzo.com', color: 'bg-gradient-to-r from-yellow-400 to-yellow-300' },
  // { icon: <FaTelegramPlane size={28} />, url: 'https://t.me/sok191bo', color: 'bg-gradient-to-r from-blue-500 to-blue-700' },
];

const SocialIcons = () => {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 p-6 rounded-lg bg-gradient-to-r from-orange-600 to-orange-800 shadow-lg">
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          className={`p-3 md:p-4 rounded-full text-white hover:scale-110 transition-transform duration-300 ease-in-out ${link.color}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.icon}
        </a>
      ))}
    </div>
    <p className="mt-8 text-sm text-gray-200">
      &copy; 2024 EZZO All rights reserved
    </p>
  </div>
  );
};

export default SocialIcons;
