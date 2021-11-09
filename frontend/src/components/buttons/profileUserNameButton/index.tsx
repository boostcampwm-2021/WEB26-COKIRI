import Link from 'next/link';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  href: string;
  userName: string;
  usage?: string;
}

function ProfileUserNameButton({ href, userName, usage }: Props) {
  return (
    <Wrapper usage={usage}>
      <Link href={href}>
        <a href={href}>{userName}</a>
      </Link>
    </Wrapper>
  );
}

ProfileUserNameButton.propsType = {
  href: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  usage: PropTypes.string,
};

ProfileUserNameButton.defaultProps = {
  usage: 'post',
};

export default ProfileUserNameButton;
