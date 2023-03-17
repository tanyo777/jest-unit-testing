import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  rootDir: './src',
  coverageDirectory: '../coverage'
}

export default jestConfig