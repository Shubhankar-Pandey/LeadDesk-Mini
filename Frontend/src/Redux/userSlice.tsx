import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name : "user",
    initialState : {
        user : null,
    },
    reducers : {
        setUser : (state, actions) => {
            state.user = actions.payload;
        },
        resetUser : (state) => {
            state.user = null;
        }
    }
})

export const {setUser, resetUser} = userSlice.actions
export default userSlice.reducer