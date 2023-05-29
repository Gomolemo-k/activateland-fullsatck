import ShowFormProject from "./show.form.jsx";

function ShowProject(currentUser) {
    return (
        <ShowFormProject disabled={true} currentUser={currentUser} />
    );
}

export default ShowProject;