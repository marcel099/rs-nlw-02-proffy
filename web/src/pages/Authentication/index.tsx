import React, { useState } from 'react';

import { SignUp } from '../../components/Authentication/SignUp';
import { SignIn } from '../../components/Authentication/SignIn';
import { ProffyBanner } from '../../components/ProffyBanner';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

export type BannerSideType = 'left' | 'right';

export function Authentication() {
  const [
    currentBannerSide,
    setCurrentBannerSide
  ] = useState<BannerSideType>('left');
  const [
    currentPage,
    setCurrentPage
  ] = useState<'SignIn' | 'SignUp' | 'ForgottenPassword'>('SignIn');

  function handleOpenSignIn() {
    setCurrentBannerSide('left');
    setCurrentPage('SignIn');
  }

  function handleOpenSignUp() {
    setCurrentBannerSide('right');
    setCurrentPage('SignUp');
  }

  function handleOpenForgottenPassword() {
    setCurrentBannerSide('right');
    setCurrentPage('ForgottenPassword');
  }

  return (
    <div id="authentication-page">
      <ProffyBanner bannerSide={currentBannerSide} />
      <article
        id="left-content-container"
        className="authentication-content-container"
      >
        {/* <div className="content-inner-container"> */}
          <header>
            <a onClick={handleOpenSignIn}>
              <img src={backIcon} alt="Voltar"/>
            </a>
          </header>
          { currentPage === 'SignUp' && <SignUp /> }
          {/* { currentPage === 'ForgottenPassword' && <ForgottenPassword /> } */}
          <footer />
        {/* </div> */}
      </article>

      <article
        id="right-content-container"
        className="authentication-content-container"
      >
        { currentPage === 'SignIn' && (
          <SignIn
            openSignUp={handleOpenSignUp}
          />
        )}
      </article>
    </div>
  )
}
