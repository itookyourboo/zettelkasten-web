import ZettelTreeView from "../ZettelTreeView";
import Spinner from "../Spinner";
import {Button, Col, Nav, Tab} from "solid-bootstrap";
import {createSignal, Show} from "solid-js";
import {BiSolidFolder} from "solid-icons/bi";


const StaticSideBar = ({active, setActive}) => {
    return (
        <div class="p-2 border-end">
            <BiSolidFolder
                size={24}
                onClick={() => setActive(v => !v)}/>
        </div>
    )
}

const ActiveSideBar = ({data}) => {
    return (
        <div style={{
            "min-width": "250px",
            "max-width": "250px",
        }} class="d-flex border-end">
            <Show when={data()} fallback={
                <Spinner/>
            }>
                <ZettelTreeView json={data()}/>
            </Show>
        </div>
    )
}

const ZettelkastenSideBar = ({defaultActive, data}) => {
    const [active, setActive] = createSignal(defaultActive);

    return (
        <nav class="d-flex" style={{
            "height": "100%"
        }}>
            <StaticSideBar active={active} setActive={setActive}/>
            <Show when={active()}>
                <ActiveSideBar data={data}/>
            </Show>
        </nav>
    )
}

export default ZettelkastenSideBar;