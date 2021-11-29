import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import CardCommon from 'src/components/cards/Common';
import PieChart from 'src/components/charts/Pie';
import RadarChart from 'src/components/charts/Radar';
import UpdateLanguageStatisticsButton from 'src/components/buttons/UpdateLanguageStatisticsButton';
import UpdateProblemStatisticsButton from 'src/components/buttons/UpdateProblemStatisticsButton';
import { Row, Col } from 'src/components/Grid';

import {
  DASHBOARD_LEFT_SECTION_CARD_WIDTH,
  DASHBOARD_STATISTICS_CARD_HEIGHT,
} from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { StatisticsType } from 'src/types';

import { Fetcher } from 'src/utils';

import { Title } from './style';

interface Props {
  targetUserID: string;
}

function DashBoardStatisticsCard({ targetUserID }: Props) {
  const router = useRouter();
  const username = router.query.username as string;
  const user = useRecoilValue(userAtom);
  const isMe = user.username === username;
  const [languageStatistics, setLanguageStatistcs] = useState({});
  const [problemStatistics, setProblemStatistics] = useState({});
  const { data: repoStatistics } = useQuery(['dashboard', 'repoStatistics', targetUserID], () =>
    Fetcher.getDashboardLanguageStatistics(targetUserID),
  );
  const { data: solvedacStatistics } = useQuery(
    ['dashboard', 'solvedacStatistics', targetUserID],
    () => Fetcher.getProblemStatistics(targetUserID),
  );
  useEffect(() => setLanguageStatistcs(repoStatistics!), [repoStatistics]);
  useEffect(() => setProblemStatistics(solvedacStatistics!), [solvedacStatistics]);

  const handleUpdateLanguageStatistics = (newStatistics: StatisticsType) => {
    setLanguageStatistcs(newStatistics);
  };

  const handleUpdateProblemStatistics = (newStatistics: StatisticsType) => {
    setProblemStatistics(newStatistics);
  };

  return (
    <CardCommon width={DASHBOARD_LEFT_SECTION_CARD_WIDTH} height={DASHBOARD_STATISTICS_CARD_HEIGHT}>
      <Row justifyContent='center'>
        <Col>
          <Row justifyContent='center'>
            <Title>Repo Statistics</Title>
            {isMe && <UpdateLanguageStatisticsButton onUpdate={handleUpdateLanguageStatistics} />}
          </Row>
          <PieChart statistics={languageStatistics} />
        </Col>
        <Col>
          <Row justifyContent='center'>
            <Title>Solvedac Statistics</Title>
            {isMe && <UpdateProblemStatisticsButton onUpdate={handleUpdateProblemStatistics} />}
          </Row>
          <RadarChart statistics={problemStatistics} />
        </Col>
      </Row>
    </CardCommon>
  );
}

DashBoardStatisticsCard.propTypes = {
  targetUserID: PropTypes.string.isRequired,
};

export default DashBoardStatisticsCard;
