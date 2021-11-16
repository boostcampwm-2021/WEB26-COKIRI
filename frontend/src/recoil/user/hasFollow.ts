import { selector } from 'recoil';
import userAtom from './atom';

const hasFollowSelector = selector({
  key: 'hasFollowSelector',
  get: ({ get }) => (get(userAtom).follows ?? []).length === 0,
});

export default hasFollowSelector;
