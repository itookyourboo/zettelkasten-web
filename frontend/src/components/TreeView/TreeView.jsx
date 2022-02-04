import {For} from 'solid-js'
import ZettelItem from "../ZettelItem";
import KastenItem from "../KastenItem";

const SubTree = ({json, depth = 0}) => {
    return (
        <>
            <KastenItem json={json} depth={depth}/>
            <For each={json.kastens}>
                {kasten =>
                    <SubTree
                        json={kasten}
                        depth={depth + 1}/>
                }
            </For>
            <For each={json.zettels}>
                {zettel => <ZettelItem json={zettel} depth={depth + 1}/>}
            </For>
        </>

    )
}

const TreeView = ({json}) => {
    return (
        <ul class="list-group ps-3">
            <SubTree json={json} />
        </ul>
    )
}

export default TreeView;