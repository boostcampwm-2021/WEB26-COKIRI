import styled from '@emotion/styled';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

export { Row, Col, Spacer };
