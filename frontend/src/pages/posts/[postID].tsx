import { MutableSnapshot, RecoilRoot } from 'recoil';

import PostDetail from 'src/components/PostDetail';
import PostHead from 'src/components/heads/PostHead';

import { PostType, UserType } from 'src/types';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

interface Props {
  user?: UserType;
  post?: PostType;
}

const initState =
  (user: UserType) =>
  ({ set }: MutableSnapshot) =>
    set(userAtom, user);

function Post({ user, post }: Props) {
  const { _id, content, images } = post ?? {};

  return (
    <>
      <PostHead postID={_id!} content={content!} image={images![0]?.url} />
      <RecoilRoot initializeState={initState(user ?? {})}>
        {post && <PostDetail post={post} />}
      </RecoilRoot>
    </>
  );
}

Post.defaultProps = {
  user: undefined,
  post: undefined,
};

export async function getServerSideProps({ req, query }: any) {
  const props: { user?: UserType; post?: PostType } = {};
  const { postID } = query;
  const token = req.headers.cookie?.split('=')[1];
  if (token === undefined) {
    return { props };
  }
  const postRequest = Fetcher.getDetailPost(postID);
  const userRequest = Fetcher.getUsersMe(token);
  props.post = await postRequest;
  props.user = { ...(await userRequest), token };
  return { props };
}

export default Post;
