import styled from '@emotion/styled';

import PostComments from 'src/components/PostComments';

import { POST_WIDTH } from 'src/globals/constants';

import { ThemeType } from 'src/types';

interface Props {
  theme?: ThemeType;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: unset;
  > button {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;
  }
`;

const ImageSection = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  justify-content: center;
  align-items: center;
  background: #222222;
  width: calc(100vw - ${POST_WIDTH}px);
  height: 100vh;
`;

const PostInfoSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${POST_WIDTH}px;
  height: 100vh;
  overflow-y: scroll;
`;

const Space = styled.div`
  height: 128px;
`;

const CommentSection = styled.div<Props>`
  position: fixed;
  bottom: 0;
  right: 0;
  width: ${POST_WIDTH}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export { Wrapper, ImageSection, PostInfoSection, CommentSection, Space };
