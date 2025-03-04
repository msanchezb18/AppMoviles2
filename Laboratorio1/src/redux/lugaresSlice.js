import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLugares } from "../services/api";

export const fetchLugares = createAsyncThunk(
  "lugares/fetchLugares",
  async ({ location, category, keyword, source }) => {
    return await getLugares(location, category, keyword, source);
  }
);

const lugaresSlice = createSlice({
  name: "lugares",
  initialState: { data: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLugares.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default lugaresSlice.reducer;
