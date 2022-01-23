import {createResource, Suspense, For} from "solid-js";
import {getZettelkastenList} from "../../api/zettelkasten";
import Spinner from "../../components/Spinner";
import Zettelkasten from "../../components/Zettelkasten";
import {Col, Container, Modal, Row} from "solid-bootstrap";


function MainPage(props) {
    const [zettelkastenList] = createResource(getZettelkastenList);

    return (
        <Container>
            {zettelkastenList.loading &&
                <Row className="justify-content-center">
                    <Spinner/>
                </Row>
            }
            <Row className="justify-content-center">
                <For each={zettelkastenList()}>{(zettelkasten, i) =>
                    <Zettelkasten
                        className="align-self-auto"
                        {...zettelkasten}
                    />
                }</For>
            </Row>
        </Container>
    );
}

export default MainPage;