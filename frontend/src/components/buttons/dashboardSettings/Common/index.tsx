import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

import IconButton from 'src/components/buttons/IconButton';

import {
  DASHBOARD_SETTING_ICON_BUTTON_WIDTH,
  DASHBOARD_SETTING_ICON_BUTTON_HEIGHT,
} from 'src/globals/constants';

interface Props {
  icon: ReactNode;
  isModalShow: boolean;
  modal: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function DashboardSettingCommon({ icon, isModalShow, modal, onClick }: Props) {
  return (
    <>
      {isModalShow && modal}
      <IconButton
        onClick={onClick}
        width={DASHBOARD_SETTING_ICON_BUTTON_WIDTH}
        height={DASHBOARD_SETTING_ICON_BUTTON_HEIGHT}
        title='setting'
      >
        {icon}
      </IconButton>
    </>
  );
}

DashboardSettingCommon.propTypes = {
  icon: PropTypes.node.isRequired,
  isModalShow: PropTypes.bool.isRequired,
  modal: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DashboardSettingCommon;
