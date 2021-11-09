import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import RecommendationCard from 'src/components/cards/RecommendationCard';
import Timeline from 'src/components/Timeline';
import Header from 'src/components/Header';
import SigninCard from 'src/components/cards/SigninCard';
import RegisterModal from 'src/components/modals/RegisterModal';
import { Col } from 'src/components/Grid';

import userAtom from 'src/recoil/user';

import { Main } from 'src/styles/pages/home';

import { UserType } from 'src/types';

import { Fetcher } from 'src/utils';

interface Props {
  user: UserType;
}

function Home({ user }: Props) {
  const setUser = useSetRecoilState(userAtom);
  const [isRegisterModalShow, setIsRegisterModalShow] = useState(user.isRegistered === false);
  useEffect(() => setUser(user), []);

  const isAuthenticated = Object.keys(user).length !== 0;
  const handleModalClose = () => {
    setIsRegisterModalShow(false);
  };
  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta
          name='description'
          content='일상을 쉽게 공유하지 못하는 개발자를 위한 SNS. 몇번의 클릭으로 다른 개발자의 흔적을 볼 수 있다. 그리고 코쿠(COCOO)는 개발자의 흩어진 노력을 모아준다.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Main>
        <Col>
          {isAuthenticated ? null : <SigninCard />}
          {isAuthenticated ? <RecommendationCard /> : null}
          {isAuthenticated ? <Timeline /> : null}
        </Col>
      </Main>
      {isRegisterModalShow ? <RegisterModal onClose={handleModalClose} /> : null}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const token = context.req?.cookies.jwt;
  if (token === undefined) {
    return { props: { user: {} } };
  }
  const user: UserType = await Fetcher.getUsersMe(token);
  return {
    props: { user: { ...user, token } },
  };
}

Home.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Home;
