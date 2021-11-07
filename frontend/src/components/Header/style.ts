import styled from '@emotion/styled';

const HeaderStyle = styled.div`
  * {
    background: #555;
  }
  background: #555;
  position: fixed;
  top: 0;
  display: flex;
  height: 50px;
  align-items: center;
  width: 100%;
  button {
    border: 0px;
    background-color: rgbx(255, 255, 255, 0);
  }
  button:hover {
    cursor: pointer;
  }
  .logo-container {
    position: fixed;
    top: 10px;
    left: 15%;
    display: flex;
    align-items: center;
    .input-container {
      margin-left: 20px;
      border-radius: 10 px;
      align-items: center;
      display: flex;
      background: #666;
      border-radius: 3px;
      padding: 0px 5px;
      input {
        margin-left: 3px;
        border: none;
        background: #666;
        font-size: 16px;
        color: white;
        width: 150px;
      }
      input:focus {
        color: white;
        outline: none;
      }
      svg {
        background: #666;
      }
    }
  }
  .home-container {
    position: fixed;
    top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      margin: 0px 10px;
    }
    button:last-child {
      margin-left: 12px;
    }
  }
  .user-container {
    position: fixed;
    top: 10px;
    display: flex;
    right: 15%;
    align-items: center;
    button {
      margin: 0px 3px;
    }
  }
`;

export default HeaderStyle;
