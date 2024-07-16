import React from "react";
import { useNavigate } from "react-router-dom";
import { SingleLineLoading } from "../Home/SemesterCards/Loading.tsx";

export const SemFilter = (props) => {
  const navi = useNavigate();
  const { semesters, current_semID, fetchSemesterWiseStudent } = props;
  return (
    <div className="semesterFilter">
      <div className="semesterFilterHeader">Semesters</div>
      {semesters.map((sem, index) => (
        <div
          key={index}
          className={`SemesterTabFilter ${
            sem?.id === current_semID ? "activeSemesterTabFilter" : ""
          }`}
          onClick={() => {
            navi(`/student/semester/${sem?.id}`);
            fetchSemesterWiseStudent(sem?.id);
          }}
          title={sem == null ? "" : `Select ${sem?.name}`}
        >
          {sem == null ? (
            <SingleLineLoading className={"fullwidth"} />
          ) : (
            sem?.name
          )}
        </div>
      ))}
    </div>
  );
};
