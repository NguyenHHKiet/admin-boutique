import axios from "axios";
import { json, redirect } from "react-router-dom";

export async function login({ request }) {
    try {
        const formRequest = await request.formData();
        const formData = new FormData();
        formData.append("email", formRequest.get("email"));
        formData.append("password", formRequest.get("password"));

        const response = await axios.post("/auth/login", formData, {
            headers: { isAdmin: true, "Content-Type": "application/json" },
        });
        const data = await response.data;
        if (response.status !== 200) {
            throw json(
                { message: "Could not fetch list of products." },
                { status: 500 }
            );
        }
        if (response.status === 200) {
            // Authorization: Bearer <token>
            axios.defaults.headers["Authorization"] = "Bearer " + data.token;
            // create a expiration
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 2);
            localStorage.setItem("expiration", expiration.toISOString());
            // updated local
            localStorage.setItem("message", JSON.stringify(data.message));
            localStorage.setItem("token", JSON.stringify(data));
            return redirect("/");
        }

        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}
