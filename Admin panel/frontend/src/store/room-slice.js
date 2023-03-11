import {createSlice} from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name:'room',
    initialState:{
        users:[],
        roomsList:[],
        bookingRoom:{
            roomType:null,
            roomNo:null,
            price:null
        },
        updatingId:""
    },
    reducers:{
        updateUsers(state,action){
            state = action.payload
        },
        updatingRoom(state,action){
            state.updatingId = action.payload
        },
        bookingRoom(state,action){
            state.bookingRoom = action.payload
        },
    }
})

export const roomActions = roomSlice.actions

export default roomSlice;