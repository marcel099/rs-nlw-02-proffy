import { FiCamera } from 'react-icons/fi';

import './styles.css';

interface UserAvatarProps {
  avatar: string | null;
  size: 'sm' | 'md' | 'lg';
  containButton?: boolean;
  onUserAvatarButtonPress?: () => void;
}

export function UserAvatar({
  avatar, size, containButton = false, onUserAvatarButtonPress,
}: UserAvatarProps) {
  return (
    <div className="user-avatar-container">
      {
        avatar !== null ? (
          <img
            src={avatar}
            className={`user-avatar size-${size}`}
            alt="Sua foto de perfil"
          />
        ) : (
          <div
            className={`no-user-avatar size-${size}`}
          />
        )
      }
      {
        containButton && (
          <button
            type="button"
            className="user-avatar-button"
            onClick={onUserAvatarButtonPress}
          >
            <FiCamera color="#FFFFFF" />
          </button>
        )
      }
    </div>
  );
}
