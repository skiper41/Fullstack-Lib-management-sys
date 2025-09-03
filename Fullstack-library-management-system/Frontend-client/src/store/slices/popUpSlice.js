import { createSlice } from "@reduxjs/toolkit";

const popupslice = createSlice({
  name: "popup",
  initialState: {
    settingPopup: false,
    addBookPopup: false,
    readBookPopup: false,
    recordBookPopup: false,
    returnBookPopup: false,
    addNewAdminPopup: false,
    selectedBook: null,
  },
  reducers: {
    toggleSettingPopup(state) {
      state.settingPopup = !state.settingPopup;
    },
    toggleAddBookPopup(state) {
      state.addBookPopup = !state.addBookPopup;
    },
    toggleReadBookPopup(state,action) {
      state.readBookPopup = !state.readBookPopup;
      state.selectedBook = action.payload || null;

    },
    toggleRecordBookPopup(state,action) {
      state.recordBookPopup = !state.recordBookPopup;
      state.selectedBook = action.payload || null;

    },
    toggleAddNewAdminPopup(state) {
      state.addNewAdminPopup = !state.addNewAdminPopup;
    },
    toggleReturnBookPopup(state,action) {
      state.returnBookPopup = !state.returnBookPopup;
      state.selectedBook = action.payload || null;

    },
    closeAllPopup(state) {
      state.addBookPopup = false;
      state.addNewAdminPopup = false;
      state.readBookPopup = false;
      state.recordBookPopup = false;
      state.returnBookPopup = false;
      state.settingPopup = false;
    },
  },
});

export const {
  closeAllPopup,
  toggleAddBookPopup,
  toggleAddNewAdminPopup,
  toggleReadBookPopup,
  toggleRecordBookPopup,
  toggleReturnBookPopup,
  toggleSettingPopup,
} = popupslice.actions;

export default popupslice.reducer;
