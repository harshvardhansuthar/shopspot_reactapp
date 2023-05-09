import { configureStore } from "@reduxjs/toolkit";
import { loctionn } from "./Action";
import { businessDetailIdd } from "./Action";
import { loginStatus } from "./Action";
import { countryName } from "./Action";
import { user } from "./Action";

const Store = configureStore({
  reducer: {
    loctionn: loctionn.reducer,
    businessDetailId: businessDetailIdd.reducer,
    loginStatus: loginStatus.reducer,
    countryName: countryName.reducer,
    userDetail: user.reducer,
  },
});

export default Store;
