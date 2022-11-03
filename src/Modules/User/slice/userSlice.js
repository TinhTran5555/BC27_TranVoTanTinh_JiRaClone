import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import thunk from "../../../app/apis/helper/thunk";
import projectAPIs from "../../../app/apis/projectAPIs/projectAPIs";

const initialState = {
  user: [],
  isLoading: false,
  error: "",
};

const {
  getAllUser,

  deleteUser,
  updateUser,

  getSearchUser,
} = projectAPIs;

export const getAllUserThunk = thunk.request("users/getUser", getAllUser);

export const getSearchUserThunk = createAsyncThunk(
  "user/getSearchUser",
  async (keyword, { rejectWithValue }) => {
    try {
      const data = await getSearchUser(keyword);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserThunk = thunk.request("user/updateUser", updateUser);

export const deleteUserThunk = thunk.request("user/deleteUser", deleteUser);

const userSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearDataUser: (state) => {
      state.user = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(getAllUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
    builder
      .addCase(getSearchUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(getSearchUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
export const { clearDataUser } = userSlice.actions;
export default userSlice.reducer;
