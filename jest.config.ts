module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Same name of the lib you installed
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'], // The file you created to extend jest config and "implement" the jest-dom environment in the jest globals
  transformIgnorePatterns: ['/node_modules/d3select/'],
  transform: {
    // '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/assetsTransformer.js',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest for JS/JSX/TS/TSX
    // '^.+\\.css$': 'jest-transform-stub', // Handle CSS imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'identity-obj-proxy', // Handle image imports
    // '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/assetsTransformer.js',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Map CSS modules if using them
    '\\.(gif|ttf|eot|svg|png)$': 'identity-obj-proxy',
    // '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/assetsTransformer.js',
  },
};
