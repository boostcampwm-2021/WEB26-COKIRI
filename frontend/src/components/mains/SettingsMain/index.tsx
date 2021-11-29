import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import UserSettingsCard from 'src/components/cards/UserSettingsCard';
import ExternalAuthCard from 'src/components/cards/ExternalAuthCard';
import PermissionDeniedCard from 'src/components/cards/PermissionDeniedCard';
import { Col } from 'src/components/Grid';

import { Page } from 'src/styles';

import userAtom from 'src/recoil/user';

function SettingsMain() {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const targetUsername = router.query.username;
  return (
    <Page.Main>
      <Col justifyContent='center' alignItems='center'>
        {targetUsername === user.username ? (
          <>
            <UserSettingsCard />
            <ExternalAuthCard />
          </>
        ) : (
          <PermissionDeniedCard />
        )}
      </Col>
    </Page.Main>
  );
}

export default SettingsMain;
