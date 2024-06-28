import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultType } from "@/types/ResultType";

const initialState: ResultType[] = [];

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    // Add results to the array
    addToResults: (state, action: PayloadAction<ResultType>) => {
      const dataExists = state.find((item) => item.id === action.payload.id);

      if (dataExists) {
        dataExists.added === true;
      } else {
        state.push({ ...action.payload, added: false });
      }
    },

    // Remove results from the array
    removeFromResults: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addToResults, removeFromResults } = resultsSlice.actions;

export default resultsSlice.reducer;
