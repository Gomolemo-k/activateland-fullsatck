import { useState } from "react";
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    SignIn,
    SignUp,
    UserButton,
    useAuth  } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// TODO: Improve get .env variables.
import { REACT_APP_CLERK_PUBLISHABLE_KEY } from "../../../assets/js/user/clerk.js";
import { ProtectedPage, PublicPage } from "./ProtectedPage.jsx";

function ClerkProviderWithRoutes() {
const navigate = useNavigate();

return (
    <ClerkProvider
    publishableKey={REACT_APP_CLERK_PUBLISHABLE_KEY}
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