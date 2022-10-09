import React, { useState } from 'react';

import { SignUp } from '../../components/Authentication/SignUp';
import { ProffyBanner } from '../../components/ProffyBanner';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

export type BannerSideType = 'left' | 'right';

export function Authentication() {
  const [
    currentBannerSide,
    setCurrentBannerSide
  ] = useState<BannerSideType>('right');

  function handleAlternateBannerSize() {
    if (currentBannerSide === 'right') {
      setCurrentBannerSide('left');
    } else{
      setCurrentBannerSide('right');
    }
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
            <a onClick={handleAlternateBannerSize}>
              <img src={backIcon} alt="Voltar"/>
            </a>
          </header>
          <SignUp /> {/* isSigningUp ? <SignUp> : <ForgottenPassword /> */}
          <footer className="authentication-footer-content" />
        {/* </div> */}
      </article>

      <article
        id="right-content-container"
        className="authentication-content-container"
      >
        <button onClick={handleAlternateBannerSize}>Clique</button>
        {/* <SignIn />  */}
        {/* <footer className="authentication-footer-content"> goes inside SignIn */}
      </article>
    </div>
  )
}
