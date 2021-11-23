import { useRecoilValue } from 'recoil';

import CardCommon from 'src/components/cards/Common';
import ButtonCommon from 'src/components/buttons/Common';
import { Row } from 'src/components/Grid';

import { EXTERNAL_AUTH_CARD_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';

const url = process.env.NEXT_PUBLIC_SERVER_URL as string;

function ExternalAuthCard() {
  const user = useRecoilValue(userAtom);
  const handleClickGithub = () => {
    window.open(`${url}/v1/socials/github?user_id=${user._id}`, '_self');
  };

  const handleClickBlog = () => {
    window.open(`${url}/v1/socials/github?user_id=${user._id}`, '_self');
  };

  return (
    <CardCommon width={EXTERNAL_AUTH_CARD_WIDTH}>
      <Row justifyContent='center'>
        <ButtonCommon onClick={handleClickGithub}>깃허브 연동하기</ButtonCommon>
        <ButtonCommon onClick={handleClickBlog}>블로그 연동하기</ButtonCommon>
      </Row>
    </CardCommon>
  );
}

export default ExternalAuthCard;
