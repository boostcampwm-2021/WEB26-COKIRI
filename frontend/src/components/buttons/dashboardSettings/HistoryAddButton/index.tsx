import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsPlusCircle } from 'react-icons/bs';

import DashboardSettingCommon from 'src/components/buttons/dashboardSettings/Common';
import HistoryAddModal from 'src/components/modals/HistoryAddModal';

interface Props {
  hidden: boolean;
}

function HistoryAddButton({ hidden }: Props) {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <DashboardSettingCommon
      icon={<BsPlusCircle />}
      isModalShow={isModalShow}
      modal={<HistoryAddModal onClose={switchIsModalShow} />}
      hidden={hidden}
      onClick={switchIsModalShow}
    />
  );
}

HistoryAddButton.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default HistoryAddButton;
