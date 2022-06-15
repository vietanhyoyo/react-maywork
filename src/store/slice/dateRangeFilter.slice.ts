import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Helpers from "src/commons/helpers";

export interface IDateRangeFilter {
    startDate?: number;
    endDate?: number;
}

const firstDay = Helpers.firstDayOfMonthUnixTime();
const lastDay = Helpers.lastDayOfMonthUnixTime();

const initialState: IDateRangeFilter = {
    startDate: firstDay,
    endDate: lastDay
}

export const dateRangeFilterSlice = createSlice({
    name: "dateRangeFilter",
    initialState,
    reducers: {
        storeDateRange: (state, action: PayloadAction<IDateRangeFilter>) => {
            state.startDate = action.payload.startDate
            state.endDate = action.payload.endDate
        },
    }
})

// Action creators are generated for each case reducer function
export const { storeDateRange } = dateRangeFilterSlice.actions

export default dateRangeFilterSlice.reducer