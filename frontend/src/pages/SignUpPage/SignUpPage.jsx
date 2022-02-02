import {createStore} from "solid-js/store";
import {Button, Form} from "solid-bootstrap";
import {AuthService} from "../../services/AuthService";
import Spinner from "../../components/Spinner";


function SignUpPage() {
    let usernameRef, emailRef, passwordRef, repeatPasswordRef;
    const [request, setRequest] = createStore({
        loading: false, error: false, data: null,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = usernameRef.lastChild.value,
            email = emailRef.lastChild.value,
            password = passwordRef.lastChild.value,
            repeatPassword = repeatPasswordRef.lastChild.value;

        if (password !== repeatPassword) {
            setRequest("error", "Passwords don't match");
            return;
        }

        setRequest("loading", true);
        AuthService.register(username, email, password)
            .then(res => {
                setRequest({
                    data: res.data,
                    loading: false,
                    error: false
                });
            })
            .catch(err => {
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
                <Form.Group className="mb-3" ref={usernameRef}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"/>
                </Form.Group>

                <Form.Group className="mb-3" ref={emailRef}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3" ref={passwordRef}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>

                <Form.Group className="mb-3" ref={repeatPasswordRef}>
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>

                <Button className="mb-3" variant="primary" type="submit">Sign up</Button>
                <Button role="link" href="/login" className="mb-3"
                        variant="outline-primary" type="submit">Sign in</Button>
            </Form>

            {request.loading && <Spinner className="mt-3"/>}
            {request.data &&
                <div>
                    <pre>{JSON.stringify(request.data)}</pre>
                </div>
            }
            {request.error &&
                <p> {request.error} </p>
            }
        </div>
    );
}

export default SignUpPage;
