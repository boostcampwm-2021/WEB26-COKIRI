import styled from '@emotion/styled';

interface Props {
  justifyContent?: string;
}

const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  width: 100%;
  height: 100%;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

Row.defaultProps = {
  justifyContent: 'center',
};

export { Row, Col, Spacer };
