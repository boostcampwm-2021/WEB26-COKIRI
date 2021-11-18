import PropTypes from 'prop-types';

import Post from 'src/components/Post';

import { PostType } from 'src/types';

interface Props {
  pages?: PostType[][];
}

function Timeline({ pages }: Props) {
  return <>{pages!.map((posts) => posts.map((post) => <Post key={post._id} post={post} />))}</>;
}

Timeline.protoTypes = {
  pages: PropTypes.arrayOf(PropTypes.object),
};

Timeline.defaultProps = {
  pages: [],
};

export default Timeline;
