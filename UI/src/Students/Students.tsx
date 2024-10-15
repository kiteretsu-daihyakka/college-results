import axios, { all } from "axios";
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
import { Actions } from "./Actions.tsx";
import ActionsSingleStudent from "./ActionsSingleStudent.jsx";

function Students(props) {
  const studentDomain = "student";
  const studentDomainSemFilter = studentDomain.concat("?semester=");
  const auth = useAuth();
  const params = useParams();
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);
  const [studentDetail, setStudentDetail] = useState(null);
  const [IDs_studentSelected, setIDs_studentSelected] = useState<Array<any>>(
    []
  );

  const [studentsData, setStudentsData] = useState(null);
  const [semesters, setSemesters] = useState([null, null, null, null]);
  const [singleStudentDelete, setSingleStudentDelete] = useState(null);

  // TODO: try state change approach to remove code from success and close blocks
  // if(showDeleteStudentModal === false){

  // }
  let current_semID = parseInt(params["semester"]);
  async function fetchSemesterWiseStudent(current_id) {
    setStudentsData(null);
    setIDs_studentSelected([]);
    if (semesters[0] == null) {
      let sems = await fetchSemesters();
      setSemesters(sems.semesters);
    }

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
  const fiveLoadingRows: JSX.Element[] = [];
  // let styleColspan = {display: "table-cell", }; 
  for (let index = 0; index < 4; index++) {
    fiveLoadingRows.push(
      <tr key={index}>
        <td colSpan={5}>
          <SingleLineLoading/>
        </td>
      </tr>
    );
  }

  return (
    <div className="students-page">
      <Title>Students</Title>
      <Search />  
      <Actions
        studentsData={studentsData}
        IDs_studentSelected={IDs_studentSelected}
        current_semID={current_semID}
        semesters={semesters}
        fetchSemesterWiseStudent={fetchSemesterWiseStudent}
        setIDs_studentSelected={setIDs_studentSelected}
        singleStudentDelete={singleStudentDelete}
        setSingleStudentDelete={setSingleStudentDelete}
        studentDetail={studentDetail}
        showEditStudentModal={showEditStudentModal}
        showDeleteStudentModal={showDeleteStudentModal}
        setshowEditStudentModal={setShowEditStudentModal}
        setShowDeleteStudentModal={setShowDeleteStudentModal}
        setStudentsData={setStudentsData}
      />
      <SemFilter
        semesters={semesters}
        current_semID={current_semID}
        fetchSemesterWiseStudent={fetchSemesterWiseStudent}
      />
      <div className="studentsTable">
        <>
          {studentsData !== null && _.isEmpty(studentsData) ? (
            <NoStudents />
          ) : (
            <>
              <table style={{width:"100%"}}>
                <thead>
                  <tr>
                    <th className="checkbox">

                      {auth.teacher && studentsData !== null && !_.isEmpty(studentsData) && (
                        <input
                          type="checkbox"
                          onChange={(e) => checkboxHandler(e, true)}
                        />
                      )}
                    </th>
                    {/* <th className="id">ID</th> */}
                    <th className="name">Name</th>
                    <th className="email">Email</th>
                    {/* <th>Semester</th> */}
                    <th  className="menuHeader">{auth.teacher && "Actions"}</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsData === null ? (
                    fiveLoadingRows
                  ) : (
                    <>
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
                          {/* <td className="id">{student.id}</td> */}
                          <td className="name">{student.name}</td>
                          <td className="email">{student.email}</td>
                          {/* <td>{studentsData.data.semester.name}</td> */}
                          <td className="menu">
                            {auth.teacher && (
                              <ActionsSingleStudent
                                student={student}
                                current_semID={current_semID}
                                semesters={semesters}
                                fetchSemesterWiseStudent={
                                  fetchSemesterWiseStudent
                                }
                                setStudentDetail={setStudentDetail}
                                setShowEditStudentModal={
                                  setShowEditStudentModal
                                }
                                setShowDeleteStudentModal={
                                  setShowDeleteStudentModal
                                }
                                setSingleStudentDelete={setSingleStudentDelete}
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </>
          )}
        </>
      </div>
    </div>
  );
}
export default Students;
