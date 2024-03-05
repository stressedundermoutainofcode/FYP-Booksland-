import React from "react";
import { Link } from "react-router-dom";

const homepage = () => {
  return (
    <div>
      {/* FIRST-FRAME */}
      <div className="main-container p-4 lg:flex lg:px-10 xl:px-32 lg:space-x-6 xl:space-x-32 lg:justify-center w-full xl:min-h-screen xl:items-center">
        <div className="left-side lg:w-2/5">
          <h1 className="text-2xl text-center lg:text-start font-aclonica font-extrabold sm:text-4xl md:text-5xl leading-relaxed">
            Books Buy, Sell, Exchange:{" "}
            <span className="text-purple-500"> Books Marketplace.</span>{" "}
          </h1>
          <p className="text-justify text-gray-800 leading-relaxed text-lg">
            Explore our extensive catalog spanning genres from timeless classics
            to the latest bestsellers. Whether you're a mystery solver, romance
            enthusiast, or a science fiction buff, we have the perfect book
            waiting for you.
          </p>
          <div className="signup-login-buttons space-x-4 flex justify-center lg:justify-start py-4">
            <button className="text-white bg-purple-500 px-6 py-2 rounded-sm font-aclonica hover:bg-purple-600">
            <Link to = "/Login">Login</Link>
            </button>
            <button className="text-white bg-purple-500 px-6 py-2 rounded-sm font-aclonica">
              <Link to = "/Register">Signup</Link>
            </button>
          </div>
          <div className="icons flex space-x-4 justify-center lg:justify-start py-2">
            <img src="/img/facebook.png" alt="" className="h-8 w-8" />
            <img src="/img/instagram.png" alt="" className="h-8 w-8" />
            <img src="/img/X.png" alt="" className="h-8 w-8" />
          </div>
        </div>
        <div className="right-img flex justify-center lg:justify-start xl:items-center lg:w-2/5">
          <div>
            <img
              src="/img/bg1.jpg"
              alt=""
              className="rounded-lg border border-black"
            />
          </div>
        </div>
      </div>
      {/* ---------------------END--------------- */}
      {/* -----------SECOND FRAME------------------- */}
      <div className="book-type p-2">
        <h1 className="text-center font-bold text-2xl font-aclonica sm:text-3xl md:text-4xl lg:text-5xl">
          Book <span className="text-purple-500">Types</span>
        </h1>
        <div className="flex overflow-x-scroll no-scrollbar space-x-8 md:space-x-12 lg:space-x-24 xl:space-x-32 p-2 sm:justify-center lg:py-6">
          <div className="flex-none">
            <img
              src="/img/children.png"
              alt="Children's Book"
              className="h-24 w-24 p-1 rounded-full border border-black object-cover"
            />
            <h2 className="font-aclonica text-xl p-1 text-center">Children</h2>
          </div>
          <div className="flex-none">
            <img
              src="/img/children.png"
              alt="Children's Book"
              className="h-24 w-24 p-1 rounded-full border border-black object-cover"
            />
            <h2 className="font-aclonica text-xl text-center p-1">Nobel</h2>
          </div>
          <div className="flex-none">
            <img
              src="/img/children.png"
              alt="Children's Book"
              className="h-24 w-24 p-1 rounded-full border border-black object-cover"
            />
            <h2 className="font-aclonica text-xl text-center p-1">Financial</h2>
          </div>
          <div className="flex-none">
            <img
              src="/img/children.png"
              alt="Children's Book"
              className="h-24 w-24 p-1 rounded-full border border-black object-cover"
            />
            <h2 className="font-aclonica text-xl text-center p-1">History</h2>
          </div>
        </div>
      </div>
      {/* -------------END-OF-SECOND-FRAME---------- */}
      {/* -------------THIRD FRAME-------------- */}
      <div className="p-2 lg:px-10 xl:px-40">
        <h1 className="font-aclonica text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
          Featured <span className="text-purple-500">Products</span>
        </h1>
        {/* ---------- One-Product-Item--------------- */}
        <div>
          <div className="w-56 shadow drop-shadow-xl border rounded-sm p-4">
            <img src="/img/book.jpg" alt="" className="" />
            <hr className="w-full " />
            <h2 className="font-semibold text-lg font-aclonica p-1 text-center">
              Lord of Ring
            </h2>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="flex justify-center space-x-1">
              <h3 className="font-aclonica text-xl">3</h3>
              <img src="/img/rating2.png" alt="Rating's" className="h-6 w-6" />
            </div>
            <h4 className="price text-center font-aclonica">Rs.600</h4>
          </div>
          <div className="buttons flex justify-center w-56 my-3">
            <button className="text-white bg-purple-500 px-6 py-2 rounded-sm font-aclonica hover:bg-purple-600">
              Buy now
            </button>
          </div>
        </div>
        {/* -------------------------------------------- */}
      </div>
      {/* -------------------END-THIRD-FRAME--------------- */}
      {/* ------------BLOG --------PAGE---------------- */}
      <div>
        <div className="blog p-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-aclonica text-center">
            Our <span className="text-purple-500">Blog</span>
          </h1>
          <p className="tracking-wider lg:justify-evenly lg:text-lg xl:text-xl py-2 lg:px-10 xl:px-40 font-semibold lg:py-6 text-center">
            Rediscover the joy of reading without burning a hole in your pocket.
            Our affordable prices make it easy to build your dream library
            without compromising on the quality of your literary adventures.
          </p>
          <div className="lg:flex lg:text-lg lg:px-10 xl:px-40 lg:justify-between">
            <div className="space-y-4 lg:w-2/4">
              <div className="flex">
                <img src="/img/tick.png" alt="" className="h-8 w-8" />
                <p className="tracking-wider text-justify">
                  Our user-friendly interface ensures a hassle-free browsing and
                  shopping experience. With a few clicks, you can find, order,
                  and receive your chosen books at your doorstep.
                </p>
              </div>
              <div className="flex">
                <img src="/img/tick.png" alt="" className="h-8 w-8" />
                <p className="tracking-wider text-justify">
                  Join us in our commitment to sustainability. By choosing to
                  resell and buy pre-loved books, you contribute to reducing
                  waste and promoting a greener planet.
                </p>
              </div>
              <div className="flex">
                <img src="/img/tick.png" alt="" className="h-8 w-8" />
                <p className="tracking-wider text-justify">
                  Connect with like-minded individuals through our vibrant
                  community.
                </p>
              </div>
              <div className="flex">
                <img src="/img/tick.png" alt="" className="h-8 w-8" />
                <p className="tracking-wider text-justify">
                  Enjoy exclusive deals, seasonal discounts, and special offers
                  regularly. We believe in making your reading journey not only
                  fulfilling but also affordable.
                </p>
              </div>
              <button className="text-white bg-purple-500 px-6 py-2 rounded-sm font-aclonica hover:bg-purple-600">
                Explore more +
              </button>
            </div>
            <div className="lg:w-2/5 ">
              <img
                src="/img/blog.jpg"
                alt=""
                className="h-96 w-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
      {/* --------------END---BLOG-PAGE------------------- */}
      {/* ----------REVIEW PAGE---------------------------------- */}
      <div className="bg-gray-100 my-10">
        <div className="py-10">
          <div className="flex justify-center space-x-2 pt-2 lg:pt-6">
            <img src="/img/rating.png" alt="Rating's" className="h-6 w-6" />
            <h1 className="font-aclonica text-2xl sm:text-3xl xl:text-4xl">
              Our <span className="text-purple-500">Happy</span> Customers!
            </h1>
            <img src="/img/rating.png" alt="Rating's" className="h-6 w-6" />
          </div>
          <div className="para text-justify p-2">
            <p className="text-center font-semibold tracking-wider text-lg">
              Happy customers are the heart of our success, their satisfaction
              fuels our commitment to excellence.
            </p>
          </div>
          {/* review card */}
          <div className="p-2 flex overflow-scroll space-x-2 lg:space-x-10 xl:space-x-14 md:justify-center">
            <div className="p-4 border border-black w-[356px] text-center flex-none">
              <div className="5star flex justify-center space-x-2">
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
              </div>
              <div className="para text-justify p-2">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Ratione earum quasi velit quam eligendi blanditiis optio
                  maxime, assumenda recusandae quos similique minus atque culpa.
                </p>
                <h2 className="text-center font-aclonica pt-2">
                  Mr. Dustin Matara
                </h2>
              </div>
            </div>

            <div className="p-4 border border-black w-[356px] text-center flex-none">
              <div className="5star flex justify-center space-x-2 ">
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
              </div>
              <div className="para text-justify p-2">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Ratione earum quasi velit quam eligendi blanditiis optio
                  maxime, assumenda recusandae quos similique minus atque culpa.
                </p>
                <h2 className="text-center font-aclonica pt-2">
                  Ms. Eleven Brown
                </h2>
              </div>
            </div>
          </div>

          <div className="p-2 lg:mt-4 xl:mt-8 flex overflow-scroll space-x-2 lg:space-x-10 xl:space-x-14 md:justify-center">
            <div className="p-4 border border-black w-[356px] text-center flex-none">
              <div className="5star flex justify-center space-x-2">
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
              </div>
              <div className="para text-justify p-2">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Ratione earum quasi velit quam eligendi blanditiis optio
                  maxime, assumenda recusandae quos similique minus atque culpa.
                </p>
                <h2 className="text-center font-aclonica pt-2">
                  Mr. Steve Keery{" "}
                </h2>
              </div>
            </div>

            <div className="p-4 border border-black w-[356px] text-center flex-none">
              <div className="5star flex justify-center space-x-2">
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
                <img src="/img/rating.png" alt="star's" className="h-5 w-5" />
              </div>
              <div className="para text-justify p-2">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Ratione earum quasi velit quam eligendi blanditiis optio
                  maxime, assumenda recusandae quos similique minus atque culpa.
                </p>
                <h2 className="text-center font-aclonica pt-2">
                  Mr. Jim Hopper
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/* ----end--- */}
      </div>
      {/* -------------END ----REVIEW-PAGE------------------- */}
    </div>
  );
};

export default homepage;
