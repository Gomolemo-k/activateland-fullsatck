import FormUserProfile from "./show.form.jsx";

function ShowUserProfile(currentUser) {
    return (
        <FormUserProfile disabled={true} currentUser={currentUser} />
    );
}

export default ShowUserProfile;