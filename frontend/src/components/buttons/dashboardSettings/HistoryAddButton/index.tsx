import { useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';

import DashboardSettingCommon from 'src/components/buttons/dashboardSettings/Common';
import HistoryAddModal from 'src/components/modals/HistoryAddModal';

function HistoryAddButton() {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <DashboardSettingCommon
      icon={<BsPlusCircle />}
      isModalShow={isModalShow}
      modal={<HistoryAddModal onClose={switchIsModalShow} />}
      onClick={switchIsModalShow}
    />
  );
}

export default HistoryAddButton;
