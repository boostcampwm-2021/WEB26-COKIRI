import { useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';

import DashboardSettingCommon from 'src/components/buttons/dashboardSettings/Common';
import GitHubRepoAddModal from 'src/components/modals/GitHubRepoAddModal';

function GitHubRepoAddButton() {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <DashboardSettingCommon
      icon={<BsPlusCircle />}
      isModalShow={isModalShow}
      modal={<GitHubRepoAddModal onClose={switchIsModalShow} />}
      onClick={switchIsModalShow}
    />
  );
}

export default GitHubRepoAddButton;
