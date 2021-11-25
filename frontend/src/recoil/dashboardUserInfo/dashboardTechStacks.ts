import { selector } from 'recoil';

import { StackType } from 'src/types';

import dashboardUserInfoAtom from './atom';

const dashboardTechStacksSelector = selector<{ [field: string]: StackType[] }>({
  key: 'techStacksSelector',
  get: ({ get }) => get(dashboardUserInfoAtom).techStacks ?? {},
});

export default dashboardTechStacksSelector;
