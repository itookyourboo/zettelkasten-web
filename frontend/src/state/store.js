import {createStore} from "solid-js/store";

const [store, setStore] = createStore({
    profile: {
        username: null,
        email: null,
        is_authenticated: !!localStorage.getItem('token')
    },
    content : {
        currentZettel: {
            selected: null,
            data: null,
            loading: false,
            error: null
        },
    }
});

export {store, setStore};