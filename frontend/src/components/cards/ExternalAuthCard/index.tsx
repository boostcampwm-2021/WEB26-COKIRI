import CardCommon from 'src/components/cards/Common';
import ButtonCommon from 'src/components/buttons/Common';
import { Row } from 'src/components/Grid';

import { EXTERNAL_AUTH_CARD_WIDTH } from 'src/globals/constants';

function ExternalAuthCard() {
  const handleClickGithub = () => {};

  return (
    <CardCommon width={EXTERNAL_AUTH_CARD_WIDTH}>
      <Row justifyContent='center'>
        <ButtonCommon onClick={handleClickGithub}>깃허브 연동하기</ButtonCommon>
      </Row>
    </CardCommon>
  );
}

export default ExternalAuthCard;
