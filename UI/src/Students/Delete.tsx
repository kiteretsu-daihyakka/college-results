import React from "react";
import axios from "axios";
// import { useEffect, useRef, useState } from "react";
import Button from "../Web/Button.jsx";
import { domain } from "../Utils/Variables.js";
import Modal from "../Web/Modal.jsx";
import Toast from "../Web/Toast.jsx";

export const Delete = (props) => {
  const studentDomain = "student";
  let data;
  if (props.singleStudentDelete) {
    data = {
      students: [props.studentDetail["id"]],
    };
  } else {
    data = {
      students: props.ids,
    };
  }
  let selectedStudents = props.studentsData.filter((student) =>
    data.students.includes(student.id)
  );
  console.log(data, selectedStudents);
  const deleteStudents = async () => {
    let config = {
      method: "delete",
      url: domain.concat(studentDomain),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("site")}`,
      },
      data: data,
    };

    // return;
    axios(config)
      .then((response) => {
        <Toast>Student(s) Deleted Successfully.</Toast>;
        props.setIDs_studentSelected((prev) => {
          return prev.filter((id) => !data.students.includes(id));
        });
        props.setStudentsData((prev) => {
          return prev.filter((student) => !data.students.includes(student.id));
        });
        props.onSuccessDelete();
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  return (
    <Modal
      open={true}
      onClose={props.onClose}
      className="deleteModal student-page-modal"
      onBlurClass={`${true ? "" : "no-blur"}`}
      backdropEntire={true}
    >
      <form>
        <div className="modal-header ">
          <div className="modal-title">Delete Student</div>
        </div>
        <div className="modal-body">
          Are you sure you want to delete the following {selectedStudents.length} student(s)?:
          <br/>
          {selectedStudents.map((student, index) => (
            <div style={{ fontWeight: "bold", paddingLeft: "15px" }}>
              {index+1} . {student.name}
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <Button type="button" onClick={deleteStudents}>
            Delete
          </Button>
          <Button type="button" onClick={props.onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
