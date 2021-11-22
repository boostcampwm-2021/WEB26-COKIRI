import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsPlusCircle } from 'react-icons/bs';

import DashboardSettingCommon from 'src/components/buttons/dashboardSettings/Common';
import GitHubRepoAddModal from 'src/components/modals/GitHubRepoAddModal';

interface Props {
  hidden: boolean;
}

function GitHubRepoAddButton({ hidden }: Props) {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <DashboardSettingCommon
      icon={<BsPlusCircle />}
      isModalShow={isModalShow}
      modal={<GitHubRepoAddModal onClose={switchIsModalShow} />}
      hidden={hidden}
      onClick={switchIsModalShow}
    />
  );
}

GitHubRepoAddButton.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default GitHubRepoAddButton;
