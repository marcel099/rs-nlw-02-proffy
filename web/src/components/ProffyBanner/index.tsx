import React, { useEffect, useState } from 'react';

import bannerBackgroundImg from '../../assets/images/banner-background.svg'
import logoImg from '../../assets/images/logo.svg'
import { BannerSideType } from '../../pages/Authentication';

import './styles.css';

interface Props {
  bannerSide: BannerSideType;
}

export function ProffyBanner({
  bannerSide
}: Props) {
  const [hasReceivedPropOnce, setHasReceivedPropOnce] = useState(false);
  const [totalSize, setTotalSize] = useState(false);
  const [currentBannerSide, setCurrentBannerSide] = useState<BannerSideType>('right');

  useEffect(() => {
    if (hasReceivedPropOnce) {
      setTotalSize(true);
    
      setTimeout(() => {
        setTotalSize(false);
        setCurrentBannerSide(bannerSide);
      }, 600);
    } else {
      setHasReceivedPropOnce(true);
    }
  }, [bannerSide])
  
  return (
    <div id="proffy-banner-container">
      {/* <div
        id="proffy-banner-helper-box"
        className={currentBannerSide === 'right' ? 'expanded' : ''}
      /> */}
      <aside
        id="proffy-banner"
        style={{
          backgroundImage: `url(${bannerBackgroundImg})`,
        }}
        className={
          `${
            totalSize === true ? 'expanded' : ''
          } ${
            currentBannerSide === 'left' ? 'left' : 'right'
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
