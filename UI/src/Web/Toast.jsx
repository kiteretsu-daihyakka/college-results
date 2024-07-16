import React, { useEffect } from "react";
import CloseCross from "../images/PNG/CloseCross.png";
import "./styles/Toast.css";
import Button from "./Button";
import { useState } from "react";

const Toast = (props) => {
  const [show, setshow] = useState(true);
 
  useEffect(() => {
    setTimeout(() => {
      closeToast();
    }, 5000);
  }, []);
  
  const closeToast = () => {
    setshow(false);
  };
  return (
    <>
      {
        // TODO: don't give separate row space to messages class in grid defination. instead use position relative and absolute to position the toast.
        show && (
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
          </div>
        )
      }
    </>
  );
};
export default Toast;
