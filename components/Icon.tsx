
import React from 'react';

export type IconName = 
  | 'droplets' | 'zap' | 'sparkles' | 'paint-brush' | 'leaf' | 'scissors'
  | 'eye' | 'handshake' | 'shield' | 'wallet' | 'briefcase' | 'search' 
  | 'user' | 'hard-hat' | 'key' | 'wind' | 'satellite' | 'tag' | 'inbox' | 'outbox';

interface IconProps {
  name: IconName | string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = "w-6 h-6" }) => {
  const icons: Record<string, React.ReactNode> = {
    droplets: <path d="M7 16.3c2.2 0 4-1.8 4-4 0-3.3-4-8-4-8s-4 4.7-4 8c0 2.2 1.8 4 4 4Z" />,
    zap: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
    sparkles: <path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z" />,
    'paint-brush': <path d="m21 6-4.05 4.05c-.2.2-.5.2-.7 0a1.002 1.002 0 1 1-1.42-1.42c.2-.2.2-.5 0-.7L18.88 3.88a2 2 0 1 0-2.83 2.83l-1.5 1.5M7 16l-3 4M10 8l-3.5 3.5c-.8.8-.8 2.1 0 2.9l.6.6c.8.8 2.1.8 2.9 0L13.5 11.5c.8-.8.8-2.1 0-2.9l-.6-.6c-.8-.8-2.1-.8-2.9 0Z" />,
    leaf: <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 21 2c-2.5 4-3 5.5-4.1 11.2A7 7 0 0 1 11 20Z" />,
    scissors: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
      </>
    ),
    eye: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    handshake: (
      <>
        <path d="m11 17 2 2 6-6M8 14h.01M16 14h.01M12 11V3l4.5 4.5M3 13h18M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
      </>
    ),
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    wallet: (
      <>
        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
        <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
        <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
      </>
    ),
    briefcase: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
    user: (
      <>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    'hard-hat': (
      <>
        <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a8 8 0 0 0-16 0v2z" />
        <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
        <path d="M4 15v-3a6 6 0 0 1 6-6" />
        <path d="M14 6a6 6 0 0 1 6 6v3" />
      </>
    ),
    key: (
      <>
        <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3L15.5 7.5z" />
      </>
    ),
    wind: <path d="M17.7 7.7A2.5 2.5 0 1 1 15.8 12H3M21 16a2.5 2.5 0 1 1-2.5 2.5H6.3" />,
    satellite: <path d="M13 7 9 3 5 7l4 4 4-4ZM17 11l4 4-4 4-4-4 4-4ZM7 11l-4 4 4 4 4-4-4-4ZM11 17l4 4-4-4-4 4 4-4Z" />,
    tag: (
      <>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </>
    ),
    inbox: (
      <>
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </>
    ),
    outbox: (
      <>
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
        <path d="M2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6" />
      </>
    )
  };

  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

export default Icon;
