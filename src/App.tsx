import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/home";
import LoginScreen from "./screens/login";
import PrivateRoute from "./components/PrivateRoute";
import Screens from "./constants/screens";
import MainLayout from "./components/MainLayout";
import ReportScreen from "./screens/report";
import AbsenseScreen from "./screens/absense";
import AccountScreen from "./screens/account";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <HomeScreen />
                            </MainLayout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path={Screens.HOME}
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <HomeScreen />
                            </MainLayout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path={Screens.REPORT}
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <ReportScreen />
                            </MainLayout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path={Screens.ABSENSE}
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <AbsenseScreen />
                            </MainLayout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path={Screens.ACCOUNT}
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <AccountScreen />
                            </MainLayout>
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