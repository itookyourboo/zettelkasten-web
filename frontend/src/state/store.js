import {createStore} from "solid-js/store";
import {AuthService} from "../services/AuthService";

const [store, setStore] = createStore({
    profile: {
        username: null,
        email: null,
        is_authenticated: !!localStorage.getItem('token')
    },
    content : {

    }
})

export {store, setStore};