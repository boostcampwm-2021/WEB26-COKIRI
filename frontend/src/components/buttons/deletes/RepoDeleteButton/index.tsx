import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import DeleteCommon from 'src/components/buttons/deletes/Common';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

interface Props {
  repoName: string;
  onDeleteRepo: Function;
}

function RepoDeleteButton({ repoName, onDeleteRepo }: Props) {
  const user = useRecoilValue(userAtom);
  const { mutate } = useMutation(() => Fetcher.deleteDashboardRepo(user, repoName), {
    onSuccess: () => onDeleteRepo(repoName),
  });

  const handleClick = () => {
    mutate();
  };
  return <DeleteCommon onClick={handleClick} content={repoName} />;
}

RepoDeleteButton.propTypes = {
  repoName: PropTypes.string.isRequired,
  onDeleteRepo: PropTypes.func.isRequired,
};

export default RepoDeleteButton;
