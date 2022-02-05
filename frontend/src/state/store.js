import {createStore} from "solid-js/store";
import {createResource} from "solid-js";

const [store, setStore] = createStore({
    profile: {
        username: null,
        email: null,
        is_authenticated: !!localStorage.getItem('token')
    },
    content : {
        tabs: []
    }
});

export {store, setStore};