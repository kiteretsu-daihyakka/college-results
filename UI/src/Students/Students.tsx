import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { domain } from "../Utils/Variables";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import "./styles/Students.scss";
import fetchSemesters from "../Home/SemesterCards/SemesterProvider.tsx";
import Loading, { SingleLineLoading } from "../Home/SemesterCards/Loading.tsx";
import { NoStudents } from "./NoStudents.tsx";

import Title from "../Web/Title";
import React from "react";

import { Search } from "./Search.tsx";
import { SemFilter } from "./SemFilter.tsx";
import { Actions, SingleStudentActions } from "./Actions.tsx";

function Students(props) {
  const studentDomain = "student";
  const studentDomainSemFilter = studentDomain.concat("?semester=");
  const auth = useAuth();
  const params = useParams();

  const [IDs_studentSelected, setIDs_studentSelected] = useState<Array<any>>(
    []
  );

  const [studentsData, setStudentsData] = useState(null);
  const [semesters, setSemesters] = useState([null, null, null, null]);
  let singleStudentDelete = false;

  let current_semID = parseInt(params["semester"]);
  async function fetchSemesterWiseStudent(current_id) {
    setStudentsData(null);
    setIDs_studentSelected([]);
    let sems = await fetchSemesters();
    setSemesters(sems.semesters);
    axios
      .get(`${domain.concat(studentDomainSemFilter).concat(current_id)}`)
      .then((response) => {
        setStudentsData(response.data.data.semester.students);
      });
  }

  useEffect(() => {
    fetchSemesterWiseStudent(current_semID);
  }, []);

  function checkboxHandler(e, selectAll = false) {
    if (e.target.checked) {
      if (selectAll) {
        document
          .querySelectorAll('tbody input[type="checkbox"]')
          .forEach((checkbox) => {
            checkbox.checked = true;
          });
        setIDs_studentSelected((prev) => {
          let newArr = [];
          studentsData?.forEach((student) => {
            newArr.push(student.id);
          });
          return newArr;
        });
      } else {
        setIDs_studentSelected((prev) => {
          return [...prev, parseInt(e.target.value)];
        });
      }
    } else {
      if (selectAll) {
        document
          .querySelectorAll('table input[type="checkbox"]')
          .forEach((checkbox) => {
            checkbox.checked = false;
          });
        setIDs_studentSelected((prev) => []);
      } else {
        setIDs_studentSelected((prev) => {
          return prev.filter(
            (existing_id) => existing_id !== parseInt(e.target.value)
          );
        });
      }
    }
  }
  return (
    <div className="students-page">
      <Title>Students</Title>
      {/* <Search /> */}
      <Actions
        studentsData={studentsData}
        IDs_studentSelected={IDs_studentSelected}
        current_semID={current_semID}
        semesters={semesters}
        fetchSemesterWiseStudent={fetchSemesterWiseStudent}
        setIDs_studentSelected={setIDs_studentSelected}
        singleStudentDelete={singleStudentDelete}
      />
      <SemFilter
        semesters={semesters}
        current_semID={current_semID}
        fetchSemesterWiseStudent={fetchSemesterWiseStudent}
      />
      <div className="studentsTable">
        {studentsData === null ? (
          <Loading />
        ) : (
          <>
            {_.isEmpty(studentsData) ? (
              <NoStudents />
            ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th className="checkbox">
                        {auth.teacher && (
                          <input
                            type="checkbox"
                            onChange={(e) => checkboxHandler(e, true)}
                          />
                        )}
                      </th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      {/* <th>Semester</th> */}
                      <th className="menu">{auth.teacher && "Actions"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsData.map((student) => (
                      <tr
                        key={student.id}
                        className={student.id in [123] ? "selectedRow" : ""}
                      >
                        <td className="checkbox">
                          {auth.teacher && (
                            <input
                              type="checkbox"
                              onChange={(e) => checkboxHandler(e, false)}
                              value={student.id}
                            />
                          )}
                        </td>
                        <td className="id">{student.id}</td>
                        <td className="name">{student.name}</td>
                        <td className="email">{student.email}</td>
                        {/* <td>{studentsData.data.semester.name}</td> */}
                        <td className="menu">
                          {auth.teacher && (
                            <SingleStudentActions student={student} />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default Students;
