import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import Login from '@components/authenticatie/Login';
import Overview from '@components/overvieuw';

const getUserName = () => {
  if (typeof window !== 'undefined') {
    const userName = sessionStorage.getItem('userName');
    if (userName) {
      return userName;
    }
  }
  return '';
}

const myRecepies: React.FC = () => {
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
          <div className='bg-gradient-to-br from-[#2b8f0a] to-[#8cb57f] h-[100vh] w-screen relative'>
            <h1 className='text-7xl text-white titletext2 text-center pt-10'>My Recipes</h1>
            <Overview userName={getUserName()}></Overview>
          </div>
        </main>
      
    </>
  );
};

export default myRecepies;
