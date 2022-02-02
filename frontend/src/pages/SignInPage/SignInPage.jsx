import {createStore} from "solid-js/store";
import {Button, Form} from "solid-bootstrap";
import {AuthService} from "../../services/AuthService";
import Spinner from "../../components/Spinner";


function SignInPage() {
    let emailRef, passwordRef;
    const [request, setRequest] = createStore({
        loading: false, error: false, data: null,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.lastChild.value, password = passwordRef.lastChild.value;

        setRequest("loading", true);
        AuthService.authenticate(email, password)
            .then(res => {
                console.log("OTVET")
                setRequest({
                    data: res.data,
                    loading: false,
                    error: false
                });
            })
            .catch(err => {
                console.log("ERROR")
                setRequest({
                    data: null,
                    error: err.message,
                    loading: false
                });
            });
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" ref={emailRef} controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3" ref={passwordRef} controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>

                <Button className="mb-3" variant="primary" type="submit">Sign in</Button>
                <Button role="link" href="/register" className="mb-3"
                        variant="outline-primary" type="submit">Sign up</Button>
            </Form>

            { request.loading && <Spinner className="mt-3" />}
            { request.data &&
                <div>
                    <pre>{ JSON.stringify(request.data) }</pre>
                </div>
            }
            { request.error &&
                <p> {request.error} </p>
            }
        </div>
    );
}

export default SignInPage;
