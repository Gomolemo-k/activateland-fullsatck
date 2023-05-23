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


  
export function fetchData(url: RequestInfo|URL, method: string = "GET", body?: any) {
  const fetchBody = body ? body.json() : null;
  
  const promise = fetch(url, 
    {   method: method, 
        body: fetchBody, 
    })
    .then((response: { json: () => any; }) => response.json())
    .then((json: any) => json);

  return getSuspender(promise);
}