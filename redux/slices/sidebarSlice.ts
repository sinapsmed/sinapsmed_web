import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface StateType{
    sidebarShow: boolean
}

const initialState: StateType = {
    sidebarShow: false
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: initialState,
    reducers: {
        changeSidebar: (state: StateType, actions: PayloadAction<boolean>) =>{
            state.sidebarShow = actions.payload
        }
    }
})


export const sidebarActions = sidebarSlice.actions
export default sidebarSlice.reducer