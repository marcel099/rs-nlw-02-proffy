import React, { useState } from 'react';

import { SignUp } from '../../components/Authentication/SignUp';
import { ProffyBanner } from '../../components/ProffyBanner';

import './styles.css';

export type BannerSideType = 'left' | 'right';

export function Authentication() {
  const [
    currentBannerSide,
    setCurrentBannerSide
  ] = useState<BannerSideType>('left');

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
      <article id="left-content-container">
        <button onClick={handleAlternateBannerSize}>Clique</button>
        <SignUp /> {/* isSigningUp ? <SignUp> : <ForgottenPassword /> */}
      </article>

      <article id="right-content-container">
        <button onClick={handleAlternateBannerSize}>Clique</button>
        {/* <SignIn />  */}
      </article>
    </div>
  )
}
