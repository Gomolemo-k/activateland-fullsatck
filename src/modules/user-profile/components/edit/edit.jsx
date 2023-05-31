import FormUserProfile from "./edit.form.jsx";

function EditUserProfile(currentUser) {
    return (
        <FormUserProfile disabled={false} currentUser={currentUser} />
    );
}

export default EditUserProfile;