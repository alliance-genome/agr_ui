import initializeGOLibraryWebComponents from '../../initializeGOLibraryWebComponents.js';

describe('initializeGOLibraryWebComponents', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    document.head.innerHTML = '';
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    document.head.innerHTML = '';
  });

  test('loads GO-CAM viz as a module script in production', () => {
    process.env.NODE_ENV = 'production';

    initializeGOLibraryWebComponents();

    const scripts = Array.from(document.head.querySelectorAll('script'));
    const goCamVizScript = scripts.find(
      (script) => script.getAttribute('src') === '/assets/wc-gocam-viz/wc-gocam-viz.esm.js'
    );

    expect(goCamVizScript).toBeTruthy();
    expect(goCamVizScript.type).toBe('module');
  });
});
