import {UsersApiClient} from "../../api/fetch.functions";
import axios from "axios";

export async function getUserId(email: string) {
  let apiUserId;
  if (email) {
    apiUserId = await handleSubmit(email, '');
  }
  return apiUserId;
}

// Create user after signup
export async function handleSubmit(email: string, password: string) {
  let apiUserId = '';
  try {
    const response = await UsersApiClient.postApiUsers({
      email: email,
      password: password
    });
    // console.log('response: ', response);
    if (response?._id) {
      apiUserId = response._id;
    } else {
      console.log('UserId not exist!');
    }

    // await axios.post("http://localhost:3001/api/users", {
    //   email: email,
    //   password: password
    // })
    // .then((response) => {
    //   if (response.data._id) {
    //     apiUserId = response.data._id;
    //   } else {
    //     console.log('UserId not exist!');
    //   }
    // });
  } catch (error) {
    console.log(error);
  }
  // console.log('apiUserId: ', apiUserId);
  return apiUserId;
}

//Get User including references
export async function getUserReferences(userId: string) {
  let userReferences;
  if (userId) {
    userReferences = await UsersApiClient.getUserReferences(userId);
  }
  return userReferences;
}