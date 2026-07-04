import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import SharePost from "./pages/SharePost";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyExperience from "./pages/MyExperience";
import ExperienceDetail from "./pages/ExperienceDetail";
import PopularComp from "./pages/PopularComp";
import Profile from "./pages/Profile";
import CompanyExp from "./pages/CompanyExp";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/experience/popular-companies"
          element={<PopularComp/>}
        />
        <Route path="/experience/popular-companies/:companyName" element={<CompanyExp/>} />
        <Route path="/experience/new" element={<SharePost />} />{" "}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-experiences" element={<MyExperience />} />
        <Route path="/interview/:slug" element={<ExperienceDetail />} />
      </Routes>
    </div>
  );
};

export default App;
