import { selector } from 'recoil';
import userAtom from './atom';

const followsSelector = selector<string[]>({
  key: 'followsSelector',
  get: ({ get }) => get(userAtom).follows ?? [],
  set: ({ set }, newValue) => {
    set(userAtom, (oldValue) => {
      if (Array.isArray(newValue)) {
        return { ...oldValue, follows: newValue };
      }
      return oldValue;
    });
  },
});

export default followsSelector;
