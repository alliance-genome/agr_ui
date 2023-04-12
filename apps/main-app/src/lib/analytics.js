import ReactGA from 'react-ga';
import {ReactGA as ReactGA4} from 'react-ga4';

import { GA_PROPERTY_ID_UA, GA_PROPERTY_ID_GA4, GA_EVENT_CATEGORY, GA_EVENT_ACTION } from '../constants';

export const initialize = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(GA_PROPERTY_ID_UA);
    ReactGA4.initialize(GA_PROPERTY_ID_GA4);
  }
};

export const autocompleteSearchEvent = (query) => {
  ReactGA.event({
    category: GA_EVENT_CATEGORY.AUTOCOMPLETE,
    action: GA_EVENT_ACTION.GO_TO_SEARCH_RESULTS,
    label: query
  });
  ReactGA4.event({
    category: GA_EVENT_CATEGORY.AUTOCOMPLETE,
    action: GA_EVENT_ACTION.GO_TO_SEARCH_RESULTS,
    label: query
  });

};

export const autocompleteGoToPageEvent = (id) => {
  ReactGA.event({
    category: GA_EVENT_CATEGORY.AUTOCOMPLETE,
    action: GA_EVENT_ACTION.GO_TO_PAGE,
    label: id
  });
  ReactGA4.event({
    category: GA_EVENT_CATEGORY.AUTOCOMPLETE,
    action: GA_EVENT_ACTION.GO_TO_PAGE,
    label: id
  });
};

export const logPageView = (location) => {
  const page = location.pathname + location.search;
  ReactGA.send({ hitType: "pageview", page: page });
  ReactGA4.send({ hitType: "pageview", page: page });
};

export const logTablePageEvent = (page) => {
  ReactGA.event({
    category: GA_EVENT_CATEGORY.TABLE,
    action: GA_EVENT_ACTION.GO_TO_PAGE,
    label: page
  });
  ReactGA4.event({
    category: GA_EVENT_CATEGORY.TABLE,
    action: GA_EVENT_ACTION.GO_TO_PAGE,
    label: page
  });
};

export const logTableSizeEvent = (size) => {
  ReactGA.event({
    category: GA_EVENT_CATEGORY.TABLE,
    action: GA_EVENT_ACTION.SET_PAGE_SIZE,
    label: size.toString()
  });
  ReactGA4.event({
    category: GA_EVENT_CATEGORY.TABLE,
    action: GA_EVENT_ACTION.SET_PAGE_SIZE,
    label: size.toString()
  });
};
