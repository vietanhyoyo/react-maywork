import { useEffect, useState } from "react";
import Constants from "../../constants/index";
import {
    Box,
    Container,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListItem,
    Collapse,
    Radio,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import { RootState } from "src/store";
import { useDispatch, useSelector } from "react-redux";
import {
    ChevronRight,
    Notifications,
    Settings,
    ExitToApp,
    Groups,
    ExpandLess,
    ExpandMore,
    FolderSharedOutlined,
} from "@mui/icons-material";
import {
    getUserSetting,
    getTeamList,
    setOrganizationId,
    setTeamId,
    getOrganizationList,
} from "../../store/slice/profile.slice";
import { IUserInfo } from "src/commons/interfaces";
import Helpers from "src/commons/helpers";
import { IOrganizationList, ITeamList } from "src/commons/interfaces";
import { useNavigate } from "react-router";
import Screens from "src/constants/screens";

const AccountScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserSetting());
        dispatch(getTeamList());
        dispatch(getOrganizationList());
    }, []);

    const { userSetting, teamList, organizationList } = useSelector(
        (state: RootState) => state.profile
    );

    let userInfor: IUserInfo = {};
    const useri = sessionStorage.getItem(Constants.StorageKeys.USER_INFO);
    if (useri !== null) {
        userInfor = JSON.parse(useri);
    }

    const charName = Helpers.getCharacterAvatar(userInfor.userName);
    const [openGRP, setOpenGRP] = useState(false);
    const [openORG, setOpenORG] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);

    const handleLogout = () => {
        sessionStorage.removeItem(Constants.StorageKeys.ACCESS_TOKEN);
        sessionStorage.removeItem(Constants.StorageKeys.USER_INFO);
        navigate(Screens.LOGIN);
    };

    return (
        <>
            {/* Header----------------------- */}
            <Container sx={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                <Box
                    sx={{
                        boxShadow: 20,
                        height: Constants.Styles.AVATAR_SIZE,
                        width: Constants.Styles.AVATAR_SIZE,
                        borderRadius: 20,
                        bgcolor: `#${Math.floor(charName.charCodeAt(0) * 13100109).toString(
                            16
                        )}`,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                    }}
                >
                    <h5 style={{ fontWeight: "bold", fontSize: 30 }}>
                        {userInfor !== undefined ? charName : "@Username"}
                    </h5>
                </Box>
                <Box sx={{ marginLeft: 3 }}>
                    <h5>{userInfor.userName}</h5>
                    <h6>{userInfor.email}</h6>
                </Box>
            </Container>
            {/* Update----------------------- */}
            <Container
                sx={{
                    marginTop: 10,
                    borderBottom: 1,
                    borderBottomStyle: "solid",
                    borderBottomColor: "#767676",
                }}
            >
                <h5 style={{ color: "#767676", alignItems: "center" }}>
                    Xem và chỉnh sửa thông tin
                    <ChevronRight fontSize={"small"} sx={{ marginRight: 0.3 }} />
                </h5>
            </Container>
            <Container>
                {/* Notifications----------------------- */}
                <Box sx={{ marginTop: 4 }}>
                    <Button
                        sx={{
                            color: "black",
                            width: "100%",
                            justifyContent: "flex-start",
                            textTransform: "none",
                        }}
                        variant="text"
                        startIcon={<Notifications />}
                    >
                        <h6 style={{ paddingLeft: 25 }}>Thông báo</h6>
                    </Button>
                </Box>
                <Box>
                    {/* Organization----------------------- */}
                    <ListItemButton
                        sx={{ margin: 0, padding: 0, marginTop: 4 }}
                        onClick={() => setOpenORG(!openORG)}
                    >
                        <ListItemIcon>
                            <Groups sx={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Tổ chức"
                            secondary={userSetting.organizationName}
                        />
                        {openORG ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openORG} timeout="auto" unmountOnExit>
                        <List sx={{ paddingLeft: 5 }}>
                            {organizationList !== undefined &&
                                organizationList.map((val: IOrganizationList, index: any) => {
                                    return (
                                        <Button
                                            sx={{ width: "100%" }}
                                            onClick={() => dispatch(setOrganizationId(val.id))}
                                        >
                                            <ListItem
                                                secondaryAction={
                                                    <Radio
                                                        sx={{ paddingRight: 0 }}
                                                        checked={val.id === userSetting.organizationId}
                                                        onChange={(e) =>
                                                            dispatch(setOrganizationId(e.target.value))
                                                        }
                                                        value={val.id}
                                                        name="radio-buttons"
                                                    />
                                                }
                                            >
                                                <ListItemText primary={val.name} />
                                            </ListItem>
                                        </Button>
                                    );
                                })}
                        </List>
                    </Collapse>
                    {/* Group----------------------- */}
                    <ListItemButton
                        sx={{ margin: 0, padding: 0, marginTop: 4 }}
                        onClick={() => setOpenGRP(!openGRP)}
                    >
                        <ListItemIcon>
                            <FolderSharedOutlined sx={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText primary="Nhóm" secondary={userSetting.teamName} />
                        {openGRP ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openGRP} timeout="auto" unmountOnExit>
                        <List sx={{ paddingLeft: 5 }}>
                            {teamList !== undefined &&
                                teamList.map((val: ITeamList, index: any) => {
                                    return (
                                        <Button
                                            sx={{ width: "100%" }}
                                            onClick={() => dispatch(setTeamId(val.id))}
                                        >
                                            <ListItem
                                                secondaryAction={
                                                    <Radio
                                                        sx={{ paddingRight: 0 }}
                                                        checked={val.id === userSetting.teamId}
                                                        onChange={(e) =>
                                                            dispatch(setTeamId(e.target.value))
                                                        }
                                                        value={val.id}
                                                        name="radio-buttons"
                                                    />
                                                }
                                            >
                                                <ListItemText primary={val.name} />
                                            </ListItem>
                                        </Button>
                                    );
                                })}
                        </List>
                    </Collapse>
                </Box>
                {/* Setting----------------------- */}
                <Box sx={{ marginTop: 4 }}>
                    <Button
                        sx={{
                            color: "black",
                            width: "100%",
                            justifyContent: "flex-start",
                            textTransform: "none",
                        }}
                        variant="text"
                        startIcon={<Settings />}
                    >
                        <h6 style={{ paddingLeft: 25 }}>Cài đặt</h6>
                    </Button>
                </Box>
                {/* Logout----------------------- */}
                <Box sx={{ marginTop: 4 }}>
                    <Button
                        sx={{
                            color: "black",
                            width: "100%",
                            justifyContent: "flex-start",
                            textTransform: "none",
                        }}
                        variant="text"
                        startIcon={<ExitToApp />}
                        onClick={() => setOpenLogout(true)}
                    >
                        <h6 style={{ paddingLeft: 25 }}>Đăng xuất</h6>
                    </Button>
                </Box>
            </Container>
            <Dialog
                open={openLogout}
                onClose={() => setOpenLogout(!openLogout)}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogContent>
                    <DialogContentText>Bạn chắc chắn muốn đăng xuất?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setOpenLogout(false)}>
                        Hủy
                    </Button>
                    <Button
                        onClick={() => {
                            setOpenLogout(false);
                            handleLogout();
                        }}
                    >
                        Đăng xuất
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AccountScreen;
