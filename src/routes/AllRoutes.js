import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../Components/Auth/SignUp";
import Login from "../Components/Auth/Login";
// import Otp from "../Components/Auth/Otp";
// import ForgotPassword from "../Components/Auth/ForgotPassword";
// import SearchBar from "../Components/commen/Search";
// import SubCategory from "../Components/commen/SubCategory";
// import Logout from "../Components/commen/Logout";
import PrivateRoute from "../Components/Auth/PrivateRoute";
import VerifyOtp from "../Components/Auth/VerifyOtp";
import Deshboard from "../Components/Pages/Dashboard/Deshboard";
import Business from "../Components/Pages/Business/Business";
import BusinessDetail from "../Components/Pages/Business/BusinessDetail";
import ProfileSideBar from "../Components/Pages/Profile/ProfileSideBar";
import AllCategory from "../Components/Pages/Category/AllCategory";
import LatestExperienceDetail from "../Components/Pages/LatestExperience/LatestExperienceDetail";
import CareerList from "../Components/Pages/Career/CareerList";
import FreelanceDetail from "../Components/Pages/Freelance/FreelanceDetail";
import CarrerDetail from "../Components/Pages/Career/CarrerDetail";

// import SearchSecBar from "../Components/commen/SearchSencd";

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Deshboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/business" element={<Business />} />
        <Route path="/businessdetail" element={<BusinessDetail />} />
        <Route path="/profile" element={<ProfileSideBar />} />
        <Route path="/allcategory" element={<AllCategory />} />
        <Route path="/latestexoerience" element={<LatestExperienceDetail />} />
        <Route path="/careerlist" element={<CareerList />} />
        <Route path="/careerdetail" element={<CarrerDetail />} />
        <Route path="/freelancedetail" element={<FreelanceDetail />} />

        <Route element={<PrivateRoute />}>
          {/* <Route path="logout" element={<Logout />} /> */}
        </Route>

        {/* <Route path='/maps' element={<SearchSecBar/>}/> */}
      </Routes>
    </>
  );
}
