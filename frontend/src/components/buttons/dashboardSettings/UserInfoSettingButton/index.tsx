import { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';

import DashboardSettingCommon from 'src/components/buttons/dashboardSettings/Common';
import DashboardUserInfoSettingModal from 'src/components/modals/UserInfoSettingModal';

function UserInfoSettingButton() {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <DashboardSettingCommon
      icon={<IoSettingsOutline />}
      isModalShow={isModalShow}
      modal={<DashboardUserInfoSettingModal onClose={switchIsModalShow} />}
      onClick={switchIsModalShow}
    />
  );
}

export default UserInfoSettingButton;
