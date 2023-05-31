import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { useStateContext } from '../../contexts/dashboard/ContextProvider';
import { useUser } from "@clerk/clerk-react";
import "../../assets/css/dashboard/App.css";

//Routes user profile
import ShowUserProfile from '../user-profile/components/show/show';
import EditUserProfile from '../user-profile/components/edit/edit';
//Routes project
import IndexProject from '../project/components/index/index';
import NewProject from '../project/components/new/new';
import ShowProject from '../project/components/show/show';
import EditProject from '../project/components/edit/edit';
//Routes team
import IndexTeam from '../team/components/index/index';
import NewTeam from '../team/components/new/new';
import ShowTeam from '../team/components/show/show';
import EditTeam from '../team/components/edit/edit';
//Routes team member
import IndexTeamMember from '../team-member/components/index/index';
import NewTeamMember from '../team-member/components/new/new';
import ShowTeamMember from '../team-member/components/show/show';
import EditTeamMember from '../team-member/components/edit/edit';
//Routes property
import IndexProperty from '../property/components/index/index';
import NewProperty from '../property/components/new/new';
import ShowProperty from '../property/components/show/show';
import EditProperty from '../property/components/edit/edit';
//Routes property-analysis
import IndexPropertyAnalysis from '../property-analysis/components/index/index';
import NewPropertyAnalysis from '../property-analysis/components/new/new';
import ShowPropertyAnalysis from '../property-analysis/components/show/show';
import EditPropertyAnalysis from '../property-analysis/components/edit/edit';

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

                {/* projects  */}
                <Route path="/projects/index" element={currentUser && (<IndexProject currentUser={currentUser} />)} />
                <Route path="/projects/new" element={currentUser && (<NewProject currentUser={currentUser} />)} />
                <Route path="/projects/show" element={currentUser && (<ShowProject currentUser={currentUser} />)} />
                <Route path="/projects/edit" element={currentUser && (<EditProject currentUser={currentUser} />)} />

                {/* teams  */}
                <Route path="/teams/index" element={currentUser && (<IndexTeam currentUser={currentUser} />)} />
                <Route path="/teams/new" element={currentUser && (<NewTeam currentUser={currentUser} />)} />
                <Route path="/teams/show" element={currentUser && (<ShowTeam currentUser={currentUser} />)} />
                <Route path="/teams/edit" element={currentUser && (<EditTeam currentUser={currentUser} />)} />

                {/* team-members  */}
                <Route path="/team-members/index" element={currentUser && (<IndexTeamMember currentUser={currentUser} />)} />
                <Route path="/team-members/new" element={currentUser && (<NewTeamMember currentUser={currentUser} />)} />
                <Route path="/team-members/show" element={currentUser && (<ShowTeamMember currentUser={currentUser} />)} />
                <Route path="/team-members/edit" element={currentUser && (<EditTeamMember currentUser={currentUser} />)} />

                {/* properties  */}
                <Route path="/properties/index" element={currentUser && (<IndexProperty currentUser={currentUser} />)} />
                <Route path="/properties/new" element={currentUser && (<NewProperty currentUser={currentUser} />)} />
                <Route path="/properties/show" element={currentUser && (<ShowProperty currentUser={currentUser} />)} />
                <Route path="/properties/edit" element={currentUser && (<EditProperty currentUser={currentUser} />)} />

                {/* property-analysis  */}
                <Route path="/property-analysis/index" element={currentUser && (<IndexPropertyAnalysis currentUser={currentUser} />)} />
                <Route path="/property-analysis/new" element={currentUser && (<NewPropertyAnalysis currentUser={currentUser} />)} />
                <Route path="/property-analysis/show" element={currentUser && (<ShowPropertyAnalysis currentUser={currentUser} />)} />
                <Route path="/property-analysis/edit" element={currentUser && (<EditPropertyAnalysis currentUser={currentUser} />)} />

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