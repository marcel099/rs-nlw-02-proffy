import React, { useEffect, useState } from 'react';

import { SignUp } from '../../components/Authentication/SignUp';
import { SignIn } from '../../components/Authentication/SignIn';
import { ProffyBanner } from '../../components/ProffyBanner';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

export type BannerSidesType = 'left' | 'right';
type AuthenticationPagesType = 'SignIn' | 'SignUp' | 'ForgottenPassword';

export function Authentication() {
  const [
    currentBannerSide,
    setCurrentBannerSide
  ] = useState<BannerSidesType>('left');
  const [isBannerExpanded, setIsBannerExpanded] = useState(false);

  const [
    currentPage,
    setCurrentPage
  ] = useState<AuthenticationPagesType>('SignIn');

  function changeCurrentPageSmoothly(
    nextPage: AuthenticationPagesType, nextBannerSide: BannerSidesType
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
    <div id="authentication-page">
      <ProffyBanner
        bannerSide={currentBannerSide}
        isBannerExpanded={isBannerExpanded}
      />
      <article
        id="left-content-container"
        className="authentication-content-container"
      >
        <header>
          <a onClick={handleOpenSignIn}>
            <img src={backIcon} alt="Voltar" />
          </a>
        </header>
        { currentPage === 'SignUp' && <SignUp /> }
        {/* { currentPage === 'ForgottenPassword' && <ForgottenPassword /> } */}
        <footer />
      </article>

      <article
        id="right-content-container"
        className="authentication-content-container"
      >
        { currentPage === 'SignIn' && (
          <SignIn
            openSignUp={handleOpenSignUp}
            openForgottenPassword={handleOpenForgottenPassword}
          />
        )}
      </article>
    </div>
  )
}
