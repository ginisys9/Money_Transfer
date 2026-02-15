import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const initialState = {
  transfer :[],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
/**
 * ! make tarnsfer the amount
 */
export const transferAmount = createAsyncThunk('store/tarnsferAmount',async(amountData,thunkApi)=>{
  try {
      const res = await fetch('http://localhost:3000/transfer',{
      headers:{
      "Content-Type": "application/json",
      },
      method:'POST',
      body: JSON.stringify(amountData)
      })
      const data = await res.json()
      return data; // goes to fulfilled
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue("Failed to fetch users");
    }
})
const transferSlice = createSlice({
    name:'transfer',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(builder)=>{
      builder
      .addCase(transferAmount.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(transferAmount.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.transfer.push(action.payload)
      })
      .addCase(transferAmount.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
      })
    }
})
export const { reset } = transferSlice.actions;
export default transferSlice.reducer;
