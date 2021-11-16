import CardCommon from 'src/components/cards/Common';
import Google from 'src/components/buttons/socials/Google';
import Github from 'src/components/buttons/socials/Github';
import Kakao from 'src/components/buttons/socials/Kakao';
import { Row } from 'src/components/Grid';

import { SIGNIN_CARD_WIDTH } from 'src/globals/constants';

function SigninCard() {
  return (
    <CardCommon width={SIGNIN_CARD_WIDTH}>
      <Row justifyContent='center'>
        <Google />
        <Github />
        <Kakao />
      </Row>
    </CardCommon>
  );
}

export default SigninCard;
