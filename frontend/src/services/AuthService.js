import {createResource} from "solid-js";
import api from "./axiosInstance";

const AuthService = {
    saveToken(token) {
        localStorage.setItem('token', token);
    },

    getToken() {
        return localStorage.getItem('token');
    },

    authenticate(email, password) {
        return api.post("login", {email, password})
            .then(res => {
                console.log("OTVET");
                let { data, status } = res;
                this.saveToken(res.data.token);
                return { data, status };
            })
            .catch(err => {
                console.log("ERROR");
                if (err?.response.status === 400) {
                    err.response.data = "Incorrect email or password";
                    throw Error(err.response.data);
                }
                return { data: "Something went wrong" }
            });
    },

    register(username, email, password) {
        return api.post("registration", {username, email, password})
            .then(res => {
                console.log("OTVET");
                let { data, status } = res;
                this.saveToken(res.data.token);
                return { data, status };
            })
            .catch(err => {
                console.log("ERROR");
                if (err?.response.status === 400) {
                    err.response.data = "Something is invalid";
                    throw Error(err.response.data);
                }
                return { data: "Something went wrong" }
            });
    }
}

const UserData = ({params, location, navigate}) => {
    const [user] = createResource(AuthService.authenticate);

    return user;
}

export {UserData};
export {AuthService};