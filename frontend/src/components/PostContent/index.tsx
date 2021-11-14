import { useState } from 'react';
import PropTypes from 'prop-types';

import ButtonCommon from 'src/components/buttons/Common';

import { POST_CONTENT_LIMIT_LENGTH } from 'src/globals/constants';

import { Wrapper } from './style';

interface Props {
  content: string;
}

function PostContent({ content }: Props) {
  const [isExpand, setIsExpand] = useState(false);
  const isShort = content.length < POST_CONTENT_LIMIT_LENGTH;
  const shortContent = content.substr(0, POST_CONTENT_LIMIT_LENGTH);
  const handleClick = () => {
    setIsExpand(true);
  };
  if (isShort) {
    return (
      <Wrapper>
        <p>{shortContent}</p>
      </Wrapper>
    );
  }
  return isExpand ? (
    <Wrapper>
      <p>{content}</p>
    </Wrapper>
  ) : (
    <Wrapper>
      <p>{shortContent}</p>
      <ButtonCommon onClick={handleClick}>더보기</ButtonCommon>
    </Wrapper>
  );
}

PostContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostContent;
