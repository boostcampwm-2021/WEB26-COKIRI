import { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BiHomeAlt, BiSearch } from 'react-icons/bi';
import { ImCompass2 } from 'react-icons/im';
import { FaPaperPlane, FaHeart } from 'react-icons/fa';
import { IoPersonCircle } from 'react-icons/io5';
import HeaderStyle from './style';

function Header(): ReactElement {
  return (
    <HeaderStyle>
      <div className='logo-container'>
        <Link href='/home'>
          <button type='button'>
            <Image src='/images/logo.png' width='110px' height='30px' />
          </button>
        </Link>
        <div>
          <input type='text' />
          <BiSearch size='20' />
        </div>
      </div>
      <div className='home-container'>
        <Link href='/home'>
          <button type='button'>
            <BiHomeAlt size='30' />
          </button>
        </Link>
        <Link href='/random'>
          <button type='button'>
            <ImCompass2 size='30' />
          </button>
        </Link>
        <Link href='/echo/echoID'>
          <button type='button'>
            <FaPaperPlane size='25' />
          </button>
        </Link>
      </div>
      <div className='user-container'>
        <FaHeart size='25' />
        <Link href='/users/tiger'>
          <button type='button'>
            <IoPersonCircle size='30' />
          </button>
        </Link>
      </div>
    </HeaderStyle>
  );
}

export default Header;
