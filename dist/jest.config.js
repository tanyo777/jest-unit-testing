"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jestConfig = {
    preset: 'ts-jest',
    rootDir: './src',
    coverageDirectory: '../coverage',
    collectCoverageFrom: [
        '**/*.ts',
    ]
};
exports.default = jestConfig;
