import { ReactNode } from 'react';

import { BannerSidesType, ProffyBanner } from '@components/ProffyBanner';

import './styles.css';

interface NonAuthenticatedPageContainerProps {
  currentBannerSide: BannerSidesType;
  isBannerExpanded: boolean;
  LeftContentContainer?: ReactNode;
  RightContentContainer?: ReactNode;
}

export function NonAuthenticatedPageContainer({
  currentBannerSide,
  isBannerExpanded,
  LeftContentContainer,
  RightContentContainer,
}: NonAuthenticatedPageContainerProps) {
  return (
    <>
      <ProffyBanner
        bannerSide={currentBannerSide}
        isBannerExpanded={isBannerExpanded}
      />
      {currentBannerSide === 'right' && (
        <article
          id="left-content-container"
          className="non-authenticated-content-container"
        >
          { LeftContentContainer }
        </article>
      )}
      {currentBannerSide === 'left' && (
        <article
          id="right-content-container"
          className="non-authenticated-content-container"
        >
          { RightContentContainer }
        </article>
      )}
    </>
  );
}
