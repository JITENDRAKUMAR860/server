import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../../shared/services/api-client";
export const fetchUsers= createAsyncThunk('fetch-users',async()=>{
    return await apiClient.get(process.env.REACT_APP_USERS);
})
const userSlice = createSlice({
    name:'user-slice',
    initialState:{users:[], total : 0, loading : false, error:null},
    reducers:{
        addUser(state, action){
            const user = action.payload;
            state.users.push(user);
            console.log('Added Users ', state.users);
            state.total = state.users.length;
        },
        deleteUser(state, action){

        },
        getAllUsers(state, action){
            
        }
    },
    extraReducers:{
        // Async
        [fetchUsers.pending]:(state, action)=>{
            state.loading = true;
        },
        [fetchUsers.fulfilled]:(state, action)=>{
            state.loading = false;
            state.users  = [...state.users, ...action.payload];
        },
        [fetchUsers.rejected]:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }
    }

});
export default userSlice.reducer; // give to store
export const {addUser, deleteUser, getAllUsers} = userSlice.actions;
// state comes from store 
// action comes from component