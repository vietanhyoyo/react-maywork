import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IDateRangeFilter {
    startDate?: number;
    endDate?: number;
}

const dateNow = new Date();

const firstDay = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth(), 1
).getTime() / 1000;

const lastDay = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth() + 1, 0
).getTime() / 1000;

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