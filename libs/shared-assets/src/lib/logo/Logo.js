import React from 'react';
import organizations, { getOrganizationById } from '../organizations';

export function Logo({ id, ...props }) {
  const organization = getOrganizationById(id);
  return organization ? <img src={organization.logo} {...props} /> : null;
}
export default Logo;
