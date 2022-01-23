function Footer({copyright, ...rest}) {
    return (
        <footer
            class="page-footer font-small indigo mt-4"
            {...rest}>
            <div class="footer-copyright text-center py-3 border-top">
                © {copyright}
            </div>
        </footer>
    );
}

export default Footer;
