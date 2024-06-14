import { createSlice } from "@reduxjs/toolkit";

import { getValue, setValue, removeItem } from "../../Helpers/LocalStorageHelper"
import { AccessKey, RefreshToken } from '../../Helpers/Сonstants'
import { IsNullOrEmpty } from "../../Helpers/StringHelper";
import { IReduxAuthModel } from "../../types/Redux";
import { IAuthInformation } from "../../types/AuthInfo"

const accessKey = getValue(AccessKey);
const refreshToken = getValue(RefreshToken);
const initialState: IReduxAuthModel = {
  isAuth: !IsNullOrEmpty(accessKey),
  accessKey: accessKey,
  refreshToken: refreshToken
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state: IReduxAuthModel) => {
      state.isAuth = false;
      removeItem(AccessKey);
      removeItem(RefreshToken)
    },
    userLogin: (state: IReduxAuthModel, action: { payload: IAuthInformation }) => {
      state.isAuth = !IsNullOrEmpty(action.payload.accessKey);
      state.accessKey = action.payload.accessKey;
      state.refreshToken = action.payload.refresh_token;
      setValue(AccessKey, action.payload.accessKey);
      setValue(RefreshToken, action.payload.refresh_token);
    }
  }
});

export const { actions, reducer } = authSlice;
