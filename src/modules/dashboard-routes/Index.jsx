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
import "../../assets/css/dashboard-routes/Index.css";
import App from './App';
import { ContextProvider, useStateContext } from "../../contexts/dashboard-routes/ContextProvider.jsx";

const clerkPubKey = await import.meta.env.PUBLIC_REACT_APP_CLERK_PUBLISHABLE_KEY;

const Index = () => {

  return (
    <>
      <div className='overflow-hidden'>
        <BrowserRouter>
          <ClerkProvider publishableKey={clerkPubKey} >
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