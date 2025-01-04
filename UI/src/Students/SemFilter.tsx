import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import { SingleLineLoading } from "../Home/SemesterCards/Loading.tsx";
import './styles/SemFilter.css';

export const SemFilter = (props) => {
  const navi = useNavigate();
  const params = useParams();
  const { semesters, action_path } = props;

  let current_semID = parseInt(params["semester"]);
  return (
    <div className="semesterFilter">
      <div className="semesterFilterHeader">Semesters</div>
      {semesters.map((sem, index) => (
        <div
          key={index}
          className={`SemesterTabFilter ${ // this class parent based two definition, horizontal and vertical
            sem?.id === current_semID ? "activeSemesterTabFilter" : ""
          }`}
          onClick={() => {
            navi(`${action_path}/${sem?.id}`);// given url
          }}
          title={sem == null ? "" : `Select ${sem?.name}`}
        >
          {sem == null ? (
            <SingleLineLoading className={`fullwidth ${'className' in props ? props.className : ''}`} />
          ) : (
            sem?.name
          )}
        </div>
      ))}
    </div>
  );
};
