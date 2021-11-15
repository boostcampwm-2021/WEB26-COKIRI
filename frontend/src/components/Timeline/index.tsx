import { useRecoilValue } from 'recoil';

import Post from 'src/components/Post';

import postsAtom from 'src/recoil/posts';

function Timeline() {
  const posts = useRecoilValue(postsAtom);
  return (
    <>
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </>
  );
}

export default Timeline;
