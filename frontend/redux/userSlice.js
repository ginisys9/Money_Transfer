import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
   data:user ? user : null,
   acount:null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
/**
 *  ! register the user acount
 */

export const userRegister = createAsyncThunk(
  "store/userRegister",
  async ( userData,thunkAPI) => {
    try {
      const res = await fetch('http://localhost:3000/user',{
        method:'POST',
        headers: {
      "Content-Type": "application/json"
     },
     body: JSON.stringify(userData)
     })
      const data = await res.json()
      console.log(data);
      
     localStorage.setItem("user",JSON.stringify(data.user))
      return data; // goes to fulfilled
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch users");
    }
  },
);
/**
 * !logout the user acount
 */
export const userlogOut = createAsyncThunk(
  "store/userlogOut",
  async ( _,thunkAPI) => {
    try {
      const res = await fetch('http://localhost:3000/user/logout')
      const data = await res.json()
      localStorage.removeItem("user")
      return data; // goes to fulfilled
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch users");
    }
  },
);
export const userlogIn = createAsyncThunk(
  "store/userlogIn",
  async (userData,thunkAPI) => {
    try {
      const res = await fetch('http://localhost:3000/user/login',{
      method:'POST',
      headers: {
      "Content-Type": "application/json"
     },
     body: JSON.stringify(userData)
      })
      const data = await res.json()
      console.log(data);
     
      localStorage.setItem("user",JSON.stringify(data))
      return data; // goes to fulfilled
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch users");
    }
  },
);
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
         state.isError = false;
        state.user = action.payload.user
        state.acount= action.payload.acount
      })
      .addCase(userRegister.rejected,(state,action)=>{
           state.isError = true;
           state.isSuccess = false;
           state.isLoading = true;
           state.message = action.payload
      })
      .addCase(userlogOut.fulfilled,(state,action)=>{
         state.isSuccess = true;
         state.isLoading = false,
         state.user = null
      })
      /**f for the loginUser */
      .addCase(userlogIn.pending,(state)=>{
         state.isLoading = true
      })
      .addCase(userlogIn.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.isSuccess = true,
         state.message ="";
         state.user = action.payload
      })
      .addCase(userlogIn.rejected,(state,action)=>{
         state.isLoading = false;
         state.isSuccess = false,
         state.user = null
         state.message = action.payload
      })
  },
});
export const { reset } = userSlice.actions;
export default userSlice.reducer;
