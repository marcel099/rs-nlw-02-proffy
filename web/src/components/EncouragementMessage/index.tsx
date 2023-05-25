import { ReactNode } from 'react';

import './styles.css';

interface EncouragementMessageProps {
  children: ReactNode;
  iconUrl: string;
  iconAlt: string;
}

export function EncouragementMessage({
  children: message, iconUrl, iconAlt,
}: EncouragementMessageProps) {
  return (
    <>
      <img id="encouragement-message-icon" src={iconUrl} alt={iconAlt} />
      <p id="encouragement-message">
        {message}
      </p>
    </>
  );
}
