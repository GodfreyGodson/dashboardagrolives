import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainSliders from "../components/Sliders/MainSliders";


const SlidersScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainSliders/>
      </main>
    </>
  );
};

export default SlidersScreen;
