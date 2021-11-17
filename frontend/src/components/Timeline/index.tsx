import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import Post from 'src/components/Post';

import postsAtom from 'src/recoil/posts';
import randomPostsAtom from 'src/recoil/randomPosts';

interface Props {
  random?: boolean;
}

function Timeline({ random }: Props) {
  const posts = useRecoilValue(postsAtom);
  const randomPosts = useRecoilValue(randomPostsAtom);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {random
        ? randomPosts.map((post) => <Post post={post} key={post._id} />)
        : posts.map((post) => <Post post={post} key={post._id} />)}
    </>
  );
}

Timeline.propTypes = {
  random: PropTypes.bool,
};

Timeline.defaultProps = {
  random: false,
};
export default Timeline;
