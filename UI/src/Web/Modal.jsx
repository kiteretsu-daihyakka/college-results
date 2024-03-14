import "./Modal.css"

const Modal = (props) => {
    return <dialog open={props.open} className="dialog-modal">
        {props.children}
    </dialog>
}
export default Modal