import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdAutorenew } from 'react-icons/md';

import IconButton from 'src/components/buttons/IconButton';
import DashboardProblemStatisticsSettingModal from 'src/components/modals/DashboardProblemStatisticsSettingModal';

import { StatisticsType } from 'src/types';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onUpdate: (newStatistics: StatisticsType) => void;
}

function UpdateProblemStatisticsButton({ onUpdate }: Props) {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <>
      {isModalShow && (
        <DashboardProblemStatisticsSettingModal onClose={switchIsModalShow} onUpdate={onUpdate} />
      )}
      <IconButton onClick={switchIsModalShow}>
        <MdAutorenew />
      </IconButton>
    </>
  );
}

UpdateProblemStatisticsButton.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateProblemStatisticsButton;
