import React from 'react';
import allianceLogoSrc from './assets/alliance_logo.png';
console.log(allianceLogoSrc);
export function SharedAssets(props) {
  return (
    <div>
      <h1>Welcome to shared-assets!</h1>
      <img src={allianceLogoSrc} />
    </div>
  );
}
export default SharedAssets;
