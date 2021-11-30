import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import { MdAutorenew } from 'react-icons/md';

import IconButton from 'src/components/buttons/IconButton';

import userAtom from 'src/recoil/user';

import { StatisticsType, LanguageStatisticsType } from 'src/types';

import { Fetcher } from 'src/utils';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onUpdate: (newStatistics: StatisticsType) => void;
}

function UpdateLanguageStatisticsButton({ onUpdate }: Props) {
  const user = useRecoilValue(userAtom);
  const { mutate } = useMutation(() => Fetcher.putDashboardRepoLanguages(user), {
    onSuccess: (newStatistics: LanguageStatisticsType) => onUpdate(newStatistics.reposLanguage),
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <IconButton onClick={handleClick} title='update'>
      <MdAutorenew />
    </IconButton>
  );
}

UpdateLanguageStatisticsButton.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateLanguageStatisticsButton;
