import { selector } from 'recoil';

import { HistoryType } from 'src/types';

import { timeCompare } from 'src/utils/moment';

import dashboardUserInfoAtom from './atom';

const dashboardHistoriesSelector = selector<HistoryType[]>({
  key: 'historiesSelector',
  get: ({ get }) => get(dashboardUserInfoAtom).dashboardHistories ?? [],
  set: ({ set }, newValue) => {
    set(dashboardUserInfoAtom, (oldValue) => {
      const newdashboardUserInfo = { ...oldValue };
      if (Array.isArray(newValue)) {
        newdashboardUserInfo.dashboardHistories = [...newValue].sort(timeCompare);
      }
      return newdashboardUserInfo;
    });
  },
});

export default dashboardHistoriesSelector;
