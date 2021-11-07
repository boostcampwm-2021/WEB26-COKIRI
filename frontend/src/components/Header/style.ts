import styled from '@emotion/styled';

const Wrapper = styled.header`
  top: 0;
  left: 0;
  right: 0;
  position: fixed;

  *,
  & {
    background-color: transparent;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
`;

export { Wrapper, Section };
