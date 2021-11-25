import { atom } from 'recoil';

import type { UserType } from 'src/types';

const userAtom = atom<UserType>({
  key: 'userAtom',
  default: {},
});

export default userAtom;
