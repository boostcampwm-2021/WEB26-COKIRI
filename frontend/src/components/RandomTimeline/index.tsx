import PropTypes from 'prop-types';

import Post from 'src/components/Post';
import { Col } from 'src/components/Grid';

import { PostType } from 'src/types';

interface Props {
  posts: PostType[];
}

function RandomTimeline({ posts }: Props) {
  return (
    <Col alignItems='center'>
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </Col>
  );
}

RandomTimeline.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default RandomTimeline;
