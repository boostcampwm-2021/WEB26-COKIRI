import PropTypes from 'prop-types';

import Post from 'src/components/Post';

import { PostType } from 'src/types';

import { Wrapper } from './style';

interface Props {
  posts?: PostType[];
}

function Timeline({ posts }: Props) {
  return (
    <Wrapper>
      {posts!.map((post) => (
        <Post post={post} key={post._id} />
      ))}
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
