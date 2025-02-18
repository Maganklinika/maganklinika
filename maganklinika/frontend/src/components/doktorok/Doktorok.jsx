import React from "react";
import DoctorsWithSpec from "./doctors_with_spec_card/DoctorsWithSpec";
import useDoctorContext from "../../contexts/DoctorContext";
import "./doctors.css";
import TextFilter from "../filters/text_filter_top/TextFilter";

const Doktorok = () => {
  const { doctorsWithSpec } = useDoctorContext();

  return (
    <>
      <TextFilter />
      <div className="doctors-spec">
        {doctorsWithSpec ? (
          doctorsWithSpec.map((e, i) => {
            return <DoctorsWithSpec key={i} e={e} />;
          })
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </>
  );
};

export default Doktorok;
