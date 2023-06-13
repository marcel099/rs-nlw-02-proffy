export function getAvatarUrl(avatar: string | null) {
  if (avatar === null) {
    return null;
  }

  switch (process.env.DISK) {
    case 'local':
      return `${process.env.API_URL}/avatar/${avatar}`;
    case 's3':
      return `${process.env.AWS_BUCKET_URL}/avatar/${avatar}`;
    default:
      return null;
  }
}
