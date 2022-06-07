import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/home";
import LoginScreen from "./screens/login";
import PrivateRoute from "./components/PrivateRoute";
import Screens from "./constants/screens";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <HomeScreen />
                        </PrivateRoute>
                    }
                />

                <Route
                    path={Screens.HOME}
                    element={
                        <PrivateRoute>
                            <HomeScreen />
                        </PrivateRoute>
                    }
                />

                <Route path={Screens.LOGIN} element={<LoginScreen />} />

                <Route
                    path="*"
                    element={
                        <div className="d-flex w-100 min-vh-100 justify-content-center align-items-center">
                            <h1>404 | Page Not Found</h1>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;