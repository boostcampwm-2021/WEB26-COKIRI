import styled from '@emotion/styled';
import PropType from 'prop-types';

interface Props {
  isBlockOpen: boolean;
}

const Wrapper = styled.div<Props>`
  display: ${({ isBlockOpen }) => (isBlockOpen ? 'flex' : 'block')};
`;

const Button = styled.button`
  color: #888888;
`;

Wrapper.propTypes = {
  isBlockOpen: PropType.bool.isRequired,
};
export { Wrapper, Button };
