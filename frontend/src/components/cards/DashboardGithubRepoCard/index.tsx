import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import CardCommon from 'src/components/cards/Common';
import GitHubRepoAddButton from 'src/components/buttons/dashboardSettings/GitHubRepoAddButton';

import { DASHBOARD_LEFT_SECTION_CARD_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';

interface Props {
  username: string;
}

function DashBoardGithubRepoCard({ username }: Props) {
  const user = useRecoilValue(userAtom);
  const hidden = user.username !== username;
  return (
    <CardCommon width={DASHBOARD_LEFT_SECTION_CARD_WIDTH}>
      <GitHubRepoAddButton hidden={hidden} />
      깃헙 레포
    </CardCommon>
  );
}

DashBoardGithubRepoCard.propTypes = {
  username: PropTypes.string.isRequired,
};

export default DashBoardGithubRepoCard;
