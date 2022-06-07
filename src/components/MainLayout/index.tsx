import { AppBar } from "@mui/material"
import Constants from "src/constants"
import MainHeader from "../MainHeader"

const MainLayout = ({ children }: { children: JSX.Element }) => {
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center">
                <AppBar
                    position="static"
                    elevation={3}
                    style={{
                        marginTop: "0.8%",
                        width: "98.2%",
                        borderRadius: Constants.Styles.BOX_BORDER_RADIUS,
                        backgroundColor: Constants.Styles.LIGHT_GRAY_COLOR
                    }}
                >
                    <MainHeader />
                </AppBar>
            </div>

            <main style={{ width: "100%", marginTop: 24 }}>
                {children}
            </main>
        </div>
    )
}

export default MainLayout