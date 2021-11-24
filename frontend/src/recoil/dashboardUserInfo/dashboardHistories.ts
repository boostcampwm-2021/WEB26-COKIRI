import { selector } from 'recoil';

import { HistoryType } from 'src/types';

import dashboardUserInfoAtom from './atom';

const dashboardHistoriesSelector = selector<HistoryType[]>({
  key: 'historiesSelector',
  get: ({ get }) => get(dashboardUserInfoAtom).dashboardHistories ?? [],
});

export default dashboardHistoriesSelector;
