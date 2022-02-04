import TreeView from "../TreeView";
import Spinner from "../Spinner";
import {Button} from "solid-bootstrap";
import {createSignal} from "solid-js";


const StaticSideBar = ({setActive}) => {
    return (
        <div>
            <Button onClick={() => setActive(v => !v)}>=</Button>
        </div>
    )
}

const ActiveSideBar = ({data}) => {
    return (
        <div style={{
            "min-width": "250px",
            "max-width": "250px",
            "padding-left": "10px",
        }} class="d-flex">
            {
                data.loading ? (
                    <Spinner/>
                ) : (
                    <TreeView json={data()}/>
                )
            }
        </div>
    )
}

const ZettelkastenSideBar = ({defaultActive, data}) => {
    const [active, setActive] = createSignal(defaultActive);

    return (
        <nav class="d-flex" style={{
            "height": "100%",
            "border-right": "1px solid #dee2e6"
        }}>
            <StaticSideBar setActive={setActive}/>
            {active() && <ActiveSideBar data={data}/>}
        </nav>
    )
}

export default ZettelkastenSideBar;