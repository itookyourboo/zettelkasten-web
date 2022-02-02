function Header({title, children, ...rest}) {
    return (
        <header
            class="d-flex flex-wrap align-items-center justify-content-md-between p-3 mb-4 border-bottom"
            {...rest}>
            <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <span class="fs-4">{title}</span>
            </a>

            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="#" class="nav-link px-2 link-secondary">Home</a></li>
                <li><a href="#" class="nav-link px-2 link-dark">Features</a></li>
                <li><a href="#" class="nav-link px-2 link-dark">Pricing</a></li>
                <li><a href="#" class="nav-link px-2 link-dark">FAQs</a></li>
                <li><a href="#" class="nav-link px-2 link-dark">About</a></li>
            </ul>

            <div class="col-md-3 text-end">
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
            </div>
        </header>
    );
}

export default Header;