import React, { createContext, useContext, useState } from 'react';
import { getUserId, getUserReferences } from './setLocalStorageUserId';

const StateContext = createContext();

const initialState = {
  chat: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#FF7235');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [userWorkspaces, setUserWorkspaces] = useState([])


  const setUserByEmail = async (email) => {
    // console.log('setUserByEmail: Start');
    let userId;
    if (email) {
      userId = await getUserId(email);
    }

    //Get User with references
    let userReferences;
    if (userId) {
      localStorage.setItem('userId', userId);
      userReferences = await getUserReferences(userId);
    }

    if (userReferences) setCurrentUser(userReferences);
  };

  const setMode = (e) => {
    //console.log('e.target.value: ', e.target.value);
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{setUserByEmail, currentUser, setCurrentUser, 
      currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, 
      isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, 
      setColor, themeSettings, setThemeSettings, userWorkspaces, setUserWorkspaces }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
