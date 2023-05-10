import React, { useState, useEffect } from 'react';
// import data
import { header } from '../../../assets/data/landing-page/data';
// import icons
import { HiMenuAlt4, HiOutlineX } from 'react-icons/hi';
// import components
import MobileNav from './MobileNav';
import Nav from './Nav';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
// TODO: Improve get .env variables.
import { REACT_APP_CLERK_PUBLISHABLE_KEY } from "../../../../env.js";

// CLERK SOO
const clerkPubKey = REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!clerkPubKey) {
    throw new Error("Missing Publishable Key")
}
//const { isLoaded, isSignedIn, user } = useUser();

const Header = () => {
  // mobile nav state
  const [mobileNav, setMobileNav] = useState(false);
  // header state
  const [isActive, setIsActive] = useState(false);
  // destructure header data
  const { logo, btnText } = header;
  // scroll event
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });
  return (
    <header
      className={`${
        isActive ? 'lg:top-0 bg-white shadow-2xl' : 'lg:top-[60px]'
      } py-6 lg:py-4 fixed w-full transition-all z-10`}
    >
      <div className='container mx-auto flex justify-between items-center'>
        {/* logo */}
        <a href='#' data-aos='fade-down' data-aos-delay='1000'>
          <img className="object-cover h-20 w-35" src={logo} alt='' />
        </a>
        {/* nav - initially hidden - show on desktop mode */}
        <div
          className='hidden lg:flex'
          data-aos='fade-down'
          data-aos-delay='1200'
        >
          <Nav />
        </div>
        {/* cta button - initially - show on desktop mode */}
        <ClerkProvider
          publishableKey={clerkPubKey}
          navigate={(to) => navigate(to)}
          >
            <SignedIn>
                <a href="/dashboard">
                  <button
                    className='btn btn-sm text-center bg-accent hover:bg-accentHover w-[102px] text-white'
                    data-aos='fade-down'
                    data-aos-delay='1400'
                  >
                    Dashboard
                  </button>
                </a>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <a href="/login">
                    <button
                      className='btn btn-sm text-center border border-accent text-accent hover:text-white hover:bg-accentHover w-[102px]'
                      data-aos='fade-down'
                      data-aos-delay='1400'
                    >
                      Login
                    </button>
                  </a>
                  <a href="/signup">
                    <button
                      className='btn btn-sm text-center bg-accent hover:bg-accentHover w-[102px] text-white'
                      data-aos='fade-down'
                      data-aos-delay='1400'
                    >
                      {btnText}
                    </button>
                  </a>
            </SignedOut>
        </ClerkProvider>
        {/* mobile nav trigger btn - hidden on desktop */}
        <button className='lg:hidden' onClick={() => setMobileNav(!mobileNav)}>
          {mobileNav ? (
            <HiOutlineX className='text-3xl text-accent' />
          ) : (
            <HiMenuAlt4 className='text-3xl text-accent' />
          )}
        </button>
        {/* mobile nav - hidden on desktop */}
        <div
          className={`${
            mobileNav ? 'left-0' : '-left-full'
          }  fixed top-0 bottom-0 w-[60vw] lg:hidden transition-all`}
        >
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
