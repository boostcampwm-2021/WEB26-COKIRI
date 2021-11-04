import { ReactElement } from 'react';
import Image from 'next/image';
import { BiHomeAlt } from 'react-icons/bi';
import { ImCompass2 } from 'react-icons/im';
import { FaPaperPlane, FaHeart } from 'react-icons/fa';
import { IoPersonCircle } from 'react-icons/io5';
import logoImage from 'src/assets/logo.png';
import searchImage from 'src/assets/search.png';
import HeaderStyle from './style';

function Header(): ReactElement {
  return (
    <HeaderStyle>
      <div className='logo-container'>
        <a href='/home'>
          <Image src={logoImage} width='110px' height='30px' />
        </a>
        <div>
          <input type='text' />
          <Image src={searchImage} width='20px' height='20px' />
        </div>
      </div>
      <div className='home-container'>
        <a href='/home'>
          <BiHomeAlt size='30' />
        </a>
        <a href='/random'>
          <ImCompass2 size='30' />
        </a>
        <a href='/echo/echoID'>
          <FaPaperPlane size='25' />
        </a>
      </div>
      <div className='user-container'>
        <FaHeart size='25' />
        <a href='/users/tiger'>
          <IoPersonCircle size='30' />
        </a>
      </div>
    </HeaderStyle>
  );
}

export default Header;
