import React from 'react';
import ReactDOM from 'react-dom';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
  useAuth,
  useUser
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// TODO: Improve get .env variables.
import { REACT_APP_CLERK_PUBLISHABLE_KEY } from "../../assets/js/user/clerk.js";

import "../../assets/css/dashboard/Index.css";
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';

const Index = () => {
  return (
    <>
      <div className='overflow-hidden'>
        <BrowserRouter>
          <ClerkProvider publishableKey={REACT_APP_CLERK_PUBLISHABLE_KEY} >
              <Routes>
                <Route
                path="/*"
                element={
                  <>
                    <SignedIn>
                      <ContextProvider>
                        <App/>
                      </ContextProvider>
                    </SignedIn>
                    <SignedOut>
                        <RedirectToSignIn/>
                    </SignedOut>
                  </>
                }
                />
            </Routes>
          </ClerkProvider>
        </BrowserRouter>
      </div>
    </>
  );
};

export default Index;