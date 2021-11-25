import { useState } from 'react';
import { IoHeartOutline } from 'react-icons/io5';

import IconButton from 'src/components/buttons/IconButton';
import NotificationHeaderModal from 'src/components/modals/NotificationHeaderModal';

function NotificationButton() {
  const [isModalShow, setIsModalShow] = useState(false);

  const handleClick = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <>
      {isModalShow && <NotificationHeaderModal onClose={() => setIsModalShow(false)} />}
      <IconButton onClick={handleClick}>
        <IoHeartOutline />
      </IconButton>
    </>
  );
}

export default NotificationButton;
