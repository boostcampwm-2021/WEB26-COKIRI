import PropTypes from 'prop-types';

import Card from 'src/components/cards/Common';
import Post from 'src/components/Post';

import { PostType } from 'src/types';

import { Wrapper } from './style';

interface Props {
  posts?: PostType[];
}

function Timeline({ posts }: Props) {
  return (
    <Wrapper>
      <Card width={600} height={600}>
        <Post />
      </Card>
    </Wrapper>
  );
}

Timeline.prototype = {
  posts: PropTypes.arrayOf(PropTypes.any),
};

Timeline.defaultProps = {
  posts: [],
};

export default Timeline;
