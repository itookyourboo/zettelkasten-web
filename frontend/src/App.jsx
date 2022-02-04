import BaseLayout from "./containers/BaseLayout/BaseLayout";
import {lazy} from "solid-js";
import {Routes, Router, Route} from "solid-app-router";

const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const MainPage = lazy(() => import("./pages/MainPage"));

function App() {
    return (
        <Router>
            <BaseLayout>
                <Routes>
                    <Route path="/register" element={<SignUpPage/>} />
                    <Route path="/login" element={<SignInPage/>} />
                    <Route path="/z" element={<MainPage/>}/>
                    <Route path="/" element={<HomePage/>} />
                </Routes>
            </BaseLayout>
        </Router>
    );
}

export default App;
