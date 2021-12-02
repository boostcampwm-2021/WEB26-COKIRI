import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdAutorenew } from 'react-icons/md';

import IconButton from 'src/components/buttons/IconButton';
import DashboardProblemStatisticsSettingModal from 'src/components/modals/DashboardProblemStatisticsSettingModal';

interface Props {
  onUpdate: Function;
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
      <IconButton onClick={switchIsModalShow} title='update'>
        <MdAutorenew />
      </IconButton>
    </>
  );
}

UpdateProblemStatisticsButton.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateProblemStatisticsButton;
