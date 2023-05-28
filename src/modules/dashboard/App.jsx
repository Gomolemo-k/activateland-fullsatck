import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { useStateContext } from '../../contexts/dashboard/ContextProvider';
import { useUser } from "@clerk/clerk-react";
import "../../assets/css/dashboard/App.css";

//Routes
import ShowUserProfile from '../user-profile/components/show.jsx';
import EditUserProfile from '../user-profile/components/edit.jsx';

const App = () => {
  const { setUserByEmail, setCurrentUser, currentUser, setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const { isLoaded, isSignedIn, user } = useUser();

  const chargeData = async () => {
    try {
      //Get user
      if (isLoaded && isSignedIn && user) {
        const email = user.primaryEmailAddress.emailAddress;
        if (email) {
          await setUserByEmail(email);
        }
      }

      //Get values
      const currentThemeColor = await localStorage.getItem('colorMode');
      const currentThemeMode = await localStorage.getItem('themeMode');
      if ( currentThemeColor && currentThemeMode) {
        setCurrentColor(currentThemeColor);
        setCurrentMode(currentThemeMode);
      }
    } catch (error) {
      console.error("Error chargeData:", error);
    }
  };

  useEffect(() => {
    // Execute asyncron function
    chargeData();

  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : 'light'}>
      {/* <BrowserRouter> */}
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            {/* <TooltipComponent
              content="Settings"
              position="Top"
            > */}
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            {/* </TooltipComponent> */}
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Navigate to='/' />)} />
                <Route path="/dashboard" element={(<Navigate to='/dashboard' />)} />

                {/* user  */}
                <Route path="/users/show" element={currentUser && (<ShowUserProfile currentUser={currentUser} />)} />
                <Route path="/users/edit" element={currentUser && (<EditUserProfile currentUser={currentUser} />)} />

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default App;