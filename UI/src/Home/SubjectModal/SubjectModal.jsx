import { useState } from "react"
import Modal from "../../Web/Modal"

const SubjectModal = (props) => {
    // const [modalOpen, setModalOpen] = useState();

    return (<Modal open={props.show}>
        <div>Header</div>
        <div>Body</div>
        <div>
            <button onClick={()=>{props.onClose()}}>Close</button>
        </div>
    </Modal>)
}
export default SubjectModal