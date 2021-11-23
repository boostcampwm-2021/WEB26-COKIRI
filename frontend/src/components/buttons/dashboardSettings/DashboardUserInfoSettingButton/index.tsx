import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoSettingsOutline } from 'react-icons/io5';

import DashboardSettingCommon from 'src/components/buttons/dashboardSettings/Common';
import DashboardUserInfoSettingModal from 'src/components/modals/DashboardUserInfoSettingModal';

import { DashboardUserInfoType } from 'src/types';

interface Props {
  dashboardUserInfo: DashboardUserInfoType;
  // eslint-disable-next-line no-unused-vars
  onEditDashboardUserInfo: (newDashboardUserInfo: DashboardUserInfoType) => void;
}

function DashboardUserInfoSettingButton({ dashboardUserInfo, onEditDashboardUserInfo }: Props) {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <DashboardSettingCommon
      icon={<IoSettingsOutline />}
      isModalShow={isModalShow}
      modal={
        <DashboardUserInfoSettingModal
          onEditDashboardUserInfo={onEditDashboardUserInfo}
          dashboardUserInfo={dashboardUserInfo}
          onClose={switchIsModalShow}
        />
      }
      onClick={switchIsModalShow}
    />
  );
}

DashboardUserInfoSettingButton.propTypes = {
  onEditDashboardUserInfo: PropTypes.func.isRequired,
};

export default DashboardUserInfoSettingButton;
