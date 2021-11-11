import styled from '@emotion/styled';

import { Row } from 'src/components/Grid';

const Wrapper = styled.div`
  p {
    text-align: right;
    width: 128px;
    font-size: 24px;
    padding: 0 24px;
    margin: 8px;
  }
  input {
    padding: 0 24px;
    margin: 8px;
    width: 256px;
    height: 48px;
    font-size: 24px;
    border-radius: 50px;
    background: #444444;
    box-shadow: inset 5px 5px 10px #3a3a3a, inset -5px -5px 10px #4e4e4e;
  }
  ${Row} {
    height: unset;
  }
`;

const SaveButton = styled.button`
  margin: 24px 48px;
  align-self: end;
  border-radius: 50px;
  background: #444444;
  height: 48px;
  width: 96px;
  box-shadow: 5px 5px 10px #3a3a3a, -5px -5px 10px #4e4e4e;
`;

const ImageCoverButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  float: left;
  z-index: 1;
  background-color: #444444;
  width: 168px;
  height: 168px;
  opacity: 0.6;
  font-size: 18px;
`;

const ImageHolder = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 24px;
  border-radius: 84px;
  height: 168px;
  width: 168px;
`;

export { Wrapper, ImageHolder, ImageCoverButton, SaveButton };
