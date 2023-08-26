import axios from "axios";
import { defer } from "react-router-dom";

export async function tokenCSRF() {
    try {
        const response = await axios.get("/auth/getCSRFToken");
        const data = await response.data;
        axios.defaults.headers["csrf-token"] = data.csrfToken;
        return defer(data);
    } catch (error) {
        console.log(error);
        return error;
    }
}
