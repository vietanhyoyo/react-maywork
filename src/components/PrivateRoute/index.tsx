import { Navigate, useLocation } from "react-router-dom"
import Helpers from "src/commons/helpers"
import Screens from "src/constants/screens"

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isLoggedIn = Helpers.isLoggedIn();
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to={Screens.LOGIN} state={{ from: location }} />
    }

    return children;
}

export default PrivateRoute