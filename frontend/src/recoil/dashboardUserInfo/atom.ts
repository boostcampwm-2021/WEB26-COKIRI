import { atom } from 'recoil';

import type { DashboardUserInfoType } from 'src/types';

const dashboardUserInfoAtom = atom<DashboardUserInfoType>({
  key: 'dashboardUserInfo',
  default: {
    username: '',
  },
});

export default dashboardUserInfoAtom;
