import React, { useRef } from "react";
import { useState } from "react";
import Button from "../Web/Button";
import { Delete } from "./Delete.tsx";
import { ChangeSem } from "./ChangeSem.tsx";

import DeleteDark from "../images/PNG/delete-dark.png";
import ExchangeDark from "../images/PNG/exchange-dark.png";
import AddStudentDark from "../images/PNG/add-student-dark.png";

import AddStudentWhite from "../images/PNG/add-student-white.png";
import DeleteWhite from "../images/PNG/delete-white.png";
import ExchangeWhite from "../images/PNG/exchange-white.png";

import { useAuth } from "../hooks/AuthProvider";
import { StudentForm } from "./StudentForm.tsx";

export const Actions = (props) => {
  const auth = useAuth();

  const DeleteImgRef = useRef(null);
  const ExchangeImgRef = useRef(null);
  const StudentAddImgRef = useRef(null);

  const [showChangeSemModal, setshowChangeSemModal] = useState(false);
  const [showAddStudentModal, setshowAddStudentModal] = useState(false);
  
  const {
    studentsData,
    IDs_studentSelected,
    current_semID,
    semesters,
    fetchSemesterWiseStudent,
    setIDs_studentSelected,
    singleStudentDelete,
  } = props;

  const showAddModal = () => {
    setshowAddStudentModal(true);
  };
  const hideAddModal = () => {
    setshowAddStudentModal(false);
  };
  const hideEditModal = () => {
    props.setshowEditStudentModal(false);
  };
  // function handleMouseEnter(e) {
  //   if (e.target.id === "delete") {
  //     DeleteImgRef.current.src = DeleteWhite;
  //   } else if (e.target.id === "exchange") {
  //     ExchangeImgRef.current.src = ExchangeWhite;
  //   } else {
  //     StudentAddImgRef.current.src = AddStudentWhite;
  //   }
  // }
  // function handleMouseLeave(e) {
  //   if (e.target.id === "delete") {
  //     DeleteImgRef.current.src = DeleteDark;
  //   } else if (e.target.id === "exchange") {
  //     ExchangeImgRef.current.src = ExchangeDark;
  //   } else {
  //     StudentAddImgRef.current.src = AddStudentDark;
  //   }
  // }

  return (
    <>
      <div
        className="studentActions"
        // style={{ visibility: studentsData !== null ? "visible" : "hidden" }}
      >
        {auth.teacher && studentsData !== null && (
          <>
            {IDs_studentSelected.length > 0 && (
              <>
                <Button
                  className="studentActionBtn"
                  id="exchange"
                  onMouseOver={() =>
                    (ExchangeImgRef.current.src = ExchangeWhite)
                  }
                  onMouseOut={() => (ExchangeImgRef.current.src = ExchangeDark)}
                  onClick={() => setshowChangeSemModal(true)}
                >
                  <img
                    src={ExchangeDark}
                    alt="Change Semester"
                    ref={ExchangeImgRef}
                  />
                  <span>Change Semester</span>
                </Button>
                <Button
                  className="studentActionBtn"
                  id="delete"
                  onMouseOver={() => (DeleteImgRef.current.src = DeleteWhite)}
                  onMouseOut={() => (DeleteImgRef.current.src = DeleteDark)}
                  onClick={() => props.setShowDeleteStudentModal(true)}
                >
                  <img
                    src={DeleteDark}
                    alt="Delete Selected Student(s)"
                    ref={DeleteImgRef}
                  />
                  <span>Delete</span>
                </Button>
              </>
            )}
            <Button
              className="studentActionBtn primary"
              id="add-student"
              onMouseOver={() =>
                (StudentAddImgRef.current.src = AddStudentDark)
              }
              onMouseOut={() =>
                (StudentAddImgRef.current.src = AddStudentWhite)
              }
              onClick={showAddModal}
            >
              <img
                src={AddStudentWhite}
                alt="Add Student"
                ref={StudentAddImgRef}
              />
              <span>Add Student</span>
            </Button>
          </>
        )}
      </div>
      <>
        {(showAddStudentModal || props.showEditStudentModal) && (
          <StudentForm
            mode={showAddStudentModal ? "Add" : "Edit"}
            // showModal={props.showModal}
            hideModal={showAddStudentModal ? hideAddModal : hideEditModal}
            current_semID={props.current_semID}
            semesters={props.semesters}
            fetchSemesterWiseStudent={props.fetchSemesterWiseStudent}
            studentDetail={
              showAddStudentModal
                ? { id: "", name: "", email: "" }
                : props.studentDetail
            }
          />
        )}
        {props.showDeleteStudentModal && (
          <Delete
            onSuccessDelete={() => {
              props.setShowDeleteStudentModal(false);
              props.setSingleStudentDelete(false);
              
              // fetchSemesterWiseStudent(current_semID);
            }}
            onClose={() => {
              props.setSingleStudentDelete(false);
              props.setShowDeleteStudentModal(false);
            }}
            ids={IDs_studentSelected}
            singleStudentDelete={props.singleStudentDelete}
            studentDetail={props.studentDetail}
            setIDs_studentSelected={setIDs_studentSelected}
            setStudentsData={props.setStudentsData}
            studentsData={props.studentsData}
          />
        )}
        {showChangeSemModal && (
          <ChangeSem
            semesters={semesters}
            onSuccessChange={() => {
              setIDs_studentSelected([]);
              setshowChangeSemModal(false);
            }}
            refresh={() => fetchSemesterWiseStudent(current_semID)}
            onClose={() => setshowChangeSemModal(false)}
            studentIDs={IDs_studentSelected}
            current_semID={current_semID}
          />
        )}
      </>
    </>
  );
};
