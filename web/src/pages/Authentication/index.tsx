import { useState } from 'react';

import backIcon from '@assets/images/icons/back.svg';

import { ForgottenPassword } from '@components/Authentication/ForgottenPassword';
import { SignIn } from '@components/Authentication/SignIn';
import { SignUp } from '@components/Authentication/SignUp';
import { NonAuthenticatedPageContainer } from '@components/NonAuthenticatedPageContainer';
import { BannerSidesType } from '@components/ProffyBanner';

import './styles.css';

type AuthenticationPagesType = 'SignIn' | 'SignUp' | 'ForgottenPassword';

interface LeftContentContainerProps {
  onOpenSignIn: () => void;
  currentPage: AuthenticationPagesType;
}

function LeftContentContainer({
  onOpenSignIn,
  currentPage,
}: LeftContentContainerProps) {
  return (
    <>
      <header>
        <button type="button" onClick={onOpenSignIn}>
          <img src={backIcon} alt="Voltar" />
        </button>
      </header>
      { currentPage === 'SignUp' && <SignUp /> }
      { currentPage === 'ForgottenPassword' && <ForgottenPassword /> }
      <footer />
    </>
  );
}

interface RightContentContainerProps {
  onOpenSignUp: () => void;
  onOpenForgottenPassword: () => void;
  currentPage: AuthenticationPagesType;
}

function RightContentContainer({
  onOpenSignUp,
  onOpenForgottenPassword,
  currentPage,
}: RightContentContainerProps) {
  if (currentPage !== 'SignIn') {
    return <> </>;
  }

  return (
    <SignIn
      openSignUp={onOpenSignUp}
      openForgottenPassword={onOpenForgottenPassword}
    />
  );
}

export function Authentication() {
  const [
    currentBannerSide,
    setCurrentBannerSide,
  ] = useState<BannerSidesType>('left');
  const [isBannerExpanded, setIsBannerExpanded] = useState(false);

  const [
    currentPage,
    setCurrentPage,
  ] = useState<AuthenticationPagesType>('SignIn');

  function changeCurrentPageSmoothly(
    nextPage: AuthenticationPagesType,
    nextBannerSide: BannerSidesType
  ) {
    setIsBannerExpanded(true);

    setTimeout(() => {
      setIsBannerExpanded(false);

      setCurrentPage(nextPage);
      setCurrentBannerSide(nextBannerSide);
    }, 600);
  }

  function handleOpenSignIn() {
    changeCurrentPageSmoothly('SignIn', 'left');
  }

  function handleOpenSignUp() {
    changeCurrentPageSmoothly('SignUp', 'right');
  }

  function handleOpenForgottenPassword() {
    changeCurrentPageSmoothly('ForgottenPassword', 'right');
  }

  return (
    <div
      id="authentication-page"
      className="non-authenticated-page-container"
    >
      <NonAuthenticatedPageContainer
        currentBannerSide={currentBannerSide}
        isBannerExpanded={isBannerExpanded}
        LeftContentContainer={(
          <LeftContentContainer
            currentPage={currentPage}
            onOpenSignIn={handleOpenSignIn}
          />
        )}
        RightContentContainer={(
          <RightContentContainer
            currentPage={currentPage}
            onOpenSignUp={handleOpenSignUp}
            onOpenForgottenPassword={handleOpenForgottenPassword}
          />
        )}
      />
    </div>
  );
}
