import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import Login from '@components/authenticatie/Login';
import Overview from '@components/overvieuw';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const getUserName = () => {
  if (typeof window !== 'undefined') {
    const username = sessionStorage.getItem('username');
    if (username) {
      return username;
    }
  }
  return '';
}

const myRecepies: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main>
          <style suppressHydrationWarning>
            @import url("https://use.typekit.net/qtm2dsn.css");
          </style>
          <Header></Header>
          <div className='bg-gradient-to-br from-[#2b8f0a] to-[#8cb57f] min-h-[90vh] relative'>
            <h1 className='text-7xl text-white titletext2 text-center pt-10'>My Recipes</h1>
            <Overview username={getUserName()}></Overview>
          </div>
        </main>
      
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const {locale} = context;
  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"]))
      }
  }
}

export default myRecepies;
