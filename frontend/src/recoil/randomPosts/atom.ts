import { atom } from 'recoil';
import type { PostType } from 'src/types';

const randomPostsAtom = atom<PostType[]>({
  key: 'randomPostsAtom',
  default: [],
});

export default randomPostsAtom;
