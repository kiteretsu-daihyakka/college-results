import axios from "axios";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../Web/Modal";
import Button from "../Web/Button";
import { domain } from "../Utils/Variables";
import "../Web/Controls.css";
import DropdownArrow from "../images/PNG/DropdownArrow.jpg";
import Toast from "../Web/Toast";

// write documentaion for this component
/*
Documentaion goes here:
This component is used to add new student or edit existing student details.
It takes following props:
1. showModal: boolean value to show/hide modal.
2. hideModal: function to hide modal.
3. refresh: function to refresh the student list.
4. displayToastMessage: function to display toast message.
5. semesters: array of semester objects.
6. current_semID: current semester ID.
7. mode: string value to determine whether to add new student or edit existing student.
8. studentDetail: object containing student details.
This component returns a form to add new student or edit existing student details.
*/

export const StudentForm = (props) => {
  const params = useParams();
  const studentDomain = "student";
  let newStudentEmail = useRef();
  let newStudentName = useRef();
  let newStudentSem = useRef();
  let {
    id: studentID,
    name: studentName,
    email: studentEmail,
  } = props?.studentDetail;
  
  let current_semID = parseInt(params["semester"]);
  async function addNewStudent() {
    let data = {
      id: studentID,
      name: newStudentName.current.value,
      email: newStudentEmail.current.value,
      semester: {
        id: parseInt(newStudentSem.current.value),
      },
    };
    // console.log(data);
    // return;
    let config = {
      method: `${props.mode === "Edit" ? "patch" : "post"}`,
      url: domain.concat(studentDomain),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("site")}`,
      },
      data: data,
    };
    axios(config)
      .then((response) => {
        props.hideModal();
        if (props.mode === "Edit") {
          <Toast>Student details updated successfully.</Toast>;
        } else {
          <Toast>New Student added successfully.</Toast>;
        }
        props.fetchSemesterWiseStudent(current_semID);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }
  function addStudentHandler(e) {
    e.preventDefault();
    addNewStudent();
  }
  return (
    <Modal
      open={true}
      onClose={props.hideModal}
      className="student-page-modal"
      onBlurClass={`${true ? "" : "no-blur"}`}
      backdropEntire={true}
    >
      <form onSubmit={addStudentHandler}>
        <div className="modal-header">
          <div className="modal-title">{props.mode} Student</div>
        </div>
        <div className="modal-body addStudentModal">
          <label className="newStudentFieldLabel1" htmlFor="selectSemester">Select Semester</label>
          <select
            className={`newStudentFieldInput1 ${
              props.mode === "Edit" ? "disabled" : ""
            }`}
            id="selectSemester"
            defaultValue={props.current_semID}
            style={{
              backgroundImage: `url(${DropdownArrow})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "calc(100%), calc(100% - 20px) 1em, 100% 0",
              backgroundSize: "20px 25px, 5px 5px, 2.5em 2.5em",
            }}
            ref={newStudentSem}
            disabled={props.mode === "Edit"}
          >
            {props.semesters.map((sem) => (
              <option key={sem.id} value={sem.id}>
                {sem.name}
              </option>
            ))}
          </select>
          <label htmlFor="student name" className="newStudentFieldLabel2">
            Full Name *
          </label>
          <input
            id="student name"
            placeholder="First & Last Name"
            className="newStudentFieldInput2"
            ref={newStudentName}
            required
            type="text"
            defaultValue={studentName}
          />
          <label htmlFor="student email" className="newStudentFieldLabel3">
            Email *
          </label>
          <input
            id="student email"
            placeholder="example@email.com"
            className="newStudentFieldInput3"
            ref={newStudentEmail}
            required
            type="email"
            defaultValue={studentEmail}
          />
          {/* <p className="error">This is error.</p> */}
        </div>
        <div className="modal-footer">
          <Button type="submit">{props.mode}</Button>
          <Button type="button" onClick={props.hideModal}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
