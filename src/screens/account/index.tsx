import { Button } from "@mui/material"
import { useNavigate } from "react-router"
import Screens from "src/constants/screens"

const AccountScreen = () => {

    const navigate = useNavigate()
    return (<>

        <h1>ACCOUNT</h1>
        <Button variant="contained" onClick={() => {
            navigate(Screens.UPDATE_ACCOUNT)
        }}>UPDATE ACCOUNT</Button>
    </>
    )
}

export default AccountScreen;