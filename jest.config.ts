import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  rootDir: './src',
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    '**/*.ts',
  ]
}

export default jestConfig