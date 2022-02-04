import {ListGroupItem} from "solid-bootstrap";
import {BiNote} from "solid-icons/bi";

const ZettelItem = ({json, depth, ...rest}) => {
    return (
        <ListGroupItem
            action
            style={{
                "padding-left": `${depth}em`
            }}
            {...rest}>
            <div class="d-flex align-items-center">
                <BiNote
                    size={16}
                    class="me-1"/>
                <span>
                    {json.title}
                </span>
            </div>
        </ListGroupItem>
    )
}

export default ZettelItem;