const getSuspender = (promise: { then: (arg0: (res: any) => void,arg1: (err: any) => void) => any; }) => {
  let status = "pending";
  let response: any;

  const suspender = promise.then(
    (res: any) => {
      status = "success";
      response = res;
    },
    (err: any) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
};


  
// export async function fetchData(url: RequestInfo|URL, method: string = "GET", body?: any) {
//   const fetchBody = body ? body : null;
  
//   const promise = await fetch(url, 
//     {   method: method, 
//         body: fetchBody, 
//     })
//     .then((response: { json: () => any; }) => response.json())
//     .then((json: any) => json);

//   return getSuspender(promise);
// }

export async function fetchData(url: RequestInfo|URL, method: string = "GET", body?: any) {
  try {
    const data = (method === "GET" || method === "HEAD") ? null : JSON.stringify(body);
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const result = await response.json();
    // console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}