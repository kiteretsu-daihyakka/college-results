import { useState } from "react";
import Modal from "../../Web/Modal";
import "./SubjectModal.css";

const SubjectModal = (props) => {
  const semDetail = props.allSem.filter((sem) => sem.id === props.semID)[0];

  return (
    <Modal open={props.show}>
      <div className="modal-header">
        <div className="modal-title">Subjects</div>
        <div className="modal-subtitle">
          <p>{semDetail?.name}</p>
        </div>
      </div>
      <div className="modal-body">
        <table>
          <tbody>
            {semDetail?.subjects.map((subj) => (
              <tr>
                <td>{subj.name}</td>
                <td>&gt;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button
          onClick={() => {
            props.onClose();
          }}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};
export default SubjectModal;
