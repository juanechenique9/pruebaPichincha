module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'dist/test-coverage',
  collectCoverageFrom: ['src/app/**/*.ts'],
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@component/(.*)': '<rootDir>/src/app/component/$1',
    '@services/(.*)': '<rootDir>/src/app/services/$1',
    '@model/(.*)': '<rootDir>/src/app/model/$1',
    '@src/(.*)': '<rootDir>/src/$1',
    '@environments/(.*)': '<rootDir>/src/app/environment/$1',
  },
  coveragePathIgnorePatterns:[
    '.module.ts',
  ],
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
