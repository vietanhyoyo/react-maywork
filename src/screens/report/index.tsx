import {
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material"
import {
    DeleteRounded as DeleteRoundedIcon,
    EditRounded as EditRoundedIcon,
} from "@mui/icons-material"
import { useEffect, useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { storeDateRange } from "src/store/slice/dateRangeFilter.slice"
import { RootState } from "src/store"
import Constants from "src/constants"
import DateRangePicker from "src/components/DateRangePicker"
import Helpers from "src/commons/helpers"
import Loading from "src/components/Loading"
import UserReportService from "src/services/user-report.service"
import Strings from "src/constants/strings"
import Screens from "src/constants/screens"
import { IUserReport } from "src/commons/interfaces"
import styles from "src/styles/Report.module.css"

const userReportService = new UserReportService();
const ReportScreen = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const initialDateRange = useSelector((state: RootState) => state.reportDateRange);
    const [startDate, setStartDate] = useState<number>(initialDateRange.startDate || new Date().getTime());
    const [endDate, setEndDate] = useState<number>(initialDateRange.endDate || new Date().getTime());

    const [isLoading, setIsLoading] = useState(false)
    const [userReports, setUserReports] = useState<IUserReport[]>([])

    const filterUserReport = async (startDate: number, endDate: number) => {
        setIsLoading(true)
        try {
            const userReports: IUserReport[] = await userReportService.getUserReportTotalTime(startDate, endDate);
            userReports.sort((item_a, item_b) => {
                if (item_a.workingDate && item_b.workingDate) {
                    return item_b.workingDate - item_a.workingDate
                } else {
                    return 0
                }
            });
            setUserReports(userReports);
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        filterUserReport(startDate, endDate);
    }, [])

    const handleApplyDateRange = async (startDate: number, endDate: number) => {
        filterUserReport(startDate, endDate);
        setStartDate(startDate);
        setEndDate(endDate);
        dispatch(storeDateRange({ startDate, endDate }));
    }

    return (
        <Grid
            container className="my-4"
            display="flex" justifyContent="center"
        >
            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onApplyDateRange={handleApplyDateRange}
            />

            {isLoading ? (
                <Loading color={Constants.Styles.OCEAN_BLUE_COLOR} />
            ) : (
                <TableContainer sx={{ boxShadow: Constants.Styles.BOX_SHADOW }} className="px-2 mt-4" component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{ height: 46 }}>
                                <TableCell className={styles.tableHead} style={{ width: "2%" }}>
                                    #
                                </TableCell>

                                <TableCell className={styles.tableHead} style={{ width: "18%" }}>
                                    {Strings.Report.WORKING_DATE}
                                </TableCell>

                                <TableCell className={styles.tableHead} style={{ width: "12%" }}>
                                    {Strings.Report.WORKING_HOUR}
                                </TableCell>

                                <TableCell className={styles.tableHead} style={{ width: "54%" }}>
                                    {Strings.Common.NOTE}
                                </TableCell>

                                <TableCell className={styles.tableHead} style={{ width: "14%" }} align="right">
                                    {Strings.Common.ACTION}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userReports.length > 0 ? (
                                userReports.map((userReport: IUserReport, index) => {
                                    const iconSize = "medium";
                                    const tooltipStyle = { fontSize: Constants.Styles.FONT_SIZE_SMALL };

                                    const dayName = userReport.workingDate && Helpers.formatDateName(userReport.workingDate * 1000);
                                    const day = userReport.workingDate && Helpers.formatDate(userReport.workingDate * 1000);
                                    const start = userReport.startTime && Helpers.formatTime(userReport.startTime * 1000);
                                    const end = userReport.endTime && Helpers.formatTime(userReport.endTime * 1000);

                                    const handleDelete = async (userReportId: string) => {
                                        Helpers.showConfirmAlert(
                                            "Bạn có muốn xóa báo cáo này?",
                                            async () => {
                                                try {
                                                    await userReportService.deleteUserReport(userReportId);
                                                    Helpers.showAlert(Strings.Report.DELETE_SUCCESS, "success");
                                                    await filterUserReport(startDate, endDate);
                                                } catch (error) {
                                                    console.log(error);
                                                    Helpers.showAlert(Strings.Message.COMMON_ERROR, "error");
                                                }
                                            }
                                        )
                                    }

                                    return (
                                        <TableRow
                                            key={userReport.id || index}
                                            hover={true}
                                            sx={{
                                                "& .MuiTableRow-hover": {
                                                    backgroundColor: Constants.Styles.LIGHT_GRAY_COLOR,
                                                },
                                                borderBottomWidth: 1,
                                                borderBottomColor: Constants.Styles.LIGHT_GRAY_COLOR,
                                                "&:last-child td, &:last-child th": { border: 0 }
                                            }}
                                        >
                                            <TableCell className={styles.tableCell}>
                                                {index}
                                            </TableCell>

                                            <TableCell className={styles.tableCell}>
                                                {`${dayName}, ${day}`}
                                            </TableCell>

                                            <TableCell className={styles.tableCell} align="center">
                                                <div>{start}</div>
                                                <div>{end}</div>
                                            </TableCell>

                                            <TableCell className={styles.tableCell}>
                                                {userReport.description?.includes("\n") ? (
                                                    userReport.description.split("\n").map(str => <p className="my-1">{str}</p>)
                                                ) : (
                                                    userReport.description
                                                )}
                                            </TableCell>

                                            <TableCell align="right">
                                                <Tooltip title={<span style={tooltipStyle}>{Strings.Common.EDIT}</span>}>
                                                    <IconButton onClick={() => {
                                                        if (userReport.id) {
                                                            navigate({
                                                                pathname: Screens.UPDATE_REPORT,
                                                                search: createSearchParams({
                                                                    id: userReport.id
                                                                }).toString()
                                                            })
                                                        }
                                                    }}>
                                                        <EditRoundedIcon
                                                            fontSize={iconSize}
                                                            style={{ color: Constants.Styles.OCEAN_BLUE_COLOR }}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={<span style={tooltipStyle}>{Strings.Common.DELETE}</span>}>
                                                    <IconButton onClick={() => {
                                                        userReport.id && handleDelete(userReport.id)
                                                    }}>
                                                        <DeleteRoundedIcon
                                                            fontSize={iconSize}
                                                            style={{ color: Constants.Styles.RED_COLOR }}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            ) : (
                                <TableRow style={{ height: 46 }}>
                                    <TableCell colSpan={4}>
                                        <Typography style={{ padding: "4px 0" }}>
                                            {Strings.Common.NO_DATA + " . . ."}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Grid>
    )
}

export default ReportScreen