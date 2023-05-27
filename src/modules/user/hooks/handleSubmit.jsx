import axios from "axios";

// Create user after signup

export async function handleSubmit(emailClerk, passwordClerk) {
    console.log('Init handleSubmit')
    try {
        const url = "http://localhost:3001/api/users";
        const data = {
            email: emailClerk,
            password: passwordClerk,
        };
        const { data: res } = await axios.get(url);
        //Save User Id in Local Storage
        console.log('res.body._id: ', res.body._id);
        if (res.body._id) {
            localStorage.setItem('userId', res.body._id);
        } else {
            console.log('UserId cannot be saved in local storage.');
        }

        //navigate("/login");
        //console.log(res.message);
        window.location = "/dashboard";
    } catch (error) {
        console.log(error);
        if (error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500) {
            setError(error.response.data.message);
        }
    }
}
