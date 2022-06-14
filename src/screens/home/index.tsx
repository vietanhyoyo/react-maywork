import {
    Box,
    Grid,
    SxProps,
    Theme,
    Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { RootState } from "src/store"
import { useSelector, useDispatch} from "react-redux"
import { storeDateRange } from "src/store/slice/dateRangeFilter.slice"
import Loading from "src/components/Loading"
import Constants from "src/constants"
import HomeService from "src/services/home.service"
import DateRangePicker from "src/components/DateRangePicker"
import Helpers from "src/commons/helpers"
import Strings from "src/constants/strings"
import styles from "src/styles/Home.module.css"

const muiBoxStyle: SxProps<Theme> = {
    position: "relative",
    width: 240,
    height: 220,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    boxShadow: Constants.Styles.BOX_SHADOW,
    borderRadius: Constants.Styles.BOX_BORDER_RADIUS,
};

const homeService = new HomeService()
const HomeScreen = () => {
    const dispatch = useDispatch();
    const initialDateRange = useSelector((state: RootState) => state.reportDateRange)
    const startDate = initialDateRange.startDate || Helpers.firstDayOfMonthUnixTime()
    const endDate = initialDateRange.endDate || Helpers.lastDayOfMonthUnixTime()

    const [isLoading, setIsLoading] = useState(false)
    const [totalReportTime, setTotalReportTime] = useState<{
        totalActualTime?: number,
        totalAbsenceTime?: number
    }>({})

    useEffect(() => {
        filterReportTotalTime(startDate, endDate);
    }, [])

    const filterReportTotalTime = async (startDate: number, endDate: number) => {
        setIsLoading(true)
        try {
            const data = await homeService.getUserReportTotalTime(startDate, endDate)
            setTotalReportTime({
                totalActualTime: parseInt(data.totalActualTime || 0),
                totalAbsenceTime: parseInt(data.totalAbsenceTime || 0)
            })
            dispatch(storeDateRange({ startDate, endDate }));
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    return (
        <Grid
            container className="my-4"
            display="flex" justifyContent="center"
        >   
            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onApplyDateRange={filterReportTotalTime}
            />
            
            <Grid
                container item xs={10} md={10} spacing={4}
                className="mt-3 w-100" display="flex" justifyContent="center" alignItems="center"
            >
                <Grid item>
                    <Box sx={muiBoxStyle}>
                        <Typography
                            textAlign="center"
                            className={styles.reportTimeHeader}
                        >
                            {Strings.TimeCard.CURRENT_TOTAL}
                        </Typography>

                        <Typography textAlign="center" component="span" className={styles.reportTime}>
                            {isLoading ? (
                                <Loading color={Constants.Styles.OCEAN_BLUE_COLOR} />
                            ) : (
                                totalReportTime.totalActualTime
                            )}
                        </Typography>
                    </Box>
                </Grid>
                
                <Grid item>
                    <Box sx={muiBoxStyle}>
                        <Typography
                            textAlign="center"
                            className={styles.reportTimeHeader}
                        >
                            {Strings.Absence.ABSENCE_TOTAL_TIME}
                        </Typography>

                        <Typography textAlign="center" component="span" className={styles.reportTime}>
                            {isLoading ? (
                                <Loading color={Constants.Styles.OCEAN_BLUE_COLOR} />
                            ) : (
                                totalReportTime.totalAbsenceTime
                            )}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default HomeScreen