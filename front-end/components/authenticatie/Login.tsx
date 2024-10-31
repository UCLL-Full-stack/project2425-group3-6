import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const Login: React.FC = () => {
  const [existingUser, setExistingUser] = useState(true);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setExistingUser(!existingUser);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        {existingUser ? (
            <div className="absolute bottom-40 right-80">
                <form className="bg-white p-10 rounded-xl bg-opacity-70 w-96">
                    <h2 className="text-4xl font-bold mb-4 text-center">Login</h2>
                    <div className="mb-4">
                    <label htmlFor="username" className="text-xl">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="outline-none p-2 w-full rounded mt-2"
                        placeholder="Enter your username"
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="password" className="text-xl">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="outline-none p-2 w-full rounded mt-2"
                        placeholder="Enter your password"
                        required
                    />
                    </div>
                    <button type="submit" className="bg-[#2b8f0a] text-white text-xl p-2 w-full mt-3 rounded-xl hover:bg-[#8cb57f]">
                    Login
                    </button>
                    <button onClick={handleToggle} className="bg-[#ff5781] text-white text-xl p-2 w-full mt-3 rounded-xl hover:bg-[#fccfda]">
                    I don't have an account
                    </button>
                </form>
            </div>
          
        ) : (
            <div  className="absolute bottom-20 right-80">
                <form className="bg-white p-10 rounded-xl bg-opacity-70 w-96">
                    <h2 className="text-4xl font-bold mb-4 text-center">Create Account</h2>
                    <div className="mb-4">
                    <label htmlFor="firstname" className="text-xl">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        className="outline-none p-2 w-full rounded mt-2"
                        placeholder="Enter your first name"
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="username" className="text-xl">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="outline-none p-2 w-full rounded mt-2"
                        placeholder="Enter your username"
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="password" className="text-xl">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="outline-none p-2 w-full rounded mt-2"
                        placeholder="Enter your password"
                        required
                    />
                    </div>
                    <button type="submit" className="bg-[#2b8f0a] text-white text-xl p-2 w-full mt-3 rounded-xl hover:bg-[#8cb57f]">
                    Create Account
                    </button>
                    <button onClick={handleToggle} className="bg-[#ff5781] text-white text-xl p-2 w-full mt-3 rounded-xl hover:bg-[#fccfda]">
                    I already have an account
                    </button>
                </form>
            </div>
        )}
      </div>
    </>
  );
};

export default Login;
