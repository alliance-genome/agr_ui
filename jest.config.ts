module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Same name of the lib you installed
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'], // The file you created to extend jest config and "implement" the jest-dom environment in the jest globals
  transformIgnorePatterns: ['/node_modules/d3select/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest for JS/JSX/TS/TSX
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'identity-obj-proxy', // Handle image imports
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Map CSS modules if using them
    '\\.(gif|ttf|eot|svg|png)$': 'identity-obj-proxy',
  },
};
