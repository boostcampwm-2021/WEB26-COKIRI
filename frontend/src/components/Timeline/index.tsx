import PropTypes from 'prop-types';

import Post from 'src/components/Post';

import { PostType } from 'src/types';

interface Props {
  pages?: PostType[][];
  onPostDelete: () => void;
}

function Timeline({ pages, onPostDelete }: Props) {
  return (
    <>
      {pages!.map((posts) =>
        posts.map((post) => <Post key={post._id} post={post} onPostDelete={onPostDelete} />),
      )}
    </>
  );
}

Timeline.protoTypes = {
  pages: PropTypes.arrayOf(PropTypes.object),
  onPostDelete: PropTypes.func.isRequired,
};

Timeline.defaultProps = {
  pages: [],
};

export default Timeline;
