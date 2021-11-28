import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import CardCommon from 'src/components/cards/Common';
import DashboardRepoAddButton from 'src/components/buttons/dashboardSettings/DashboardRepoAddButton';
import ExternalContent from 'src/components/contents/ExternalContent';
import { Row, Col } from 'src/components/Grid';

import { DASHBOARD_LEFT_SECTION_CARD_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { ExternalType, DashboardRepoType } from 'src/types';

import { Fetcher } from 'src/utils';

import { Title, Contents } from './style';

interface Props {
  targetUserID: string;
}

function DashBoardRepoCard({ targetUserID }: Props) {
  const router = useRouter();
  const username = router.query.username as string;
  const user = useRecoilValue(userAtom);
  const isMe = user.username === username;
  const { data } = useQuery(['dashboard', 'repos', user._id], () =>
    Fetcher.getDashboardRepo(targetUserID),
  );
  const convertToExternalType = (dashboardRepo: DashboardRepoType): ExternalType => {
    const external = {
      title: dashboardRepo.repoName,
      content: dashboardRepo.content,
      link: dashboardRepo.repoUrl!,
      info: {
        language: dashboardRepo.languageInfo,
        starCount: dashboardRepo.starCount!.toString(),
      },
      type: 'repository' as 'repository',
      target: dashboardRepo.repoName,
    };
    return external;
  };
  const [dashboardRepos, setDashboardRepos] = useState<ExternalType[]>([]);

  useEffect(() => {
    setDashboardRepos(data?.map((repo) => convertToExternalType(repo)) ?? []);
  }, [data]);

  const hanldeAddRepos = (repo: DashboardRepoType) => {
    setDashboardRepos((prevState) => [...prevState, convertToExternalType(repo)]);
  };

  return (
    <CardCommon width={DASHBOARD_LEFT_SECTION_CARD_WIDTH}>
      <Col>
        <Row justifyContent='space-between'>
          <Title>GitHub Repo</Title>
          {isMe && <DashboardRepoAddButton onAddRepo={hanldeAddRepos} />}
        </Row>
        <Contents>
          {dashboardRepos.map((repo) => (
            <ExternalContent external={repo} key={repo.title} />
          ))}
        </Contents>
      </Col>
    </CardCommon>
  );
}

DashBoardRepoCard.propTypes = {
  targetUserID: PropTypes.string.isRequired,
};

export default DashBoardRepoCard;
