import styled from '@emotion/styled';

interface Props {
  usage?: string;
}

const Wrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  height: 50px;
  margin-left: ${({ usage }) => (usage === 'post' ? '15px' : '0')};
  a {
    height: 36px;
  }
  img {
    border-radius: 18px;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
