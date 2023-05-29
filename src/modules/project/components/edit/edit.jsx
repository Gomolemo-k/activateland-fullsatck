import EditFormProject from "./edit.form.jsx";

function EditProject(currentUser) {
    return (
        <EditFormProject disabled={false} currentUser={currentUser} />
    );
}

export default EditProject;