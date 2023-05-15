import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import { actionLoction } from "./store/Action";
import { useEffect, useState } from "react";
import { userDetail } from "./store/Action";
import { actionBusinessDetailId } from "./store/Action";
import LatestExperienceDetail from "./Components/Pages/LatestExperience/LatestExperienceDetail";
import CareerList from "./Components/Pages/Career/CareerList";
import CarrerDetail from "./Components/Pages/Career/CarrerDetail";
import { actionCountryName } from "./store/Action";
import Cookies from "js-cookie";

function App() {
  const dispatch = useDispatch();
  const loc = useSelector((state) => state?.loctionn?.action?.location);
  const con = useSelector((state) => state?.countryName?.action);
  console.log(con);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        localStorage.setItem(
          "loction",
          JSON.stringify({ latitude: latitude, longitude: longitude })
        );
        const location =
          JSON.parse(window.localStorage.getItem("loction")) || {};
        dispatch(actionLoction.loction({ location }));
      },
      (error) => console.error(error)
    );
    if (Cookies.get("userDetails")) {
      dispatch(userDetail.userDetails(Cookies.get("userDetails")));
    }
  }, []);

  // useEffect(() => {
  //   if (con) {
  //     localStorage.setItem("countryName", JSON.stringify(con));
  //     Cookies.set("country", con);
  //   }

  //   let countryName = "";

  //   const countryNameString = window.localStorage.getItem("countryName");

  //   if (countryNameString) {
  //     try {
  //       countryName = JSON.parse(countryNameString);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   dispatch(actionCountryName?.countryName(countryName));
  // }, [con]);

  return (
    <>
      <AllRoutes />
      {/* <CarrerDetail /> */}
      {/* <LatestExperienceDetail/> */}
      {/* <h1 className="App-link">
        Learn React jai ganesaye namh ; jai maa gungal ; jai tetees koti devi
        devta ki jai ho
      </h1> */}
    </>
  );
}

export default App;
