import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import "./Student.css";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import EnrollTopNav from "../../Components/EnrollTopNav/EnrollTopNav";
import CourseSection from "../../Components/CourseSection/CourseSection";
import FacilitySection from "../../Components/FacilitySection/FacilitySection";
import DayCareAndActivity from "../../Components/DayCareAndActivity/DayCareAndActivity";
import Enquire from "../../Components/Enquire/Enquire";
import LocateAndLink from "../../Components/LocateAndLink/LocateAndLink";
import Footer from "../../Components/Footer/Footer";

function Student() {
  return (
    <>
      <div className="page_Wrapper">
        <EnrollTopNav />
        <Header />
        <HomeSlider />
        <FacilitySection />
        <CourseSection />
        <DayCareAndActivity />
        <Enquire />
        <LocateAndLink />
        <Footer />
      </div>
      <Outlet />
    </>
  );
}

export default Student;
