import React, {useEffect} from "react";
import CloseCross from "../images/PNG/CloseCross.png";
import "./styles/Toast.css";
import Button from "./Button";
import {useState} from "react";

const Toast = (props) => {
    // const [show, setshow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            props.setShowToast(false);
        }, 5000);
    }, []);

    const closeToast = () => {
        props.setShowToast(false);
    };
    return (
        <>
            {/*TODO: don't give separate row space to messages class in grid definition. instead use position relative and absolute to position the toast.*/}
            <div className="messages">
                <div className="toast">
                    {props.children}
                    {/* <Button type='button' > */}
                    <img
                        src={CloseCross}
                        alt="cross icon to dismiss the message."
                        onClick={closeToast}
                    />
                    {/* </Button> */}
                    {/* <div className="progress"></div> */}
                </div>
                <div className="progress-bar">
                    <span className="percentage c"></span>
                </div>
            </div>
        </>
    );
};
export default Toast;
