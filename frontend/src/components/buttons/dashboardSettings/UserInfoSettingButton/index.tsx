import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoSettingsOutline } from 'react-icons/io5';

import DashboardSettingCommon from 'src/components/buttons/dashboardSettings/Common';
import DashboardUserInfoSettingModal from 'src/components/modals/UserInfoSettingModal';

interface Props {
  hidden: boolean;
}

function UserInfoSettingButton({ hidden }: Props) {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <DashboardSettingCommon
      icon={<IoSettingsOutline />}
      isModalShow={isModalShow}
      modal={<DashboardUserInfoSettingModal onClose={switchIsModalShow} />}
      hidden={hidden}
      onClick={switchIsModalShow}
    />
  );
}

UserInfoSettingButton.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default UserInfoSettingButton;
