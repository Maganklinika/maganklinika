import React from "react";
import useDoctorContext from "../../contexts/DoctorContext";
import "./doctors.css";
import TextFilter from "../filters/text_filter_top/TextFilter";
import DoctorsWithSpec from "./doctors_with_spec/DoctorsWithSpec";
import useAuthContext from "../../contexts/AuthContext";

const Doktorok = () => {
  const { doctorsWithSpec, setFilteredDoctorsList, filteredDoctorsList } =
    useDoctorContext();
  const { doctorsByRating } = useAuthContext();

  return (
    <>
      <TextFilter
        list={doctorsWithSpec}
        filterListSetter={setFilteredDoctorsList}
      />
      <div className="doctors-spec">
        {filteredDoctorsList ? (
          filteredDoctorsList.map((e, i) => {
            return (
              <DoctorsWithSpec key={i} e={e} ratingList={doctorsByRating} />
            );
          })
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </>
  );
};

export default Doktorok;
