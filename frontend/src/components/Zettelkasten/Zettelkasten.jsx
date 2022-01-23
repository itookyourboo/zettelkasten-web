import {Button, Card} from "solid-bootstrap";
import {Link} from "solid-app-router"

const SIZE_MIN = "max(240px, 30vh)"
const SIZE_VW = "30vw"
const SIZE_MAX = "min(360px, 30vh)"

function Zettelkasten({id, title, description, ...rest}) {
    return (
        <Card
            border="secondary"
            className="m-2"
            style={{
                "width": SIZE_VW,
                "min-width": SIZE_MIN,
                "max-width": SIZE_MAX,
                "height": SIZE_VW,
                "min-height": SIZE_MIN,
                "max-height": SIZE_MAX,
            }}>
            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <Card.Title className="pb-2 border-bottom">
                        { title }
                    </Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </div>
                <Link class="d-inline-block" href={`/${id}`} role="button">
                    <Button style={{width: "100%"}} variant="primary">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Zettelkasten;
