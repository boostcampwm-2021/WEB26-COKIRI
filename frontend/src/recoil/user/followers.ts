import { selector } from 'recoil';
import userAtom from './atom';

const followersSelector = selector<string[]>({
  key: 'followersSelector',
  get: ({ get }) => get(userAtom).followers ?? [],
});

export default followersSelector;
