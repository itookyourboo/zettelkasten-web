import {useNavigate} from "solid-app-router";
import {ZettelService} from "../../services/ZettelService";
import {createResource} from "solid-js";
import {store} from "../../state/store";
import ZettelkastenSideBar from "../../components/ZettelkastenSideBar";

function MainPage(props) {
    const navigate = useNavigate();

    if (!store.profile.is_authenticated)
        navigate('/login', { replace: true })

    const [data] = createResource(ZettelService.loadKastenTree);

    return (
        <div style={{
            display: "flex",
            width: "100%",
            "align-items": "stretch"
        }}>
            <ZettelkastenSideBar
                data={data}
                defaultActive={true}/>
        </div>
    );
}

export default MainPage;