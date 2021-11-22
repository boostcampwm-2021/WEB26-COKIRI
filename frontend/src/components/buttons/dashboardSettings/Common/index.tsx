import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

import IconButton from 'src/components/buttons/IconButton';

interface Props {
  icon: ReactNode;
  isModalShow: boolean;
  modal: ReactNode;
  hidden: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function DashboardSettingCommon({ icon, isModalShow, modal, hidden, onClick }: Props) {
  return (
    <>
      {isModalShow && modal}
      <IconButton onClick={onClick} width={60} height={60} hidden={hidden}>
        {icon}
      </IconButton>
    </>
  );
}

DashboardSettingCommon.propTypes = {
  icon: PropTypes.node.isRequired,
  isModalShow: PropTypes.bool.isRequired,
  modal: PropTypes.node.isRequired,
  hidden: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DashboardSettingCommon;
