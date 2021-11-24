import styled from '@emotion/styled';
import { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  children: ReactNode;
  width: number;
  height?: number;
}

const CardWrapper = styled(Wrapper)`
  padding: 35px 30px;
`;

function CardCommon({ children, width, height }: Props) {
  return (
    <CardWrapper width={width} height={height}>
      {children}
    </CardWrapper>
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
