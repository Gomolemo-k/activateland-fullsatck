import { useState } from "react";
import axios from "axios";
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
import { REACT_APP_CLERK_PUBLISHABLE_KEY } from "../../../assets/js/user/clerk.js";

// Create user after signup
export async function handleSubmit(emailClerk, passwordClerk) {
    //console.log('Init handleSubmit')
    try {
        const url = "http://localhost:3001/api/users";
        const data = {
            email: emailClerk,
            password: passwordClerk,
        }
        const { data: res } = await axios.get(url);
        //Save User Id in Local Storage
        if (res.id) {
            localStorage.setItem('themeMode', res.id);
        } else {
            console.log('UserId cannot save in local storage.');
        }
        
        //navigate("/login");
        //console.log(res.message);
        window.location = "/dashboard";
    } catch (error) {
        console.log(error);
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
            setError(error.response.data.message);
        }
    }
}

// CLERK SOO
const clerkPubKey = REACT_APP_CLERK_PUBLISHABLE_KEY;

function PublicPage() {
    //navigate('/');
}

function ProtectedPage() {
    let pathTo = "/";
    //Register User.
    const { isLoaded, isSignedIn, user } = useUser();
    //console.log('user.', user)
    const email = user.primaryEmailAddress.emailAddress;
    if (isLoaded && isSignedIn && email) {
        console.log('Init handle submit user.')
        handleSubmit(email, '');
        pathTo = "/dashboard"
    }
    window.location = pathTo;
}

function ClerkProviderWithRoutes() {
const navigate = useNavigate();

return (
    <ClerkProvider
    publishableKey={clerkPubKey}
    navigate={(to) => navigate(to)}
    >
        <Routes>
            {/* <Route path="/" element={<PublicPage />} /> */}
            <Route
            path="/login/*"
            element={<SignIn routing="path" path="/login" redirectUrl='/dashboard' />}
            />
            <Route
            path="/signup/*"
            element={<SignUp routing="path" path="/signup" redirectUrl='/dashboard' />}
            />
            <Route
            path="/*"
            element={
            <>
                <SignedIn>
                    <ProtectedPage />
                </SignedIn>
                <SignedOut>
                    <PublicPage routing="path" path="/" redirectUrl='/' />
                </SignedOut>
            </>
            }
            />
        </Routes>
    </ClerkProvider>
);
}

function Clerk() {
return (
    <BrowserRouter>
        <ClerkProviderWithRoutes />
    </BrowserRouter>
);
}

export default Clerk;