import Card from 'src/components/cards/Common';
import Post from 'src/components/Post';

import { Wrapper } from './style';

function Timeline() {
  return (
    <Wrapper>
      <Card width={600} height={500}>
        <Post />
      </Card>
    </Wrapper>
  );
}

export default Timeline;
