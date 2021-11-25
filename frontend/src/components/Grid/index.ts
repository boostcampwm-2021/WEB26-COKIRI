import styled from '@emotion/styled';

interface Props {
  justifyContent?: string;
  alignItems?: string;
  margin?: number;
  padding?: number;
  overFlowY?: string;
  expanded?: boolean;
}

const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  margin: ${({ margin }) => `${margin}px`};
  padding: ${({ padding }) => `${padding}px`};
  width: ${({ expanded }) => (expanded === true ? '100%' : 'unset')};
`;

const Col = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  margin: ${({ margin }) => `${margin}px`};
  padding: ${({ padding }) => `${padding}px`};
  overflow-y: ${({ overFlowY }) => overFlowY};
  height: ${({ expanded }) => (expanded === true ? '100%' : 'unset')};
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
