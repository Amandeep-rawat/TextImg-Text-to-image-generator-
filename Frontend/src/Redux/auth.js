import { createSlice } from "@reduxjs/toolkit";
const authSlice=createSlice({
    name:"auth",
    initialState:{
        userr:null,
    },
    reducers:{
        setAuthUserr:(state,action)=>{
            state.userr=action.payload;
        
        }
        }
})
export const {setAuthUserr}=authSlice.actions;
export default authSlice.reducer;