import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    SignIn,
    SignUp,
    UserButton,
  } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// TODO: Improve get .env variables.
import { REACT_APP_CLERK_PUBLISHABLE_KEY } from "../../../../env.js";

const clerkPubKey = REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!clerkPubKey) {
throw new Error("Missing Publishable Key")
}

function PublicPage() {
return (
    <>
    <h1>Public page</h1>
    <a href="/protected">Go to protected page</a>
    </>
);
}

function ProtectedPage() {
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
            element={<SignIn routing="path" path="/login" />}
            />
            <Route
            path="/signup/*"
            element={<SignUp routing="path" path="/signup" />}
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