import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const loction = createSlice({
  name: "loction",
  initialState: [],
  reducers: {
    loction: (state, action) => {
      return { ...state, action: action.payload };
    },
  },
});

const userDetails = createSlice({
  name: "userDetails",
  initialState: [],
  reducers: {
    userDetails: (state, action) => {
      return { ...state, action: action.payload };
    },
  },
});

const businessDetailId = createSlice({
  name: "businessDetailId",
  initialState: [],
  reducers: {
    businessDetailId: (state, action) => {
      return { ...state, action: action.payload };
    },
  },
});

const loginStatuss = createSlice({
  name: "loginStatus",
  initialState: false,
  reducers: {
    loginStatus: (state, action) => {
      return { ...state, action: action.payload };
    },
  },
});

const countryNamee = createSlice({
  name: "countryName",
  initialState: "",
  reducers: {
    countryName: (state, action) => {
      return { ...state, action: action.payload };
    },
  },
});

export const countryName = countryNamee;
export const actionCountryName = countryNamee.actions;
export const loginStatus = loginStatuss;
export const actionLoginStatus = loginStatuss.actions;
export const businessDetailIdd = businessDetailId;
export const actionBusinessDetailId = businessDetailId.actions;
export const loctionn = loction;
export const actionLoction = loction.actions;
export const user = userDetails;
export const userDetail = userDetails.actions;
