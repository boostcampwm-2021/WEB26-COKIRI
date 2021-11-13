import PropTypes from 'prop-types';

import styled from '@emotion/styled';

interface Props {
  width?: number;
  height?: number;
  margin?: number;
}

const Button = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width === 0 ? 'unset' : `${width}px`)};
  height: ${({ height }) => (height === 0 ? 'unset' : `${height}px`)};
  margin: ${({ margin }) => (margin ? `${margin}px` : 0)};
  border-radius: 50px;
  padding: 16px;
  box-shadow: 5px 5px 10px #3a3a3a, -5px -5px 10px #4e4e4e;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

Button.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { Button };
