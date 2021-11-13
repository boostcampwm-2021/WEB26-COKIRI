import Card from 'src/components/cards/Common';
import Google from 'src/components/buttons/socials/Google';
import Github from 'src/components/buttons/socials/Github';
import Kakao from 'src/components/buttons/socials/Kakao';
import { Row } from 'src/components/Grid';

function SigninCard() {
  return (
    <Card width={500}>
      <Row>
        <Google />
        <Github />
        <Kakao />
      </Row>
    </Card>
  );
}

export default SigninCard;
