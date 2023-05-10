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
import { REACT_APP_CLERK_PUBLISHABLE_KEY } from "../../../../env.js";

// CREATE USER AFTER SIGNUP

const handleSubmit = async (e) => {
    const { userId, sessionId, getToken } = useAuth();
    const { isLoaded, isSignedIn, user } = useUser();
    if (!isLoaded || !isSignedIn) {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const data = {
                email: user.primaryEmailAddress,
                password: "",
            }
            const { data: res } = await axios.post(url, data);
            //navigate("/login");
            console.log(res.message);
            window.location = "/dashboard";
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }
};

// CLERK SOO

const clerkPubKey = REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!clerkPubKey) {
    throw new Error("Missing Publishable Key")
}

function PublicPage() {
    navigate('/');
}

function ProtectedPage() {
    //Register User.
    handleSubmit;

    return (
        <>
        <h1>Protected page</h1>
        <UserButton />
        </>
    );
}

function ClerkProviderWithRoutes() {
const navigate = useNavigate();

return (
    <ClerkProvider
    publishableKey={clerkPubKey}
    navigate={(to) => navigate(to)}
    >
        <Routes>
            <Route path="/" element={<PublicPage />} />
            <Route
            path="/login/*"
            element={<SignIn routing="path" path="/login" redirectUrl='dashboard' />}
            />
            <Route
            path="/signup/*"
            element={<SignUp routing="path" path="/signup" redirectUrl='dashboard' />}
            />
            <Route
            path="/protected"
            element={
            <>
                <SignedIn>
                    <ProtectedPage />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
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