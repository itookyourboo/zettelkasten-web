import {useNavigate} from "solid-app-router";

function MainPage(props) {
    const navigate = useNavigate();

    return (
        <h1>Главная страница</h1>
    );
}

export default MainPage;