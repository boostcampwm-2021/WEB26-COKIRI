import { selector } from 'recoil';
import userAtom from './atom';

const isAuthenticatedSelector = selector({
  key: 'isAuthenticatedSelector',
  get: ({ get }) => Object.keys(get(userAtom)).length !== 0,
});

export default isAuthenticatedSelector;
