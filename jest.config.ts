import { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  rootDir: './src',
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    '**/*.ts',
  ],
  testEnvironment: 'node',
  verbose: true,
}

export default jestConfig