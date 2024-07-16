import Backdrop from "./Backdrop";
import "./Modal.css";

const Modal = (props) => {
  return (
    <div className={`${props.className}`}>
      {props.backdropEntire && (
        <div className="backdrop-entire" onClick={props.onClose}></div>
      )}
      <Backdrop
        className={`backdrop-modal ${props.onBlurClass} ${props.backDropClass}`}
        onClick={props.onClose}
      />

      <div className={`dialog-modal-container`}>
        <dialog open={props.open} className="dialog-modal">
          {props.children}
        </dialog>
      </div>
    </div>
  );
};
export default Modal;
