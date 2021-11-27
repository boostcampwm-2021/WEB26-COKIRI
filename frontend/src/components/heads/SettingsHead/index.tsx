import HeadCommon from 'src/components/heads/common';

import { SETTING_DESCRIPTION } from 'src/globals/descriptions';

function SettingsHead() {
  return (
    <HeadCommon
      title='개발자의 SNS, 코쿠'
      keywords={['개발자', 'SNS', '프로그래밍', '프로그래머', '코딩']}
      description={SETTING_DESCRIPTION}
    />
  );
}

export default SettingsHead;
