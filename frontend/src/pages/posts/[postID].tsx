import PostDetail from 'src/components/PostDetail';
import PostHead from 'src/components/heads/PostHead';

import { PostType } from 'src/types';

import { Fetcher } from 'src/utils';

interface Props {
  post: PostType;
}

function Post({ post }: Props) {
  const { _id, content, images } = post;

  return (
    <>
      <PostHead postID={_id!} content={content!} image={images![0]?.url} />
      <PostDetail post={post} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { postID } = context.query;
  const post = await Fetcher.getDetailPost(postID);
  return {
    props: { post },
  };
}

export default Post;
