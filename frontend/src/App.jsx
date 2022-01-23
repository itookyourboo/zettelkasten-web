import BaseLayout from "./containers/BaseLayout/BaseLayout";
import {lazy} from "solid-js";
import {useRoutes, Router} from "solid-app-router";

const routes = [
    {
        path: "/sign_in",
        component: lazy(() => import("./pages/SignInPage"))
    },
    {
        path: "/sign_up",
        component: lazy(() => import("./pages/SignInPage"))
    },
    {
        path: "/sign_out",
        component: lazy(() => import("./pages/SignInPage"))
    },
    {
        path: "/:id",
        component: lazy(() => import("./pages/ZettelkastenPage"))
    },
    {
        path: "/",
        component: lazy(() => import("./pages/MainPage"))
    }
]

const anon_routes = [
    {
        path: "/sign_in",
        component: lazy(() => import("./pages/SignInPage")),
    },
    {
        path: "/",
        component: lazy(() => import("./pages/MainPage"))
    }
]

function App() {


    const Routes = useRoutes(routes);
    const Anonymous = useRoutes()
    return (
        <Router>
            <BaseLayout>
                <Routes/>
                {/*<MainPage/>*/}
            </BaseLayout>
        </Router>
    );
}

export default App;
