import styled from '@emotion/styled';

interface Props {
  usage?: string;
}

const Wrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  height: 50px;
  margin-left: ${({ usage }) => (usage === 'post' ? '13px' : '0')};
  a {
    text-decoration: none;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
