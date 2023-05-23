import { useState, useEffect } from "react";

export function callFetch(url: string, method: string = "GET", body?: any) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [controller, setController] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        const fetchBody = body ? body.json() : null;

        fetch(url, 
            {   method: method, 
                body: fetchBody, 
                signal: abortController.signal 
            })
        .then((response: { json: () => any; }) => response.json())
        .then((json: any) => setData(json))
        .catch((error: { name: string; }) => {
            if (error.name === "AbortError") {
            console.log("Cancelled request");
            } else {
            setError(error);
            }
        })
        .finally(() => setLoading(false));

        return () => abortController.abort();
    }, []);

    const handleCancelRequest = () => {
        if (controller) {
        controller.abort();
        setError("Cancelled Request");
        }
    };

    return { data, loading, error, handleCancelRequest };
}
