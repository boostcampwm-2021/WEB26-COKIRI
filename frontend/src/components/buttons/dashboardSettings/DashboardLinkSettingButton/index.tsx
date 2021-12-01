import dynamic from 'next/dynamic';
import { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';

import DashboardSettingCommon from 'src/components/buttons/dashboardSettings/Common';

const DashboardLinkSettingModal = dynamic(
  () => import('src/components/modals/DashboardLinkSettingModal'),
);

function DashboardLinkSettingButton() {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <DashboardSettingCommon
      icon={<IoSettingsOutline />}
      isModalShow={isModalShow}
      modal={<DashboardLinkSettingModal onClose={switchIsModalShow} />}
      onClick={switchIsModalShow}
    />
  );
}

export default DashboardLinkSettingButton;
