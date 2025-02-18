import React from "react";
import useDoctorContext from "../../contexts/DoctorContext";
import "./doctors.css";
import TextFilter from "../filters/text_filter_top/TextFilter";
import DoctorsWithSpec from "./doctors_with_spec/DoctorsWithSpec";

const Doktorok = () => {
  const { doctorsWithSpec, setFilteredDoctorsList, filteredDoctorsList } =
    useDoctorContext();

  return (
    <>
      <TextFilter
        list={doctorsWithSpec}
        filterListSetter={setFilteredDoctorsList}
      />
      <div className="doctors-spec">
        {filteredDoctorsList ? (
          filteredDoctorsList.map((e, i) => {
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
