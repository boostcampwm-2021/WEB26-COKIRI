import { MutableSnapshot, RecoilRoot } from 'recoil';

import PostDetail from 'src/components/PostDetail';
import PostHead from 'src/components/heads/PostHead';
import RegisterModal from 'src/components/modals/RegisterModal';

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
      {post && <PostHead postID={_id!} content={content!} image={images![0]?.url} />}
      <RecoilRoot initializeState={initState(user ?? {})}>
        {post && <PostDetail post={post} />}
        <RegisterModal />
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
  const postRequest = Fetcher.getDetailPost(postID);
  if (token !== undefined) {
    const userRequest = Fetcher.getUsersMe(token);
    props.user = { ...(await userRequest), token };
  }
  props.post = await postRequest;
  return { props };
}

export default Post;
