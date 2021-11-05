import { ReactElement } from 'react';

import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  box-shadow: 2px 2px 2px 1px #000000;
  height: 480px;
`;

function UsersRecommendation(): ReactElement {
  return <Card>header</Card>;
}

export default UsersRecommendation;
