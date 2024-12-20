import Head from 'next/head';
import Link from 'next/link';
import Language from './language/Language';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import router from 'next/router';


const Header: React.FC = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    router.push("/");
  };
  return (
    <>
      <header className="relative flex justify-between items-center z-50 h-[10vh] bg-[#fccfda]">
        <h1 className="text-6xl ml-20 oooh-baby-regular text-[#ff5781] titletext2 z-50">
          Flavorforge
        </h1>
        <nav className="mr-20">
          <ul className="flex">
              <Link className="bg-[#ff5781] hover:bg-[#97223f] hover:rounded-full p-2 mx-4 rounded-lg text-white text-xl" href="/discover">{t('header.discover', 'Discover')}</Link>
              <Link className="bg-[#ff5781] hover:bg-[#97223f] hover:rounded-full p-2 mx-4 rounded-lg text-white text-xl" href="/my-recipes">{t('header.myRecipes','My Recipes')}</Link>
              <Link className="bg-[#ff5781] hover:bg-[#97223f] hover:rounded-full p-2 mx-4 rounded-lg text-white text-xl" href="/liked-recipes">{t('header.favorites', 'Favorites')}</Link>       
              <button
              onClick={handleClick}
              className="bg-[#ff5781] hover:bg-[#97223f] hover:rounded-full p-2 mx-4 rounded-lg text-white text-xl"
            >
              {t('header.logout', 'Logout')}
            </button>
          </ul>
        </nav>
        <Language />
      </header>
    </>
  );
};


export default Header;
