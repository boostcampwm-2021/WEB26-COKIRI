import dynamic from 'next/dynamic';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsPlusCircle } from 'react-icons/bs';

import DashboardSettingCommon from 'src/components/buttons/dashboardSettings/Common';

const DashboardRepoAddModal = dynamic(() => import('src/components/modals/DashboardRepoAddModal'));

interface Props {
  onAddRepo: Function;
}

function DashboardRepoAddButton({ onAddRepo }: Props) {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <DashboardSettingCommon
      icon={<BsPlusCircle />}
      isModalShow={isModalShow}
      modal={<DashboardRepoAddModal onClose={switchIsModalShow} onAddRepo={onAddRepo} />}
      onClick={switchIsModalShow}
    />
  );
}

DashboardRepoAddButton.propTypes = {
  onAddRepo: PropTypes.func.isRequired,
};

export default DashboardRepoAddButton;
