// craco.config.js
module.exports = {
  eslint: {
    mode: "file",
  },
  jest: {
    configure: {
      preset: "ts-jest",
      testEnvironment: "jsdom",
      transform: {
        "^.+\\.ts?$": "ts-jest",
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.js?$": "babel-jest",
        "^.+\\.jsx?$": "babel-jest",
      },
      moduleNameMapper: {
        "^axios$": require.resolve("axios"),
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
      },
      setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
      collectCoverage: true,
      collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.d.ts",
        "!src/**/*.stories.{ts,tsx}",
        "!src/reportWebVitals.ts",
        "!src/setupTests.ts",
        "!src/index.tsx",
        "!src/**/*.test.{ts,tsx}",
        "!src/models/**/*.{ts,tsx}",
        "!src/services/epcis.service.ts",
      ],
    },
  },
  babel: {
    presets: [
      "@babel/preset-react",
      "@babel/preset-env",
      "@babel/preset-typescript",
    ],
    plugins: ["@babel/plugin-syntax-import-assertions"],
    loaderOptions: (babelLoaderOptions) => {
      return babelLoaderOptions;
    },
  },
};
