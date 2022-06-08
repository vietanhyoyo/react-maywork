import { AppBar } from "@mui/material"
import Constants from "src/constants"
import MainHeader from "../MainHeader"

const MainLayout = ({ children }: { children: JSX.Element }) => {
    return (
        <div className="w-100">
            <AppBar
                position="sticky"
                elevation={3}
                style={{
                    margin: "auto",
                    marginTop: "0.8%",
                    width: "98.2%",
                    borderRadius: Constants.Styles.BOX_BORDER_RADIUS,
                    backgroundColor: Constants.Styles.LIGHT_GRAY_COLOR
                }}
            >
                <MainHeader />
            </AppBar>

            <main style={{ width: "100%", marginTop: 24 }}>
                {children}
            </main>
        </div>
    )
}

export default MainLayout