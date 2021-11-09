import { selector } from 'recoil';
import userAtom from './atom';

const isRegisteredSelector = selector({
  key: 'isRegisteredSelector',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.isRegistered === true;
  },
});

export default isRegisteredSelector;
