import { useState } from 'react';
import PropTypes from 'prop-types';

import ButtonCommon from 'src/components/buttons/Common';

import { POST_CONTENT_LIMIT_LENGTH } from 'src/globals/constants';

import { Wrapper, Content } from './style';

interface Props {
  content: string;
  expanded?: boolean;
}

function ContentCommon({ content, expanded }: Props) {
  const [isExpand, setIsExpand] = useState(expanded);
  const isShort = content.length < POST_CONTENT_LIMIT_LENGTH;
  const shortContent = content.substr(0, POST_CONTENT_LIMIT_LENGTH);
  const handleClick = () => {
    setIsExpand(true);
  };
  if (isShort) {
    return (
      <Wrapper>
        <Content>{shortContent}</Content>
      </Wrapper>
    );
  }
  return isExpand ? (
    <Wrapper>
      <Content>{content}</Content>
    </Wrapper>
  ) : (
    <Wrapper>
      <Content>{shortContent}</Content>
      <ButtonCommon onClick={handleClick}>더보기</ButtonCommon>
    </Wrapper>
  );
}

ContentCommon.propTypes = {
  content: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
};

ContentCommon.defaultProps = {
  expanded: false,
};

export default ContentCommon;
