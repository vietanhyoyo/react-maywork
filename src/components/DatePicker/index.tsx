import { useState } from "react"
import { TextField } from "@mui/material"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker"
import { vi } from "date-fns/locale"
import moment from "moment"

interface IProps {
    label: string;
    defaultValue?: number;
    onChangeValue?: (timestamp: number | null) => void;
}

const DatePicker = (props: IProps) => {
    const [dateValue, setDateValue] = useState<Date | null>(
        props.defaultValue
            ? new Date(props.defaultValue * 1000)
            : null
    );

    const handleChange = (newDateValue: Date | null) => {
        let timestamp = null
        if (newDateValue !== null) {
            timestamp = moment(newDateValue).unix()
        }
        props.onChangeValue && props.onChangeValue(timestamp)
        setDateValue(newDateValue);
    }
    
    return (
        <LocalizationProvider adapterLocale={vi} dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                label={props.label}
                value={dateValue}
                inputFormat="dd/MM/yyyy"
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}

export default DatePicker