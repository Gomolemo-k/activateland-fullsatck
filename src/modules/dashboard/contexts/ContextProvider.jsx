import React, { createContext, useContext, useState } from 'react';
import { getUserId } from '../../../api/functions/setLocalStorageUserId';

const StateContext = createContext();

const initialState = {
  chat: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(undefined);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#FF7235');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setUserId = async (email) => {
    // console.log('setUserId: Start');
    let userId;
    if (email) {
      userId = await getUserId(email);
    }

    if (userId) {
      setCurrentUserId(userId);
      localStorage.setItem('userId', userId);
    }
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
    <StateContext.Provider value={{ setUserId, currentUserId, setCurrentUserId, currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
