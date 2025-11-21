import { defineCustomElements } from '@geneontology/web-components/loader';
//unlock
const initializeGOLibraryWebComponents_DEVELOPMENT = () => {
  defineCustomElements();
};

const initializeGOLibraryWebComponents_PRODUCTION = () => {
  const head = document.querySelector('head');

  const ribbonStripsScriptElement = document.createElement('script');
  ribbonStripsScriptElement.src = '/assets/web-components/web-components.esm.js';
  head.appendChild(ribbonStripsScriptElement);

  const ribbonTableScriptElement = document.createElement('script');
  ribbonTableScriptElement.src = '/assets/web-components/web-components.esm.js';
  head.appendChild(ribbonTableScriptElement);

  const goCamVizScriptElement = document.createElement('script');
  goCamVizScriptElement.src = '/assets/web-components/web-components.esm.js';
  head.appendChild(goCamVizScriptElement);
};

const initializeGOLibraryWebComponents = () => {
  process.env.NODE_ENV === 'production'
    ? initializeGOLibraryWebComponents_PRODUCTION()
    : initializeGOLibraryWebComponents_DEVELOPMENT();
};

export default initializeGOLibraryWebComponents;
