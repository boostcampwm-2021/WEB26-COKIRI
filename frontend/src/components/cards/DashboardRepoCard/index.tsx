import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import CardCommon from 'src/components/cards/Common';
import DashboardRepoAddButton from 'src/components/buttons/dashboardSettings/DashboardRepoAddButton';
import ExternalContent from 'src/components/contents/ExternalContent';
import RepoDeleteButton from 'src/components/buttons/deletes/RepoDeleteButton';
import { Row, Col } from 'src/components/Grid';

import { DASHBOARD_LEFT_SECTION_CARD_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { ExternalType, DashboardRepoType } from 'src/types';

import { Fetcher } from 'src/utils';

import { Title, Contents, Content } from './style';

interface Props {
  targetUserID: string;
}

const convertToExternalType = (dashboardRepo: DashboardRepoType): ExternalType => {
  const external = {
    title: dashboardRepo.repoName,
    content: dashboardRepo.content,
    link: dashboardRepo.repoUrl!,
    info: {
      forkCount: dashboardRepo.forkCount!,
      language: dashboardRepo.languageInfo,
      starCount: dashboardRepo.starCount!.toString(),
    },
    type: 'repository' as 'repository',
    target: dashboardRepo.repoName,
  };
  return external;
};

function DashBoardRepoCard({ targetUserID }: Props) {
  const router = useRouter();
  const username = router.query.username as string;
  const user = useRecoilValue(userAtom);
  const isMe = user.username === username;
  const { data } = useQuery(['dashboard', 'repos', user._id], () =>
    Fetcher.getDashboardRepo(targetUserID),
  );

  const [dashboardRepos, setDashboardRepos] = useState<ExternalType[]>([]);

  useEffect(() => {
    setDashboardRepos(data?.map((repo) => convertToExternalType(repo)) ?? []);
  }, [data]);

  const handleAddRepo = (repo: DashboardRepoType) => {
    setDashboardRepos((prevState) => [...prevState, convertToExternalType(repo)]);
  };

  const handleDeleteRepo = (repoName: string) => {
    setDashboardRepos((prevState) => [...prevState].filter((repo) => repo.title !== repoName));
  };

  return (
    <CardCommon width={DASHBOARD_LEFT_SECTION_CARD_WIDTH}>
      <Col>
        <Row justifyContent='space-between'>
          <Title>GitHub Repo</Title>
          {isMe && <DashboardRepoAddButton onAddRepo={handleAddRepo} />}
        </Row>
        <Contents>
          {dashboardRepos.map((repo) => (
            <Content key={repo.title}>
              <ExternalContent external={repo} widthExpanded />
              {isMe && (
                <Col justifyContent='center'>
                  <RepoDeleteButton repoName={repo.title!} onDeleteRepo={handleDeleteRepo} />
                </Col>
              )}
            </Content>
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
