import { atom } from 'recoil';
import type { PostType } from 'src/types';

const postsAtom = atom<PostType[]>({
  key: 'postsAtom',
  default: [],
});

export default postsAtom;
