import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateType {
  isSidebarCollapsed: boolean;
}

const initialState: InitialStateType = {
  isSidebarCollapsed: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState, // Corrected property name
  reducers: {
    setIsSidebarCollapse: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload; // Update the state
    },
  },
});

// Export the action creator
export const { setIsSidebarCollapse } = globalSlice.actions;

// Export the reducer
export default globalSlice.reducer;
