import { selector } from 'recoil';

import { HistoryType } from 'src/types';

import dashboardUserInfoAtom from './atom';

const compareTime = (firstHistory: HistoryType, secondHistory: HistoryType) =>
  new Date(firstHistory.date).getTime() - new Date(secondHistory.date).getTime();

const dashboardHistoriesSelector = selector<HistoryType[]>({
  key: 'historiesSelector',
  get: ({ get }) => get(dashboardUserInfoAtom).dashboardHistories ?? [],
  set: ({ set }, newValue) => {
    set(dashboardUserInfoAtom, (oldValue) => {
      const newdashboardUserInfo = { ...oldValue };
      if (Array.isArray(newValue)) {
        newdashboardUserInfo.dashboardHistories = [...newValue].sort(compareTime);
      }
      return newdashboardUserInfo;
    });
  },
});

export default dashboardHistoriesSelector;
