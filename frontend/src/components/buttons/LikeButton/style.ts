import styled from '@emotion/styled';

interface Props {
  like: boolean;
}

const Wrapper = styled.div``;

const Button = styled.button<Props>`
  svg {
    color: ${({ like }) => (like ? 'red' : '#efefef')};
  }
`;

export { Wrapper, Button };
