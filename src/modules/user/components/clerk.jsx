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
import { ProtectedPage, PublicPage } from "./ProtectedPage.jsx";

const clerkPubKey = await import.meta.env.PUBLIC_REACT_APP_CLERK_PUBLISHABLE_KEY;

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