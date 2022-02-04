import {AuthService} from "../../services/AuthService";
import {store} from "../../state/store";
import {Button} from "solid-bootstrap";
import {useNavigate} from "solid-app-router";

function Header({title, children, ...rest}) {
    const navigate = useNavigate();

    const handleSignOut = () => {
        AuthService.signOut();
        navigate('/login', { replace: true });
    }

    return (
        <header
            class="d-flex flex-wrap align-items-center justify-content-md-between p-3 border-bottom"
            {...rest}>

            <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <span class="fs-4">{title}</span>
            </a>

            <div class="col-md-3 text-end">
                { !store.profile.is_authenticated ? (
                    <>
                        <a
                            class="btn btn-outline-primary me-2"
                            role="button"
                            href="/login"
                        >Sign in</a>
                        <a
                            class="btn btn-primary"
                            role="button"
                            href="/register"
                        >Sign up</a>
                    </>
                ) : (
                    <Button variant="outline-primary"
                            onClick={handleSignOut}
                    >Sign out</Button>
                )}

            </div>
        </header>
    );
}

export default Header;