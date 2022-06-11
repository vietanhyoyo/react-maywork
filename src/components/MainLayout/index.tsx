import {
    AppBar as MuiAppBar,
    Box,
    CssBaseline,
    Drawer as MuiDrawer,
    IconButton,
    ListItem,
    ListItemIcon,
    Toolbar,
    Typography,
} from "@mui/material"
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import { MenuRounded as MenuRoundedIcon } from "@mui/icons-material"
import { styled, Theme, CSSObject } from "@mui/material/styles"
import { useLocation, Outlet } from "react-router-dom"
import { useState } from "react"

import MainHeader from "src/components/MainHeader"
import Constants from "src/constants"
import Helpers from "src/commons/helpers"
import Resources from "src/commons/resources"
import Strings from "src/constants/strings"

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const MobileAppBar = styled(MuiAppBar)({
    backgroundColor: Constants.Styles.WHITE_COLOR,
});

const DesktopAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    width: `calc(100% - (${theme.spacing(8)} + 1px))`,
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: Constants.Styles.WHITE_COLOR,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const MobileDrawer = styled(MuiDrawer)({
    "& .MuiDrawer-paper": {
        overflowY: "unset",
        width: drawerWidth,
        boxSizing: "border-box",
        backgroundImage: `url(${Resources.Images.SIDEBAR_BACKGROUND})`,
        backgroundSize: "cover"
    },
});

const DesktopDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": {
                ...openedMixin(theme),
                backgroundImage: `url(${Resources.Images.SIDEBAR_BACKGROUND})`,
            },
        }),
        ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": {
                ...closedMixin(theme),
                backgroundImage: `url(${Resources.Images.SIDEBAR_BACKGROUND})`,
            },
        }),
    }),
);

interface IProps {
    window?: () => Window;
}

const MainLayout = (props: IProps) => {
    const location = useLocation()
    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;

    const [open, setOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleMobileDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerToggle = () => {
        setOpen(!open);
    }

    const drawer = (
        <>
            <ListItem
                disableGutters
                alignItems="center"
                className="mt-1"
                style={{ marginLeft: 6 }}
            >
                <ListItemIcon>
                    <img
                        style={{ maxWidth: 48, maxHeight: 48 }}
                        src={Resources.Images.APP_LOGO}
                        alt="logo"
                    />
                </ListItemIcon>
                <Typography
                    textAlign="center"
                    style={{
                        color: "#E5145A",
                        fontWeight: "bold",
                        fontSize: Constants.Styles.FONT_SIZE_LARGE,
                    }}
                >
                    {Strings.App.TITLE}
                </Typography>
            </ListItem>
            <MainHeader />
        </>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <MobileAppBar
                position="fixed"
                sx={{
                    display: {
                        xs: {
                            width: { sm: `calc(100% - ${drawerWidth}px)` },
                            ml: { sm: `${drawerWidth}px` },
                        },
                        sm: "none",
                        md: "none",
                    },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleMobileDrawerToggle}
                        sx={{
                            mr: 1,
                            display: { sm: "none" }
                        }}
                    >
                        <MenuRoundedIcon sx={{ color: Constants.Styles.BLACK_COLOR }} />
                    </IconButton>
                    <Typography 
                        noWrap
                        variant="h6"
                        component="div"
                        sx={{ color: Constants.Styles.BLACK_COLOR }}
                    >
                        {Helpers.getTitle(location.pathname)}
                    </Typography>
                </Toolbar>
            </MobileAppBar>

            <DesktopAppBar
                position="fixed"
                open={open}
                sx={{
                    display: {
                        xs: "none",
                        sm: "block",
                        md: "block",
                        boxShadow: 0
                    }
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 1,
                            display: {
                                xs: "none",
                                sm: "flex",
                                md: "flex"
                            },
                        }}
                    >
                        <MenuRoundedIcon sx={{ color: Constants.Styles.BLACK_COLOR }} />
                    </IconButton>
                    <Typography
                        noWrap
                        variant="h6"
                        component="div"
                        sx={{ color: Constants.Styles.BLACK_COLOR }}
                    >
                        {Helpers.getTitle(location.pathname)}
                    </Typography>
                </Toolbar>
            </DesktopAppBar>

            <MobileDrawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleMobileDrawerToggle}
                ModalProps={{ keepMounted: true, }}
                sx={{
                    display: {
                        xs: "block",
                        sm: "none"
                    },
                }}
            >
                {drawer}
            </MobileDrawer>

            <DesktopDrawer
                open={open}
                variant="permanent"
                sx={{
                    display: {
                        xs: "none",
                        sm: "block"
                    },
                }}
            >
                {drawer}
            </DesktopDrawer>

            {/* Child screen element */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1, p: 3,
                    paddingTop: 10,
                    width: {
                        xs: "100%",
                        sm: `calc(100% - ${drawerWidth}px)`
                    }
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

export default MainLayout