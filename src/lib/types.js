import { shape, string } from 'prop-types';

export const dataSourceType = shape({
  name: string,
  displayName: string,
  url: string,
});
