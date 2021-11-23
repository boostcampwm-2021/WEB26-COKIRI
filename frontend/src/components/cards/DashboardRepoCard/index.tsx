import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import CardCommon from 'src/components/cards/Common';
import RepoAddButton from 'src/components/buttons/dashboardSettings/RepoAddButton';

import { DASHBOARD_LEFT_SECTION_CARD_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';

interface Props {
  username: string;
}

function DashBoardRepoCard({ username }: Props) {
  const user = useRecoilValue(userAtom);
  const isMe = user.username === username;
  return (
    <CardCommon width={DASHBOARD_LEFT_SECTION_CARD_WIDTH}>
      {isMe && <RepoAddButton />}
      깃헙 레포
    </CardCommon>
  );
}

DashBoardRepoCard.propTypes = {
  username: PropTypes.string.isRequired,
};

export default DashBoardRepoCard;
