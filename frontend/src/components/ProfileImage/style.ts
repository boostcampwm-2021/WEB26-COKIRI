import styled from '@emotion/styled';

interface Props {
  width: number;
}

const Wrapper = styled.div<Props>`
  img {
    border-radius: ${({ width }) => width / 2}px;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
