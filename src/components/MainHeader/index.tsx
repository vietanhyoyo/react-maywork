import {
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material"
import {
    FlagRounded as FlagsIcon,
    HomeRounded as HomeIcon,
    Menu as MenuIcon,
    PersonRounded as PersonIcon,
    TodayRounded as TodayIcon,
} from "@mui/icons-material"
import { styled } from "@mui/system";
import { nanoid } from "nanoid"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import Logo from "src/assets/logo.png"
import Screens from "src/constants/screens"
import Constants from "src/constants"

const StyledButton = styled(Button)({
    borderRadius: 0,
    marginRight: 10,
    paddingBottom: 3,

    color: Constants.Styles.LIGHT_BLUE_COLOR,
    fontWeight: "bold",
    fontSize: Constants.Styles.FONT_SIZE_DEFAULT,

    borderStyle: "solid",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
    "&:hover": {
        borderBottomColor: Constants.Styles.BLUE_COLOR,
        color: Constants.Styles.BLUE_COLOR,
    }
});

const StyledMenuItem = styled(MenuItem)({
    color: Constants.Styles.LIGHT_BLUE_COLOR,
    fontSize: Constants.Styles.FONT_SIZE_DEFAULT,
    fontWeight: "bold",
    "&:hover": {
        color: Constants.Styles.BLUE_COLOR,
    }
})

const MainHeader = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const navigate = useNavigate()
    const menu = [
        {
            key: nanoid(),
            name: "Trang chủ",
            screenPath: Screens.HOME
        },
        {
            key: nanoid(),
            name: "Báo cáo",
            screenPath: Screens.REPORT
        },
        {
            key: nanoid(),
            name: "Nghỉ phép",
            screenPath: Screens.ABSENSE
        },
        {
            key: nanoid(),
            name: "Tài khoản",
            screenPath: Screens.ACCOUNT
        },
    ]

    const renderMenuIcon = (screenPath: string) => {
        const iconSize = "small"
        if (screenPath === Screens.HOME) {
            return <HomeIcon fontSize={iconSize} sx={{ marginRight: 0.3 }} />
        }
        if (screenPath === Screens.REPORT) {
            return <TodayIcon fontSize={iconSize} sx={{ marginRight: 0.6 }} />
        }
        if (screenPath === Screens.ABSENSE) {
            return <FlagsIcon fontSize={iconSize} sx={{ marginRight: 0.6 }} />
        }
        if (screenPath === Screens.ACCOUNT) {
            return <PersonIcon fontSize={iconSize} sx={{ marginRight: 0.3 }} />
        }
    }

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Toolbar disableGutters variant="dense">
            <Container
                maxWidth="xl"
                style={{ padding: "0px 10px", margin: "6px 0" }}
                className="d-flex justify-content-between align-items-center"
            >
                <div
                    onClick={() => navigate(Screens.HOME)}
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        marginRight: 10,
                        cursor: "pointer",
                        backgroundColor: Constants.Styles.LIGHT_GRAY_COLOR,
                        borderRadius: "100%",
                    }}
                >
                    <img
                        style={{ maxWidth: 50, maxHeight: 50 }}
                        src={Logo}
                        alt="logo"
                    />
                    <Box sx={{ marginLeft: 1, display: { xs: "block", md: "none" } }}>
                        <Typography
                            textAlign="center"
                            style={{
                                color: "#DC1354",
                                fontWeight: "bold",
                                fontSize: Constants.Styles.FONT_SIZE_LARGE,
                            }}
                        >
                            Maywork
                        </Typography>
                    </Box>
                </div>
                
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    {menu.map((menuItem) => (
                        <StyledButton
                            key={menuItem.key}
                            disableRipple
                            onClick={() => navigate(menuItem.screenPath)}
                        >
                            <div className="d-flex justify-content-center">
                                {renderMenuIcon(menuItem.screenPath)}
                                <Typography
                                    textAlign="center"
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: Constants.Styles.FONT_SIZE_DEFAULT
                                    }}
                                >
                                    {menuItem.name}
                                </Typography>
                            </div>
                        </StyledButton>
                    ))}
                </Box>

                <Box sx={{ display: { xs: "block", md: "none" } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        style={{
                            color: Constants.Styles.LIGHT_BLUE_COLOR,
                            fontWeight: "bold",
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id={nanoid()}
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: "block", md: "none" } }}
                    >
                        {menu.map((menuItem) => (
                            <StyledMenuItem
                                key={menuItem.key}
                                disableRipple
                                onClick={() => navigate(menuItem.screenPath)}
                            >
                                <div className="d-flex justify-content-center">
                                    {renderMenuIcon(menuItem.screenPath)}
                                    <Typography
                                        textAlign="center"
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: Constants.Styles.FONT_SIZE_DEFAULT,
                                        }}
                                    >
                                        {menuItem.name}
                                    </Typography>
                                </div>
                            </StyledMenuItem>
                        ))}
                    </Menu>
               </Box>
            </Container>
        </Toolbar >
    )
}

export default MainHeader