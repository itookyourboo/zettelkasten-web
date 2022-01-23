import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./BaseLayout.css";

function BaseLayout(props) {
    return (
        <>
            <Header
                title={"Zettelkasten"}/>
            <main class="container-fluid flex-fill">
                {props.children}
            </main>
            <Footer
                copyright={"2022 Copyright"}/>
        </>
    );
}

export default BaseLayout;
