import { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  width: number;
  height?: number;
}

function CardCommon({ children, width, height }: PropsWithChildren<Props>) {
  return (
    <Wrapper width={width} height={height} padding='35px 30px'>
      {children}
    </Wrapper>
  );
}

CardCommon.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

CardCommon.defaultProps = {
  width: 0,
  height: 0,
};

export default CardCommon;
