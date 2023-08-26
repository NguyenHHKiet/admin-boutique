import { useState, useCallback } from "react";
import axios from "axios";

const useAxios = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    // call API method
    const sendRequest = useCallback(
        async ({ method = "get", url, body = {}, headers = {} }, applyData) => {
            setIsLoading(true);
            setError(null);
            try {
                // axios[method](url, body, headers).then((response) => {
                //     console.log(response);
                // });
                const response = await axios[method](url, body, headers);
                const data = await response.data;

                // if (response.status !== 200 || response.status !== 201) {
                //     throw json(
                //         { message: "Could not fetch list of products." },
                //         { status: 500 }
                //     );
                // }

                // create new data object
                setResponse(data);
                applyData(data);
            } catch (error) {
                setError(error.message || "Something went wrong!!");
                return error;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    return { response, isLoading, error, sendRequest };
};

export default useAxios;
