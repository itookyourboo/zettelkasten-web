import api from "./axiosInstance";
import {setStore, store} from "../state/store";
import TokenManager from "./TokenManager";

const AuthService = {
    authenticate(email, password) {
        return api.post("login", {email, password})
            .then(res => {
                let { data, status } = res;
                setStore('profile', {email});
                TokenManager.saveToken(data.token);
                return { data, status };
            })
            .catch(err => {
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
                let { data, status } = res;
                TokenManager.saveToken(data.token);
                return { data, status };
            })
            .catch(err => {
                if (err?.response.status === 400) {
                    err.response.data = "Something is invalid";
                    throw Error(err.response.data);
                }
                return { data: "Something went wrong" }
            });
    },

    signOut() {
        TokenManager.deleteToken();
        setStore('profile', 'is_authenticated', false);
    }
}

export {AuthService};