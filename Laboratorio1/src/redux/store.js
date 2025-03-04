import { configureStore } from "@reduxjs/toolkit";
import lugaresReducer from "./lugaresSlice";

export const store = configureStore({
  reducer: {
    lugares: lugaresReducer,
  },
});
