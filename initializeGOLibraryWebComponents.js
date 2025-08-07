const initializeGOLibraryWebComponents_DEVELOPMENT = () => {
  import('@geneontology/wc-ribbon-strips/loader').then(({ applyPolyfills, defineCustomElements }) =>
    applyPolyfills().then((_) => defineCustomElements(window))
  );

  import('@geneontology/wc-ribbon-table/loader').then(({ applyPolyfills, defineCustomElements }) =>
    applyPolyfills().then((_) => defineCustomElements(window))
  );

  import('@geneontology/wc-gocam-viz/loader').then(({ applyPolyfills, defineCustomElements }) =>
    applyPolyfills().then((_) => defineCustomElements(window))
  );
};

const initializeGOLibraryWebComponents_PRODUCTION = () => {
  const head = document.querySelector('head');

  const ribbonStripsScriptElement = document.createElement('script');
  ribbonStripsScriptElement.src = '/assets/wc-ribbon-strips/wc-ribbon-strips.js';
  head.appendChild(ribbonStripsScriptElement);

  const ribbonTableScriptElement = document.createElement('script');
  ribbonTableScriptElement.src = '/assets/wc-ribbon-table/wc-ribbon-table.js';
  head.appendChild(ribbonTableScriptElement);

  const goCamVizScriptElement = document.createElement('script');
  goCamVizScriptElement.src = '/assets/wc-gocam-viz/wc-gocam-viz.esm.js';
  head.appendChild(goCamVizScriptElement);
};

const initializeGOLibraryWebComponents = () => {
  process.env.NODE_ENV === 'production'
    ? initializeGOLibraryWebComponents_PRODUCTION()
    : initializeGOLibraryWebComponents_DEVELOPMENT();
};

export default initializeGOLibraryWebComponents;
