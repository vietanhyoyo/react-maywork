import {
    Box,
    Grid,
    SxProps,
    Theme,
    Typography,
} from "@mui/material"
import { CSSProperties, useEffect, useState } from "react"
import Loading from "src/components/Loading"
import Constants from "src/constants"
import HomeService from "src/services/home.service"
import DateRangePicker from "src/components/DateRangePicker"

const boxStyle: SxProps<Theme> = {
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

const reportTimeHeaderStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    marginTop: 14,
    padding: "4px 2px",
    width: "90%",

    color: Constants.Styles.WHITE_COLOR,
    backgroundColor: Constants.Styles.LIGHT_BLUE_COLOR,
    borderRadius: 5,

    fontWeight: "bold",
    fontSize: Constants.Styles.FONT_SIZE_MEDIUM
}

const reportTimeStyle: CSSProperties = {
    marginTop: 20,
    color: Constants.Styles.LIGHT_BLUE_COLOR,
    fontWeight: "bold",
    fontSize: 50,
}

const homeService = new HomeService()
const HomeScreen = () => {
    const dateNow = new Date();
    const firstDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
    const lastDay = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0);

    const startDate = firstDay.getTime() / 1000;
    const endDate = lastDay.getTime() / 1000;

    const [isLoading, setIsLoading] = useState(false)
    const [totalReportTime, setTotalReportTime] = useState<{
        totalActualTime?: number,
        totalAbsenceTime?: number
    }>({})

    useEffect(() => {
        const fetchData = async () => {
            if (startDate && endDate) {
                setIsLoading(true)
                try {
                    const data = await homeService.getUserReportTotalTime(startDate, endDate)
                    setTotalReportTime({
                        totalActualTime: parseInt(data.totalActualTime || 0),
                        totalAbsenceTime: parseInt(data.totalAbsenceTime || 0)
                    })
                } catch (error) {
                    console.log(error)
                }
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleApplyDateRange = async (startDate: number, endDate: number) => {
        setIsLoading(true)
        try {
            const data = await homeService.getUserReportTotalTime(startDate, endDate)
            setTotalReportTime({
                totalActualTime: parseInt(data.totalActualTime || 0),
                totalAbsenceTime: parseInt(data.totalAbsenceTime || 0)
            })
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    return (
        <Grid
            container spacing={2} className="my-5"
            display="flex" justifyContent="center" alignItems="center"
        >   
            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onApplyDateRange={handleApplyDateRange}
            />
            
            <Grid
                container item xs={10} md={10} spacing={4}
                className="mt-3 w-100" display="flex" justifyContent="center" alignItems="center"
            >
                <Grid item>
                    <Box sx={boxStyle}>
                        <Typography
                            textAlign="center"
                            style={reportTimeHeaderStyle}
                        >
                            Tổng giờ số công
                        </Typography>

                        <Typography textAlign="center" component="span" style={reportTimeStyle}>
                            {isLoading ? (
                                <Loading color={Constants.Styles.LIGHT_BLUE_COLOR} />
                            ) : (
                                totalReportTime.totalActualTime
                            )}
                        </Typography>
                    </Box>
                </Grid>
                
                <Grid item>
                    <Box sx={boxStyle}>
                        <Typography
                            textAlign="center"
                            style={reportTimeHeaderStyle}
                        >
                            Tổng giờ số vắng
                        </Typography>

                        <Typography textAlign="center" component="span" style={reportTimeStyle}>
                            {isLoading ? (
                                <Loading color={Constants.Styles.LIGHT_BLUE_COLOR} />
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