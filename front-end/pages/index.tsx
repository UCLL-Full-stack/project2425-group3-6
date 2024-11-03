import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import Login from '@components/authenticatie/Login';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>FlavorForge</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main>
          <style suppressHydrationWarning>
            @import url("https://use.typekit.net/qtm2dsn.css");
          </style>
          <div className='bg-gradient-to-br from-[#2b8f0a] to-[#8cb57f] h-[100vh] relative'>
            <svg width="100vw" height="100vh" className="flex-none z-0 absolute">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ff5781', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#fccfda', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <circle cx="220" cy="50vh" r="70vh" fill="url(#gradient)" />

                <image
                  href="/vork.svg"
                  height="130%"
                  x="70"
                />

                <text x="1050" y="250" className='text-9xl fill-white titletext2'> Flavor Forge </text>
              </svg>
              <Login></Login>
          </div>
        </main>
      
    </>
  );
};

export default Home;
