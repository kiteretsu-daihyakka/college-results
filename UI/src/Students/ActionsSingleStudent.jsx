import EditPNG from "../images/PNG/EditPNG.png";
import DeleteNoShadow from "../images/PNG/delete-no-shadow.png";
import { useState } from "react";
import { StudentForm } from "./StudentForm.tsx";

const ActionsSingleStudent = (props) => {
  const { student } = props;
  
  // const [studentDetailEdit, setstudentDetailEdit] = useState(null);

  const showEditModal = () => {
    props.setStudentDetail(student);
    props.setShowEditStudentModal(true);
    // console.log({student});

    // setstudentDetailEdit(student);
  };
  const handleShowDeleteModal = () => {
    props.setStudentDetail(student);
    props.setSingleStudentDelete(true);
    props.setShowDeleteStudentModal(true);
  }
  return (
    <>
      <img
        src={EditPNG}
        alt="Edit Student"
        id="edit-student"
        className="studentActionBtn studentActionTable"
        onClick={() => showEditModal()}
      />
      <img
        src={DeleteNoShadow}
        alt="Delete Student"
        id="delete-student"
        className="studentActionBtn studentActionTable deleteIcon"
        onClick={() => handleShowDeleteModal(true)}
      />
    </>
  );
};

export default ActionsSingleStudent;
