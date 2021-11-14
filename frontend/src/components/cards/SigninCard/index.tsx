import Card from 'src/components/cards/Common';
import Google from 'src/components/buttons/socials/Google';
import Github from 'src/components/buttons/socials/Github';
import Kakao from 'src/components/buttons/socials/Kakao';
import { Row } from 'src/components/Grid';

import { SIGNIN_CARD_WIDTH } from 'src/globals/constants';

function SigninCard() {
  return (
    <Card width={SIGNIN_CARD_WIDTH}>
      <Row>
        <Google />
        <Github />
        <Kakao />
      </Row>
    </Card>
  );
}

export default SigninCard;
