import api from "./axiosInstance";
import {AuthService} from "./AuthService";


const ZettelService = {
    loadKastenTree() {
        return api.get(`kastens/load`, {
            headers: AuthService.getTokenHeader()
        }).then(res => res.data)
    }
}

export {ZettelService};