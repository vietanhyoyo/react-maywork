import { useState } from "react"
import { FilterAlt } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"
import DatePicker from "../DatePicker"
import Constants from "src/constants"
import Helpers from "src/commons/helpers"
import Strings from "src/constants/strings"

interface IProps {
    startDateLabel?: string;
    startDate?: number;

    endDateLabel?: string;
    endDate?: number;

    onChangeStartDate?: (timestamp: number | null) => void;
    onChangeEndDate?: (timestamp: number | null) => void;
    onApplyDateRange?: (startDate: number, endDate: number) => void;
}

const applyTimeStyle: React.CSSProperties = {
    color: Constants.Styles.OCEAN_BLUE_COLOR,
    fontWeight: "bold",
    fontSize: Constants.Styles.FONT_SIZE_MEDIUM,
}

const DateRangePicker = (props: IProps) => {
    const startDateLabel = props.startDateLabel || Strings.Common.FROM_DATE;
    const endDateLabel = props.startDateLabel || Strings.Common.TO_DATE;

    const [startDate, setStartDate] = useState<number | null>(props.startDate || null)
    const [endDate, setEndDate] = useState<number | null>(props.endDate || null)

    const handleChangeStartDate = (startDate: number | null) => {
        setStartDate(startDate)
        props.onChangeStartDate && props.onChangeStartDate(startDate);
    }

    const handleChangeEndDate = (endDate: number | null) => {
        setEndDate(endDate)
        props.onChangeEndDate && props.onChangeEndDate(endDate);
    }

    const handleApplyDateRange = () => {
        if (Helpers.isNullOrEmpty(startDate)) {
            Helpers.showAlert(`Vui lòng nhập "${startDateLabel}"`);
        }

        if (Helpers.isNullOrEmpty(endDate)) {
            Helpers.showAlert(`Vui lòng nhập "${endDateLabel}"`);
        }

        if (startDate && endDate && startDate > endDate) {
            Helpers.showAlert("Ngày tháng năm không hợp lệ");
        }

        if (startDate && endDate && startDate <= endDate) {
            props.onApplyDateRange && props.onApplyDateRange(startDate, endDate);
        }
    }

    return (
        <Grid
            container className="w-100" spacing={1}
            display="flex" justifyContent="center" alignItems="center"
        >
            <Grid
                container item xs={10} md={10} spacing={2}
                display="flex" justifyContent="center" alignItems="center"
            >
                <Grid item>
                    <DatePicker
                        label={startDateLabel}
                        defaultValue={startDate || undefined}
                        onChangeValue={handleChangeStartDate}
                    />
                </Grid>

                <Grid item>
                    <DatePicker
                        label={endDateLabel}
                        defaultValue={endDate || undefined}
                        onChangeValue={handleChangeEndDate}
                    />
                </Grid>
            </Grid>

            <Grid container item xs={12} md={12} display="flex" justifyContent="center" alignItems="center">
                <Button onClick={handleApplyDateRange}>
                    <div className="d-flex justify-content-center">
                        <FilterAlt style={{ color: Constants.Styles.OCEAN_BLUE_COLOR }} />
                        <Typography style={applyTimeStyle}>
                            {Strings.Common.APPLY}
                        </Typography>
                    </div>
                </Button>
            </Grid>
        </Grid>
    )
}

export default DateRangePicker