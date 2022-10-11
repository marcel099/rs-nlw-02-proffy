import React, { useEffect, useState } from 'react';

import bannerBackgroundImg from '../../assets/images/banner-background.svg'
import logoImg from '../../assets/images/logo.svg'
import { BannerSidesType } from '../../pages/Authentication';

import './styles.css';

interface Props {
  bannerSide: BannerSidesType;
  isBannerExpanded: boolean;
}

export function ProffyBanner({
  bannerSide, isBannerExpanded
}: Props) {
  return (
    <div id="proffy-banner-container">
      <aside
        id="proffy-banner"
        style={{
          backgroundImage: `url(${bannerBackgroundImg})`,
        }}
        className={
          `${
            isBannerExpanded === true ? 'expanded' : ''
          } ${
            bannerSide === 'left' ? 'left' : 'right'
          }`
        }
      >
        <main id="proffy-banner-content">
          <img
            src={logoImg}
            className="hero-image"
            alt="Logo Proffy"
          />
          <p>Sua plataforma de<br />estudos online</p>
        </main>
      </aside>
    </div>
  )
}
