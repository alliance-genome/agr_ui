import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
const ENV_KEYS_TO_EXPOSE = [
  'NODE_ENV',
  'API_URL',
  'CDK_DEFAULT_REGION',
  'CDK_DEFAULT_ACCOUNT',
  'REACT_APP_JBROWSE_AGR_RELEASE',
  'VITE_STOCK_API_BASE',
];

const PROXY_PATHS = ['/api', '/jbrowse', '/bluegenes', '/swagger-ui', '/openapi', '/agr_simplemine.cgi', '/pavi'];


const proxy = Object.fromEntries(
  PROXY_PATHS.map((path) => [
    path,
    {
      target: process.env.API_URL || 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    },
  ])
);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      outDir: 'build',
      manifest: 'asset-manifest.json',
    },
    define: Object.fromEntries(ENV_KEYS_TO_EXPOSE.map((key) => [`process.env.${key}`, JSON.stringify(env[key])])),
    server: {
      port: 3000,
      proxy: {
        ...proxy,
        '/stock-api': {
          target: env.VITE_STOCK_API_BASE || 'http://localhost:8081',
          changeOrigin: true,
          secure: false,
          rewrite: (path: string) => path.replace(/^\/stock-api/, ''),
        },
      },
    },
    preview: {
      proxy,
    },
    resolve: {
      alias: [
        {
          // this is required for the SCSS modules
          find: /^~(.*)$/,
          replacement: '$1',
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['color-functions', 'global-builtin', 'import', 'abs-percent'],
        },
      },
    },
    plugins: [react()],
  };
});
