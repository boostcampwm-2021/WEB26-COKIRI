import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import CardCommon from 'src/components/cards/Common';
import DashboardHistoryAddButton from 'src/components/buttons/dashboardSettings/DashboardHistoryAddButton';
import DashboardHistoryDeleteButton from 'src/components/buttons/dashboardSettings/DashboardHistoryDeleteButton';
import { Col } from 'src/components/Grid';

import { DASHBOARD_RIGHT_SECTION_CARD_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';
import { dashboardHistoriesSelector } from 'src/recoil/dashboardUserInfo';

import { getBirthdayFormat } from 'src/utils/moment';

import { History, HorizontalLine, Section } from './style';

function DashboardHistoryCard() {
  const router = useRouter();
  const username = router.query.username as string;
  const user = useRecoilValue(userAtom);
  const dashboardHistories = useRecoilValue(dashboardHistoriesSelector);
  const isMe = user.username === username;

  return (
    <CardCommon width={DASHBOARD_RIGHT_SECTION_CARD_WIDTH}>
      <History>
        {dashboardHistories.map((history) => (
          <Section key={history._id}>
            <Col>
              <p>{getBirthdayFormat(history.date!)}</p>
              <HorizontalLine />
              <p>{history.content}</p>
            </Col>
            {isMe && <DashboardHistoryDeleteButton historyID={history._id} />}
          </Section>
        ))}
      </History>
      {isMe && <DashboardHistoryAddButton />}
    </CardCommon>
  );
}

export default DashboardHistoryCard;
