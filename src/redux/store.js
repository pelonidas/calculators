import {configureStore} from "@reduxjs/toolkit";
import courtCosts from "./courtCosts";

export default configureStore({
    reducer: {
        courtCosts: courtCosts
    }
})
