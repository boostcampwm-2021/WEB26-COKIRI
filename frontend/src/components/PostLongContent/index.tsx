import PropTypes from 'prop-types';
import { useState } from 'react';

import { Wrapper, Button } from './style';

interface Props {
  content: string;
}

function PostContent({ content }: Props) {
  const firstSentence = content.split('\n')[0];
  const [longContent, setLongContentBlock] = useState<string[]>(
    firstSentence.length > 16 ? [firstSentence.substring(0, 20)] : [firstSentence],
  );
  const [isBlockOpen, setIsBlockOpen] = useState(true);

  const moreButtonHandler = () => {
    setLongContentBlock(content.split('\n'));
    setIsBlockOpen(false);
  };

  return (
    <Wrapper isBlockOpen={isBlockOpen}>
      {longContent.map((sentence, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={index}>{sentence}</p>
      ))}
      {isBlockOpen && <Button onClick={moreButtonHandler}>...더 보기</Button>}
    </Wrapper>
  );
}

PostContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostContent;
