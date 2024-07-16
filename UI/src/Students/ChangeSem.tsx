import React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Button from "../Web/Button.jsx";
import { domain } from "../Utils/Variables.js";
import Modal from "../Web/Modal.jsx";
import Toast from '../Web/Toast.jsx';

export const ChangeSem = (props) => {
  const changeSemDomain = "student/semester";
  const newSem = useRef();
  const changeSemester = async (e) => {
    e.preventDefault();
    let data = {
      id: parseInt(newSem.current.value),
      students: props.studentIDs,
    };
    let config = {
      method: "patch",
      url: domain.concat(changeSemDomain),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("site")}`,
      },
      data: data,
    };
    axios(config)
      .then((response) => {
        <Toast>Semester Student(s) semester changed Successfully.</Toast>
        props.onSuccessChange();
        props.refresh();
      })
      .catch((errors) => {
        console.log(errors);
      });
  }
  return (
    <Modal
      open={true}
      onClose={props.onClose}
      className="student-page-modal"
      onBlurClass={`${true ? "" : "no-blur"}`}
      backdropEntire={true}
    >
      <form onSubmit={changeSemester}>
        <div className="modal-header">
          <div className="modal-title">Change Semester</div>
        </div>
        <div className="modal-body addStudentModal">
          <label className="newStudentFieldLabel1">Select Semester</label>
          <select
            className="newStudentFieldInput1"
            ref={newSem}
            required
            defaultValue={(parseInt(props.current_semID) + 1)}
          >
            <option value="">Select Semester</option>
            {props.semesters.map((sem) => {
             if (sem.id !== props.current_semID){
                return <option key={sem.id} value={sem.id}>
                {sem.name}
              </option>
             }
            })}
          </select>
        </div>
        <div className="modal-footer">
          <Button type="submit">
            Proceed
          </Button>
          <Button type="button" onClick={props.onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
