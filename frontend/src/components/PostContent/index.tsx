import { useState } from 'react';
import PropTypes from 'prop-types';

import ButtonCommon from 'src/components/buttons/Common';

import { POST_CONTENT_LIMIT_LENGTH, DEFAULT_POST_CONTENT_WIDTH } from 'src/globals/constants';

import { Wrapper } from './style';

interface Props {
  content: string;
  width?: number;
  detail?: boolean;
}

function PostContent({ content, width, detail }: Props) {
  const [isExpand, setIsExpand] = useState(detail);
  const isShort = content.length < POST_CONTENT_LIMIT_LENGTH;
  const shortContent = content.substr(0, POST_CONTENT_LIMIT_LENGTH);
  const handleClick = () => {
    setIsExpand(true);
  };
  if (isShort) {
    return (
      <Wrapper width={width!}>
        <p>{shortContent}</p>
      </Wrapper>
    );
  }
  return isExpand ? (
    <Wrapper width={width!}>
      <p>{content}</p>
    </Wrapper>
  ) : (
    <Wrapper width={width!}>
      <p>{shortContent}</p>
      <ButtonCommon onClick={handleClick}>더보기</ButtonCommon>
    </Wrapper>
  );
}

PostContent.propTypes = {
  content: PropTypes.string.isRequired,
  width: PropTypes.number,
  detail: PropTypes.bool,
};

PostContent.defaultProps = {
  width: DEFAULT_POST_CONTENT_WIDTH,
  detail: false,
};

export default PostContent;
