import { selector } from 'recoil';
import userAtom from './atom';

const userIsAuthenticated = selector({
  key: 'userIsAuthenticated',
  get: ({ get }) => Object.keys(get(userAtom)).length === 0,
});

export default userIsAuthenticated;
