import { useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';

import DashboardSettingCommon from 'src/components/buttons/dashboardSettings/Common';
import DashboardHistoryAddModal from 'src/components/modals/DashboardHistoryAddModal';

function DashboardHistoryAddButton() {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <DashboardSettingCommon
      icon={<BsPlusCircle />}
      isModalShow={isModalShow}
      modal={<DashboardHistoryAddModal onClose={switchIsModalShow} />}
      onClick={switchIsModalShow}
    />
  );
}

export default DashboardHistoryAddButton;
