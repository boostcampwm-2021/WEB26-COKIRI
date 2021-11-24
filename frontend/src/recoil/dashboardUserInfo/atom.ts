import { atom } from 'recoil';

import type { DashboardUserInfoType } from 'src/types';

const dashboardUserInfoAtom = atom<DashboardUserInfoType>({
  key: 'dashboardUserInfo',
  default: {},
});

export default dashboardUserInfoAtom;
