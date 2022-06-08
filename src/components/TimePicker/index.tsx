import { useState } from "react"
import { TextField } from "@mui/material"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers/TimePicker"
import { vi } from "date-fns/locale"
import moment from "moment"

interface IProps {
    label: string;
    defaultValue?: number;
    onChangeValue?: (timestamp: number | null) => void;
}

const TimePicker = (props: IProps) => {
    const [timeValue, setTimeValue] = useState<Date | null>(
        props.defaultValue
            ? new Date(props.defaultValue * 1000)
            : null
    );

    const handleChange = (newTimeValue: Date | null) => {
        let timestamp = null
        if (newTimeValue !== null) {
            timestamp = moment(newTimeValue).unix()   
        }
        props.onChangeValue && props.onChangeValue(timestamp)
        setTimeValue(newTimeValue);
    }

    return (
        <LocalizationProvider adapterLocale={vi} dateAdapter={AdapterDateFns}>
            <MuiTimePicker
                label={props.label}
                value={timeValue}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}

export default TimePicker