import { useUser } from "@clerk/clerk-react";
import { handleSubmit } from "../hooks/handleSubmit";

export function PublicPage() {
    //navigate('/');
}

export function ProtectedPage() {
    let pathTo = "/";
    //Register User.
    const { isLoaded, isSignedIn, user } = useUser();
    //console.log('user.', user)
    const email = user.primaryEmailAddress.emailAddress;
    if (isLoaded && isSignedIn && email) {
        console.log('Init handle submit user.');
        handleSubmit(email, '');
        pathTo = "/dashboard";
    }
    window.location = pathTo;
}
