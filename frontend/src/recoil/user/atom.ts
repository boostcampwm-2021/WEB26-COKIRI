import { atom } from 'recoil';
import type { UserState } from 'src/types';

const userAtom = atom<UserState>({
  key: 'userAtom',
  default: {},
});

export default userAtom;
