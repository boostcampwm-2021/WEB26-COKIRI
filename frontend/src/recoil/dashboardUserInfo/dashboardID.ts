import { selector } from 'recoil';

import dashboardUserInfoAtom from './atom';

const dashboardIDSelector = selector<string>({
  key: 'IDSelector',
  get: ({ get }) => get(dashboardUserInfoAtom)._id ?? '',
});

export default dashboardIDSelector;
