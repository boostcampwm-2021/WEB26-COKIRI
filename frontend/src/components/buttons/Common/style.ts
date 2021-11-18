import styled from '@emotion/styled';

interface Props {
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;
  plain?: boolean;
  hidden?: boolean;
}

const Button = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width === 0 ? 'unset' : `${width}px`)};
  height: ${({ height }) => (height === 0 ? 'unset' : `${height}px`)};
  margin: ${({ margin }) => (margin ? `${margin}px` : 0)};
  padding: ${({ padding }) => (padding ? `${padding}px` : 0)};
  border-radius: 50px;
  box-shadow: ${({ plain }) => (plain ? 'unset' : '5px 5px 10px #3a3a3a, -5px -5px 10px #4e4e4e')};
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'unset')};
  white-space: nowrap;

  a {
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Button };
