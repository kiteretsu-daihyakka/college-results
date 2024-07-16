import React from 'react';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Button from "../Web/Button.jsx";
import { domain } from "../Utils/Variables.js";
import Modal from '../Web/Modal.jsx';
import Toast from '../Web/Toast.jsx';

export const Delete = (props) => {
  const studentDomain = "student";
  const deleteStudents = async () => {
    let data = {
      "students": props.ids
    };
    // console.log(data);
    let config = {
      method: "delete",
      url: domain.concat(studentDomain),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("site")}`,
      },
      data: data,
    };
    console.log(props.ids);
    // return;
    axios(config)
      .then((response) => {
        <Toast>Student(s) Deleted Successfully.</Toast>
        props.onSuccessDelete();
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
        <form>
          <div className="modal-header">
            <div className="modal-title">Delete Student</div>
          </div>
          <div className="modal-body addStudentModal">
            Are you sure you want to delete the selected students?
          </div>
          <div className="modal-footer">
            <Button type="button" onClick={deleteStudents}>Delete</Button>
            <Button type="button" onClick={props.onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    )
}
