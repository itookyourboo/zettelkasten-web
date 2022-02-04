import {useNavigate} from "solid-app-router";
import {ZettelService} from "../../services/ZettelService";
import {createResource, Show} from "solid-js";
import {store} from "../../state/store";
import ZettelkastenSideBar from "../../components/ZettelkastenSideBar";
import Spinner from "../../components/Spinner";

function MainPage(props) {
    const navigate = useNavigate();

    if (!store.profile.is_authenticated)
        navigate('/login', {replace: true})

    const [zettelkastenData] = createResource(ZettelService.loadKastenTree);
    const currentZettel = store.content.currentZettel;

    return (
        <div style={{
            display: "flex",
            width: "100%",
            "align-items": "stretch"
        }}>
            <ZettelkastenSideBar
                data={zettelkastenData}
                defaultActive={true}/>

            <div>
                {
                    currentZettel.loading ? (
                        <Spinner/>
                    ) : (
                        currentZettel.error ? (
                            <span> {currentZettel.error} </span>
                        ) : (
                            <Show when={currentZettel.data}>
                                <pre>{JSON.stringify(currentZettel.data, null, 2)}</pre>
                            </Show>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default MainPage;