import {
    List,
    ListItem,
    ListItemButton,
    Typography,
} from "@mui/material"
import {
    FlagRounded as FlagsIcon,
    HomeRounded as HomeIcon,
    PersonRounded as PersonIcon,
    TodayRounded as TodayIcon,
} from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import Constants from "src/constants"
import Screens from "src/constants/screens"
import Strings from "src/constants/strings"


const MainHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const menu = [
        {
            name: Strings.Common.HOME,
            screenPath: Screens.HOME
        },
        {
            name: Strings.Report.TITLE,
            screenPath: Screens.REPORT
        },
        {
            name: Strings.Absence.TITLE,
            screenPath: Screens.ABSENSE
        },
        {
            name: Strings.Account.TITLE,
            screenPath: Screens.ACCOUNT
        },
    ]

    const renderMenuIcon = (screenPath: string) => {
        const iconStyle = {
            marginRight: 26,
            color: Constants.Styles.WHITE_COLOR,
            fontSize: 22
        }

        if (screenPath === Screens.HOME) {
            return <HomeIcon style={iconStyle} />
        }
        if (screenPath === Screens.REPORT) {
            return <TodayIcon style={iconStyle} />
        }
        if (screenPath === Screens.ABSENSE) {
            return <FlagsIcon style={iconStyle} />
        }
        if (screenPath === Screens.ACCOUNT) {
            return <PersonIcon style={iconStyle} />
        }
    }

    return (
        <List>
            {menu.map((menuItem, index) => (
                <ListItem
                    key={index.toString()}
                    disableGutters
                    disablePadding
                    className="py-1"
                    style={
                        location.pathname.includes(menuItem.screenPath) ? ({
                            borderLeftStyle: "solid",
                            borderLeftWidth: 3,
                            borderColor: "#256ae8",
                            backgroundColor: "#0f2c60"
                        }) : (undefined)
                    }
                >
                    <ListItemButton onClick={() => navigate(menuItem.screenPath)}>
                        <div className="d-flex justify-content-center align-items-center">
                            {renderMenuIcon(menuItem.screenPath)}
                            <Typography
                                textAlign="center"
                                style={{
                                    color: Constants.Styles.WHITE_COLOR,
                                    fontSize: Constants.Styles.FONT_SIZE_MEDIUM,
                                }}
                            >
                                {menuItem.name}
                            </Typography>
                        </div>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}

export default MainHeader