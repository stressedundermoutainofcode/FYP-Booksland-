import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { logIn, googleSignIn } = UserAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async(e) =>{
    e.preventDefault();

    try{
      await googleSignIn();
      navigate('/');
    }catch(err){
      setError(err.message)
    }

  }

  // const PasswordToggle = () => {
  //   const [showPassword, setShowPassword] = useState(false);
  // }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gray-100">
      {/* <div className="lg:p-4 min-h-full bg-white "> */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-24 w-auto"
          src="./img/logo.svg"
          alt="Your Company"
        />
        <h2 className="mt-2 p-4 text-center font-extrabold leading-9 tracking-tight text-gray-900 font-david-libre text-3xl">
          <span className="text-orange-500">Sign In</span> To Your{" "}
          <span className="text-orange-500">Account</span>
          {error && (
            <p className="text-sm bg-red-500 text-white p-3 rounded-xl m-2">
              {error}
            </p>
          )}
        </h2>
      </div>

      <div className="min-h-full md:bg-white md:rounded-lg md:p-10 md:shadow-md md:border md:border-gray-100 md:max-w-lg w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your gmail..."
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password.."
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                />
              </div>

              <div className="flex justify-between py-2">
                <div className="flex items-center space-x-4 pl-2">
                  <input
                   type="checkbox"
                   checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <p className="text-sm">Show password</p>
                </div>
                <div className="text-sm mt-2">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

            <div className=" flex justify-cente items-center">
              <hr className="w-full border-gray-300" />
              <span className="w-full px-2">Or continue with</span>
              <hr className="w-full border-gray-300" />
            </div>

            <div className="">
                <button 
                className="flex flex-1 border border-gray-400 space-x-2 py-2 px-4 rounded-xl items-center justify-center w-full"
                onClick={handleGoogleSignIn}
                >
                  <img src="./img/google_logo.png" alt="" className="h-8 w-8" />
                  <p className="font-semibold">Google</p>
                </button>



                {/* <div className="google-button w-full">
                  <div className="flex flex-1 border border-gray-400 space-x-2 py-2 px-4 rounded-xl items-center justify-center ">
                    <img src="/img/google.png" alt="" className="w-8 h-8" />
                    <p className="font-semibold">Google</p>
                  </div>
                </div> */}
            </div>

            
          </form>
        </div>
      </div>
      <p className="mt-10 text-center text-md text-gray-500">
        New Member?{" "}
        <a
          href="#"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          <Link to="/Register">Register</Link>
        </a>
      </p>
    </div>
  );
};

export default Login;

