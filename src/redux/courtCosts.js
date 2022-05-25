import {createSlice} from "@reduxjs/toolkit";

export const courtCostsSlice = createSlice({
    name: "courtCosts",
    initialState: {
        result: 0,
        sum: {
            withVat: 0,
            withoutVat: 0
        },
    },
    reducers: {
        setResult: (state, action) => {
            state.result = action.payload;
        },
        setSumWithoutVat: (state, action) => {
            state.sum.withoutVat = action.payload;
        },
        setSumWithVat: (state, action) => {
            state.sum.withVat = action.payload;
        }
    }
})

export const {setResult, setSumWithoutVat, setSumWithVat} = courtCostsSlice.actions;
export default courtCostsSlice.reducer;
