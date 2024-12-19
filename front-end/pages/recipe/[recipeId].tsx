import Head from 'next/head';
import Header from '@components/header';
import RecipeDetails from '@components/recipedetails';

const getUserName = () => {
  if (typeof window !== 'undefined') {
    const username = sessionStorage.getItem('username');
    if (username) {
      return username;
    }
  }
  return '';
};

const RecipeDetailsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Recipe</title>
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
          <div>
            <RecipeDetails />
          </div>
        </div>
      </main>
    </>
  );
};

export default RecipeDetailsPage;
