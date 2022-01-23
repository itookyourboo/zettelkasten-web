import {useNavigate, useParams} from "solid-app-router";
import {createEffect, createResource, Suspense, ErrorBoundary} from "solid-js";
import getZettelkastenData from "../../api/zettelkasten/getZettelkastenData";
import Spinner from "../../components/Spinner";
import {Alert} from "solid-bootstrap";

function ZettelkastenPage() {
    const params = useParams();
    const navigate = useNavigate();

    const [data] = createResource(() => params.id, getZettelkastenData)

    return (
        <>
            <ErrorBoundary fallback={err =>
                <Alert variant="danger">
                    Error :( <br/> {err}
                </Alert>
            }>
                <Suspense fallback={<Spinner/>}>
                    <pre>{JSON.stringify(data(), null, 2)}</pre>
                </Suspense>
            </ErrorBoundary>
        </>
    );
}

export default ZettelkastenPage;