import { selector } from 'recoil';
import userAtom from './atom';

const isRegisteredSelector = selector({
  key: 'isRegisteredSelector',
  get: ({ get }) => get(userAtom).isRegistered,
});

export default isRegisteredSelector;
