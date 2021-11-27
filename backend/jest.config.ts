import type { Config } from '@jest/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defaults as tsJestPreset } from 'ts-jest/presets';

const config: Config.InitialOptions = {
  verbose: true,
  clearMocks: true,
  coverageProvider: 'v8',
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'backend'],
  setupFiles: ['dotenv/config'],
  transform: tsJestPreset.transform,
};

export default config;
