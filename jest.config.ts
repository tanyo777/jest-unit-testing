import { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  rootDir: './src/server_app',
  coverageDirectory: '../../coverage',
  collectCoverageFrom: ['<rootDir>/**/*.ts'],
  collectCoverage: true,
  testEnvironment: 'node',
  verbose: true,
  coveragePathIgnorePatterns: ['<rootDir>/index.ts'], // exclude  files and folders from the test coverage
};

export default jestConfig;
