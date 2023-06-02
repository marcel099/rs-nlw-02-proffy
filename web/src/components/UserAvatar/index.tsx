import { FormEvent, useState } from 'react';
import { FiCamera } from 'react-icons/fi';

import './styles.css';

interface UserAvatarProps {
  avatar: string | null;
  size: 'sm' | 'md' | 'lg';
  containButton?: boolean;
  onUserAvatarButtonPress?: (file: File | null) => void;
}

export function UserAvatar({
  avatar, size, containButton = false, onUserAvatarButtonPress,
}: UserAvatarProps) {
  const [selectedFileUrl, setSelectedFileUrl] =
    useState<string | null>(null);

  function handleUserAvatarInputChange(e: FormEvent) {
    if (onUserAvatarButtonPress === undefined) {
      return;
    }

    const element = e.target as HTMLInputElement;
    const { files } = element;

    if (files !== null) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onUserAvatarButtonPress(file);
    } else {
      setSelectedFileUrl(null);
      onUserAvatarButtonPress(null);
    }
  }

  return (
    <div className="user-avatar-container">
      {
        avatar !== null ? (
          <img
            src={selectedFileUrl === null ? avatar : selectedFileUrl}
            className={`user-avatar size-${size}`}
            alt="Foto de perfil"
          />
        ) : (
          <div
            className={`no-user-avatar size-${size}`}
          />
        )
      }
      {
        containButton && (
          <label
            htmlFor="user-avatar-input"
            className="user-avatar-label"
          >
            <FiCamera color="#FFFFFF" />
            <input
              id="user-avatar-input"
              type="file"
              accept="image/*"
              onChange={handleUserAvatarInputChange}
            />
          </label>
        )
      }
    </div>
  );
}
