import {ListGroupItem} from "solid-bootstrap";
import {Dynamic} from "solid-js/web";
import {BiFolder, BiFolderMinus, BiFolderPlus} from "solid-icons/bi";
import {createEffect, createRenderEffect, createSignal, lazy} from "solid-js";

const load = (icon) => () => icon;

const folders = {
    empty: load(BiFolder),
    expanded: load(BiFolderMinus),
    notExpanded: load(BiFolderPlus),
}

const KastenItem = ({json, depth, expand, ...rest}) => {
    const [icon, setIcon] = createSignal(folders.empty);

    if (json.zettels.length) {
        createEffect(() => {
            setIcon(expand() ? folders.expanded : folders.notExpanded);
        });
    }

    return (
        <ListGroupItem
            action
            style={{
                "padding-left": `${depth}em`
            }} {...rest}>
            <div class="d-flex align-items-center">
                <Dynamic component={icon()} size={16} class="me-1"/>
                <span>{json.title}</span>
            </div>
        </ListGroupItem>
    )
}

export default KastenItem;