import Card from 'src/components/Card';
import Post from 'src/components/Post';

import { Wrapper } from './style';

function Timeline() {
  return (
    <Wrapper>
      <Card width={600} height={600}>
        <Post />
      </Card>
    </Wrapper>
  );
}

export default Timeline;
