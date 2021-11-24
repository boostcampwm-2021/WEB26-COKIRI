import { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';

import DashboardSettingCommon from 'src/components/buttons/dashboardSettings/Common';
import DashboardBasicSettingModal from 'src/components/modals/DashboardBasicSettingModal';

function DashboardBasicSettingButton() {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <DashboardSettingCommon
      icon={<IoSettingsOutline />}
      isModalShow={isModalShow}
      modal={<DashboardBasicSettingModal onClose={switchIsModalShow} />}
      onClick={switchIsModalShow}
    />
  );
}

export default DashboardBasicSettingButton;
