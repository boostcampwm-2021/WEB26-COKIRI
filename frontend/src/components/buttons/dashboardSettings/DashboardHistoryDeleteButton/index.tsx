import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoCloseCircleOutline } from 'react-icons/io5';

import DashboardSettingCommon from 'src/components/buttons/dashboardSettings/Common';
import DashboardHistoryDeleteModal from 'src/components/modals/DashboardHistoryDeleteModal';

interface Props {
  historyID: string;
}

function DashboardHistoryDeleteButton({ historyID }: Props) {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <DashboardSettingCommon
      icon={<IoCloseCircleOutline />}
      isModalShow={isModalShow}
      modal={<DashboardHistoryDeleteModal historyID={historyID} onClose={switchIsModalShow} />}
      onClick={switchIsModalShow}
    />
  );
}

DashboardHistoryDeleteButton.propTypes = {
  historyID: PropTypes.string.isRequired,
};

export default DashboardHistoryDeleteButton;
