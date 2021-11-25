import styled from '@emotion/styled';

interface Props {
  justifyContent?: string;
  alignItems?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  padding?: number;
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
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : `unset`)};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : `unset`)};
  margin-left: ${({ marginLeft }) => (marginLeft ? `${marginLeft}px` : `unset`)};
  margin-right: ${({ marginRight }) => (marginRight ? `${marginRight}px` : `unset`)};
`;

const Col = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  margin: ${({ margin }) => `${margin}px`};
  padding: ${({ padding }) => `${padding}px`};
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
};

export { Row, Col, Spacer };
