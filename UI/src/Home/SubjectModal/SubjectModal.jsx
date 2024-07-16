import { useState } from "react";
import Modal from "../../Web/Modal";
import "./SubjectModal.css";
// import RightArrow from "../../images/right_arrow.png";

const SubjectModal = (props) => {
  const semDetail = Array.prototype.filter.call(props.allSem, (sem) => sem?.id === props.semID)[0];

  return (
    <>
    {props.show && <Modal open={props.show} onClose={props.onClose} className="subjectModal" onBlurClass={` ${props.isMobileScreen ? '' : 'no-blur'}`}>
      <div className="modal-header">
        <div className="modal-title">Subjects</div>
        <div className="modal-subtitle">
          {semDetail?.name}
        </div>
      </div>
      <div className="modal-body">
        <table className="subjects-list-modal">
          <tbody>
            {semDetail?.subjects.map((subj) => (
              <tr key={subj.name}>
                <td className="name">{subj.name}</td>
                {/* <td>
                  <img src={RightArrow} />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="modal-footer">
        <button onClick={props.onClose}>
          Close
        </button>
      </div>
    </Modal>}</>
  );
};
export default SubjectModal;
