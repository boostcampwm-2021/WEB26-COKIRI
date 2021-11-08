import { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  children: ReactNode;
  width: number;
  height: number;
}

function Card({ children, width, height }: Props) {
  return (
    <Wrapper width={width} height={height}>
      {children}
    </Wrapper>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

Card.defaultProps = {
  width: 100,
  height: 100,
};

export default Card;
