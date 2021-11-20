import styled from '@emotion/styled';

interface Props {
  justifyContent?: string;
  alignItems?: string;
  margin?: number;
  overFlowY?: string;
}

const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  margin: ${({ margin }) => `${margin}px`};
  width: '100%';
`;

const Col = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  margin: ${({ margin }) => `${margin}px`};
  width: 100%;
  overflow-y: ${({ overFlowY }) => overFlowY};
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

Row.defaultProps = {
  justifyContent: 'unset',
  alignItems: 'unset',
  margin: 0,
};

Col.defaultProps = {
  justifyContent: 'unset',
  alignItems: 'unset',
  margin: 0,
  overFlowY: 'unset',
};

export { Row, Col, Spacer };
