import styled from '@emotion/styled';

interface Props {
  justifyContent?: string;
  alignItems?: string;
}

const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  width: 100%;
`;

const Col = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  width: 100%;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

Row.defaultProps = {
  justifyContent: 'unset',
  alignItems: 'unset',
};

Col.defaultProps = {
  justifyContent: 'unset',
  alignItems: 'unset',
};

export { Row, Col, Spacer };
