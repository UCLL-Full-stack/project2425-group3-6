import userService from '@services/userService';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login: React.FC = () => {
  const [existingUser, setExistingUser] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setExistingUser(!existingUser);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message at start

    // Check if fields are empty
    if (!userName || !password) {
      setErrorMessage('Username and password are required.');
      return;
    }

    try {
      const user = await userService.checkUserExist(userName, password);
      if (user) {
        sessionStorage.setItem('userName', userName);
        router.push('/my-recipes'); 
      } else {
        setErrorMessage('Invalid username or password.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message at start

    // Check if fields are empty
    if (!userName) {
      setErrorMessage('Username is required.');
      return;
    }

    if (!password) {
      setErrorMessage('Password is required.');
      return;
    }

    if (!firstName) {
      setErrorMessage('First name is required.');
      return;
    }

    if (!lastName) {
      setErrorMessage('Last name is required.');
      return;
    }

    if (!email) {
      setErrorMessage('Email is required.');
      return;
    }

    try {
      const user = await userService.addUser({
        userName,
        firstName,
        lastName,
        password,
        email
      });
      if (user) {
        setExistingUser(true);
      } else {
        setErrorMessage('Invalid user.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    }
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
                        onChange={(e) => setUserName(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    {errorMessage && (
                      <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
                    )}
                    <button type="submit" onClick={handleLogin} className="bg-[#2b8f0a] text-white text-xl p-2 w-full mt-3 rounded-xl hover:bg-[#8cb57f]">
                    Login
                    </button>
                    <button onClick={handleToggle} className="bg-[#ff5781] text-white text-xl p-2 w-full mt-3 rounded-xl hover:bg-[#fccfda]">
                    I don't have an account
                    </button>
                </form>
            </div>
          
        ) : (
            <div  className="absolute bottom-10 right-80">
                <form className="bg-white p-10 rounded-xl bg-opacity-70 w-96">
                    <h2 className="text-4xl font-bold mb-4 text-center">Create Account</h2>
                    <div className="mb-4">
                    <label htmlFor="username" className="text-xl">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="outline-none p-2 w-full rounded mt-2"
                        placeholder="Enter your username"
                        required
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="email" className="text-xl">Email</label>
                    <input
                        type="text"
                        id="email"
                        className="outline-none p-2 w-full rounded mt-2"
                        placeholder="Enter your email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className='flex'>
                      <div className="mb-4">
                      <label htmlFor="firstname" className="text-xl">First Name</label>
                      <input
                          type="text"
                          id="firstname"
                          className="outline-none p-2 w-full rounded mt-2 mr-2"
                          placeholder="Enter your first name"
                          required
                          onChange={(e) => setFirstName(e.target.value)}
                      />
                      </div>
                      <div className="mb-4">
                      <label htmlFor="lastname" className="text-xl ml-2">Last Name</label>
                      <input
                          type="text"
                          id="lastname"
                          className="outline-none p-2 w-full rounded mt-2 ml-2"
                          placeholder="Enter your last name"
                          required
                          onChange={(e) => setLastName(e.target.value)}
                      />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                    <label htmlFor="password" className="text-xl">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="outline-none p-2 w-full rounded mt-2"
                        placeholder="Enter your password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <button type="submit" onClick={handleCreateUser} className="bg-[#2b8f0a] text-white text-xl p-2 w-full mt-3 rounded-xl hover:bg-[#8cb57f]">
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
