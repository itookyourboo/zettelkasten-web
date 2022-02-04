import {createSignal, For, Show} from 'solid-js'
import ZettelItem from "../ZettelItem";
import KastenItem from "../KastenItem";
import {ListGroup} from "solid-bootstrap";
import {ZettelService} from "../../services/ZettelService";
import {setStore} from "../../state/store";
import {produce} from "solid-js/store";

const SubTree = ({json, depth = 1}) => {
    const [expand, setExpand] = createSignal(false);

    return (
        <>
            <KastenItem
                json={json}
                depth={depth}
                expand={expand}
                onClick={() => setExpand(v => !v)}/>
            <Show when={expand()}>
                <For each={json.kastens}>
                    {kasten =>
                        <SubTree
                            json={kasten}
                            depth={depth + 1}/>
                    }
                </For>
                <For each={json.zettels}>
                    {zettel => (
                        <ZettelItem
                            json={zettel}
                            depth={depth + 1}
                            onClick={() => {
                                zettel.kastenId = json.id;
                                ZettelService.loadZettelDataToStore(zettel);
                            }}/>
                    )}
                </For>
            </Show>
        </>

    )
}

const ZettelTreeView = ({json}) => {
    return (
        <ListGroup style={{
            "width": "100%"
        }} variant="flush">
            <SubTree json={json} />
        </ListGroup>
    )
}

export default ZettelTreeView;