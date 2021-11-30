import { useRecoilValue } from 'recoil';

import CardCommon from 'src/components/cards/Common';
import ButtonCommon from 'src/components/buttons/Common';
import { Row, Col } from 'src/components/Grid';

import { EXTERNAL_AUTH_CARD_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

const url = process.env.NEXT_PUBLIC_SERVER_URL;

function ExternalAuthCard() {
  const user = useRecoilValue(userAtom);
  const { hasExternalBlog, hasExternalGithub } = user;

  const handleClickGithub = () => {
    const path = '/v1/socials/github';
    const query = `user_id=${user._id}&redirect_uri=/users/${user.username}/settings`;
    window.open(`${url}${path}?${query}`, '_self');
  };

  const handleClickBlog = async () => {
    const redirectURI = `/users/${user.username}/settings`;
    const tistoryAuthURL = await Fetcher.getTistoryAuthURL(user, redirectURI);
    window.open(tistoryAuthURL, '_self');
  };

  return (
    <CardCommon width={EXTERNAL_AUTH_CARD_WIDTH}>
      <Row justifyContent='center'>
        <Col alignItems='center'>
          {hasExternalGithub ? <p>연동 완료</p> : <p>연동 정보 없음</p>}
          <ButtonCommon onClick={handleClickGithub} title='connect-github'>
            깃허브 연동하기
          </ButtonCommon>
        </Col>
        <Col alignItems='center'>
          {hasExternalBlog ? <p>연동 완료</p> : <p>연동 정보 없음</p>}
          <ButtonCommon onClick={handleClickBlog} title='connect-blog'>
            티스토리 연동하기
          </ButtonCommon>
        </Col>
      </Row>
    </CardCommon>
  );
}

export default ExternalAuthCard;
