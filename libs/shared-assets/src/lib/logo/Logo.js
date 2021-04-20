import React from 'react';
import organizations, { getOrganizationById } from '../organizations';
import { allianceLogoBase64 } from '../assets';

export function Logo({ id, ...props }) {
  const organization = getOrganizationById(id);
  return (
    <img
      src={organization ? organization.logo : allianceLogoBase64}
      {...props}
    />
  );
}
export default Logo;
