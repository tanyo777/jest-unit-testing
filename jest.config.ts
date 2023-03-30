import { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  rootDir: './src',
  coverageDirectory: '../../coverage',
  collectCoverageFrom: [
    '<rootDir>/server_app/**/*.ts',
    '!<rootDir>/server_app/**/*.test.ts', // exclude test files from the test coverage report
  ],
  testMatch: ['<rootDir>/integration/**/*.ts'],
  collectCoverage: true,
  testEnvironment: 'node',
  verbose: true,
  coveragePathIgnorePatterns: ['<rootDir>/index.ts'], // exclude  files and folders from the test coverage
};

export default jestConfig;
