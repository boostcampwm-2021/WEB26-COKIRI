import styled from '@emotion/styled';

interface Props {
  expanded: boolean;
}

const Wrapper = styled.div<Props>`
  position: relative;
  max-height: ${({ expanded }) => (expanded ? 'unset' : '160px')};
  overflow: hidden;
  background-color: #3f3f3f;
  border-radius: 16px;
  padding: 16px;
  margin: 16px;
`;

const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(33, 33, 33, 1));
  border-radius: 16px;
`;

const MoreButton = styled.button`
  position: absolute;
  left: 0;
  bottom: 20px;
  right: 0;
  width: 80px;
  height: 40px;
  margin: auto;
  border-radius: 8px;

  &:hover {
    border: 1px solid;
  }
`;

const LinkButton = styled.a`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 80px;
  height: 40px;
  margin: auto;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    border: 1px solid;
  }
`;

export { Wrapper, Cover, MoreButton, LinkButton };
