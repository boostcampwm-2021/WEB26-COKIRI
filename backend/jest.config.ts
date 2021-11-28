import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'backend'],
  setupFiles: ['dotenv/config'],
};

export default config;
