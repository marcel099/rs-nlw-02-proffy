import myProfileDesktopBackgroundImg from '@assets/images/my-profile-desktop-background.svg';
import myProfileMobileBackgroundImg from '@assets/images/my-profile-mobile-background.svg';

import { useAuth } from '@contexts/AuthContext';

import { PageHeader } from '@components/PageHeader';
import { UserAvatar } from '@components/UserAvatar';

import './styles.css';

export function MyProfile() {
  const { user } = useAuth();

  let myProfileDesktopImg: string;

  if (window.matchMedia('(min-width: 700px)').matches) {
    myProfileDesktopImg = myProfileDesktopBackgroundImg;
  } else {
    myProfileDesktopImg = myProfileMobileBackgroundImg;
  }

  function handleUserAvatarChange() {
    console.log('a');
  }

  return (
    <div id="page-my-profile" className="page-container">
      <PageHeader
        title="Meu perfil"
        contentSize="lg"
        style={{
          backgroundImage: `url(${myProfileDesktopImg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '90% 90%',
          maxWidth: '1100px',
          alignItems: 'center',
        }}
      >
        <UserAvatar
          avatar={user?.avatar ?? null}
          size="lg"
          containButton
          onUserAvatarButtonPress={handleUserAvatarChange}
        />
        <strong className="user-name">
          {`${user?.firstName} ${user?.lastName}`}
        </strong>
        <span className="user-subject-name">
          Geografia
          {/* {user?.subject_name} */}
        </span>
      </PageHeader>
    </div>
  );
}
