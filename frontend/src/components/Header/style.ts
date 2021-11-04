import styled from 'styled-components';

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 350px;
  background: #eee;
  align-items: center;
  .logo-container {
    justify-content: space-between;
  }
  .home-container {
    justify-content: space-evenly;
  }
  .user-container {
    justify-content: space-between;
  }
`;

export default HeaderStyle;
