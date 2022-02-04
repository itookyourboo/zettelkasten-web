import api from "./axiosInstance";
import {setStore} from "../state/store";
import {produce} from "solid-js/store";


const ZettelService = {
    loadKastenTree() {
        return api.get(`kastens/load`)
            .then(res => res.data)
    },

    loadZettelDataToStore(zettel) {
        setStore(
            produce(s => {
                const current = s.content.currentZettel;
                current.selected = zettel;
                current.loading = true;
                ZettelService.loadZettel(zettel.kastenId, zettel.id)
                    .then(res => {
                        current.data = res;
                        current.error = null;
                    })
                    .catch(err => current.error = err)
                    .finally(() => current.loading = false);
            })
        );
    },

    loadZettel(kastenId, zettelId) {
        return api.get(`kastens/${kastenId}/zettels/${zettelId}`)
            .then(res => res.data)
    },
}

export {ZettelService};