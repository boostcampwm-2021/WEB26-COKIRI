import HeadCommon from 'src/components/heads/common';

import { RANDOM_DESCRIPTION } from 'src/globals/descriptions';

function RandomHead() {
  return (
    <HeadCommon
      title='개발자의 SNS, 코쿠'
      keywords={['개발자', 'SNS', '프로그래밍', '프로그래머', '코딩']}
      description={RANDOM_DESCRIPTION}
    />
  );
}

export default RandomHead;
