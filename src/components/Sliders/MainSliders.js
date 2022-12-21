import React from "react";
import CreateSlider from "./CreateSlider";
import SlidersTable from "./SlidersTable";

import { useSelector } from "react-redux";

const MainSliders = () => {
  const sliderList = useSelector((state)=> state.sliderList);
  const{ loading, error, categories } = sliderList;
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Sliders</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            <CreateSlider />
            {/* Categories table */}
            {
   
            <SlidersTable />
         }
         
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSliders;
