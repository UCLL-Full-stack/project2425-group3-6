import Head from 'next/head';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <>
   <header className="relative flex justify-between items-center z-50 h-[10vh] bg-[#fccfda]">
      <h1 className='text-6xl ml-20 oooh-baby-regular text-[#ff5781] titletext2 z-50'>Flavor Forge</h1>
      <nav className='mr-20'>
        <ul className='flex'>
          <li className='bg-[#ff5781] hover:bg-[#97223f] hover:rounded-full p-2 mx-4 rounded-lg text-white text-xl'> <Link href="/discover">Discover</Link></li>
          <li className='bg-[#ff5781] hover:bg-[#97223f] hover:rounded-full p-2 mx-4 rounded-lg text-white text-xl'><Link href="/my-recipes">My Recipes</Link></li> 
          <li className='bg-[#ff5781] hover:bg-[#97223f] hover:rounded-full p-2 mx-4 rounded-lg text-white text-xl'><Link href="/liked-recipes">Liked Recipes</Link></li> 
        </ul>
      </nav>
    </header>
    </>
    
  );
};

export default Header;
